import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalService} from '../../modal/modal.service';
import {WaitService} from '../../core/wait/wait.service';
import {HttpService} from '../../core/http/http.service';
import {NgbActiveModal, NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
import {ToastService} from '../../toast/toast.service';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastType} from '../../toast/toast-type.enum';
import {ToastConfig} from '../../toast/toast-config';
import {QuillEditorComponent} from 'ngx-quill';
import 'jquery';
import {CustomDatepickerI18nService} from '../../core/I18n/custom-datepicker-i18n.service';
import {I18nService} from '../../core/I18n/i18n.service';
declare var $: any;

@Component({
  selector: 'app-notice-edit',
  templateUrl: './notice-edit.component.html',
  styleUrls: ['./notice-edit.component.scss'],
  providers: [I18nService, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18nService}]
})
export class NoticeEditComponent implements OnInit {

  noticeEditTitle = '';
  action = '';
  addFlag = null;
  @Input() sysNotice = {
    id : '',
    noticeTitle: '',
    noticeContent: '',
    noticeReleaseDate: ''
  };
  @ViewChild('editor') editor: QuillEditorComponent;
  constructor(
    private modalService: ModalService,
    private httpService: HttpService,
    private activeModal: NgbActiveModal,
    private toastService: ToastService,
    private waitService: WaitService
  ) { }

  ngOnInit() {
    if (this.sysNotice.id === undefined || this.sysNotice.id  === null || this.sysNotice.id === '') {
      this.action = '新增';
      this.addFlag = true;
      this.noticeEditTitle = '新增公告';
    } else {
      this.action = '修改';
      this.addFlag = false;
      this.noticeEditTitle = '修改公告';
    }
    this.editor.writeValue(this.sysNotice.noticeContent);
  }

  /**
   * 内容改变
   * @param data 值
   */
  contentChanged(data) {
    this.sysNotice.noticeContent = data.html;
  }

  /**
   * 关闭模态框
   */
  close() {
    this.activeModal.dismiss('failed');
  }

  /**
   * 提交数据
   */
  submitData() {
    this.sysNotice.noticeReleaseDate = $('#noticeReleaseDate').val();
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.NOTICE_ADD;
    } else {
      url = SystemConstant.NOTICE_EDIT;
    }
    this.httpService.post(url, this.sysNotice).subscribe({
      next: (data) => {
        const toastCfg = new ToastConfig(ToastType.SUCCESS, '', this.action + '公告成功！', 3000);
        this.toastService.toast(toastCfg);
        this.activeModal.close('success');
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', this.action + '公告失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
        this.activeModal.dismiss('failed');
      },
      complete: () => {
      }
    });
    this.waitService.wait(false);
  }
}
