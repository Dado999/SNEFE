import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = 'http://localhost:8080/comments';

  constructor(private http: HttpClient) {}

  getCategoryComments(
    category: string,
    page: number,
    size: number
  ): Observable<{
    comments: { id: number; username: string; timestamp: string; content: string }[];
    totalPages: number;
  }> {
    const token = localStorage.getItem('JWT');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${this.baseUrl}/${category}?page=${page}&size=${size}`, { headers }).pipe(
      map(response => ({
        comments: response.content
          .map((comment: any) => ({
            id: comment.id,
            username: comment.iduser.username, // Extract the username from iduser
            timestamp: new Date(comment.date).toLocaleString(), // Convert timestamp to readable format
            content: comment.content // Use the content field directly
          })), // Sort by timestamp in descending order
        totalPages: response.totalPages // Include the totalPages metadata
      }))
    );
  }



  deleteComment(id: number): void {
    const token = localStorage.getItem('JWT');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.delete<{ message: string }>(`http://localhost:8080/comments/delete/${id}`, { headers }).pipe(
      map(response => {
        location.reload()// Show the success message
      })
    ).subscribe({
      next: () => console.log('Request completed successfully'),
      error: (err) => console.error('Error occurred:', err)
    });
  }


  updateComment(updatedComment: { id: number; content: string}): Observable<{ message : string }> {
    console.log(updatedComment)
    const token = localStorage.getItem('JWT');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<{ message : string }>(`http://localhost:8080/comments/update/${updatedComment.id}`,updatedComment, {headers})
  }

  addComment(newComment: { date: string; category: string; iduser: number; content: string; approved: number }): Observable<{ message: string }> {
    console.log(newComment)
    const token = localStorage.getItem('JWT');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<{message : string}>('http://localhost:8080/comments/insert',newComment, {headers})
  }

  getUnapprovedComments(): Observable<{ id: number; username: string; timestamp: string; content: string; approved: number }[]> {
    const token = localStorage.getItem('JWT');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any[]>('http://localhost:8080/comments/unapproved-comments', { headers }).pipe(
      map(response =>
        response.map(comment => ({
          id: comment.id,
          username: `User${comment.iduser}`, // Replace `iduser` with a generic username, adjust as needed
          timestamp: new Date(comment.date).toLocaleString(), // Convert timestamp to a readable format
          content: comment.content,
          approved: comment.approved
        }))
      )
    );
  }


  approveComment(commentId: number): Observable<{ message : string}> {
    const token = localStorage.getItem('JWT');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post< { message : string } > ('http://localhost:8080/comments/approve/'+ commentId, {},{headers})
  }
}
