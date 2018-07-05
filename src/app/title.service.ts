import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class TitleService {

  // 标题
  titleEventEmitter: EventEmitter<string>;
  constructor() {
    this.titleEventEmitter = new EventEmitter();
  }

}
