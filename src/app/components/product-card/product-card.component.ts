import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Products } from 'src/app/interfaces/product.interface';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Products;

  cartService = inject(CartService);


  addProduct(product: Products): void {
    this.cartService.addProduct(product);
  }

}

