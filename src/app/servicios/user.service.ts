import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Asegúrate de importar HttpClient
import { Observable } from 'rxjs';
import { usuario } from '../Interfaces/usuario'; // Corrige la ruta si es necesario
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiBaseUrl}/User`; // Asegúrate de que environment.apiBaseUrl esté definido

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<usuario> {
    // Definir el cuerpo de la solicitud
    const body = {
      email: email,
      password: password
    };

    // Usar POST para enviar la solicitud
    return this.http.post<usuario>(`${this.apiUrl}/email/password`, body);
  }

  register(email: string, password: string,
           name: string, lastName: string, 
           dateOfBirth: Date, gender: string)
 {
            const body = {
              email: email,
              password: password,
              name: name,
              lastName: lastName,
              dateOfBirth: dateOfBirth,
              gender: gender
            };
    // Usar POST para enviar la solicitud
    return this.http.post<usuario>(`${this.apiUrl}`, body);
}

}
