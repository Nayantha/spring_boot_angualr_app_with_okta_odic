import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { Reservation } from "../models/reservation";
import { AuthService } from "../auth/auth.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatTableModule, MatIconModule],
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent {
  title = 'Reservation List';
  loading = true;
  reservations: Reservation[] = [];
  displayedColumns = ['id', 'name', 'email', 'contact number', 'date', 'time'];
  feedback: any = {};

  constructor(private http: HttpClient, private auth: AuthService, private router: Router) {
  }

  async ngOnInit() {
    await this.notAuthorizedRedirectToHome(this.auth, this.router)
    this.loading = true;
    this.http.get<Reservation[]>('api/reservations').subscribe((data: Reservation[]) => {
      this.reservations = data;
      this.loading = false;
      this.feedback = {};
    });
  }

  async notAuthorizedRedirectToHome(auth: AuthService, router: Router) {
    if (!await this.auth.isAuthenticated()) {
      await this.router.navigate(["home"])
    }
  }

  delete(reservation: Reservation): void {
    if (confirm(`Are you sure you want to delete ${reservation.name}?`)) {
      this.http.delete(`api/reservation/${reservation.id}`).subscribe({
        next: () => {
          this.feedback = {type: 'success', message: 'Delete was successful!'};
          setTimeout(() => {
            this.ngOnInit();
          }, 1000);
        },
        error: () => {
          this.feedback = {type: 'warning', message: 'Error deleting.'};
        }
      });
    }
  }
}
