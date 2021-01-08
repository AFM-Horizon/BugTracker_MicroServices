import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BugsRoutingModule } from './bugs-routing.module';
import { TagModule } from './../tag/tag.module';
import { SharedModule } from './../shared/shared.module';
import { CommentsModule } from '../comments/comments.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    BugsRoutingModule.components
  ],
  imports: [
    DragDropModule,
    BugsRoutingModule,
    CommonModule,
    SharedModule,
    TagModule,
    CommentsModule
  ],
  exports: [
    BugsRoutingModule.components
  ]
})
export class BugsModule { }
