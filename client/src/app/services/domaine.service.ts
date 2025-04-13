import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Domaine } from '../models/domaine';

@Injectable({
  providedIn: 'root'
})
export class DomaineService {

  private apiUrl = "http://localhost:8080/api/domaine";

  private domainesSubject = new BehaviorSubject<Domaine[]>([]);
  domaines$ = this.domainesSubject.asObservable(); // Expose as observable

  constructor(private httpClient: HttpClient) {
    this.loadDomaines(); // Load initial list
  }

  // Load and emit current list
  private loadDomaines() {
    this.httpClient.get<Domaine[]>(this.apiUrl)
      .subscribe(domaines => this.domainesSubject.next(domaines));
  }

  createDomaine(domaine: Domaine): Observable<Domaine> {
    return this.httpClient.post<Domaine>(this.apiUrl, domaine).pipe(
      tap(() => this.loadDomaines()) // Refresh list after creation
    );
  }

  getUserById(id: number): Observable<Domaine> {
    return this.httpClient.get<Domaine>(`${this.apiUrl}/${id}`);
  }

  updateDomaine(domaine: Domaine): Observable<Domaine> {
    return this.httpClient.put<Domaine>(`${this.apiUrl}/${domaine.id}`, domaine).pipe(
      tap(() => this.loadDomaines()) // Refresh list after update
    );
  }

  deleteDomaine(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`).pipe(
      finalize(() => this.loadDomaines()) // Will run on success or error
    );
  }

}
