import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { SharedModule } from './../shared/shared.module';
import { UserSearchComponent } from './user-search/user-search.component';

@NgModule({
  declarations: [
    WorkspaceRoutingModule.components,
    UserSearchComponent
  ],
  providers: [
  ],
  imports: [
    CommonModule,
    WorkspaceRoutingModule,
    SharedModule
  ]
})
export class WorkspaceModule { }
