import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {QuillEditorComponent} from 'ngx-quill';
import {WaitService} from '../../core/wait/wait.service';
import {ToastService} from '../../toast/toast.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpService} from '../../core/http/http.service';
import {ModalService} from '../../modal/modal.service';
import 'jquery';
declare var $: any;

@Component({
  selector: 'app-system-notice-detail',
  templateUrl: './system-notice-detail.component.html',
  styleUrls: ['./system-notice-detail.component.scss']
})
export class SystemNoticeDetailComponent implements OnInit {

  noticeEditTitle = '';
  action = '';
  addFlag = null;
  @Input() sysNotice = {
    id : '',
    noticeTitle: '',
    noticeContent: '',
    noticeReleaseDate: ''
  };
  constructor(
    private modalService: ModalService,
    private httpService: HttpService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.noticeEditTitle = '公告详情';
    $('#noticeContent').append(this.sysNotice.noticeContent);
  }

  /**
   * 关闭模态框
   */
  close() {
    this.activeModal.dismiss('failed');
  }

}
