import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { categoria } from '../Interfaces/categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl = `${environment.apiBaseUrl}/Category`; // Asegúrate de que environment.apiBaseUrl esté definido

  constructor(private http: HttpClient) { }

  createCategory(categoria : categoria)
  {
      const body = {
        name: categoria.name,
        description: categoria.description,
      };
    // Usar POST para enviar la solicitud
    return this.http.post<categoria>(`${this.apiUrl}/CreateCategory`, body);
  }

getAllCategories(): Observable<categoria[]> {
return this.http.get<categoria[]>(`${this.apiUrl}/GetAllCategories`);
}


updateCategory(id: number, category: categoria): Observable<categoria> {
// Construye el cuerpo de la solicitud con el usuario a actualizar
const body = {
categoryId: category.categoryId,
name: category.name,
description: category.description
};

// Realiza la solicitud PUT a la API para actualizar el usuario
return this.http.put<categoria>(`${this.apiUrl}/UpdateCategory`, body);
}


deleteCategory(id: number): Observable<string> {
return this.http.delete<string>(`${this.apiUrl}/DeleteCategory/${id}`, { responseType: 'text' as 'json' });
}

getCategoriesByName(name: string): Observable<categoria[]> {
  return this.http.get<categoria[]>(`${this.apiUrl}/GetCategoriesByName/${name}`);
}

getCategoriesByDescription(description: string): Observable<categoria[]> {
  return this.http.get<categoria[]>(`${this.apiUrl}/GetCategoriesByDescription/${description}`);
}

}
