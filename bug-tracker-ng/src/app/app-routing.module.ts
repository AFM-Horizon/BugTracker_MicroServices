import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthRouteGuardGuard } from './auth-route-guard.guard';
import { ErrorComponent } from '../app/shared/error/error.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('../app/auth/auth.module').then(m => m.AuthModule) },
  {
    path: 'bugs', canActivate: [AuthRouteGuardGuard],
    loadChildren: () => import('../app/bugs/bugs.module').then(m => m.BugsModule)
  },
  { path: 'workspace', loadChildren: () => import('../app/workspace/workspace.module').then(m => m.WorkspaceModule) },
  { path: '404', component: ErrorComponent },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
