import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginDTO} from '../../models/loginDTO/login-dto';
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
              private router: Router) { }

   login(loginInfo : LoginDTO){
    this.http.post<any>('http://localhost:8080/auth/login',loginInfo).subscribe(
      response => {
          console.log(response.jwtToken);
          localStorage.setItem('JWT',response.jwtToken)
          this.router.navigate(['authenticate']);
      },
      error => {
        this.router.navigate(['error']);
      }
    )
  }
  twoFactor(): Observable<number>{
    const token = localStorage.getItem('JWT');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<number>('http://localhost:8080/auth/2fa', {}, { headers });
  }
}
