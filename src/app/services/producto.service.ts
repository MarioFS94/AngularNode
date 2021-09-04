import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url: string = "http://localhost:4000/api/productos/";

  constructor(private http: HttpClient) { }

  getProductos() : Observable<any> {
    return this.http.get(this.url);
  }
  deleteProduct(id: any): Observable<any> {
    return this.http.delete(this.url + id);
  }
  addProduct(product: Product): Observable<any> {
    return this.http.post(this.url, product);
  }
  getProducto(id: string) : Observable<any> {
    return this.http.get(this.url + id);
  }
  editProduct(id: string, product: Product) : Observable<any> {
    return this.http.put(this.url + id, product);
  }
}
