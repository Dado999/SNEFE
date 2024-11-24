import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {JwtService} from './services/jwtservice/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private JwtService: JwtService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = !!localStorage.getItem('JWT');
    const twoFactorComplete = !!localStorage.getItem('2FA');
    const role = this.JwtService.getRoleFromToken(localStorage.getItem('JWT') || '');

    const requiredRole = route.data['role']; // Get the role required for this route

    if (isLoggedIn && twoFactorComplete) {
      // Check if the required role is specified and matches
      if (requiredRole && role !== requiredRole) {
        this.router.navigate(['/error']);
        return false;
      }
      return true;
    } else if (isLoggedIn && !twoFactorComplete) {
      this.router.navigate(['/authenticate']);
      return false;
    } else {
      this.router.navigate(['/error']);
      return false;
    }
  }
}

