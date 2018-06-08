import {AlertType} from './alert-type';

export class AlertConfig {
  title: string;
  content: string;
  type: AlertType;
  approveBtnCls: string;
  approveBtnTxt: string;
  constructor(
    type: AlertType = AlertType.WARNING,
    title: string = '',
    content: string = '',
    approveBtnCls: string = 'btn-primary',
    approveBtnTxt: string = '确定'
  ) {
    this.title = title;
    this.content = content;
    this.type = type;
    this.approveBtnCls = approveBtnCls;
    this.approveBtnTxt = approveBtnTxt;
  }

  getType(): AlertType {
    return this.type;
  }

  getTitle(): string {
    return this.title;
  }

  getContent(): string {
    return this.content;
  }

  getApproveBtnCls(): string {
    return this.approveBtnCls;
  }

  getApproveBtnTxt(): string {
    return this.approveBtnTxt;
  }
}
