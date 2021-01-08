import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { mergeMap, switchMap } from 'rxjs/operators';
import { Observable, BehaviorSubject, combineLatest, of } from 'rxjs';
import { CommentRequest } from '../models/commentRequestModel';
import { CommentResponse } from './../models/commentResponseModel';

@Injectable()
export class CommentService {
  private BaseUrl = 'http://localhost:3002/bugs';
  private updateAction$: BehaviorSubject<string> = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  allComments$: Observable<CommentResponse[]> = combineLatest([
    this.updateAction$.asObservable()
  ]).pipe(
    switchMap((bugId) => {
      return this.http.get<CommentResponse[]>(`${this.BaseUrl}/${bugId}/comments/getAll`);
    })
  );

  addComment(bugId: string, comment: CommentRequest): Observable<any> {
    return this.http.post<any>(`${this.BaseUrl}/${bugId}/comments/add`, comment)
      .pipe(
        mergeMap(() => {
          this.updateAction$.next(bugId);
          return of();
        })
      )
  };

  deleteComment(bugId: string, commentId: string): Observable<any> {
    return this.http.delete<any>(`${this.BaseUrl}/${bugId}/comments/delete/${commentId}`)
      .pipe(
        mergeMap(() => {
          this.updateAction$.next(bugId);
          return of();
        })
      );
  }

  updateComment(bugId: string, commentId: string, comment: any): Observable<any> {
    return this.http.patch<any>(`${this.BaseUrl}/${bugId}/comments/update/${commentId}`, comment)
      .pipe(
        mergeMap(() => {
          this.updateAction$.next(bugId);
          return of();
        })
      )
  };

  updateCommentData(bugId) {
    this.updateAction$.next(bugId);
  }
}