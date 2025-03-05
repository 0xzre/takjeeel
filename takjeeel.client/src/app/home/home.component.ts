import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TakjilFormComponent } from '../components/control/takjil-form/takjil-form.component';

interface Takjil {
  date: string;
  foods: string;
  quantity: number;
  description: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, TakjilFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  public takjils: Takjil[] = [];

  public pageNumber: number = 1;
  public pageSize: number = 10;
  public totalPages: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTakjil();
  }

  getTakjil() {
    this.http
      .get<{ takjils: Takjil[]; totalPages: number }>(
        `/takjil/?pageNumber=${this.pageNumber}&pageSize=${this.pageSize}`
      )
      .subscribe({
        next: (result) => {
          this.takjils = result.takjils;
          this.totalPages = result.totalPages / this.pageSize;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  nextPage() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
      this.getTakjil();
    }
  }

  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.getTakjil();
    }
  }

  loadPage(page: number) {
    if (page > 0) {
      this.pageNumber = page;
      this.getTakjil();
    }
  }

}
