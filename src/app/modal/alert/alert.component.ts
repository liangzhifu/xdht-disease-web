import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertConfig } from './alert-config';
import { AlertType } from './alert-type';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  encapsulation : ViewEncapsulation.None,
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() config: AlertConfig;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  /**
   * 判断是否信息
   * @param type
   */
  isInfo(type) {
    return type === AlertType.INFO;
  }

  /**
   * 判断是否警告
   * @param type
   */
  isWarning(type) {
    return type === AlertType.WARNING;
  }

  /**
   * 判断是否错误
   * @param type
   */
  isError(type) {
    return type === AlertType.ERROR;
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
