import { Component } from '@angular/core';

@Component({
  selector: 'app-seller-registration',
  imports: [],
  templateUrl: './seller-registration.component.html',
  styleUrl: './seller-registration.component.css',
})
export class SellerRegistrationComponent {
  registerSeller() {
    // Here you would typically handle form submission, e.g., send data to a server
  }
  openPopup() {
    const popup = document.getElementById('pop-up-container');
    if (popup) popup.style.display = 'flex';
  }

  closePopup() {
    const popup = document.getElementById('pop-up-container');
    if (popup) popup.style.display = 'none';
  }
}
