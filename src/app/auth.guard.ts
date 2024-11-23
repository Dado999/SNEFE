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
    const isLoggedIn = !!localStorage.getItem('JWT');
    const twoFactorComplete = !!localStorage.getItem('2FA');
    const role = this.JwtService.getRoleFromToken(localStorage.getItem('JWT') || '');
    if ((isLoggedIn && twoFactorComplete) || (role && (role == 'ADMIN' || role == 'MODERATOR'))) {
      return true;
    } else if (isLoggedIn && !twoFactorComplete) {
      this.router.navigate(['/authenticate']);
      return false;
    } else {
      this.router.navigate(['error']);
      return false;
    }
  }
}
