import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { TableFormComponent } from './table-form.component';
import { TableService } from '../../services/table.service';

class MockRouter { navigate = jasmine.createSpy(); }
class MockTableService {
  createTable = jasmine.createSpy().and.returnValue(of({ _id: '1', number: 1, status: 'available' }));
  reserveTable = jasmine.createSpy().and.returnValue(of({}));
  getAll = jasmine.createSpy().and.returnValue(of([]));
}

describe('TableFormComponent', () => {
  let component: TableFormComponent;
  let fixture: ComponentFixture<TableFormComponent>;
  let svc: MockTableService;
  let router: MockRouter;

  beforeEach(async () => {
    svc = new MockTableService();
    router = new MockRouter();

    await TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ TableFormComponent ],
      providers: [
        { provide: TableService, useValue: svc },
        { provide: Router, useValue: router },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => null } } }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TableFormComponent);
    component = fixture.componentInstance;
  });

  it('debería crear mesa y navegar', () => {
    component.isEdit = false;
    component.table = { number: 5, status: 'available' };
    component.save();
    expect(svc.createTable).toHaveBeenCalledWith(component.table);
    expect(router.navigate).toHaveBeenCalledWith(['/tables']);
  });

  it('debería reservar mesa en modo edición', () => {
    component.isEdit = true;
    component.table = { _id: '2', number: 2, status: 'available' };
    component.save();
    expect(svc.reserveTable).toHaveBeenCalledWith('2');
    expect(router.navigate).toHaveBeenCalledWith(['/tables']);
  });
});
