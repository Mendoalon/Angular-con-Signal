import { Injectable, computed, inject, signal } from '@angular/core';
import { Products } from '../interfaces/product.interface';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = signal<Products[]>([]);
  private productService = inject(ProductService)

  totalItems = computed(() => this.cart().length);

  amount = computed(() => {

    return this.cart().reduce((prev: number, curr: Products) => {
      return prev + curr.price;
    }, 0);

  });

  addProduct(product: Products): void {
    this.cart.update(products => [...products, product]);

    this.productService.productos()?.forEach((p) => {
      if (p.id === p.id) {
        p.rating.count = p.rating.count - 1;
      }
    })
    
  }

  removeProduct(index: number): void {

    this.cart.mutate(prodcts => {
      const product = prodcts.splice(index, 1);
      this.productService.productos()?.forEach(p => {
        if (p.id === product[0].id) {
          p.rating.count = p.rating.count + 1;
        }
      })
    })

  }

}
