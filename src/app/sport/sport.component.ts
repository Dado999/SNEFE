import { Component } from '@angular/core';
import {CommentService} from '../services/comment/comment.service';
import {CommentComponent} from '../comment/comment.component';
import {NgForOf, NgIf} from '@angular/common';
import {PermissionService} from '../permission/permission-service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserService} from '../services/user/user.service';

@Component({
  selector: 'app-sport',
  standalone: true,
  imports: [
    CommentComponent,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    FormsModule
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

  canAdd = false;
  newCommentContent = '';
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
    this.commentService.getCategoryComments('SPORT', this.currentPage, this.pageSize).subscribe(response => {
      this.comments = response.comments;
      this.totalPages = response.totalPages;
    }, error => {
      console.error('Error fetching comments:', error);
    });
  }
  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadComments();
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
      this.loadComments();
      this.newCommentContent = '';
    });
  }
}
