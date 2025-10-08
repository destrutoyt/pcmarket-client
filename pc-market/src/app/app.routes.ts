import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SellerDashComponent } from './seller-dash/seller-dash.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { SellerRegistrationComponent } from './seller-registration/seller-registration.component';
import { ProductViewComponent } from './product-view/product-view.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product/:id', component: ProductViewComponent }, // Dynamic route for product details
  { path: 'about', component: AboutUsComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'seller', component: SellerDashComponent },
  { path: 'admin', component: AdminDashComponent },
  { path: 'cart', component: CartComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'register', component: UserRegistrationComponent },
  { path: 'seller-register', component: SellerRegistrationComponent }
];
