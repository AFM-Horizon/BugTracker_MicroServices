import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';

import { TagsComponent } from '../tag/tags/tags.component';
import { TagEntryComponent } from '../tag/tag-entry/tag-entry.component';
import { TagListComponent } from '../tag/tag-list/tag-list.component';
import { ColorPickerComponent } from '../tag/color-picker/color-picker.component';
import { TagServiceService } from './tag-service.service';


@NgModule({
  declarations: [
    ColorPickerComponent,
    TagsComponent,
    TagListComponent, 
    TagEntryComponent
  ],
  providers:[
    TagServiceService
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ColorPickerComponent,
    TagsComponent,
    TagListComponent, 
    TagEntryComponent
  ]
})
export class TagModule { }
