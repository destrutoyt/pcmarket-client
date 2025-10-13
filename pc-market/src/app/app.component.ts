import { Component, computed, inject, signal } from '@angular/core';
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

  // Use signals from UserService
  isLoggedIn = computed(() => this.userService.isLoggedIn());
  username = computed(() => this.userService.username());

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  signOut() {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}
