import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Product {
    id: number;
    shopName: string;
    categoryId: number;
    productName: string;
    description: string;
    price: number;
    imageUrl: string;
    createdAt: string;
}

@Injectable({
    providedIn: "root"
})
export class ProductService {
    private apiUrl = "http://localhost:8080/api/products/productList"; // 

    constructor(private http: HttpClient) {}

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl);
    }
}