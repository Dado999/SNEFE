import {Component, Input} from '@angular/core';
import {PermissionService} from '../permission/permission-service';
import {CommentService} from '../services/comment/comment.service';
import {HttpHeaders} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {catchError, of} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  @Input() id: number = 0;
  @Input() username: string = '';
  @Input() timestamp: string = '';
  @Input() content: string = '';

  canAdd = false;
  canEdit = false;
  canDelete = false;

  editing = false;
  editedContent: string = '';

  constructor(
    protected permissionService: PermissionService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.permissionService.fetchPermission().subscribe((permission) => {
      if (permission) {
        if (permission.permission === 'ADD') this.canAdd = true;
        else if (permission.permission === 'MODIFY') this.canEdit = true;
        else if(permission.permission === 'DELETE') this.canDelete = true;
        else if(permission.permission === 'MOD') {
          this.canDelete = true;
          this.canEdit = true;
          this.canAdd = true;
        }
      }
    });
  }


  editComment() {
    if (this.canEdit) {
      this.editing = true;
      this.editedContent = this.content;
    }
  }

  saveEdit() {
    const updatedComment = {
      id: this.id,
      content: this.editedContent,
    };

    this.commentService.updateComment(updatedComment).pipe(
      tap((response) => {
        this.content = this.editedContent;
        this.editing = false;
        console.log('Comment updated successfully!');
      }),
      catchError((error) => {
        console.error('Failed to save comment:', error);
        return of(null);
      })
    ).subscribe();
  }

  cancelEdit() {
    this.editing = false;
  }

  deleteComment(id: number) {
    this.commentService.deleteComment(id);
  }
}
