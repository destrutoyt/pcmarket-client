import { Component, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-about-us',
  imports: [RouterLink],
  templateUrl: './about-us.html',
  styleUrls: ['./about-us.css']
})
export class AboutUsComponent implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1
      });

      // Select all elements with the common class
      const elementsToAnimate = document.querySelectorAll('.fade-on-scroll');

      elementsToAnimate.forEach(element => {
        observer.observe(element);
      });
    }
  }

  openPopup() {
    const popup = document.getElementById("pop-up-container");
    if (popup) popup.style.display = "flex";
  }

  closePopup() {
    const popup = document.getElementById("pop-up-container");
    if (popup) popup.style.display = "none";
  }
}
