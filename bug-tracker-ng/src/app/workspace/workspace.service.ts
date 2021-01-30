import { Injectable } from "@angular/core";
import { BehaviorSubject, EMPTY, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Workspace } from './../models/workspace';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { IRepository } from './../interfaces/Irepository';
import { WorkspaceStateService } from './../shared/workspace-state.service';
import { environment } from './../../environments/environment';


@Injectable()
export class WorkspaceService implements IRepository<Workspace, string> {

  private BaseUrl = `${environment.apiUrl}/workspaces`;
  entityState: BehaviorSubject<Workspace[]> = new BehaviorSubject(null);

  constructor(private http: HttpClient, private workspaceState: WorkspaceStateService) { }

  getAll(userId: string): Observable<Workspace[]> {
    return this.http.get<Workspace[]>(`${this.BaseUrl}/getAll/${userId}`)
      .pipe(
        mergeMap((workspaces) => {
          this.entityState.next(workspaces);
          return this.entityState.asObservable();
        }),
        catchError(err => throwError(err))
      );
  };

  getInvited(userId: string): Observable<Workspace[]> {
    return this.http.get<Workspace[]>(`${this.BaseUrl}/getInvited/${userId}`)
      .pipe(
        catchError(err => throwError(err))
      )
  }

  getById(id: string): Observable<Workspace> {
    return this.http.get<Workspace>(`${this.BaseUrl}/getById/${id}`)
      .pipe(
        catchError(err => throwError(err))
      )
  }

  create(workspace: Workspace, userId: string): any {
    return this.http.post<any>(`${this.BaseUrl}/${userId}`, {
      workspace: workspace
    }).pipe(
      mergeMap(() => {
        return this.getAll(userId);
      }),
      catchError(err => throwError(err))
    );
  }

  update(id: string, workspace: any, userId: string): any {
    return this.http.patch<any>(`${this.BaseUrl}/${id}`, {
      workspace
    }).pipe(
      mergeMap(() => {
        return this.getAll(userId).pipe(
          mergeMap(() => {
            return this.getById(id).pipe(
              map((workspace) => {
                this.workspaceState.setState(workspace);
              })
            )
          })
        )
      }),
      catchError(err => throwError(err))
    );
  }

  delete(id: string): any {
    throw new Error("Method not implemented.");
  }
}