import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { Router, RouterLink } from "@angular/router";
import { User } from "../models/user";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-view-user',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterLink],
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent {
  authUserDetails!: any;
  authUser!: User;

  constructor(private http: HttpClient, private auth: AuthService, private router: Router) {
  }

  async ngOnInit() {
    await this.notAuthorizedRedirectToHome();
    await this.auth.getUser().subscribe(data => this.authUserDetails = data);
    this.http.get<User>('api/get_saved_user').subscribe((data: User) => {
      this.authUser = data;
    });
  }

  async notAuthorizedRedirectToHome() {
    if (!await this.auth.isAuthenticated()) {
      await this.router.navigate(["home"])
    }
  }
}
