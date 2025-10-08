import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from "@angular/router";
import { UserService } from './services/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  protected readonly title = signal('pc-market');
  private userService = inject(UserService);
  private router = inject(Router);
  menuOpen = false;
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  // check if user is logged in
  get isLoggedIn() {
    return !!this.userService.getToken();
  }

  // get username from localStorage
  get username(): string | null {
    return this.userService.getUsername();
  }

  signOut() {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
