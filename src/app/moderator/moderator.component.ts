import { Component } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {CommentService} from '../services/comment/comment.service';

@Component({
  selector: 'app-moderator',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './moderator.component.html',
  styleUrl: './moderator.component.css'
})
export class ModeratorComponent {
  unapprovedComments: { id: number; username: string; timestamp: string; content: string; approved: number }[] = [];

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.fetchUnapprovedComments();
  }

  fetchUnapprovedComments(): void {
    this.commentService.getUnapprovedComments().subscribe({
      next: (response) => {
        this.unapprovedComments = response; // This will now correctly assign the comments
      },
      error: (err) => {
        console.error('Error fetching unapproved comments:', err);
      }
    });
  }
  approveComment(commentId: number): void {
    this.commentService.approveComment(commentId).subscribe(r => {
      location.reload();
    });
  }
}
