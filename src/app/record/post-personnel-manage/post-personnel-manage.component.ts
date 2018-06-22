import {Component, OnInit, ViewChild} from '@angular/core';
import {WaitService} from '../../core/wait/wait.service';
import {ToastService} from '../../toast/toast.service';
import {HttpService} from '../../core/http/http.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastType} from '../../toast/toast-type.enum';
import {ToastConfig} from '../../toast/toast-config';
import {SystemConstant} from '../../core/class/system-constant';
import {Router} from '@angular/router';
import {ModalService} from '../../modal/modal.service';
import {SimpleDataHttpPageComponent} from '../../simple-data-table/simple-data-http-page/simple-data-http-page.component';
import {AntiNoiseEditComponent} from '../anti-noise-edit/anti-noise-edit.component';
import {ConfirmConfig} from '../../modal/confirm/confirm-config';
import {PostPersonnelEditComponent} from '../post-personnel-edit/post-personnel-edit.component';

@Component({
  selector: 'app-post-personnel-manage',
  templateUrl: './post-personnel-manage.component.html',
  styleUrls: ['./post-personnel-manage.component.scss']
})
export class PostPersonnelManageComponent implements OnInit {
  url: String;
  method: 'post';
  @ViewChild('sdhp', undefined) sdhp: SimpleDataHttpPageComponent;
  /**
   * 查询条件
   */
  param: any = {
    postPersonnelNo: ''
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
    this.url = SystemConstant.POST_PERSONNEL_PAGE_LIST;
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
   * 新增--岗位定员及工作制度调查表
   */
  addPostPersonnel() {
    const modalRef = this.ngbModal.open(PostPersonnelEditComponent);
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }
  /**
   * 修改--岗位定员及工作制度调查表
   */
  editPostPersonnel(id) {
    // 获取数据
    this.httpService.get(SystemConstant.POST_PERSONNEL_DETAIL + '/' + id).subscribe({
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
   * 打开修改(岗位定员及工作制度调查表)对话框
   */
  openEdit(myData) {
    const modalRef = this.ngbModal.open(PostPersonnelEditComponent);
    modalRef.componentInstance.recordPostPersonnelInputRequest = myData;
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }
  /**
   * 删除--岗位定员及工作制度调查表
   */
  delPostPersonnel(id) {
    const confirmCfg = new ConfirmConfig('确定删除！');
    this.modalService.confirm(confirmCfg).then(
      () => {
        this.httpService.post(SystemConstant.POST_PERSONNEL_DEL + '/' + id , {} ).subscribe({
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
