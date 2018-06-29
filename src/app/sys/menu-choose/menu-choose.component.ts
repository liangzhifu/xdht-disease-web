import {Component, OnInit, ElementRef, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';
import {SystemConstant} from '../../core/class/system-constant';
import {HttpService} from '../../core/http/http.service';
import {ToastService} from '../../toast/toast.service';
import {WaitService} from '../../core/wait/wait.service';
import 'ztree';
import 'jquery';
declare var $: any;


@Component({
  selector: 'app-menu-choose',
  templateUrl: './menu-choose.component.html',
  styleUrls: ['./menu-choose.component.scss']
})
export class MenuChooseComponent implements OnInit {

  @Input() roleId: any = null;
  setting = {
    data: {
      simpleData: {
        enable: true,
        pIdKey: 'parentId'
      },
      key: {
        name: 'menuName'
      }
    },
    check: {
      enable: true,
      chkStyle: 'checkbox',
      autoCheckTrigger: true,
      chkboxType: {Y: 'p', N: 's'}
    }
  };
  zNodes = null;
  constructor(
    public el: ElementRef,
    private activeModal: NgbActiveModal,
    private httpService: HttpService,
    private toastService: ToastService,
    private waitService: WaitService
  ) { }

  ngOnInit() {
    this.httpService.post(SystemConstant.MENU_ZTREE_LIST, {}).subscribe({
      next: (data) => {
        this.zNodes = data;
        $.fn.zTree.init($('#ztree'), this.setting, this.zNodes);
        // 获取角色菜单
        this.getRoleMenu();
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '',  '获取用户菜单失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {}
    });
  }

  /**
   * 获取角色菜单关联
   */
  getRoleMenu() {
    const zTree = $.fn.zTree.getZTreeObj('ztree');
    this.httpService.post(SystemConstant.ROLE_MENU_LIST, {roleId: this.roleId}).subscribe({
      next: (data) => {
        for (let i = 0; i < data.length; i ++) {
          const sysRoleMenu = data[i];
          const menuId = sysRoleMenu.menuId;
          const node = zTree.getNodeByParam('id', menuId);
          node.checked = true;
          zTree.updateNode(node);
        }
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '',  '获取角色菜单关联失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {
      }
    });
  }

  /**
   * 关闭角色修改框
   */
  close() {
    this.activeModal.dismiss('failed');
  }

  /**
   * 提交数据
   */
  submitData() {
    const treeObj = $.fn.zTree.getZTreeObj('ztree');
    const nodes = treeObj.getCheckedNodes();
    let menuIds = '';
    if (nodes != null) {
      for (let i = 0; i < nodes.length; i++) {
        menuIds += ',' + nodes[i].id;
      }
      if (menuIds !== '') {
        menuIds = menuIds.substring(1);
      }
    }
    this.waitService.wait(true);
    this.httpService.post(SystemConstant.ROLE_MENU_EDIT, {roleId: this.roleId, menuIds: menuIds}).subscribe({
      next: (data) => {
        const toastCfg = new ToastConfig(ToastType.SUCCESS, '',  '修改角色菜单成功！', 3000);
        this.toastService.toast(toastCfg);
        this.activeModal.close('success');
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '',  '修改角色菜单失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
        this.activeModal.dismiss('failed');
      },
      complete: () => {
      }
    });
    this.waitService.wait(false);
  }
}
