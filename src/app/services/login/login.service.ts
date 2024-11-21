import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginDTO} from '../../models/loginDTO/login-dto';
import { Router} from '@angular/router';
import {JwtService} from '../jwtservice/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
              private router: Router,
              private jwtService: JwtService,) { }

   login(loginInfo : LoginDTO){
    // this.http.post<any>('http://localhost:8080/auth/login',loginInfo).subscribe(
    //   response => {
    //       console.log(response.jwtToken);
    //       localStorage.setItem('JWT',response.jwtToken)
    //       this.router.navigate(['authenticate']);
    //   },
    //   error => {
    //     this.router.navigate(['error']);
    //   }
    // )

     this.http
       .post<any>('http://localhost:8080/auth/login',loginInfo).subscribe(
         (response) => {
           const token = response.jwtToken;
           localStorage.setItem('JWT', token);

           const role = this.jwtService.getRoleFromToken(token);
           console.log(role)
           if (role == 'ADMIN') {
             this.router.navigate(['/admin'])
            // localStorage.setItem('2FA','true')
           }
           else if(role == 'MODERATOR')
             this.router.navigate(['/moderator'])
           else {
             this.router.navigate(['/authenticate']);
           }
         },
         (error) => {
           console.error('Login failed:', error);
         }
       );
  }
  twoFactor(): Observable<number>{
    const token = localStorage.getItem('JWT');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<number>('http://localhost:8080/auth/2fa', {}, { headers });
  }
}
