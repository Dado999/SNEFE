import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {JwtService} from './services/jwtservice/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private JwtService: JwtService) {}

  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('JWT'); // Check if JWT exists
    const twoFactorComplete = !!localStorage.getItem('2FA'); // Check if 2FA is complete
    const role = this.JwtService.getRoleFromToken(localStorage.getItem('JWT') || '');
    if ((isLoggedIn && twoFactorComplete) || (role && (role == 'ADMIN' || role == 'MODERATOR'))) {
      return true; // User is authenticated and completed 2FA
    } else if (isLoggedIn && !twoFactorComplete) {
      this.router.navigate(['/authenticate']); // Redirect to 2FA page if 2FA is not completed
      return false;
    } else {
      this.router.navigate(['error']); // Redirect to login if not logged in
      return false;
    }
  }
}
