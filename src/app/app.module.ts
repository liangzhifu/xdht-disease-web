import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { ToastModule } from './toast/toast.module';
import { SysModule } from './sys/sys.module';
import { ModalModule } from './modal/modal.module';
import { MainModule } from './main/main.module';
import { RecordModule } from './record/record.module';
import {TitleService} from './title.service';
import {EchartModule} from './echart/echart.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    MainModule,
    ModalModule,
    NgbModule.forRoot(),
    SysModule,
    RecordModule,
    ToastModule,
    EchartModule
  ],
  exports: [
  ],
  providers: [
    TitleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
