import { Injectable } from "@angular/core";
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Workspace } from './../models/workspace';
import { ConfigService } from './../shared/config.service';
import { map, mergeMap } from 'rxjs/operators';
import { IRepository } from './../interfaces/Irepository';
import { WorkspaceStateService } from './../shared/workspace-state.service';


@Injectable()
export class WorkspaceService implements IRepository<Workspace, string> {

  private BaseUrl = `${this.config.getAPIConnectionBaseUrl()}/workspaces`;
  entityState: BehaviorSubject<Workspace[]> = new BehaviorSubject(null);

  constructor(private http: HttpClient, private config: ConfigService, private workspaceState: WorkspaceStateService) { }

  getAll(userId: string): Observable<Workspace[]> {
    return this.http.get<Workspace[]>(`${this.BaseUrl}/getAll/${userId}`)
      .pipe(
        mergeMap((workspaces) => {
          this.entityState.next(workspaces);
          return this.entityState.asObservable();
        })
      );
  };

  getById(id: string): Observable<Workspace> {
    return this.http.get<Workspace>(`${this.BaseUrl}/getById/${id}`);
  }

  create(workspace: Workspace, userId: string): any {
    return this.http.post<any>(`${this.BaseUrl}/${userId}`, {
      workspace: workspace
    }).pipe(
      mergeMap(() => {
        return this.getAll(userId);
      })
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
      })
    );
  }

  delete(id: string): any {
    throw new Error("Method not implemented.");
  }
}