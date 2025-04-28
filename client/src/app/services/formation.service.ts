import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Formation } from '../models/formation';
import { Observable, BehaviorSubject } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private apiUrl = `${environment.apiUrl}/api/formation`;

  private formationsSubject = new BehaviorSubject<Formation[]>([]);
  formations$ = this.formationsSubject.asObservable(); // Expose as observable

  constructor(private httpClient: HttpClient) {
    this.loadFormations(); // Load initial list
  }

  // Load and emit current list
  private loadFormations() {
    this.httpClient.get<Formation[]>(this.apiUrl)
      .subscribe(
        formations => {
          this.formationsSubject.next(formations);
        },
        error => {
          console.error('Error loading formations:', error);
        }
      );
  }

  getFormations(): Observable<Formation[]> {
    return this.httpClient.get<Formation[]>(this.apiUrl);
  }

  getFormationById(id: number): Observable<Formation> {
    return this.httpClient.get<Formation>(`${this.apiUrl}/${id}`);
  }

  createFormation(formation: Formation): Observable<Formation> {
    return this.httpClient.post<Formation>(this.apiUrl, formation);
  }

  updateFormation(formation: Formation): Observable<Formation> {
    return this.httpClient.put<Formation>(`${this.apiUrl}/${formation.id}`, formation);
  }

  deleteFormation(id: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/${id}`);
  }

}