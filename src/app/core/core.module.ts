import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http/http.service';
import { SessionStorageService } from './storage/session-storage.service';
import { TitleService } from './title/title.service';
import { TokenPermissionService } from './token/token-permission.service';
import { WaitService } from './wait/wait.service';
import { WaitComponent } from './wait/wait.component';
import { SexReformPipe } from './pipe/sex-reform.pipe';
import { StatusReformPipe } from './pipe/status-reform.pipe';
import { SysReformPipe } from './pipe/sys-reform.pipe';
import { InspectReformPipe } from './pipe/inspect-reform.pipe';
import { MarriageReformPipe } from './pipe/marriage-reform.pipe';

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
    SexReformPipe,
    SysReformPipe,
    MarriageReformPipe,
    StatusReformPipe,
    WaitComponent,
    InspectReformPipe
  ],
  declarations: [
    SexReformPipe,
    MarriageReformPipe,
    StatusReformPipe,
    WaitComponent,
    SysReformPipe,
    InspectReformPipe,
    MarriageReformPipe
  ]
})
export class CoreModule { }
