import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmConfig } from './confirm/confirm-config';
import { ConfirmComponent } from './confirm/confirm.component';
import { AlertConfig } from './alert/alert-config';
import { AlertComponent } from './alert/alert.component';

@Injectable()
export class ModalService {

  constructor(
    private ngbModal: NgbModal
  ) { }
  // 确认框
  confirm(config: ConfirmConfig): Promise<any> {
    const modalRef = this.ngbModal.open(ConfirmComponent);
    modalRef.componentInstance.config = config;
    return modalRef.result;
  }

  // 警告框
  alert(config: AlertConfig): Promise<any> {
    const modalRef = this.ngbModal.open(AlertComponent);
    modalRef.componentInstance.config = config;
    return modalRef.result;
  }
}
