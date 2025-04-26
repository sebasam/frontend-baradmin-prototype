// src/app/core/services/order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order';
import { OrderProduct,CreateOrderPayload } from '../interfaces/order-product';
import { apiUrl } from '../utils/url';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private base = apiUrl;

  constructor(private http: HttpClient) {}

  createOrder(payload: CreateOrderPayload): Observable<string> {
    return this.http.post<string>(`${this.base}/create-order`, payload);
  }

  /** Cierra la orden: backend cambia status a 'closed'. */
  closeOrder(orderId: string): Observable<string> {
    return this.http.patch<string>(`${this.base}/close-order`, { id: orderId });
  }
}

