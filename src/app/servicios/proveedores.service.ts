import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { proveedores } from '../Interfaces/proveedores';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  private apiUrl = `${environment.apiBaseUrl}/Supplier`; // Asegúrate de que environment.apiBaseUrl esté definido

  constructor(private http: HttpClient) { }

  // Crear un nuevo proveedor
  createProveedor(proveedor: proveedores): Observable<proveedores> {
    return this.http.post<proveedores>(`${this.apiUrl}/supplier`, proveedor);
  }

  // Obtener todos los proveedores
  getAllProveedores(): Observable<proveedores[]> {
    return this.http.get<proveedores[]>(`${this.apiUrl}/GetAllSuppliers`);
  }

  // Deshabilitar un proveedor por ID
  disableProveedor(id: number): Observable<proveedores> {
    return this.http.delete<proveedores>(`${this.apiUrl}/supplier/${id}`);
  }

  // Obtener proveedores habilitados hasta una fecha específica
  getEnabledProveedoresUpToDate(dateOfEntry: Date): Observable<proveedores[]> {
    return this.http.get<proveedores[]>(`${this.apiUrl}/GetEnabledSuppliersUpToDate/${dateOfEntry.toISOString().slice(0, 10)}`);
  }

  // Buscar proveedores por nombre comercial
  getProveedoresByTradeName(tradeName: string): Observable<proveedores> {
    return this.http.get<proveedores>(`${this.apiUrl}/GetSuppliersByTradeName/${tradeName}`);
  }

  // Obtener un proveedor por ID
  getProveedorById(id: number): Observable<proveedores> {
    return this.http.get<proveedores>(`${this.apiUrl}/GetSupplierById/${id}`);
  }

  // Actualizar un proveedor
  updateProveedor(id: number, proveedor: proveedores): Observable<proveedores> {
    return this.http.put<proveedores>(`${this.apiUrl}/UpdateSupplier/${id}`, proveedor);
  }
}
