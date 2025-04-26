import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: Product[] = [];

  constructor(
    private productSvc: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productSvc.getAll().subscribe({
      next: data => this.products = data,
      error: err => Swal.fire('Error', err.message, 'error')
    });
  }

  deleteProduct(id: string): void {
    Swal.fire({
      title: '¿Eliminar producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar'
    }).then(result => {
      if (result.isConfirmed) {
        this.productSvc.delete(id).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'Producto borrado.', 'success');
            this.loadProducts();
          },
          error: err => Swal.fire('Error', err.message, 'error')
        });
      }
    });
  }

  goToForm(id?: string): void {
    if (id) {
      this.router.navigate(['/products/edit', id]);
    } else {
      this.router.navigate(['/products/new']);
    }
  }
}
