import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ModalService} from '../../modal/modal.service';
import {SystemConstant} from '../../core/class/system-constant';
import {WaitService} from '../../core/wait/wait.service';
import {ToastService} from '../../toast/toast.service';
import {HttpService} from '../../core/http/http.service';
import {SimpleDataHttpPageComponent} from '../../simple-data-table/simple-data-http-page/simple-data-http-page.component';
import {ToastType} from '../../toast/toast-type.enum';
import {ToastConfig} from '../../toast/toast-config';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EmployeeEditComponent} from '../employee-edit/employee-edit.component';
import {EmpoiyeeInfoComponent} from '../empoiyee-info/empoiyee-info.component';
import {ConfirmConfig} from '../../modal/confirm/confirm-config';

@Component({
  selector: 'app-employee-manage',
  templateUrl: './employee-manage.component.html',
  styleUrls: ['./employee-manage.component.scss']
})
export class EmployeeManageComponent implements OnInit, AfterViewInit {

  url: String;
  method: 'post';

  @ViewChild('sdhp', undefined) sdhp: SimpleDataHttpPageComponent;
  /**
   * 查询条件
   */
  param: any = {
    empName: '',
    empSex: '',
    empNative: '',
    empIdentityNumber: '',
    empMarriage: ''

  };
  constructor(
    private ngbModal: NgbModal,
    private waitService: WaitService,
    private modalService: ModalService,
    private httpService: HttpService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.url = SystemConstant.EMPLOYEE_PAGE_LIST;
  }

  ngAfterViewInit() {
    this.search();
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
   * 查看职工信息
   */
  selectEmployeeInfo(employeeId) {
    // 获取职工数据
    this.httpService.get(SystemConstant.EMPLOYEE_DETAIL + '/' + employeeId).subscribe({
      next: (data) => {
        this.openEmployeeInfo(data);
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', '获取职工详情失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {}
    });
  }

  /**
   * 打开职工详情对话框
   */
  openEmployeeInfo(employeeData) {
    const modalRef = this.ngbModal.open(EmpoiyeeInfoComponent);
    modalRef.componentInstance.sysEmpoiyeeRequest = employeeData;
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }
  /**
   * 新增职工
   */
  addEmployee() {
    const modalRef = this.ngbModal.open(EmployeeEditComponent, {backdrop: 'static', keyboard: false, size: 'w80', centered: true});
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }

  /**
   * 修改职工信息
   */
  editEmployee(employeeId) {
    // 获取职工数据
    this.httpService.get(SystemConstant.EMPLOYEE_DETAIL + '/' + employeeId).subscribe({
      next: (data) => {
        this.openEditEmployee(data);
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', '获取企业详情失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {}
    });
  }

  /**
   * 打开修改职工对话框
   */
  openEditEmployee(employeeData) {
    const modalRef = this.ngbModal.open(EmployeeEditComponent, {backdrop: 'static', keyboard: false, size: 'w80', centered: true});
    modalRef.componentInstance.sysEmployeeRequest = employeeData;
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    ).catch();
  }

  /**
   * 删除职工
   */
  delEmployee(employeeId, employeeName) {
    const confirmCfg = new ConfirmConfig('确定删除职工：' + employeeName + '！');
    this.modalService.confirm(confirmCfg).then(
      () => {
        this.httpService.get(SystemConstant.EMPLOYEE_DEL + '?id=' + employeeId).subscribe({
          next: (data) => {
            const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '删除职工成功！', 3000);
            this.toastService.toast(toastCfg);
            this.search();
          },
          error: (err) => {
            const toastCfg = new ToastConfig(ToastType.ERROR, '',  '删除职工失败！' + '失败原因：' + err, 3000);
            this.toastService.toast(toastCfg);
          },
          complete: () => {}
        });
      }
    );
  }
}
