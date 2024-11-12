import { Component } from '@angular/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {User} from '../models/user/user';
import {UserService} from '../services/user/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatLabel,
    MatCard,
    MatCardHeader,
    MatFormField,
    FormsModule,
    MatCardContent,
    MatInput,
    MatButton
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: User = new User();
  confirmPassword = '';

  constructor(private userService: UserService) {}

  register() {
    if (this.user.password !== this.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    this.userService.registerUser(this.user);
  }
}
