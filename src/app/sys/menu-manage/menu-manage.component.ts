import { Component, OnInit, ViewChild } from '@angular/core';
import { SimpleDataHttpPageComponent } from '../../simple-data-table/simple-data-http-page/simple-data-http-page.component';
import { WaitService } from '../../core/wait/wait.service';
import { ToastService } from '../../toast/toast.service';
import { ModalService } from '../../modal/modal.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from '../../core/http/http.service';
import { SystemConstant } from '../../core/class/system-constant';
import { MenuEditComponent} from '../menu-edit/menu-edit.component';
import { ToastType } from '../../toast/toast-type.enum';
import { ToastConfig } from '../../toast/toast-config';
import { ConfirmConfig } from '../../modal/confirm/confirm-config';

@Component({
  selector: 'app-menu-manage',
  templateUrl: './menu-manage.component.html',
  styleUrls: ['./menu-manage.component.scss']
})
export class MenuManageComponent implements OnInit {
  method: 'post';

  @ViewChild('sdhp', undefined) sdhp: SimpleDataHttpPageComponent;
  /**
   * 查询条件
   */
  param: any = {
    menuName: ''
  };
  constructor(
    private ngbModal: NgbModal,
    private waitService: WaitService,
    private modalService: ModalService,
    private httpService: HttpService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
  }

  /**
   * 查询方法
   */
  search() {
    this.waitService.wait(true);
    this.sdhp.search();
    this.waitService.wait(false);
  }

  /**
   * 添加
   */
  addMenu() {
    const modalRef = this.ngbModal.open(MenuEditComponent);
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }

  /**
   * 修改
   */
  editMenu(menuId) {
    // 获取菜单数据
    this.httpService.get(SystemConstant.MENU_DETAIL + '/' + menuId).subscribe({
      next: (data) => {
        this.openEditMenu(data);
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', '获取菜单详情失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {}
    });
  }
  /**
   * 打开修改菜单对话框
   */
  openEditMenu(menuData) {
    const modalRef = this.ngbModal.open(MenuEditComponent);
    modalRef.componentInstance.menuData = menuData;
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }

  /**
   * 删除
   * @param menuId
   * @param menuName
   */
  delMenu(menuId, menuName) {
    const confirmCfg = new ConfirmConfig('确定删除菜单：' + menuName + '！');
    this.modalService.confirm(confirmCfg).then(
      () => {
        this.httpService.get(SystemConstant.MENU_DEL + '/' + menuId).subscribe({
          next: (data) => {
            const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '删除菜单成功！', 3000);
            this.toastService.toast(toastCfg);
            this.search();
            const status = data.status;
            // if (status === '0') {
            //   const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '删除菜单成功！', 3000);
            //   this.toastService.toast(toastCfg);
            //   this.search();
            // } else {
            //   const toastCfg = new ToastConfig(ToastType.ERROR, '', '删除菜单失败！' + '失败原因：' + data.message, 3000);
            //   this.toastService.toast(toastCfg);
            // }
          },
          error: (err) => {
            const toastCfg = new ToastConfig(ToastType.ERROR, '',  '删除菜单失败！' + '失败原因：' + err, 3000);
            this.toastService.toast(toastCfg);
          },
          complete: () => {}
        });
      }
    );
  }





}
