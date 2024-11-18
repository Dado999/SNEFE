import { jwtDecode } from "jwt-decode";


import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor() {}

  // Decode the JWT token
  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  // Get the role from the decoded token
  getRoleFromToken(token: string | null): string | null {
    if (!token) {
      return null; // Return null if token is not provided
    }
    const decodedToken = this.decodeToken(token);
    return decodedToken ? decodedToken.role : null;
  }

}
