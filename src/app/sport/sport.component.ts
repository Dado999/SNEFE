import { Component } from '@angular/core';
import {CommentService} from '../services/comment/comment.service';
import {CommentComponent} from '../comment/comment.component';
import {NgForOf} from '@angular/common';
import {PermissionService} from '../permission/permission-service';

@Component({
  selector: 'app-sport',
  standalone: true,
  imports: [
    CommentComponent,
    NgForOf
  ],
  templateUrl: './sport.component.html',
  styleUrl: './sport.component.css'
})
export class SportComponent {
  title = 'Sport';
  comments: {id:number; username: string; timestamp: string; content: string }[] = [];
  currentPage = 0;
  totalPages = 0;
  pageSize = 20;
  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    this.commentService.getCategoryComments('SPORT', this.currentPage, this.pageSize).subscribe(response => {
      this.comments = response.comments; // Assign the transformed comments
      this.totalPages = response.totalPages; // Assign the total pages
    }, error => {
      console.error('Error fetching comments:', error);
    });
  }



  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page; // Update the current page
      this.loadComments(); // Fetch comments for the selected page
    }
  }
}
