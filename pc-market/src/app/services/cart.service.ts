import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";


@Injectable({
  providedIn: 'root',
})
export class CartService {
    private http = inject(HttpClient);
    private readonly apiUrl = 'http://localhost:8080/api/cart';
}