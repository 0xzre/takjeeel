export interface Takjil {
  takjilId: number;
  date: string;
  foods: string;
  quantity: number;
  description: string;
}

export interface TakjilRequest {
  takjilId?: number;
  date: string;
  foods: string;
  quantity: number;
  description: string;
}

export interface TakjilResponse {
  takjilId: number;
  date: string;
  foods: string;
  quantity: number;
  description: string;
}

export interface TakjilForm {
  takjilId: number; 
  foodDate: Date;
  foodName: string;
  foodDescription: string;
  foodQuantity: number;
}