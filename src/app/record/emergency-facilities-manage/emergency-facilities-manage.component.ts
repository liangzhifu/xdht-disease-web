import {Component, OnInit, ViewChild} from '@angular/core';
import {SimpleDataHttpPageComponent} from '../../simple-data-table/simple-data-http-page/simple-data-http-page.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {WaitService} from '../../core/wait/wait.service';
import {HttpService} from '../../core/http/http.service';
import {ModalService} from '../../modal/modal.service';
import {ToastService} from '../../toast/toast.service';
import {SystemConstant} from '../../core/class/system-constant';
import {IndividualProtectiveEditComponent} from '../individual-protective-edit/individual-protective-edit.component';
import {ConfirmConfig} from '../../modal/confirm/confirm-config';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';
import {EmergencyFacilitiesEditComponent} from '../emergency-facilities-edit/emergency-facilities-edit.component';

@Component({
  selector: 'app-emergency-facilities-manage',
  templateUrl: './emergency-facilities-manage.component.html',
  styleUrls: ['./emergency-facilities-manage.component.scss']
})
export class EmergencyFacilitiesManageComponent implements OnInit {
  url: String;
  method: 'post';
  @ViewChild('sdhp', undefined) sdhp: SimpleDataHttpPageComponent;
  /**
   * 查询条件
   */
  param: any = {
    emergencyFacilitiesNo: ''
  };
  constructor(
    private ngbModal: NgbModal,
    private waitService: WaitService,
    private modalService: ModalService,
    private httpService: HttpService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this.url = SystemConstant.EMERGENCY_FACILITIES_PAGE_LIST;
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
   * 新增--应急设施调查表
   */
  addEmergencyFacilities() {
    const modalRef = this.ngbModal.open(EmergencyFacilitiesEditComponent);
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }
  /**
   * 修改--应急设施调查表
   */
  editEmergencyFacilities(id) {
    // 获取数据
    this.httpService.get(SystemConstant.EMERGENCY_FACILITIES_DETAIL + '/' + id).subscribe({
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
   * 打开修改(应急设施调查表)对话框
   */
  openEdit(myData) {
    const modalRef = this.ngbModal.open(EmergencyFacilitiesEditComponent);
    modalRef.componentInstance.recordEmergencyFacilitiesInputRequest = myData;
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }
  /**
   * 删除--应急设施调查表
   */
  delEmergencyFacilities(id) {
    const confirmCfg = new ConfirmConfig('确定删除！');
    this.modalService.confirm(confirmCfg).then(
      () => {
        this.httpService.post(SystemConstant.EMERGENCY_FACILITIES_DEL + '/' + id , {} ).subscribe({
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
