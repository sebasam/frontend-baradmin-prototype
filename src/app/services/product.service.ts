// src/app/core/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { apiUrl } from '../utils/url';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private base = apiUrl;

  constructor(private http: HttpClient) {}

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.base}/create-product`, product);
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.base}/products`);
  }

  update(id: string, product: Partial<Product>): Observable<Product> {
    return this.http.patch<Product>(`${this.base}/products/${id}`, product);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/products/${id}`);
  }
}

