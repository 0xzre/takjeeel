import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-takjil-form',
  imports: [
    FormsModule,
    DatePickerModule,
    InputTextModule,
    IftaLabelModule,
    TextareaModule,
    InputNumberModule,
    ButtonModule,
  ],
  templateUrl: './takjil-form.component.html',
  styleUrl: './takjil-form.component.scss',
})
export class TakjilFormComponent {
  constructor(private http: HttpClient) {}

  public foodDate: Date = new Date();
  public foodName: string = '';
  public foodDescription: string = '';
  public foodQuantity: number = 0;

  public submit() {
    this.http
      .post('/takjil', {
        date: this.foodDate.toISOString().slice(0, 10),
        foods: this.foodName,
        quantity: this.foodQuantity,
        description: this.foodDescription,
      })
      .subscribe({
        next: () => {
          this.foodDate = new Date();
          this.foodName = '';
          this.foodDescription = '';
          this.foodQuantity = 0;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
