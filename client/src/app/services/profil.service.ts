import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, forkJoin, of } from 'rxjs';
import { Profil } from '../models/profil';
import { environment } from '../../environments/environment';
import { catchError, switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  private apiUrl = `${environment.apiUrl}/api/profils`;
  private participantsUrl = `${environment.apiUrl}/participants`;
  private profilsSubject = new BehaviorSubject<Profil[]>([]);
  profils$ = this.profilsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadProfils();
  }

  loadProfils() {
    this.http.get<Profil[]>(this.apiUrl).subscribe(
      profils => {
        this.profilsSubject.next(profils);
        console.log(this.profils$);
      },
      error => {
        console.error('Error loading profils:', error);
      }
      
    );
  }

  getProfils(): Observable<Profil[]> {

    return this.http.get<Profil[]>(this.apiUrl);
    
  }

  getProfilById(id: number): Observable<Profil> {
    return this.http.get<Profil>(`${this.apiUrl}/${id}`);
  }

  createProfil(profil: Profil): Observable<Profil> {
    return this.http.post<Profil>(this.apiUrl, profil);
  }

  updateProfil(id: number, profil: Profil): Observable<Profil> {
    return this.http.put<Profil>(`${this.apiUrl}/${id}`, profil);
  }

  deleteProfil(id: number): Observable<any> {
    // First, get all participants with this profile
    return this.http.get<any[]>(`${this.participantsUrl}/by-profil/${id}`).pipe(
      switchMap(participants => {
        if (participants && participants.length > 0) {
          // Create an array of observables to update each participant
          const updateObservables = participants.map(participant => {
            // Create a copy of the participant without the profile
            const updatedParticipant = { ...participant };
            delete updatedParticipant.profil;
            
            // Update the participant to remove the profile reference
            return this.http.put(`${this.participantsUrl}/${participant.id}`, updatedParticipant);
          });
          
          // Execute all participant updates, then delete the profile
          return forkJoin(updateObservables).pipe(
            switchMap(() => this.http.delete(`${this.apiUrl}/${id}`)),
            tap(() => this.loadProfils()) // Reload profils after successful deletion
          );
        } else {
          // If no participants, just delete the profile
          return this.http.delete(`${this.apiUrl}/${id}`).pipe(
            tap(() => this.loadProfils()) // Reload profils after successful deletion
          );
        }
      }),
      catchError(error => {
        console.error('Error deleting profil:', error);
        throw error;
      })
    );
  }
} 
