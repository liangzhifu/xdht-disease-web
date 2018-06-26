import {Component, OnInit, ViewChild} from '@angular/core';
import {SimpleDataHttpPageComponent} from '../../simple-data-table/simple-data-http-page/simple-data-http-page.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpService} from '../../core/http/http.service';
import {ToastService} from '../../toast/toast.service';
import {ModalService} from '../../modal/modal.service';
import {WaitService} from '../../core/wait/wait.service';
import {Router} from '@angular/router';
import {SystemConstant} from '../../core/class/system-constant';
import {AntiNoiseEditComponent} from '../anti-noise-edit/anti-noise-edit.component';
import {ToastType} from '../../toast/toast-type.enum';
import {ConfirmConfig} from '../../modal/confirm/confirm-config';
import {ToastConfig} from '../../toast/toast-config';

@Component({
  selector: 'app-anti-noise-manage',
  templateUrl: './anti-noise-manage.component.html',
  styleUrls: ['./anti-noise-manage.component.scss']
})
export class AntiNoiseManageComponent implements OnInit {
  url: String;
  method: 'post';
  @ViewChild('sdhp', undefined) sdhp: SimpleDataHttpPageComponent;
  /**
   * 查询条件
   */
  param: any = {
    antiNoiseFacilitiesNo: ''
  };
  constructor(
    private ngbModal: NgbModal,
    private waitService: WaitService,
    private modalService: ModalService,
    private httpService: HttpService,
    private toastService: ToastService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.url = SystemConstant.ANTI_NOISE_PAGE_LIST;
  }
  /**
   * 查询
   */
  search() {
    this.waitService.wait(true);
    this.sdhp.search();
    this.waitService.wait(false);
  }

  /**
   * 新增--防噪声设施调查表
   */
  addAntiNoise() {
    const modalRef = this.ngbModal.open(AntiNoiseEditComponent);
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }
  /**
   * 修改--防噪声设施调查表
   */
  editAntiNoise(id) {
    // 获取数据
    this.httpService.get(SystemConstant.ANTI_NOISE_DETAIL + '/' + id).subscribe({
      next: (data) => {
        this.openEdit(data);
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', '获取详情失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {}
    });
  }
  /**
   * 打开修改(防噪声设施调查表)对话框
   */
  openEdit(myData) {
    const modalRef = this.ngbModal.open(AntiNoiseEditComponent);
    modalRef.componentInstance.recordAntiNoiseInputRequest = myData;
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }
  /**
   * 删除--防噪声设施调查表
   */
  delAntiNoise(id) {
    const confirmCfg = new ConfirmConfig('确定删除！');
    this.modalService.confirm(confirmCfg).then(
      () => {
        this.httpService.post(SystemConstant.ANTI_NOISE_DEL + '/' + id , {} ).subscribe({
          next: (data) => {
            const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '删除成功！', 3000);
            this.toastService.toast(toastCfg);
            this.search();
          },
          error: (err) => {
            const toastCfg = new ToastConfig(ToastType.ERROR, '',  '删除失败！' + '失败原因：' + err, 3000);
            this.toastService.toast(toastCfg);
          },
          complete: () => {}
        });
      }
    );
  }

}
