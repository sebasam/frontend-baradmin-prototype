import { Component } from '@angular/core';
import { Table } from '../../interfaces/table';
import { TableService } from '../../services/table.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-form',
  standalone: true,
  imports: [],
  templateUrl: './table-form.component.html',
  styleUrl: './table-form.component.css'
})
export class TableFormComponent {
  table: Table = { number: 1, status: 'available' };
  isEdit = false;

  constructor(
    private tableSvc: TableService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.tableSvc.getAll().subscribe(tables => {
        const t = tables.find(x => x._id === id);
        if (t) this.table = { ...t };
      });
    }
  }

  save(): void {
    const op = this.isEdit
      ? this.tableSvc.reserveTable(this.table._id!)
      : this.tableSvc.createTable(this.table);

    op.subscribe({
      next: () => {
        Swal.fire('Éxito', `Mesa ${this.isEdit ? 'actualizada' : 'creada'}.`, 'success');
        this.router.navigate(['/tables']);
      },
      error: err => Swal.fire('Error', err.message, 'error')
    });
  }
}
