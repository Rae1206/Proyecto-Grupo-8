import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { evento } from '../Interfaces/evento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  private apiUrl = `${environment.apiBaseUrl}/Event`; // Asegúrate de que environment.apiBaseUrl esté definido

  constructor(private http: HttpClient) { }

  createSponsor(evento : evento)
  {
      const body = {
        eventName: evento.eventName,
        description: evento.description,
        startDate: evento.startDate,
        endDate: evento.endDate,
        localization:evento.localization
      };
    // Usar POST para enviar la solicitud
    return this.http.post<evento>(`${this.apiUrl}/CreateEvent`, body);
  }

getAllSponsor(): Observable<evento[]> {
return this.http.get<evento[]>(`${this.apiUrl}/GetAllEvent`);
}


updateSponsor(evento: evento): Observable<evento> {
// Construye el cuerpo de la solicitud con el usuario a actualizar
const body = {
eventId: evento.eventId,
eventName: evento.eventName,
description: evento.description,
startDate: evento.startDate,
endDate: evento.endDate,
localization: evento.localization
};

// Realiza la solicitud PUT a la API para actualizar el sponsor
return this.http.put<evento>(`${this.apiUrl}/UpdateEvent`, body);
}


deleteSponsor(id: number): Observable<string> {
return this.http.delete<string>(`${this.apiUrl}/DisabledEventById/${id}`, { responseType: 'text' as 'json' });
}
getSponsorByName(name: string): Observable<evento> {
  return this.http.get<evento>(`${this.apiUrl}/GetEventByName/${name}`);
}

getSponsorByCreation(endDate: Date): Observable<evento[]> {
  return this.http.get<evento[]>(`${this.apiUrl}/GetEventByDate/${endDate}`);
}
}
