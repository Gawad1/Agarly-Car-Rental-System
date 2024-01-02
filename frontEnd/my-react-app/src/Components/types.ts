// types.ts

export interface CarSpecs {
  plate_id: number;
  model: string;
  production_year: number;
  color: string;
  photo: string;
  category: string;
  class_id: number;
  office_id: number;
  status: string;
  rate: number;
}

export interface Reservation {
  pickup_date: string; // Adjust the type as needed
  return_date: string; // Adjust the type as needed
}

export interface CarDetails {
  car_specs: CarSpecs | null;
  reservations: Reservation[];
}