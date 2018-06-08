import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast/toast.component';
import { ToastService } from './toast.service';
import { ToastBoxComponent } from './toast-box/toast-box.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ToastService
  ],
  exports: [
    ToastBoxComponent,
    ToastComponent
  ],
  declarations: [ToastComponent, ToastBoxComponent]
})
export class ToastModule { }
