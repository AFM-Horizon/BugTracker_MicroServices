import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserSearchComponent } from './../workspace/user-search/user-search.component';

@NgModule({
  declarations: [
    NavbarComponent,
    UserSearchComponent
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
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CommonModule
  ]
})
export class SharedModule { }
