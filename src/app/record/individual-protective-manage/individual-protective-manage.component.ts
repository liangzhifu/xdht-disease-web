import {Component, OnInit, ViewChild} from '@angular/core';
import {SimpleDataHttpPageComponent} from '../../simple-data-table/simple-data-http-page/simple-data-http-page.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {WaitService} from '../../core/wait/wait.service';
import {HttpService} from '../../core/http/http.service';
import {ModalService} from '../../modal/modal.service';
import {ToastService} from '../../toast/toast.service';
import {SystemConstant} from '../../core/class/system-constant';
import {ConfirmConfig} from '../../modal/confirm/confirm-config';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';
import {IndividualProtectiveEditComponent} from '../individual-protective-edit/individual-protective-edit.component';

@Component({
  selector: 'app-individual-protective-manage',
  templateUrl: './individual-protective-manage.component.html',
  styleUrls: ['./individual-protective-manage.component.scss']
})
export class IndividualProtectiveManageComponent implements OnInit {
  url: String;
  method: 'post';
  @ViewChild('sdhp', undefined) sdhp: SimpleDataHttpPageComponent;
  /**
   * 查询条件
   */
  param: any = {
    individualProtectiveEquipmentNo: ''
  };
  constructor(
    private ngbModal: NgbModal,
    private waitService: WaitService,
    private modalService: ModalService,
    private httpService: HttpService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this.url = SystemConstant.INDIVIDUAL_PROTECTIVE_PAGE_LIST;
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
   * 新增--个体防护用品调查表
   */
  addIndividualProtective() {
    const modalRef = this.ngbModal.open(IndividualProtectiveEditComponent);
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }
  /**
   * 修改--个体防护用品调查表
   */
  editIndividualProtective(id) {
    // 获取数据
    this.httpService.get(SystemConstant.INDIVIDUAL_PROTECTIVE_DETAIL + '/' + id).subscribe({
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
   * 打开修改(个体防护用品调查表)对话框
   */
  openEdit(myData) {
    const modalRef = this.ngbModal.open(IndividualProtectiveEditComponent);
    modalRef.componentInstance.recordIndividualProtectiveInputRequest = myData;
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }
  /**
   * 删除--个体防护用品调查表
   */
  delIndividualProtective(id) {
    const confirmCfg = new ConfirmConfig('确定删除！');
    this.modalService.confirm(confirmCfg).then(
      () => {
        this.httpService.post(SystemConstant.INDIVIDUAL_PROTECTIVE_DEL + '/' + id , {} ).subscribe({
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
