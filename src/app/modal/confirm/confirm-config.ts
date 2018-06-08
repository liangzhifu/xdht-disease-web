export class ConfirmConfig {
  content: string;
  declineBtnCls: string;
  declineBtnTxt: string;
  approveBtnCls: string;
  approveBtnTxt: string;

  constructor(
    content: string = '',
    declineBtnCls: string = 'btn-light',
    declineBtnTxt: string = '取消',
    approveBtnCls: string = 'btn-primary',
    approveBtnTxt: string = '确定'
  ) {
    this.content = content;
    this.declineBtnCls = declineBtnCls;
    this.declineBtnTxt = declineBtnTxt;
    this.approveBtnCls = approveBtnCls;
    this.approveBtnTxt = approveBtnTxt;
  }


  getContent(): string {
    return this.content;
  }

  getdeclineBtnCls(): string {
    return this.declineBtnCls;
  }

  getDeclineBtnTxt(): string {
    return this.declineBtnCls;
  }

  getApproveBtnCls(): string {
    return this.approveBtnCls;
  }

  getApproveBtnTxt(): string {
    return this.approveBtnTxt;
  }
}
