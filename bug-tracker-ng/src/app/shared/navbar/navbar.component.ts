import { Component, OnDestroy } from '@angular/core';
import { faSignOutAlt, faHome } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { Subscription } from 'rxjs';
import { WorkspaceStateService } from 'src/app/shared/workspace-state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy {
  faSignOutAlt = faSignOutAlt;
  faHome = faHome;
  logoutSub: Subscription;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private userService: UserService, 
    private workspaceStateService: WorkspaceStateService) { }

  user$ = this.userService.getUser();
  workspace$ = this.workspaceStateService.getState();
  
  logoutHandler() {
    this.logoutSub = this.authService.logoutUser().subscribe(() => {
      this.router.navigate(['auth/login']);
    })
  }

  ngOnDestroy(): void {
    if (this.logoutSub) {
      this.logoutSub.unsubscribe();
    }
  }
}
