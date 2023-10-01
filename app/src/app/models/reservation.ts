export class Reservation {
  id: number | null;
  name: string;
  email: string;
  date: string;
  time: string;
  vehicle_no: string;
  mileage: number;
  message: string;

  constructor(reservation: Partial<Reservation> = {}) {
    this.id = reservation?.id || null;
    this.name = reservation?.name || '';
    this.email = reservation?.email || "";
    this.date = reservation?.date || Date();
    this.time = reservation?.time || "";
    this.vehicle_no = reservation?.vehicle_no || "";
    this.mileage = reservation?.mileage || 0;
    this.message = reservation?.message || "";
  }
}
