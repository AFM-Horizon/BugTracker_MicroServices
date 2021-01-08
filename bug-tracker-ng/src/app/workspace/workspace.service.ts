import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Workspace } from './../models/workspace';

@Injectable()
export class WorkspaceService {
  private BaseUrl = 'http://localhost:3002/workspaces';
  workspaceSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) { }

  getAll(userId) {
   return this.http.get<Workspace>(`${this.BaseUrl}/getAll/${userId}`)
  };

  // workspaces$: Observable<Workspace> = combineLatest([
  //   this.workspaceSubject.asObservable()
  // ])
  //   .pipe(
  //     switchMap((userId) => {
  //       return this.http.get<Workspace>(`${this.BaseUrl}/${userId}`)
  //     })
  //   );

  getSingleWorkspace(id: string): Observable<Workspace> {
    return this.http.get<Workspace>(`${this.BaseUrl}/getById/${id}`);
  }

  createWorkspace(userId: string, workspace: Workspace): Observable<any> {
    return this.http.post<any>(`${this.BaseUrl}/${userId}`, {
      workspace: workspace
    });
  }

  updateWorkspace(id: string, workspaceObject: any): Observable<any> {
    return this.http.patch<any>(`${this.BaseUrl}/${id}`, {
      workspaceObject
    });
  }
}