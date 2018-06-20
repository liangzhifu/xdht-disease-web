import {Component, OnInit, ViewChild} from '@angular/core';
import {SimpleDataHttpPageComponent} from '../../simple-data-table/simple-data-http-page/simple-data-http-page.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {WaitService} from '../../core/wait/wait.service';
import {HttpService} from '../../core/http/http.service';
import {ModalService} from '../../modal/modal.service';
import {Router} from '@angular/router';
import {ToastService} from '../../toast/toast.service';
import {SystemConstant} from '../../core/class/system-constant';
import {ConfirmConfig} from '../../modal/confirm/confirm-config';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';
import {HealthManagementEditComponent} from '../health-management-edit/health-management-edit.component';

@Component({
  selector: 'app-health-management-manage',
  templateUrl: './health-management-manage.component.html',
  styleUrls: ['./health-management-manage.component.scss']
})
export class HealthManagementManageComponent implements OnInit {
  url: String;
  method: 'post';
  @ViewChild('sdhp', undefined) sdhp: SimpleDataHttpPageComponent;
  /**
   * 查询条件
   */
  param: any = {
    healthManagementNo: ''
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
    this.url = SystemConstant.HEALTH_MANAGEMENT_PAGE_LIST;
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
   * 新增--职业卫生管理情况调查表
   */
  addHealthManagement() {
    const modalRef = this.ngbModal.open(HealthManagementEditComponent);
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }

  /**
   * 打开详细内容页（TODO）
   */
  open() {
    this.router.navigate(['/main/record/recordPreEvaluationDetail'], {queryParams: {id: 1}});
  }

  /**
   * 修改--职业卫生管理情况调查表
   */
  editHealthManagement(id) {
    // 获取用户数据
    this.httpService.get(SystemConstant.HEALTH_MANAGEMENT_DETAIL + '/' + id).subscribe({
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
   * 打开修改(职业卫生管理情况调查表)对话框
   */
  openEdit(myData) {
    const modalRef = this.ngbModal.open(HealthManagementEditComponent);
    modalRef.componentInstance.recordHealthManagementRequest = myData;
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }

  /**
   * 删除--职业卫生管理情况调查表
   */
  delHealthManagement(id) {
    const confirmCfg = new ConfirmConfig('确定删除！');
    this.modalService.confirm(confirmCfg).then(
      () => {
        this.httpService.post(SystemConstant.HEALTH_MANAGEMENT_DEL + '/' + id , {} ).subscribe({
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
