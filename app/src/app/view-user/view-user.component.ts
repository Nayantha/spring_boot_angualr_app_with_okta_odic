import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-view-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent {
  user!: any;

  constructor(private http: HttpClient, private auth: AuthService, private router: Router) {
  }

  async ngOnInit() {
    await this.notAuthorizedRedirectToHome();
    await this.auth.getUser().subscribe(data => this.user = data);
  }

  async notAuthorizedRedirectToHome() {
    if (!await this.auth.isAuthenticated()) {
      await this.router.navigate(["home"])
    }
  }
}
