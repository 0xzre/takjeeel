import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { HttpClient } from '@angular/common/http';
import { TakjilRequest } from '../../../models/takjil.model';

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
  @Input("submit_takjil") submitTakjil: (takjil: TakjilRequest) => void = () => {};
  constructor(private http: HttpClient) {}

  public foodDate: Date = new Date();
  public foodName: string = '';
  public foodDescription: string = '';
  public foodQuantity: number = 0;

  onSubmit(): void {
    const takjil: TakjilRequest = {
      date: this.foodDate.toISOString().slice(0, 10),
      foods: this.foodName,
      description: this.foodDescription,
      quantity: this.foodQuantity,
    };
    this.submitTakjil(takjil);
  }

  onReset(): void {
    this.foodDate = new Date();
    this.foodName = '';
    this.foodDescription = '';
    this.foodQuantity = 0;
  }
}
