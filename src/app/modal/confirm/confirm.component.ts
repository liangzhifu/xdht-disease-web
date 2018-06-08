import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmConfig } from './confirm-config';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  encapsulation : ViewEncapsulation.None,
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  @Input() config: ConfirmConfig;

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
  }
  /**
   * 不同意
   */
  decline(): void {
    this.activeModal.dismiss({ status : 'declined' });
  }

  /**
   * 关闭
   */
  close(): void {
    this.activeModal.dismiss({ status : 'closed' });
  }

  /**
   * 同意
   */
  approve(): void {
    this.activeModal.close({ status : 'approved' });
  }
}
