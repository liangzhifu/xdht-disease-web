import {Component, Input, OnInit} from '@angular/core';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';
import {HttpService} from '../../core/http/http.service';
import {ToastService} from '../../toast/toast.service';
import {SystemConstant} from '../../core/class/system-constant';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {WaitService} from '../../core/wait/wait.service';
import 'jquery';
declare var $: any;

@Component({
  selector: 'app-role-choose',
  templateUrl: './role-choose.component.html',
  styleUrls: ['./role-choose.component.scss']
})
export class RoleChooseComponent implements OnInit {

  roleList = null;
  @Input() userId = null;
  constructor(
    private httpService: HttpService,
    private toastService: ToastService,
    private activeModal: NgbActiveModal,
    private waitService: WaitService
  ) { }

  ngOnInit() {
    this.httpService.post(SystemConstant.ROLE_LIST, {}).subscribe({
      next: (data) => {
        this.roleList = data;
        this.getUserRole();
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', '获取角色列表失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {
      }
    });
  }

  /**
   * 获取用户角色关联
   */
  getUserRole() {
    this.httpService.post(SystemConstant.USER_ROlE_LIST, {userId: this.userId}).subscribe({
      next: (data) => {
        for (let i = 0; i < data.length; i ++) {
          const sysUserRole = data[i];
          const roleId = sysUserRole.roleId;
          $('#checkbox_' + roleId).attr('checked', true);
        }
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '',  '获取用户角色关联失败！' + '失败原因：' + err, 3000);
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
    let roleIds = '';
    $('input[type="checkbox"]:checked').each(function () {
      roleIds += ',' + $(this).val();
    });
    if (roleIds !== '') {
      roleIds = roleIds.substring(1);
    }
    this.waitService.wait(true);
    this.httpService.post(SystemConstant.USER_ROlE_EDIT, {userId: this.userId, roleIds: roleIds}).subscribe({
      next: (data) => {
        const toastCfg = new ToastConfig(ToastType.SUCCESS, '',  '修改用户角色成功！', 3000);
        this.toastService.toast(toastCfg);
        this.activeModal.close('success');
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '',  '修改用户角色失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
        this.activeModal.dismiss('failed');
      },
      complete: () => {
      }
    });
    this.waitService.wait(false);
  }
}
