import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  product: Product = { name: '', price: 0, aviable: true, existences: 0 };
  isEdit = false;

  constructor(
    private productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.productSvc.getAll().subscribe(products => {
        const p = products.find(x => x._id === id);
        if (p) this.product = { ...p };
      });
    }
  }

  save(): void {
    const operation = this.isEdit
      ? this.productSvc.update(this.product._id!, this.product)
      : this.productSvc.create(this.product);

    operation.subscribe({
      next: () => {
        Swal.fire('Éxito', `Producto ${this.isEdit ? 'actualizado' : 'creado'}.`, 'success');
        this.router.navigate(['/products']);
      },
      error: (err: any) => Swal.fire('Error', err.message, 'error')
    });
  }
}
