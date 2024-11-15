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
}
