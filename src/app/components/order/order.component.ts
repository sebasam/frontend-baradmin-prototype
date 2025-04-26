import { Component } from '@angular/core';
import { Table } from '../../interfaces/table';
import { Product } from '../../interfaces/product';
import { TableService } from '../../services/table.service';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { CreateOrderPayload } from '../../interfaces/order-product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  tables: Table[] = [];
  products: Product[] = [];
  // Payload inicial (no incluimos total)
  order: CreateOrderPayload = { table: '', products: [], tip: false };

  constructor(
    private tableSvc: TableService,
    private prodSvc: ProductService,
    private orderSvc: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.tableSvc.getAll().subscribe(t => this.tables = t);
    this.prodSvc.getAll().subscribe(p => this.products = p);
  }

  addProduct(prodId: string, qty: number) {
    this.order.products.push({ productId: prodId, quantity: qty });
  }

  save() {
    this.orderSvc.createOrder(this.order).subscribe({
      next: (res: string) => {
        if (res === '') {
          Swal.fire('¡Éxito!', 'Orden creada correctamente.', 'success');
          this.router.navigate(['/orders']);
        } else {
          Swal.fire('Error', res, 'error');
        }
      },
      error: err => {
        Swal.fire('Error', err.message, 'error');
      }
    });
  }
}
