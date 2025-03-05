import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Takjil {
  date: string;
  foods: string;
  quantity: number;
  description: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
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

  title = 'takjeeel.client';
}
