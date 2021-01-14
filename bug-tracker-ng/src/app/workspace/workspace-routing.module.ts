import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkspaceMainComponent } from '../workspace/workspace-main/workspace-main.component';

const routes: Routes = [
  { path: '', component: WorkspaceMainComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class WorkspaceRoutingModule {
  static components = [
    WorkspaceMainComponent
  ]
}
