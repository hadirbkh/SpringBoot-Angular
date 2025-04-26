import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Participant } from '../models/participant';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  private apiUrl = `${environment.apiUrl}/participants`;
  private participantsSubject = new BehaviorSubject<Participant[]>([]);
  participants$ = this.participantsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadParticipants();
  }

  loadParticipants() {
    this.http.get<Participant[]>(this.apiUrl).subscribe(
      participants => {
        this.participantsSubject.next(participants);
      },
      error => {
        console.error('Error loading participants:', error);
      }
    );
  }

  getParticipants(): Observable<Participant[]> {
    
    return this.http.get<Participant[]>(this.apiUrl);
  }

  getParticipantById(id: number): Observable<Participant> {
    return this.http.get<Participant>(`${this.apiUrl}/${id}`);
  }

  createParticipant(participant: Participant): Observable<Participant> {
    console.log(participant);
    return this.http.post<Participant>(this.apiUrl, participant);
  }

  updateParticipant(id: number, participant: Participant): Observable<Participant> {
    return this.http.put<Participant>(`${this.apiUrl}/${id}`, participant);
  }

  deleteParticipant(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  inscrireParticipantAuxFormations(participantId: number, formationIds: number[]): Observable<Participant> {
    return this.http.post<Participant>(`${this.apiUrl}/${participantId}/inscription`, formationIds);
  }
} 