import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Participant } from '../../entities/participant';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  private apiUrl = 'http://localhost:8080/participants';

  constructor(private http: HttpClient) {}   

  getAllParticipants(): Observable<any[]> {
    return this.http.get<Participant[]>(this.apiUrl, { withCredentials: true }).pipe(
      catchError(error => {
        console.error('Erreur de récupération', error);
        return throwError(() => new Error('Erreur de chargement'));
      })
    );  }

    deleteParticipant(id: number) {
      return this.http.delete(`${this.apiUrl}/${id}`).pipe(
        catchError(error => {
          console.error('Erreur de suppression', error);
          return throwError(() => new Error('Erreur de suppression'));
        })
      );
    }

        updateParticipant(id: number, participant: Participant): Observable<Participant> {
          return this.http.put<Participant>(`${this.apiUrl}/${id}`, participant, { withCredentials: true }).pipe(
            catchError(error => {
              console.error('Erreur de mise à jour de participant', error);
              return throwError(() => new Error('Erreur de mise à jour de participant'));
            })
          );
        }
    
}
