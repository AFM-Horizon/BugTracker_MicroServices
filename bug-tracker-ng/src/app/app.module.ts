import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingComponent } from '../app/shared/loading/loading.component';
import { UserMessagingComponent } from '../app/shared/user-messaging/user-messaging.component';

import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core.module';
import { ErrorComponent } from '../app/shared/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    UserMessagingComponent,
    ErrorComponent
  ],
  imports: [
    CoreModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
