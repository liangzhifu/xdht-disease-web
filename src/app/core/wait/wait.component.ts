import { Component, OnInit } from '@angular/core';
import {WaitService} from './wait.service';

@Component({
  selector: 'app-wait',
  templateUrl: './wait.component.html',
  styleUrls: ['./wait.component.scss']
})
export class WaitComponent implements OnInit {

  // 标识
  showWait = false;

  // 数量
  count = 0;

  constructor(
    private waitService: WaitService
  ) {
    this.waitService.getWait().subscribe((showWait: boolean) => {
      if (showWait) {
        this.openWait();
      } else {
        this.closeWait();
      }
    });
  }

  ngOnInit() {
  }

  /**
   * 打开
   */
  private openWait() {
    if (!this.showWait) {
      this.showWait = true;
    }
    this.count++;
  }

  /**
   * 关闭
   */
  private closeWait() {
    this.count--;
    if (this.count <= 0) {
      this.showWait = false;
      this.count = 0;
    }

  }
}
