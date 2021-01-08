import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {
  BugComponent,
  BugCardComponent,
  BugModalComponent,
  BugDescComponent,
  BugTitleComponent,
  BugEntryComponent
} from '../bugs/index-bug';

const routes: Routes = [
  {
    path: '', component: BugComponent,
    children: [
      { path: 'edit', component: BugModalComponent }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class BugsRoutingModule {
  static components = [
    BugComponent,
    BugCardComponent,
    BugModalComponent,
    BugDescComponent,
    BugTitleComponent,
    BugEntryComponent
  ]
}
