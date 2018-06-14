import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
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
  @Input() menuData: any = null;
  menuEditTitle: string;
  addFlag: boolean;
  action = '';
  menuEditFormGroup: FormGroup;
  constructor(
    private modalService: ModalService,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private toastService: ToastService,
    private waitService: WaitService
  ) {
    this.menuEditFormGroup = this.formBuilder.group({
      id: '',
      parentId: '',
      parentIds: '',
      menuName: '',
      menuHref: '',
      menuIcon: '',
      menuColor: '',
      isShow: '',
      menuType: '',
      permission: '',
      status: '',
      remarks: ''
    });
  }

  ngOnInit() {
    if (this.menuData === undefined || this.menuData === null) {
      this.action = '新增';
      this.addFlag = true;
      this.menuEditTitle = '新增菜单';
    } else {
      this.action = '修改';
      this.addFlag = false;
      this.menuEditTitle = '修改用户';
      this.menuEditFormGroup.controls['id'].setValue(this.menuData.id);
      this.menuEditFormGroup.controls['parentId'].setValue(this.menuData.parentId);
      this.menuEditFormGroup.controls['parentIds'].setValue(this.menuData.parentIds);
      this.menuEditFormGroup.controls['menuName'].setValue(this.menuData.menuName);
      this.menuEditFormGroup.controls['menuHref'].setValue(this.menuData.menuHref);
      this.menuEditFormGroup.controls['menuIcon'].setValue(this.menuData.menuIcon);
      this.menuEditFormGroup.controls['menuColor'].setValue(this.menuData.menuColor);
      this.menuEditFormGroup.controls['isShow'].setValue(this.menuData.isShow);
      this.menuEditFormGroup.controls['menuType'].setValue(this.menuData.menuType);
      this.menuEditFormGroup.controls['permission'].setValue(this.menuData.permission);
      this.menuEditFormGroup.controls['status'].setValue(this.menuData.status);
      this.menuEditFormGroup.controls['remarks'].setValue(this.menuData.remarks);
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
  menuEditSubmit() {
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.MENU_ADD;
    } else {
      url = SystemConstant.MENU_EDIT;
    }
    this.httpService.post(url, this.menuEditFormGroup.value).subscribe({
      next: (data) => {
        const status = data.status;
        if (status === '0') {
          const toastCfg = new ToastConfig(ToastType.SUCCESS, '', this.action + '菜单成功！', 3000);
          this.toastService.toast(toastCfg);
          this.activeModal.close('success');
        } else {
          const toastCfg = new ToastConfig(ToastType.ERROR, '', this.action + '菜单失败！' + '失败原因：' + data.message, 3000);
          this.toastService.toast(toastCfg);
          this.activeModal.dismiss('failed');
        }
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
