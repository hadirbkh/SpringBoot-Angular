import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Profil } from '../models/profil';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  private apiUrl = `${environment.apiUrl}/api/profils`;
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
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
} 