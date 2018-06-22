import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalService} from '../../modal/modal.service';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastService} from '../../toast/toast.service';
import {ToastConfig} from '../../toast/toast-config';
import {ConfirmConfig} from '../../modal/confirm/confirm-config';
import {SimpleDataHttpPageComponent} from '../../simple-data-table/simple-data-http-page/simple-data-http-page.component';
import {HttpService} from '../../core/http/http.service';
import {ToastType} from '../../toast/toast-type.enum';
import {WaitService} from '../../core/wait/wait.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EmployeeSummaryEditComponent} from '../employee-summary-edit/employee-summary-edit.component';

@Component({
  selector: 'app-employee-summary-manage',
  templateUrl: './employee-summary-manage.component.html',
  styleUrls: ['./employee-summary-manage.component.scss']
})
export class EmployeeSummaryManageComponent implements OnInit {
  url: String;
  method: 'post';

  @ViewChild('sdhp', undefined) sdhp: SimpleDataHttpPageComponent;
  /**
   * 查询条件
   */
  param: any = {
    name: ''
  };
  constructor(
    private ngbModal: NgbModal,
    private waitService: WaitService,
    private modalService: ModalService,
    private httpService: HttpService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.url = SystemConstant.EMPLOYEE_SUMMARY_PAGE;
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
   * 新增职工体检信息
   */
  addEmployeeSummary() {
    const modalRef = this.ngbModal.open(EmployeeSummaryEditComponent, {size: 'lg'});
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }

  /**
   * 修改职工体检信息
   */
  editEmployeeSummary(employeeSummaryId) {
    // 获取企业数据
    this.httpService.get(SystemConstant.EMPLOYEE_SUMMARY_DETAIL + '/' + employeeSummaryId).subscribe({
      next: (data) => {
        this.openEmployeeSummary(data);
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', '获取职工体检信息失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {}
    });
  }

  /**
   * 打开修改职工体检信息对话框
   */
  openEmployeeSummary(employeeSummaryData) {
    const modalRef = this.ngbModal.open(EmployeeSummaryEditComponent, {size: 'lg'});
    modalRef.componentInstance.employeeSummaryRequest = employeeSummaryData;
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }

  /**
   * 删除职工体检信息
   */
  delEmployeeSummary(employeeSummaryId, name) {
    const confirmCfg = new ConfirmConfig('确定删除职工体检信息：' + name + '！');
    this.modalService.confirm(confirmCfg).then(
      () => {
        this.httpService.get(SystemConstant.EMPLOYEE_SUMMARY_DEL + '?id=' + employeeSummaryId).subscribe({
          next: (data) => {
            const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '删除职工体检信息！', 3000);
            this.toastService.toast(toastCfg);
            this.search();
          },
          error: (err) => {
            const toastCfg = new ToastConfig(ToastType.ERROR, '',  '删除职工体检信息！' + '失败原因：' + err, 3000);
            this.toastService.toast(toastCfg);
          },
          complete: () => {}
        });
      }
    );
  }
}
