import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Structure } from '../models/structure';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StructureService {
  private apiUrl = `${environment.apiUrl}/api/structures`;
  private structuresSubject = new BehaviorSubject<Structure[]>([]);
  structures$ = this.structuresSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadStructures();
  }

  loadStructures() {
    this.http.get<Structure[]>(this.apiUrl).subscribe(
      structures => {
        this.structuresSubject.next(structures);
      },
      error => {
        console.error('Error loading structures:', error);
      }
    );
  }

  getStructures(): Observable<Structure[]> {
    return this.http.get<Structure[]>(this.apiUrl);
  }

  getStructureById(id: number): Observable<Structure> {
    return this.http.get<Structure>(`${this.apiUrl}/${id}`);
  }

  createStructure(structure: Structure): Observable<Structure> {
    return this.http.post<Structure>(this.apiUrl, structure);
  }

  updateStructure(id: number, structure: Structure): Observable<Structure> {
    return this.http.put<Structure>(`${this.apiUrl}/${id}`, structure);
  }

  deleteStructure(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
} 