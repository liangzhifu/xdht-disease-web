import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http/http.service';
import { SessionStorageService } from './storage/session-storage.service';
import { TokenPermissionService } from './token/token-permission.service';
import { WaitService } from './wait/wait.service';
import { WaitComponent } from './wait/wait.component';
import { SexReformPipe } from './pipe/sex-reform.pipe';
import { StatusReformPipe } from './pipe/status-reform.pipe';
import { SysReformPipe } from './pipe/sys-reform.pipe';
import { InspectReformPipe } from './pipe/inspect-reform.pipe';
import { MarriageReformPipe } from './pipe/marriage-reform.pipe';
import { CompanyNamePipe } from './pipe/company-name.pipe';
import { WorkTypePipe } from './pipe/work-type.pipe';
import {I18nService} from './I18n/i18n.service';
import {CustomDatepickerI18nService} from './I18n/custom-datepicker-i18n.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    CustomDatepickerI18nService,
    HttpService,
    I18nService,
    SessionStorageService,
    TokenPermissionService,
    WaitService
  ],
  exports: [
    CompanyNamePipe,
    SexReformPipe,
    SysReformPipe,
    MarriageReformPipe,
    StatusReformPipe,
    WaitComponent,
    InspectReformPipe,
    WorkTypePipe
  ],
  declarations: [
    SexReformPipe,
    MarriageReformPipe,
    StatusReformPipe,
    WaitComponent,
    SysReformPipe,
    InspectReformPipe,
    MarriageReformPipe,
    CompanyNamePipe,
    WorkTypePipe
  ]
})
export class CoreModule { }
