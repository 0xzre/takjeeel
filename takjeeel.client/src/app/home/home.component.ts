import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TakjilFormComponent } from '../components/control/takjil-form/takjil-form.component';
import { ButtonModule } from 'primeng/button';
import { Takjil, TakjilRequest } from '../models/takjil.model';
import { SearchBarComponent } from '../components/control/search-bar/search-bar.component';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    TakjilFormComponent,
    ButtonModule,
    SearchBarComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  takjils: Takjil[] = [];

  pageNumber: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;

  searchQuery: string = '';

  isAddingTakjil: boolean = false;

  isEditingTakjil: boolean = false;
  currentEditedTakjil: Takjil = {
    takjilId: 0,
    date: new Date().toISOString().slice(0, 10),
    foods: '',
    description: '',
    quantity: 0,
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTakjils();
  }

  getTakjils = (callback?: () => void, query: string = '') => {
    this.http
      .get<{ takjils: Takjil[]; totalPages: number }>(
        `/takjil/?pageNumber=${this.pageNumber}&pageSize=${this.pageSize}&query=${query}`
      )
      .subscribe({
        next: (result) => {
          this.takjils = result.takjils;
          this.totalPages = Math.max(
            Math.ceil(result.totalPages / this.pageSize),
            1
          );
          if (callback) {
            callback();
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
  };

  searchTakjils = (query: string) => {
    this.getTakjils(() => {
      this.pageNumber = 1;
      while (this.pageNumber > this.totalPages) {
        this.previousPage();
      }
    }, query);
  };

  getTakjilsSafePage() {
    this.getTakjils(() => {
      if (this.pageNumber > this.totalPages) {
        this.previousPage();
      }
    }, this.searchQuery);
  }

  addTakjil = (takjil: TakjilRequest) => {
    this.http
      .post('/takjil', {
        date: takjil.date,
        foods: takjil.foods,
        quantity: takjil.quantity,
        description: takjil.description,
      })
      .subscribe({
        next: () => {
          this.getTakjils();
        },
        error: (error) => {
          console.error(error);
        },
      });
  };

  editTakjil = (takjil: TakjilRequest) => {
    this.http
      .put('/takjil', {
        takjilId: takjil.takjilId,
        date: takjil.date,
        foods: takjil.foods,
        quantity: takjil.quantity,
        description: takjil.description,
      })
      .subscribe({
        next: () => {
          this.getTakjils(() => {
            this.isEditingTakjil = false;
          }, this.searchQuery);
        },
        error: (error) => {
          console.error(error);
        },
      });
  };

  deleteTakjil(takjilId: number) {
    this.http.delete(`/takjil/?id=${takjilId}`).subscribe({
      next: () => {
        this.getTakjilsSafePage();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  nextPage() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
      this.getTakjils(() => {}, this.searchQuery);
    }
  }

  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.getTakjils(() => {}, this.searchQuery);
    }
  }

  loadPage(page: number) {
    if (page > 0) {
      this.pageNumber = page;
      this.getTakjils(() => {}, this.searchQuery);
    }
  }

  showNewTakjilForm() {
    this.isAddingTakjil = true;
  }

  hideNewTakjilForm = () => {
    this.isAddingTakjil = false;
  };

  showEditTakjilForm = (takjil: Takjil) => {
    this.isEditingTakjil = true;
    this.currentEditedTakjil = JSON.parse(JSON.stringify(takjil));
  };

  hideEditTakjilForm = () => {
    this.isEditingTakjil = false;
  };
}
