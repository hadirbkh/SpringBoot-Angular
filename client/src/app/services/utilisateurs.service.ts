import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utilisateur } from '../models/utilisateur';
import { Observable, BehaviorSubject } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilisateursService {

  private apiUrl = "http://localhost:8080/api/utilisateur";

  private utilisateursSubject = new BehaviorSubject<Utilisateur[]>([]);
  utilisateurs$ = this.utilisateursSubject.asObservable(); // Expose as observable

  constructor(private httpClient: HttpClient) {
    this.loadUsers(); // Load initial list
  }

  // Load and emit current list
  private loadUsers() {
    this.httpClient.get<Utilisateur[]>(this.apiUrl)
      .subscribe(users => this.utilisateursSubject.next(users));
  }

  createUser(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.httpClient.post<Utilisateur>(this.apiUrl, utilisateur).pipe(
      tap(() => this.loadUsers()) // Refresh list after creation
    );
  }

  getUserById(id: number): Observable<Utilisateur> {
    return this.httpClient.get<Utilisateur>(`${this.apiUrl}/${id}`);
  }

  updateUser(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.httpClient.put<Utilisateur>(`${this.apiUrl}/${utilisateur.id}`, utilisateur).pipe(
      tap(() => this.loadUsers()) // Refresh list after update
    );
  }

  deleteUtilisateur(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`).pipe(
      finalize(() => this.loadUsers()) // Will run on success or error
    );
  }
  
}
