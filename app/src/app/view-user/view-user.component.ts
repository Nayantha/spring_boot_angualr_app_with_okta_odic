import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";
import { User } from "../models/user";

@Component({
  selector: 'app-view-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent {
  user!: User;

  constructor(private http: HttpClient, private auth: AuthService, private router: Router) {
  }

  async ngOnInit() {
    await this.notAuthorizedRedirectToHome(this.auth, this.router);
    this.http.get<User>('api/get_saved_user').subscribe((data: User) => {
      this.user = data;
    });
  }

  async notAuthorizedRedirectToHome(auth: AuthService, router: Router) {
    if (!await this.auth.isAuthenticated()) {
      await this.router.navigate(["home"])
    }
  }
}
