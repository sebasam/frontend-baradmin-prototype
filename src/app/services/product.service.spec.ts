import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../interfaces/product';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  let base: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
    base = (service as any).base;
  });

  afterEach(() => httpMock.verify());

  it('debería recuperar todos los productos (GET)', () => {
    const mockProducts: Product[] = [
      { _id: '1', name: 'Cerveza', price: 5, aviable: true, existences: 10 },
      { _id: '2', name: 'Refresco', price: 2, aviable: true, existences: 20 }
    ];

    service.getAll().subscribe(products => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(`${base}/products`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('debería crear un producto (POST)', () => {
    const newProduct: Product = { name: 'Café', price: 3, aviable: true, existences: 15 };

    service.create(newProduct).subscribe(product => {
      expect(product).toEqual({ ...newProduct, _id: '3' });
    });

    const req = httpMock.expectOne(`${base}/create-product`);
    expect(req.request.method).toBe('POST');
    req.flush({ ...newProduct, _id: '3' });
  });

  it('debería actualizar un producto (PATCH)', () => {
    const updated: Product = { _id: '1', name: 'Cerveza Roja', price: 6, aviable: true, existences: 8 };

    service.update('1', updated).subscribe(prod => {
      expect(prod).toEqual(updated);
    });

    const req = httpMock.expectOne(`${base}/products/1`);
    expect(req.request.method).toBe('PATCH');
    req.flush(updated);
  });

  it('debería eliminar un producto (DELETE)', () => {
    service.delete('1').subscribe(response => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(`${base}/products/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
