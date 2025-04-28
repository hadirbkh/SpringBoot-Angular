import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Utilisateur } from '../models/utilisateur';
import { ROLES } from '../constants/contants';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const expectedRole = next.data['role'];

    return this.authService.loggedUser$.pipe(
      take(1),
      map((user : Utilisateur|undefined )=> {
        if (user &&   [expectedRole,ROLES.ADMIN].includes(user.role?.nom)  ) {
          return true;
        } else {
          this.router.navigate(['/']); // or redirect to a "403" page
          return false;
        }
      })
    );
  }
}
