import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatIconModule } from "@angular/material/icon";
import { MatNativeDateModule } from "@angular/material/core";
import { MatTooltipModule } from "@angular/material/tooltip";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { Reservation } from "../models/reservation";
import { map, of, switchMap } from "rxjs";

@Component({
  selector: 'app-reservation-edit',
  standalone: true,
  imports: [
    CommonModule, MatInputModule, FormsModule, MatButtonModule, RouterLink,
    MatDatepickerModule, MatIconModule, MatNativeDateModule, MatTooltipModule
  ],
  templateUrl: './reservation-edit.component.html',
  styleUrls: ['./reservation-edit.component.css']
})
export class ReservationEditComponent implements OnInit {
  reservation!: Reservation;
  feedback: any = {};
  currentDate = new Date(new Date().setDate(new Date().getDate() + 1))
  timeList = ["10:00:00", "11:00:00", "12:00:00", "13:00:00", "14:00:00", "15:00:00"]

  constructor(private route: ActivatedRoute, private router: Router,
              private http: HttpClient, private auth: AuthService) {
  }

  async ngOnInit() {
    await this.notAuthorizedRedirectToHome(this.auth, this.router);
    this.route.params.pipe(
      map(p => p['id']),
      switchMap(id => {
        if (id === 'new') {
          return of(new Reservation());
        }
        return this.http.get<Reservation>(`api/reservation/${id}`);
      })
    ).subscribe({
      next: reservation => {
        this.reservation = reservation;
        this.feedback = {};
      },
      error: () => {
        this.feedback = {type: 'warning', message: 'Error loading'};
      }
    });
  }

  async notAuthorizedRedirectToHome(auth: AuthService, router: Router) {
    if (!await this.auth.isAuthenticated()) {
      await this.router.navigate(["home"])
    }
  }

  save() {
    const id = this.reservation.id;
    const method = id ? 'put' : 'post';

    this.http[method]<Reservation>(`/api/reservation${id ? '/' + id : ''}`, this.reservation).subscribe({
      next: () => {
        this.feedback = {type: 'success', message: 'Save was successful!'};
        setTimeout(async () => {
          await this.router.navigate(['/reservations']);
        }, 1000);
      },
      error: () => {
        this.feedback = {type: 'error', message: 'Error saving'};
      }
    });
  }

  async cancel() {
    await this.router.navigate(['/reservations']);
  }
}