import {Component, OnInit, ViewChild} from '@angular/core';
import {SimpleDataHttpPageComponent} from '../../simple-data-table/simple-data-http-page/simple-data-http-page.component';
import {ToastService} from '../../toast/toast.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpService} from '../../core/http/http.service';
import {ModalService} from '../../modal/modal.service';
import {Router} from '@angular/router';
import {WaitService} from '../../core/wait/wait.service';
import {SystemConstant} from '../../core/class/system-constant';
import {ControlEffectEditComponent} from '../control-effect-edit/control-effect-edit.component';
import {ToastType} from '../../toast/toast-type.enum';
import {ToastConfig} from '../../toast/toast-config';
import {ConfirmConfig} from '../../modal/confirm/confirm-config';

@Component({
  selector: 'app-control-effect-manage',
  templateUrl: './control-effect-manage.component.html',
  styleUrls: ['./control-effect-manage.component.scss']
})
export class ControlEffectManageComponent implements OnInit {
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
    // 查询列表信息
    this.url = SystemConstant.CONTROL_EFFECT_PAGE_LIST;
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
   * 新增--职建设项目概况调查表（控制效果评价）
   */
  addControlEffect() {
    const modalRef = this.ngbModal.open(ControlEffectEditComponent);
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }
  // 打开详细页（TODO）
  open() {
    // this.router.navigate(['/main/record/recordPreEvaluationDetail'], {queryParams: {id: 1}});
  }

  /**
   * 修改--建设项目概况调查表记录
   */
  editControlEffect(id) {
    // 获取详细信息数据
    this.httpService.get(SystemConstant.CONTROL_EFFECT_DETAIL + '/' + id).subscribe({
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
   * 打开修改(建设项目概况调查表)对话框
   */
  openEdit(myData) {
    const modalRef = this.ngbModal.open(ControlEffectEditComponent);
    modalRef.componentInstance.recordControlEffectRequest = myData;
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
  delControlEffect(id) {
    const confirmCfg = new ConfirmConfig('确定删除！');
    this.modalService.confirm(confirmCfg).then(
      () => {
        this.httpService.post(SystemConstant.CONTROL_EFFECT_DEL + '/' + id , {} ).subscribe({
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
