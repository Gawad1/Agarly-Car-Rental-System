// types.ts

export interface Car {
  plate_id: number;
  model: string;
  production_year: number;
  color: string;
  photo: string;
  category: string;
  class_id: number;
  office_id: number;
  pickup_date?: string; // Assuming pickup_date and return_date are optional
  return_date?: string;
}
