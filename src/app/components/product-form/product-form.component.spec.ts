import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ProductFormComponent } from './product-form.component';
import { ProductService } from '../../services/product.service';

class MockRouter { navigate = jasmine.createSpy(); }
class MockProductService {
  create = jasmine.createSpy().and.returnValue(of({ _id: '1' }));
  update = jasmine.createSpy().and.returnValue(of({}));
  getAll = jasmine.createSpy().and.returnValue(of([]));
}

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let svc: MockProductService;
  let router: MockRouter;

  beforeEach(async () => {
    svc = new MockProductService();
    router = new MockRouter();

    await TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ ProductFormComponent ],
      providers: [
        { provide: ProductService, useValue: svc },
        { provide: Router, useValue: router },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => null } } }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
  });

  it('debería crear un producto y navegar', () => {
    component.isEdit = false;
    component.product = { name: 'X', price: 1, aviable: true, existences: 1 };
    component.save();
    expect(svc.create).toHaveBeenCalledWith(component.product);
    expect(router.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('debería actualizar un producto y navegar', () => {
    component.isEdit = true;
    component.product = { _id: '1', name: '', price: 0, aviable: true, existences: 0 };
    component.save();
    expect(svc.update).toHaveBeenCalledWith('1', component.product);
    expect(router.navigate).toHaveBeenCalledWith(['/products']);
  });
});
