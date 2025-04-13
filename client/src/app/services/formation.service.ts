import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Formation } from '../models/formation';
import { Observable, BehaviorSubject } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  private apiUrl = "http://localhost:8080/api/formation";

  private formationsSubject = new BehaviorSubject<Formation[]>([]);
  formations$ = this.formationsSubject.asObservable(); // Expose as observable

  constructor(private httpClient: HttpClient) {
    this.loadUsers(); // Load initial list
  }

  // Load and emit current list
  private loadUsers() {
    this.httpClient.get<Formation[]>(this.apiUrl)
      .subscribe(users => this.formationsSubject.next(users));
  }

  createUser(formation: Formation): Observable<Formation> {
    return this.httpClient.post<Formation>(this.apiUrl, formation).pipe(
      tap(() => this.loadUsers()) // Refresh list after creation
    );
  }

  getUserById(id: number): Observable<Formation> {
    return this.httpClient.get<Formation>(`${this.apiUrl}/${id}`);
  }

  updateUser(formation: Formation): Observable<Formation> {
    return this.httpClient.put<Formation>(`${this.apiUrl}/${formation.id}`, formation).pipe(
      tap(() => this.loadUsers()) // Refresh list after update
    );
  }

  deleteFormation(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`).pipe(
      finalize(() => this.loadUsers()) // Will run on success or error
    );
  }

}
