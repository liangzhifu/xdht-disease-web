import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ToastService} from '../../toast/toast.service';
import {WaitService} from '../../core/wait/wait.service';
import {HttpService} from '../../core/http/http.service';
import {SystemConstant} from '../../core/class/system-constant';
import {SimpleDataHttpPageComponent} from '../../simple-data-table/simple-data-http-page/simple-data-http-page.component';
import {Router} from '@angular/router';
import {ModalService} from '../../modal/modal.service';
import {PreEvaluationEditComponent} from '../pre-evaluation-edit/pre-evaluation-edit.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';
import {ConfirmConfig} from '../../modal/confirm/confirm-config';
@Component({
  selector: 'app-pre-evaluation-manage',
  templateUrl: './pre-evaluation-manage.component.html',
  styleUrls: ['./pre-evaluation-manage.component.scss']
})
export class PreEvaluationManageComponent implements OnInit {
  url: String;
  method: 'post';
  recordData: any;
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
    this.url = SystemConstant.PRE_EVALUATION_PAGE_LIST;
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
   * 新增--职业卫生现场调查记录
   */
  addPreEvaluation() {
    const modalRef = this.ngbModal.open(PreEvaluationEditComponent);
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
   * 修改--建设项目概况调查表记录
   */
  editPreEvaluation(id) {
    // 获取用户数据
    this.httpService.get(SystemConstant.PRE_EVALUATION_DETAIL + '/' + id).subscribe({
      next: (data) => {
        this.openEditScene(data);
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', '获取详情失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {}
    });
  }

  /**
   * 打开修改(建设项目概况调查表)对话框
   */
  openEditScene(myData) {
    const modalRef = this.ngbModal.open(PreEvaluationEditComponent);
    this.recordData = myData;
    modalRef.componentInstance.recordPreEvaluationRequest = myData;
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }

  /**
   * 删除--职业卫生现场调查记录
   */
  delPreEvaluation(id) {
    const confirmCfg = new ConfirmConfig('确定删除！');
    this.modalService.confirm(confirmCfg).then(
      () => {
        this.httpService.post(SystemConstant.PRE_EVALUATION_DEL + '/' + id , {} ).subscribe({
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
