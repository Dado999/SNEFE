import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  categories = [
    { name: 'Science', description: 'Explore the latest in science discussions', path: '../science' },
    { name: 'Culture', description: 'Dive into cultural conversations', path: '../culture' },
    { name: 'Sport', description: 'Talk about sports from around the world', path: '../sport' },
    { name: 'Music', description: 'Discuss all things music', path: '../music' }
  ];

  constructor(private router: Router ) {
  }
  logout() {
    localStorage.removeItem('JWT');
    localStorage.removeItem('2FA');
    this.router.navigate(['']);
  }
}
