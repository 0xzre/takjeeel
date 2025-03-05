export interface Takjil {
  takjilId: number;
  date: string;
  foods: string;
  quantity: number;
  description: string;
}

export interface TakjilRequest {
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
