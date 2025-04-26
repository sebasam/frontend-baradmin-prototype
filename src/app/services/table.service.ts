// src/app/core/services/table.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Table } from '../interfaces/table';
import { apiUrl } from '../utils/url';

@Injectable({ providedIn: 'root' })
export class TableService {
  private base = apiUrl;

  constructor(private http: HttpClient) {}

  createTable(table: Table): Observable<Table> {
    return this.http.post<Table>(`${this.base}/create-table`, table);
  }

  liberateTable(id: string): Observable<Table> {
    return this.http.patch<Table>(`${this.base}/liberate-table/${id}`, {});
  }

  reserveTable(id: string): Observable<Table> {
    return this.http.patch<Table>(`${this.base}/reserved-table/${id}`, {});
  }

  getAll(): Observable<Table[]> {
    return this.http.get<Table[]>(`${this.base}/tables`);
  }
}
