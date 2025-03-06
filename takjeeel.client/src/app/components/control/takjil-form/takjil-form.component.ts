import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { IftaLabelModule } from 'primeng/iftalabel';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { HttpClient } from '@angular/common/http';
import {
  TakjilRequest,
  Takjil,
} from '../../../models/takjil.model';
import { DatePipe } from '@angular/common';

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
    ButtonGroupModule,
  ],
  providers: [DatePipe],
  templateUrl: './takjil-form.component.html',
  styleUrl: './takjil-form.component.scss',
})
export class TakjilFormComponent {
  @Input('submit_takjil') submitTakjil: (takjil: TakjilRequest) => void =
    () => {};
  @Input('save_callback') saveCallback: () => void = () => {};
  @Input('cancel_callback') cancelCallback: () => void = () => {};
  @Input('component_visible') isComponentVisible: boolean = false;
  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  @Input('takjil')
  takjil: Takjil = {
    takjilId: 0,
    date: new Date().toISOString().slice(0, 10),
    foods: '',
    description: '',
    quantity: 0,
  };

  get formattedDate() {
    return this.datePipe.transform(this.takjil.date, 'dd-MM-yyyy');
  }

  submitForm(): void {
    const takjil: TakjilRequest = {
      takjilId: this.takjil.takjilId,
      date: this.takjil.date,
      foods: this.takjil.foods,
      description: this.takjil.description,
      quantity: this.takjil.quantity,
    };
    this.submitTakjil(takjil);
    this.resetForm();
    this.saveCallback();
  }

  resetForm(): void {
    this.takjil.takjilId = 0;
    this.takjil.date = new Date().toISOString().slice(0, 10);
    this.takjil.foods = '';
    this.takjil.description = '';
    this.takjil.quantity = 0;
  }
}
