import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { GroupEditComponent } from "./group-edit/group-edit.component";
import { ReservationListComponent } from "./reservation-list/reservation-list.component";

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
    path: 'group/:id',
    component: GroupEditComponent
  },
  {path: '**', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
