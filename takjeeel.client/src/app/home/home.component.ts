import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TakjilFormComponent } from '../components/control/takjil-form/takjil-form.component';
import { ButtonModule } from 'primeng/button';
import { Takjil, TakjilRequest } from '../models/takjil.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule, TakjilFormComponent, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public takjils: Takjil[] = [];

  public pageNumber: number = 1;
  public pageSize: number = 10;
  public totalPages: number = 0;

  public isAddingTakjil: boolean = false;

  public isEditingTakjil: boolean = false;
  public currentEditedTakjil: Takjil = {
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

  getTakjils(callback?: () => void) {
    this.http
      .get<{ takjils: Takjil[]; totalPages: number }>(
        `/takjil/?pageNumber=${this.pageNumber}&pageSize=${this.pageSize}`
      )
      .subscribe({
        next: (result) => {
          this.takjils = result.takjils;
          this.totalPages = Math.ceil(result.totalPages / this.pageSize);
          if (callback) {
            callback();
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  getTakjilsSafePage() {
    this.getTakjils(() => {
      if (this.pageNumber > this.totalPages) {
        this.previousPage();
      }
    });
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
          this.getTakjils();
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

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
      this.getTakjils();
    }
  }

  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.getTakjils();
    }
  }

  loadPage(page: number) {
    if (page > 0) {
      this.pageNumber = page;
      this.getTakjils();
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
