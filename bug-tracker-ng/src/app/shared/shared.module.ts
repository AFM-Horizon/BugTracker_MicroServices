import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserSearchComponent } from './../workspace/user-search/user-search.component';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';

@NgModule({
  declarations: [
    NavbarComponent,
    UserSearchComponent,
    UserAvatarComponent
  ],
  imports: [
    FontAwesomeModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    UserSearchComponent,
    UserAvatarComponent,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CommonModule
  ]
})
export class SharedModule { }
