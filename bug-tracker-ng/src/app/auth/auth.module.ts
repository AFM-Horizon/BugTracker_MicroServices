import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthFlashMsgComponent } from '../auth/auth-flash-msg/auth-flash-msg.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  declarations: [
    AuthFlashMsgComponent,
    AuthRoutingModule.components
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
    CommonModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  providers:[
  ],
  exports: [
    AuthFlashMsgComponent,
    AuthRoutingModule.components
  ]
})
export class AuthModule { }
