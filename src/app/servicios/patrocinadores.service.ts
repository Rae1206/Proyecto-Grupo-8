import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { patrocinadores } from '../Interfaces/patrocinadores';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatrocinadoresService {

  private apiUrl = `${environment.apiBaseUrl}/Sponsor`; // Asegúrate de que environment.apiBaseUrl esté definido

  constructor(private http: HttpClient) { }

  createSponsor(patrocinadores : patrocinadores)
  {
      const body = {
        sponsorName: patrocinadores.sponsorName,
        creationSponsor: patrocinadores.creationSponsor,
        webSiteUrl: patrocinadores.websiteUrl,
        contactEmail: patrocinadores.contactEmail
      };
    // Usar POST para enviar la solicitud
    return this.http.post<patrocinadores>(`${this.apiUrl}/CreateSponsor`, body);
  }

getAllSponsor(): Observable<patrocinadores[]> {
return this.http.get<patrocinadores[]>(`${this.apiUrl}/GetAllSponsor`);
}


updateSponsor(patrocinadores: patrocinadores): Observable<patrocinadores> {
// Construye el cuerpo de la solicitud con el usuario a actualizar
const body = {
sponsorId: patrocinadores.sponsorId,
sponsorName: patrocinadores.sponsorName,
webSiteUrl: patrocinadores.websiteUrl,
contactEmail: patrocinadores.contactEmail,
};

// Realiza la solicitud PUT a la API para actualizar el sponsor
return this.http.put<patrocinadores>(`${this.apiUrl}/UpdateSponsor`, body);
}


deleteSponsor(id: number): Observable<string> {
return this.http.delete<string>(`${this.apiUrl}/DisabledSponsorById/${id}`, { responseType: 'text' as 'json' });
}
getSponsorByName(name: string): Observable<patrocinadores> {
  return this.http.get<patrocinadores>(`${this.apiUrl}/GetBranchByName/${name}`);
}

getSponsorByCreation(creationSponsor: Date): Observable<patrocinadores[]> {
  return this.http.get<patrocinadores[]>(`${this.apiUrl}/GetSponsorByCreationTime/${creationSponsor}`);
}
}
