import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../../models/user/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  registerUser(user: User){
    this.http.post('http://localhost:8080/users/register',user).subscribe(
      response => {
        alert('Successful registration, you will be notified by mail when you account is activated by the administrator of the system');
      },
      error =>
        alert('Unsuccessful registration, please check your credentials and try again!')
    );
  }

  getUser():Observable<User>{
    const token = localStorage.getItem('JWT');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>('http://localhost:8080/users/get-current-user', {headers});
  }

  getUnregisteredUsers(): Observable<User[]> {
    const token = localStorage.getItem('JWT');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User[]>('http://localhost:8080/users/get-unregistered-users', { headers });
  }
  updateUser(user: User): Observable<{ message : string}>{
    const token = localStorage.getItem('JWT');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<{message : string}>('http://localhost:8080/users/update/'+ user.iduser, user, {headers})
  }
}
