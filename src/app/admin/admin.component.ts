import { Component } from '@angular/core';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatCard, MatCardContent, MatCardHeader, MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user/user';
import {UserService} from '../services/user/user.service';
import {NgForOf} from '@angular/common';
import {mergeScan} from 'rxjs';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    MatFormField,
    MatCardHeader,
    MatCard,
    MatCardContent,
    FormsModule,
    MatInput,
    MatButton,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    NgForOf
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  unregisteredUsers: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUnregisteredUsers();
  }

  getUnregisteredUsers(): void {
    this.userService.getUnregisteredUsers().subscribe(r =>
    this.unregisteredUsers = r)
  }

  updateUser(user: User): void {
    this.userService.updateUser(user).subscribe(r =>
      alert(r.message)
    );
  }
}
