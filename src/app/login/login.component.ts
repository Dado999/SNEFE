import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {LoginService} from '../services/login/login.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, MatCardContent, MatError, MatLabel, MatFormField, FormsModule, NgIf, MatCardHeader, MatCard, MatButton, MatInput],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  user: string = '';
  password: string = '';
  loginValid: boolean = true;
  year: number = new Date().getFullYear();

  constructor(private loginService: LoginService) {}

  login(): void {
     let loginDTO = {
      username: this.user,
      password: this.password
    };
    this.loginService.login(loginDTO);
  }
}
