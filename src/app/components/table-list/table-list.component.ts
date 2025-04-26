import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Table } from '../../interfaces/table';
import { TableService } from '../../services/table.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-list',
  standalone: true,
  imports: [],
  templateUrl: './table-list.component.html',
  styleUrl: './table-list.component.css'
})
export class TableListComponent {
  tables: Table[] = [];

  constructor(
    private tableSvc: TableService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTables();
  }

  loadTables(): void {
    this.tableSvc.getAll().subscribe({
      next: (data: any) => this.tables = data,
      error: (err: any) => Swal.fire('Error', err.message, 'error')
    });
  }

  changeStatus(table: Table, action: 'liberate' | 'reserve'): void {
    const fn = action === 'liberate'
      ? this.tableSvc.liberateTable(table._id!)
      : this.tableSvc.reserveTable(table._id!);

    fn.subscribe({
      next: () => {
        Swal.fire('¡Hecho!', `Mesa ${action === 'liberate' ? 'liberada' : 'reservada'}.`, 'success');
        this.loadTables();
      },
      error: (err: any) => Swal.fire('Error', err.message, 'error')
    });
  }

  goToForm(id?: string): void {
    this.router.navigate(['/tables', id ? 'edit' : 'new', id || '']);
  }
}
