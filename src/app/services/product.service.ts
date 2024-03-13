import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environments';
import { toSignal } from '@angular/core/rxjs-interop';
import { Products } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly baseUrl = environment.baseUrl;
  private http = inject(HttpClient);

  productos = toSignal<Products[]>(this.http.get<Products[]>(`${this.baseUrl}products`))


}
