import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private apiUrl = `${environment.apiUrl}/api/stats`;

  constructor(private http: HttpClient) { }

  getStatsByDomain(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.apiUrl}/domaines`);
  }

  getParticipationRates(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/participation`);
  }

  getStructureDashboard(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.apiUrl}/structures`);
  }

  getAverageParticipationRate(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/average-participation`);
  }

  getFormationsNearCapacity(threshold: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/near-capacity?threshold=${threshold}`);
  }

  getDurationStatistics(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/duration-stats`);
  }
} 