import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product.service';
import { RouterTestingModule } from '@angular/router/testing';
import Swal from 'sweetalert2';

class MockProductService {
  getAll = jasmine.createSpy().and.returnValue(of([
    { _id: '1', name: 'Cerveza', price: 5, aviable: true, existences: 10 }
  ]));
  delete = jasmine.createSpy().and.returnValue(of(null));
}

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let svc: MockProductService;

  beforeEach(async () => {
    svc = new MockProductService();

    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ ProductListComponent ],
      providers: [
        { provide: ProductService, useValue: svc }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('debería cargar productos en ngOnInit', () => {
    component.ngOnInit();
    expect(svc.getAll).toHaveBeenCalled();
    expect(component.products.length).toBe(1);
  });

  it('debería eliminar un producto y recargar', () => {
    spyOn(Swal, 'fire');
    component.products = [{ _id: '1', name: '', price: 0, aviable: true, existences: 0 }];
    // Simula confirmación
    spyOn(window, 'confirm').and.returnValue(true);
    component.deleteProduct('1');
    expect(svc.delete).toHaveBeenCalledWith('1');
  });

  it('debería manejar error al cargar', () => {
    svc.getAll.and.returnValue(throwError(() => new Error('fail')));
    spyOn(Swal, 'fire');
    component.loadProducts();
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'fail', 'error');
  });
});
