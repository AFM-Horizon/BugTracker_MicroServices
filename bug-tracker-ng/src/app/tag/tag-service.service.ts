import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { switchMap, mergeMap } from 'rxjs/operators';
import { Tag } from '../models/tag';
import { HttpClient } from '@angular/common/http';
import { BugService } from '../shared/bug.service';

@Injectable({
  providedIn: 'root'
})
export class TagServiceService {
  private BaseUrl = 'http://localhost:3002/tags';
  private tagAction$: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient, private bugService: BugService) { }

  tags$ = combineLatest([
    this.tagAction$.asObservable()
  ]).pipe(
    switchMap((bugId) => {
      return this.http.get<Tag[]>(`${this.BaseUrl}/${bugId}/tag`)
    })
  );

  addTag(bugId: string, tag: Tag): Observable<any> {
    return this.http.post<any>(`${this.BaseUrl}/${bugId}/tag`, {
      tag: tag
    })
      .pipe(
        mergeMap(() => {
          this.updateTagData(bugId);
          return of(true);
        })
      );
  }

  deleteTag(bugId: string, tagId: string): Observable<any> {
    return this.http.delete<any>(`${this.BaseUrl}/${bugId}/tag/${tagId}`)
      .pipe(
        mergeMap(() => {
          this.updateTagData(bugId);
          return of(true);
        })
      );
  }

  updateTagData(bugId) {
    this.tagAction$.next(bugId);
    this.bugService.updateBugData();
  }
}
