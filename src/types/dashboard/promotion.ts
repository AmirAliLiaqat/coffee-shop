export interface Promotion {
  id: number;
  name: string;
  description: string;
  type: string;
  status: string;
  startDate: string;
  endDate: string;
  usage: number;
}

export interface NewPromotion {
  name: string;
  description: string;
  type: string;
  discount: string;
  startDate: string;
  endDate: string;
}
