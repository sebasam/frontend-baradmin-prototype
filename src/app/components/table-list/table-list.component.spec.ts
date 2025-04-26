import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { TableListComponent } from './table-list.component';
import { TableService } from '../../services/table.service';
import { RouterTestingModule } from '@angular/router/testing';

class MockTableService {
  getAll = jasmine.createSpy().and.returnValue(of([
    { _id: '1', number: 1, status: 'available' }
  ]));
  liberateTable = jasmine.createSpy().and.returnValue(of(null));
  reserveTable = jasmine.createSpy().and.returnValue(of(null));
}

describe('TableListComponent', () => {
  let component: TableListComponent;
  let fixture: ComponentFixture<TableListComponent>;
  let svc: MockTableService;

  beforeEach(async () => {
    svc = new MockTableService();

    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ TableListComponent ],
      providers: [
        { provide: TableService, useValue: svc }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TableListComponent);
    component = fixture.componentInstance;
  });

  it('debería cargar mesas en ngOnInit', () => {
    component.ngOnInit();
    expect(svc.getAll).toHaveBeenCalled();
    expect(component.tables.length).toBe(1);
  });

  it('debería liberar mesa y recargar', () => {
    component.tables = [{ _id: '1', number: 1, status: 'reserved' }];
    component.changeStatus(component.tables[0], 'liberate');
    expect(svc.liberateTable).toHaveBeenCalledWith('1');
  });

  it('debería reservar mesa y recargar', () => {
    component.tables = [{ _id: '2', number: 2, status: 'available' }];
    component.changeStatus(component.tables[0], 'reserve');
    expect(svc.reserveTable).toHaveBeenCalledWith('2');
  });

  it('debería manejar error al cargar', () => {
    svc.getAll.and.returnValue(throwError(() => new Error('fail')));
    spyOn(console, 'error');
    component.loadTables();
    expect(console.error).toHaveBeenCalled();
  });
});
