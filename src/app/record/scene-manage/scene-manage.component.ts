import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpService} from '../../core/http/http.service';
import {ToastConfig} from '../../toast/toast-config';
import {SimpleDataHttpPageComponent} from '../../simple-data-table/simple-data-http-page/simple-data-http-page.component';
import {ConfirmConfig} from '../../modal/confirm/confirm-config';
import {ToastType} from '../../toast/toast-type.enum';
import {ModalService} from '../../modal/modal.service';
import {SystemConstant} from '../../core/class/system-constant';
import {WaitService} from '../../core/wait/wait.service';
import {ToastService} from '../../toast/toast.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {SceneEditComponent} from '../scene-edit/scene-edit.component';
import {SceneDetailComponent} from '../scene-detail/scene-detail.component';

@Component({
  selector: 'app-record-scene-manage',
  templateUrl: './scene-manage.component.html',
  styleUrls: ['./scene-manage.component.scss']
})
export class SceneManageComponent implements OnInit {
  url: String;
  method: 'post';

  @ViewChild('sdhp', undefined) sdhp: SimpleDataHttpPageComponent;
  /**
   * 查询条件
   */
  param: any = {
    projectName: ''
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
    this.url = SystemConstant.RECORD_SCENE_PAGE_LIST;
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
  addScene() {
    const modalRef = this.ngbModal.open(SceneEditComponent, {size: 'lg'});
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }

  open() {
    this.router.navigate(['/main/record/recordSceneDetail'], {queryParams: {id: 1}});
  }

  /**
   * 修改--职业卫生现场调查记录
   */
  editScene(id) {
    // 获取职业卫生现场调查记录数据
    this.httpService.get(SystemConstant.RECORD_SCENE_DETAIL + '/' + id).subscribe({
      next: (data) => {
        this.openEditScene(data);
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', '获取用户详情失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {}
    });
  }

  /**
   * 详情
   * @param id
   */
  detailScene(id) {
    // 获取职业卫生现场调查记录数据
    this.httpService.get(SystemConstant.RECORD_SCENE_DETAIL + '/' + id).subscribe({
      next: (data) => {
        this.openDetailScene(data);
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', '获取用户详情失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {}
    });
  }

  /**
   * 打开修改(职业卫生现场调查记录)对话框
   */
  openEditScene(recordSceneData) {
    const modalRef = this.ngbModal.open(SceneEditComponent);
    modalRef.componentInstance.recordSceneRequest = recordSceneData;
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }
  /**
   * 打开详情职业卫生现场调查记录)对话框
   */
  openDetailScene(recordSceneData) {
    const modalRef = this.ngbModal.open(SceneDetailComponent);
    modalRef.componentInstance.recordSceneRequest = recordSceneData;
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
  delScene(userId, userName) {
    const confirmCfg = new ConfirmConfig('确定删除用户：' + userName + '！');
    this.modalService.confirm(confirmCfg).then(
      () => {
        this.httpService.get(SystemConstant.USER_DEL + '?id=' + userId).subscribe({
          next: (data) => {
            const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '删除用户成功！', 3000);
            this.toastService.toast(toastCfg);
            this.search();
            const status = data.status;
            // if (status === '0') {
            //   const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '删除用户成功！', 3000);
            //   this.toastService.toast(toastCfg);
            //   this.search();
            // } else {
            //   const toastCfg = new ToastConfig(ToastType.ERROR, '', '删除用户失败！' + '失败原因：' + data.message, 3000);
            //   this.toastService.toast(toastCfg);
            // }
          },
          error: (err) => {
            const toastCfg = new ToastConfig(ToastType.ERROR, '',  '删除用户失败！' + '失败原因：' + err, 3000);
            this.toastService.toast(toastCfg);
          },
          complete: () => {}
        });
      }
    );
  }
}
