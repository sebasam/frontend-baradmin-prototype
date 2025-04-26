import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TableService } from './table.service';
import { Table } from '../interfaces/table';

describe('TableService', () => {
  let service: TableService;
  let httpMock: HttpTestingController;
  let base: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TableService]
    });
    service = TestBed.inject(TableService);
    httpMock = TestBed.inject(HttpTestingController);
    base = (service as any).base;
  });

  afterEach(() => httpMock.verify());

  it('debería crear una mesa (POST)', () => {
    const table: Table = { number: 5, status: 'available' };
    service.createTable(table).subscribe(res => {
      expect(res).toEqual({ ...table, _id: '1' });
    });
    const req = httpMock.expectOne(`${base}/create-table`);
    expect(req.request.method).toBe('POST');
    req.flush({ ...table, _id: '1' });
  });

  it('debería liberar una mesa (PATCH)', () => {
    service.liberateTable('1').subscribe(res => {
      expect(res).toEqual({ _id: '1', number: 5, status: 'available' });
    });
    const req = httpMock.expectOne(`${base}/liberate-table/1`);
    expect(req.request.method).toBe('PATCH');
    req.flush({ _id: '1', number: 5, status: 'available' });
  });

  it('debería reservar una mesa (PATCH)', () => {
    service.reserveTable('2').subscribe(res => {
      expect(res).toEqual({ _id: '2', number: 3, status: 'reserved' });
    });
    const req = httpMock.expectOne(`${base}/reserved-table/2`);
    expect(req.request.method).toBe('PATCH');
    req.flush({ _id: '2', number: 3, status: 'reserved' });
  });

  it('debería recuperar todas las mesas (GET)', () => {
    const mock: Table[] = [
      { _id: '1', number: 1, status: 'available' }
    ];
    service.getAll().subscribe(tables => {
      expect(tables).toEqual(mock);
    });
    const req = httpMock.expectOne(`${base}/tables`);
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });
});
