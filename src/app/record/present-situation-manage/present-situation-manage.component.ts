import {Component, OnInit, ViewChild} from '@angular/core';
import {SimpleDataHttpPageComponent} from '../../simple-data-table/simple-data-http-page/simple-data-http-page.component';
import {ToastService} from '../../toast/toast.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpService} from '../../core/http/http.service';
import {ModalService} from '../../modal/modal.service';
import {Router} from '@angular/router';
import {WaitService} from '../../core/wait/wait.service';
import {SystemConstant} from '../../core/class/system-constant';
import {PresentSituationEditComponent} from '../present-situation-edit/present-situation-edit.component';
import {ToastType} from '../../toast/toast-type.enum';
import {ToastConfig} from '../../toast/toast-config';
import {ConfirmConfig} from '../../modal/confirm/confirm-config';

@Component({
  selector: 'app-present-situation-manage',
  templateUrl: './present-situation-manage.component.html',
  styleUrls: ['./present-situation-manage.component.scss']
})
export class PresentSituationManageComponent implements OnInit {
  url: String;
  method: 'post';
  @ViewChild('sdhp', undefined) sdhp: SimpleDataHttpPageComponent;
  /**
   * 查询条件
   */
  param: any = {
    preEvaluationNo: ''
  };
  constructor(
    private ngbModal: NgbModal,
    private waitService: WaitService,
    private modalService: ModalService,
    private httpService: HttpService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit() {
    this.url = SystemConstant.PRESENT_SITUATION_PAGE_LIST;
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
   * 新增--用人单位概况调查表（现状评价）
   */
  addPresentSituation() {
    const modalRef = this.ngbModal.open(PresentSituationEditComponent);
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }
  /**
   * 修改--用人单位概况调查表（现状评价） 记录
   */
  editPresentSituation(id) {
    // 获取用户数据
    this.httpService.get(SystemConstant.PRESENT_SITUATION_DETAIL + '/' + id).subscribe({
      next: (data) => {
        this.openEditPresentSituation(data);
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', '获取详情失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {}
    });
  }

  /**
   * 打开修改 用人单位概况调查表（现状评价） 对话框
   */
  openEditPresentSituation(myData) {
    const modalRef = this.ngbModal.open(PresentSituationEditComponent);
    modalRef.componentInstance.recordPresentSituationRequest = myData;
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }
  /**
   * 删除--用人单位概况调查表（现状评价）
   */
  delPresentSituation(id) {
    const confirmCfg = new ConfirmConfig('确定删除！');
    this.modalService.confirm(confirmCfg).then(
      () => {
        this.httpService.post(SystemConstant.PRESENT_SITUATION_DEL + '/' + id , {} ).subscribe({
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
