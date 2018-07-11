import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SimpleDataHttpPageComponent} from '../../simple-data-table/simple-data-http-page/simple-data-http-page.component';
import {SystemConstant} from '../../core/class/system-constant';
import {ModalService} from '../../modal/modal.service';
import {WaitService} from '../../core/wait/wait.service';
import {HttpService} from '../../core/http/http.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastService} from '../../toast/toast.service';
import {NoticeEditComponent} from '../notice-edit/notice-edit.component';
import {ToastType} from '../../toast/toast-type.enum';
import {ToastConfig} from '../../toast/toast-config';
import {TitleService} from '../../title.service';

@Component({
  selector: 'app-notice-manage',
  templateUrl: './notice-manage.component.html',
  styleUrls: ['./notice-manage.component.scss']
})
export class NoticeManageComponent implements OnInit,AfterViewInit {
  url: String;
  method: 'post';

  @ViewChild('sdhp', undefined) sdhp: SimpleDataHttpPageComponent;
  /**
   * 查询条件
   */
  param: any = {
    noticeTitle: ''
  };
  constructor(
    private ngbModal: NgbModal,
    private waitService: WaitService,
    private modalService: ModalService,
    private httpService: HttpService,
    private toastService: ToastService,
    private titleService: TitleService
  ) {
    this.titleService.titleEventEmitter.emit('公告编辑');
  }

  ngOnInit() {
    this.url = SystemConstant.NOTICE_PAGE_LIST;
  }

  ngAfterViewInit() {
    this.search();
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
   * 新增公告
   */
  addNotice() {
    const modalRef = this.ngbModal.open(NoticeEditComponent, {size: 'lg', backdrop: 'static', keyboard: false, centered: true});
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }

  /**
   * 编辑公告
   */
  editNotice(id) {
    // 获取用户数据
    this.httpService.get(SystemConstant.NOTICE_DETAIL + '/' + id).subscribe({
      next: (data) => {
        this.openEditNotice(data);
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', '获取公告详情失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {}
    });
  }

  openEditNotice(noticeData) {
    const modalRef = this.ngbModal.open(NoticeEditComponent, {size: 'lg', backdrop: 'static', keyboard: false, centered: true});
    modalRef.componentInstance.sysNotice = noticeData;
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }

  /**
   * 删除公告
   */
  delNotice() {

  }
}
