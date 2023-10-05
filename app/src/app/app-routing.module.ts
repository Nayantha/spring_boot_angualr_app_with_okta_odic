import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ReservationListComponent } from "./reservation-list/reservation-list.component";
import { ViewUserComponent } from "./view-user/view-user.component";
import { ReservationEditComponent } from "./reservation-edit/reservation-edit.component";

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'reservations',
    component: ReservationListComponent
  },
  {
    path: 'user-details',
    component: ViewUserComponent
  },
  {
    path: 'reservation/:id',
    component: ReservationEditComponent
  },
  {path: '**', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
