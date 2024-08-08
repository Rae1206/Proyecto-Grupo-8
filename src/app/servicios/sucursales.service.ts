import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { sucursales } from '../Interfaces/sucursale';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SucursalesService {

  private apiUrl = `${environment.apiBaseUrl}/Branch`; // Asegúrate de que environment.apiBaseUrl esté definido

  constructor(private http: HttpClient) { }

  createSucursal(sucursales : sucursales)
  {
      const body = {
        name: sucursales.name,
        address: sucursales.address,
        creationBranch: sucursales.creationBranch,
        popularity: sucursales.popularity
      };
    // Usar POST para enviar la solicitud
    return this.http.post<sucursales>(`${this.apiUrl}/CreateBranch`, body);
  }

getAllSucursales(): Observable<sucursales[]> {
return this.http.get<sucursales[]>(`${this.apiUrl}/GetAllBranch`);
}


updateSucursal(sucursales: sucursales): Observable<sucursales> {
// Construye el cuerpo de la solicitud con el usuario a actualizar
const body = {
branchId: sucursales.branchId,
name: sucursales.name,
address: sucursales.address,
creationBranch: sucursales.creationBranch,
popularity: sucursales.popularity,
};

// Realiza la solicitud PUT a la API para actualizar el usuario
return this.http.put<sucursales>(`${this.apiUrl}/UpdateBranch/${sucursales.branchId}`, body);
}


deleteSucursal(id: number): Observable<string> {
return this.http.delete<string>(`${this.apiUrl}/DisabledBranch/${id}`, { responseType: 'text' as 'json' });
}
getBranchByName(name: string): Observable<sucursales> {
  return this.http.get<sucursales>(`${this.apiUrl}/GetBranchByName/${name}`);
}

getBranchByPopularity(popularity: number): Observable<sucursales[]> {
  return this.http.get<sucursales[]>(`${this.apiUrl}/GetBranchByPopularity/${popularity}`);
}
}
