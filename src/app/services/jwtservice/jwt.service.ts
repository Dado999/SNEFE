import { jwtDecode } from "jwt-decode";


import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor() {}

  decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }


  getRoleFromToken(token: string | null): string | null {
    if (!token) {
      return null;
    }
    const decodedToken = this.decodeToken(token);
    return decodedToken ? decodedToken.role : null;
  }

}
