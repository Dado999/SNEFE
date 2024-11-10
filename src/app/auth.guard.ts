import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('JWT'); // Check if JWT exists
    const twoFactorComplete = !!localStorage.getItem('2FA'); // Check if 2FA is complete

    if (isLoggedIn && twoFactorComplete) {
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
