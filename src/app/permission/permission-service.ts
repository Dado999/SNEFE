import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  constructor(private http: HttpClient) {}
  fetchPermission(): Observable<{ permission: string }> {
    const token = localStorage.getItem('JWT');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<{ permission: string }>('http://localhost:8080/users/get-permission', {headers})
  }
}
