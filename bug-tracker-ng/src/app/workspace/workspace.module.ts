import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkspaceRoutingModule } from './workspace-routing.module';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  declarations: [
    WorkspaceRoutingModule.components
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
