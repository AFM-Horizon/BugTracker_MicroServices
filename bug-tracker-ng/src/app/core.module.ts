import { NgModule } from '@angular/core';

import { AuthMessagingService } from './auth/auth-messaging.service';
import { TokenService } from './shared/token.service';
import { UserService } from './shared/user.service';
import { BugModalStateService } from './shared/bug-modal-state.service';
import { AuthService } from '../app/shared/auth.service';
import { BugService } from 'src/app/bugs/index-bug';
import { LocalStorageService } from './shared/local-storage.service';
import { SharedModule } from './shared/shared.module';
import { LoadingInterceptor } from './shared/loading/loading.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiConnectionInterceptor } from './Interceptors/api-connection.interceptor';
import { UserMessagingService } from './shared/user-messaging.service';
import { TokenInterceptor } from './Interceptors/token.interceptor';
import { WorkspaceStateService } from './shared/workspace-state.service';
import { WorkspaceService } from '../app/workspace/workspace.service';

@NgModule({
  imports: [
    SharedModule
  ],
  providers: [
    AuthMessagingService,
    WorkspaceService,
    LocalStorageService,
    TokenService,
    UserService,
    BugModalStateService,
    BugService,
    UserMessagingService,
    WorkspaceStateService,
    { provide: HTTP_INTERCEPTORS, useClass: ApiConnectionInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    AuthService,
  ]
})
export class CoreModule { }
