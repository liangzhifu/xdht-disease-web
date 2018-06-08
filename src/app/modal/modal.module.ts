import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm/confirm.component';
import { AlertComponent } from './alert/alert.component';
import { ModalService } from './modal.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    ConfirmComponent
  ],
  declarations: [
    ConfirmComponent,
    AlertComponent
  ],
  entryComponents: [
    ConfirmComponent,
    AlertComponent
  ],
  providers: [
    ModalService
  ]
})
export class ModalModule { }
