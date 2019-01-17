import { Component, OnInit } from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {SystemConstant} from '../../core/class/system-constant';
import {SessionStorageService} from '../../core/storage/session-storage.service';
import {ToastType} from '../../toast/toast-type.enum';
import {ToastConfig} from '../../toast/toast-config';
import {ToastService} from '../../toast/toast.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-upload-employee',
  templateUrl: './upload-employee.component.html',
  styleUrls: ['./upload-employee.component.scss']
})
export class UploadEmployeeComponent implements OnInit {
  authToken: string;
  uploader: FileUploader;
  constructor(
    private sessionStorageService: SessionStorageService,
    private toastService: ToastService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.authToken = this.sessionStorageService.get('token');
    this.uploader = new FileUploader({
      url: SystemConstant.EMPLOYEE_EXCEL,
      method: 'POST',
      itemAlias: 'uploadFile',
      authToken: this.authToken,
      authTokenHeader: 'authorization',
      removeAfterUpload: true
    });
  }

  /**
   * 选择文件上传
   */
  selectedFileOnChanged() {
    // 上传
    this.uploader.queue[0].onSuccess = this.fileSuccess.bind(this);
    this.uploader.queue[0].upload(); // 开始上传
  }

  /**
   * 文件上传成功回调函数
   * @param response
   * @param status
   */
  fileSuccess(response, status) {
    // 上传文件成功
    if (status === 200) {
      // 上传文件后获取服务器返回的数据
      const ret = JSON.parse(response);
      if ( ret.code === 100 ) {
        const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '文件上传成功！', 3000);
        this.toastService.toast(toastCfg);
        this.activeModal.dismiss('success');
      } else {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', '文件上传失败！' + ret.message, 3000);
        this.toastService.toast(toastCfg);
        this.activeModal.dismiss('failed');
      }
    } else {
      // 上传文件后获取服务器返回的数据错误
      const toastCfg = new ToastConfig(ToastType.ERROR, '', '文件上传失败！', 3000);
      this.toastService.toast(toastCfg);
      this.activeModal.dismiss('failed');
    }
  }
}
