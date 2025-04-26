import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Utilisateur } from '../models/utilisateur';

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
        if (user && user.role?.nom === expectedRole) {
          return true;
        } else {
          this.router.navigate(['/']); // or redirect to a "403" page
          return false;
        }
      })
    );
  }
}
