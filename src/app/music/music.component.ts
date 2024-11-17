import { Component } from '@angular/core';
import {CommentComponent} from '../comment/comment.component';
import {NgForOf, NgIf} from '@angular/common';
import {CommentService} from '../services/comment/comment.service';
import {PermissionService} from '../permission/permission-service';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserService} from '../services/user/user.service';

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [
    CommentComponent,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './music.component.html',
  styleUrl: './music.component.css'
})
export class MusicComponent {
  title = 'Music';
  comments: {id:number; username: string; timestamp: string; content: string }[] = [];
  currentPage = 0;
  totalPages = 0;
  pageSize = 20;

  canAdd = false; // Tracks if the user can add comments
  newCommentContent = ''; // Holds the content of the new comment
  constructor(private commentService: CommentService,
              private permissionService: PermissionService,
              private userService: UserService) {}

  ngOnInit(): void {
    this.permissionService.fetchPermission().subscribe((permission) => {
      this.canAdd = permission.permission === 'ADD' || permission.permission === 'MOD';
    });
    this.loadComments();
  }

  loadComments(): void {
    this.commentService.getCategoryComments('MUSIC', this.currentPage, this.pageSize).subscribe(response => {
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



  addComment(): void {
    const newComment = {
      content: this.newCommentContent,
      date: new Date().toISOString(),
      category: this.title,
      approved: 0,
      iduser: 1
    };
    this.userService.getUser().subscribe(
      response =>{
        newComment.iduser = response.iduser
      }
    )
    this.commentService.addComment(newComment).subscribe(() => {
      // Reload comments after successful addition
      this.loadComments();
      this.newCommentContent = ''; // Clear the input
    });
  }
}
