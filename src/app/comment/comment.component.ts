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
  // @Input() username: string = '';
  // @Input() timestamp: string = '';
  // @Input() content: string = '';
  //
  // canDelete: boolean = false;
  // canEdit: boolean = false;
  // canAdd: boolean = false
  //
  // constructor(protected permissionService: PermissionService) {
  //   this.permissionService.fetchPermission().subscribe(permission=> {
  //     const r = permission.permission
  //     console.log(permission.permission)
  //     if(r == 'ADD')
  //       this.canAdd = true;
  //     else if(r == 'MODIFY')
  //       this.canEdit = true;
  //     else
  //       this.canDelete = true;
  //   });
  //   console.log(this.canAdd + ' ' + this.canEdit + ' ' + this.canDelete)
  // }
  @Input() id: number = 0;
  @Input() username: string = '';
  @Input() timestamp: string = '';
  @Input() content: string = '';

  canAdd = false;
  canEdit = false;
  canDelete = false;

  editing = false; // Tracks if the comment is in editing mode
  editedContent: string = ''; // Holds the edited content

  constructor(
    protected permissionService: PermissionService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.permissionService.fetchPermission().subscribe((permission) => {
      if (permission) {
        if (permission.permission === 'ADD') this.canAdd = true;
        else if (permission.permission === 'MODIFY') this.canEdit = true;
        else this.canDelete = true;
      }
    });
  }

  // Enter editing mode
  editComment() {
    if (this.canEdit) {
      this.editing = true;
      this.editedContent = this.content;
    }
  }

  // Save the edited comment
  saveEdit() {
    const updatedComment = {
      id: this.id,
      content: this.editedContent,
    };

    this.commentService.updateComment(updatedComment).pipe(
      tap((response) => {
        // Update the UI after a successful response
        this.content = this.editedContent;
        this.editing = false;
        console.log('Comment updated successfully!');
      }),
      catchError((error) => {
        // Handle errors
        console.error('Failed to save comment:', error);
        return of(null); // Return a fallback value to ensure the stream continues
      })
    ).subscribe();
  }

  // Cancel editing
  cancelEdit() {
    this.editing = false;
  }

  deleteComment(id: number) {
    this.commentService.deleteComment(id);
  }
}
