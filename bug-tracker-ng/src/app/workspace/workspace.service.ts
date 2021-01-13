import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Workspace } from './../models/workspace';
import { ConfigService } from './../shared/config.service';
import { switchMap, map } from 'rxjs/operators';


@Injectable()
export class WorkspaceService {
  private BaseUrl = `${this.config.getAPIConnectionBaseUrl()}/workspaces`;
  private workspaceSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient, private config: ConfigService) { }

  private getAll(userId) {
    return this.http.get<Workspace>(`${this.BaseUrl}/getAll/${userId}`)
  };

  getAllWorkspaces(userId: string): Observable<Workspace> {
    this.workspaceSubject.next(userId);

    return combineLatest([
      this.workspaceSubject.asObservable()
    ])
      .pipe(
        switchMap((userId) => {
          return this.getAll(userId);
        })
      );
  }

  getSingleWorkspace(id: string): Observable<Workspace> {
    return this.http.get<Workspace>(`${this.BaseUrl}/getById/${id}`);
  }

  createWorkspace(userId: string, workspace: Workspace): Observable<any> {
    return this.http.post<any>(`${this.BaseUrl}/${userId}`, {
      workspace: workspace
    }).pipe(
      map(() => {
        this.workspaceSubject.next(userId);
      })
    );
  }

  updateWorkspace(id: string, workspaceObject: any): Observable<any> {
    return this.http.patch<any>(`${this.BaseUrl}/${id}`, {
      workspaceObject
    });
  }
}