import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Role } from '../models/roles';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private apiUrl = "http://localhost:8080/api/role";

  private rolesSubject = new BehaviorSubject<Role[]>([]);
  roles$ = this.rolesSubject.asObservable(); // Expose as observable

  constructor(private httpClient: HttpClient) {
    this.loadRoles(); // Load initial list
  }

  // Load and emit current list
  private loadRoles() {
    this.httpClient.get<Role[]>(this.apiUrl)
      .subscribe(roles => this.rolesSubject.next(roles));
  }

}
