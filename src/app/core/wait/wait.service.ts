import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class WaitService {

  private waitSubject = new Subject<boolean>();

  constructor() { }

  getWait(): Observable<boolean> {
    return this.waitSubject;
  }


  wait(showSpin: boolean) {
    this.waitSubject.next(showSpin);
  }

}
