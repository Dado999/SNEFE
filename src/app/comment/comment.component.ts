import {Component, Input} from '@angular/core';
import {PermissionService} from '../permission/permission-service';
import {CommentService} from '../services/comment/comment.service';
import {HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [],
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

  constructor(protected permissionService: PermissionService,
              private commentService: CommentService) {}

  ngOnInit(): void {
    this.permissionService.fetchPermission().subscribe((permission) => {
      if (permission) {
        if (permission.permission === 'ADD') this.canAdd = true;
        else if (permission.permission === 'MODIFY') this.canEdit = true;
        else this.canDelete = true;
      }
    });
  }

  deleteComment(id: number) {
    this.commentService.deleteComment(id);
  }
}
