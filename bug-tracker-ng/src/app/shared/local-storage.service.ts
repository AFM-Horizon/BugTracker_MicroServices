import { Injectable } from '@angular/core';

@Injectable()

export class LocalStorageService {
  private AccessTokenKey = "accessToken";
  private RefreshTokenKey = "refreshToken";
  private WorkspaceKey = "workspaceState";
  private BugEditState = "bugEditState";

  // Access Token
  setAccessToken(accessToken: string): void {
    localStorage.setItem(this.AccessTokenKey, accessToken);
  }

  getAccessToken(): string {
    return localStorage.getItem(this.AccessTokenKey);
  }


  // Refresh Token 
  setRefreshToken(refreshToken: string): void {
    localStorage.setItem(this.RefreshTokenKey, refreshToken);
  }

  getRefreshToken(): string {
    return localStorage.getItem(this.RefreshTokenKey);
  }


  // Workspace State
  setWorkspaceState(workspaceId: string): void {
    localStorage.setItem(this.WorkspaceKey, workspaceId);
  }

  getWorkspaceState(): string {
    return localStorage.getItem(this.WorkspaceKey);
  }

  
  // Bug Edit State
  setBugEditState(bugId: string): void {
    localStorage.setItem(this.BugEditState, bugId);
  }

  getBugEditState(): string {
    return localStorage.getItem(this.BugEditState);
  }

  deleteTokens(): void {
    localStorage.clear();
  }
}