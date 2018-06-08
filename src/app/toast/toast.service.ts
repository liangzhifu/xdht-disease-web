import { Injectable } from '@angular/core';
import { ToastConfig } from './toast-config';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ToastService {

  private toastSubject = new Subject<ToastConfig>();

  constructor() { }

  getToasts(): Observable<ToastConfig> {
    return this.toastSubject;
  }
  toast(toastConfig: ToastConfig) {
    this.toastSubject.next(toastConfig);
  }
}
