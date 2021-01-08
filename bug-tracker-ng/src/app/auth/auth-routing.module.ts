import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from '../auth/login/login.component';
import { LoginFormComponent } from '../auth/login-form/login-form.component';
import { RegisterFormComponent } from '../auth/register-form/register-form.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent,
    children: [
      { path: 'login', component: LoginFormComponent },
      { path: 'register', component: RegisterFormComponent },
    ]
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {
  static components = [
    LoginComponent,
    LoginFormComponent,
    RegisterFormComponent
  ]
}
