import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http/http.service';
import { SessionStorageService } from './storage/session-storage.service';
import { TitleService } from './title/title.service';
import { TokenPermissionService } from './token/token-permission.service';
import { WaitService } from './wait/wait.service';
import { WaitComponent } from './wait/wait.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    HttpService,
    SessionStorageService,
    TitleService,
    TokenPermissionService,
    WaitService
  ],
  exports: [
    WaitComponent
  ],
  declarations: [WaitComponent]
})
export class CoreModule { }
