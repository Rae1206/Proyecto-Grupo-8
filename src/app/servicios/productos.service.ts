import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../Interfaces/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl = `${environment.apiBaseUrl}/Product`; // Asegúrate de que el base URL esté correcto en tu environment

  constructor(private http: HttpClient) { }

  // Crear un nuevo producto
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/Product`, product);
  }

  // Obtener todos los productos
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/GetAllProducts`);
  }

  // Deshabilitar un producto por ID
  disableProductById(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/Delete/${id}`);
  }

  // Obtener un producto por ID
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/GetProductById/${id}`);
  }

  // Obtener productos por categoría
  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/GetProductsByCategory/${category}`);
  }

  // Obtener productos por un precio máximo
  getProductsByPriceOrLess(price: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/GetProductsByPriceOrLess/${price}`);
  }

  // Actualizar un producto por ID
  updateProductById(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/UpdateProductById/${id}`, product);
  }
}
