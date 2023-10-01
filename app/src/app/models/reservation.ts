export class Reservation {
  id: number | null;
  name: string;
  email: string;
  date: string;
  time: string;

  constructor(reservation: Partial<Reservation> = {}) {
    this.id = reservation?.id || null;
    this.name = reservation?.name || '';
    this.email = reservation?.email || "";
    this.date = reservation?.date || Date();
    this.time = reservation?.time || "";
  }
}
