import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utilisateur } from '../models/utilisateur';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilisateursService {

  private apiUrl="http://localhost:8080/api/utilisateur";
  constructor(private httpClient: HttpClient) { }

  createUser(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.httpClient.post<Utilisateur>(this.apiUrl, utilisateur);
  }

  getUsers(): Observable<Utilisateur[]> {
    return this.httpClient.get<Utilisateur[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<Utilisateur> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<Utilisateur>(url);
  }

  updateUser(utilisateur: Utilisateur): Observable<Utilisateur> {
    const url = `${this.apiUrl}/${utilisateur.id}`;
    return this.httpClient.put<Utilisateur>(url, utilisateur);
  }


  deleteUtilisateur(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<void>(url);
  }
}
