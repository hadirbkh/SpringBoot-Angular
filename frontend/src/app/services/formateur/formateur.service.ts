import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Formateur } from '../../entities/formateur';

@Injectable({
  providedIn: 'root'
})
export class FormateurService {

  private apiUrl = 'http://localhost:8080/formateur';

  constructor(private http: HttpClient) {}   

  getAllFormateurs(): Observable<any[]> {
    return this.http.get<Formateur[]>(this.apiUrl, { withCredentials: true }).pipe(
      catchError(error => {
        console.error('Erreur de récupération', error);
        return throwError(() => new Error('Erreur de chargement'));
      })
    );  }

    deleteFormateur(id: number) {
      return this.http.delete(`${this.apiUrl}/${id}`).pipe(
        catchError(error => {
          console.error('Erreur de suppression', error);
          return throwError(() => new Error('Erreur de suppression'));
        })
      );
    }
    addFormateur(formateur: Formateur): Observable<Formateur> {
      return this.http.post<Formateur>(this.apiUrl, formateur, { withCredentials: true }).pipe(
        catchError(error => {
          console.error('Erreur d\'ajout de formateur', error);
          return throwError(() => new Error('Erreur d\'ajout de formateur'));
        })
      );
    }
   
    updateFormateur(id: number, formateur: Formateur): Observable<Formateur> {
      return this.http.put<Formateur>(`${this.apiUrl}/${id}`, formateur, { withCredentials: true }).pipe(
        catchError(error => {
          console.error('Erreur de mise à jour de formateur', error);
          return throwError(() => new Error('Erreur de mise à jour de formateur'));
        })
      );
    }
    
    
}
