import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Structure } from '../models/structure';

@Injectable({
  providedIn: 'root'
})
export class StructureService {
  private apiUrl = 'http://localhost:8080/api/structures';
  private structuresSubject = new BehaviorSubject<Structure[]>([]);
  structures$ = this.structuresSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadStructures();
  }

  private loadStructures() {
    this.http.get<Structure[]>(this.apiUrl).subscribe(structures => {
      this.structuresSubject.next(structures);
    });
  }

  getStructures(): Observable<Structure[]> {
    return this.http.get<Structure[]>(this.apiUrl);
  }

  getStructureById(id: number): Observable<Structure> {
    return this.http.get<Structure>(`${this.apiUrl}/${id}`);
  }

  createStructure(structure: Structure): Observable<Structure> {
    return this.http.post<Structure>(this.apiUrl, structure).pipe(
      tap(() => this.loadStructures())
    );
  }

  updateStructure(id: number, structure: Structure): Observable<Structure> {
    return this.http.put<Structure>(`${this.apiUrl}/${id}`, structure).pipe(
      tap(() => this.loadStructures())
    );
  }

  deleteStructure(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadStructures())
    );
  }
} 