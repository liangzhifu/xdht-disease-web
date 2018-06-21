import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {WaitService} from '../../core/wait/wait.service';
import {ToastService} from '../../toast/toast.service';
import {ModalService} from '../../modal/modal.service';
import {HttpService} from '../../core/http/http.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastType} from '../../toast/toast-type.enum';
import {ToastConfig} from '../../toast/toast-config';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.scss']
})
export class MenuEditComponent implements OnInit {
  @Input() parentId = 0;
  @Input() sysMenu: any = {
    id : '',
    parentId : '',
    menuName : '',
    menuType : '',
    menuHref : '',
    menuIcon : '',
    permission : ''
  };
  menuEditTitle: string;
  addFlag: boolean;
  action = '';
  constructor(
    private modalService: ModalService,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private toastService: ToastService,
    private waitService: WaitService
  ) {
  }

  ngOnInit() {
    if (this.sysMenu.id === undefined || this.sysMenu.id === null || this.sysMenu.id === '') {
      this.action = '新增';
      this.addFlag = true;
      this.menuEditTitle = '新增菜单';
    } else {
      this.action = '修改';
      this.addFlag = false;
      this.menuEditTitle = '修改用户';
    }
  }

  /**
   * 关闭角色修改框
   */
  close() {
    this.activeModal.dismiss('failed');
  }

  /**
   * 提交菜单信息
   */
  submitData() {
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.MENU_ADD;
      this.sysMenu.parentId = this.parentId;
    } else {
      url = SystemConstant.MENU_EDIT;
    }
    this.httpService.post(url, this.sysMenu).subscribe({
      next: () => {
        const toastCfg = new ToastConfig(ToastType.SUCCESS, '', this.action + '菜单成功！', 3000);
        this.toastService.toast(toastCfg);
        this.activeModal.close('success');
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', this.action + '菜单失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
        this.activeModal.dismiss('failed');
      },
      complete: () => {
      }
    });
    this.waitService.wait(false);
  }
}
