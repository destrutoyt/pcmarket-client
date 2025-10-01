import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  protected readonly title = signal('pc-market');
}
