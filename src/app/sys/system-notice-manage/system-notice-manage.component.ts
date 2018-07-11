import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SimpleDataHttpPageComponent} from '../../simple-data-table/simple-data-http-page/simple-data-http-page.component';
import {WaitService} from '../../core/wait/wait.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastType} from '../../toast/toast-type.enum';
import {ToastConfig} from '../../toast/toast-config';
import {ToastService} from '../../toast/toast.service';
import {HttpService} from '../../core/http/http.service';
import {ModalService} from '../../modal/modal.service';
import {SystemNoticeDetailComponent} from '../system-notice-detail/system-notice-detail.component';
import {TitleService} from '../../title.service';

@Component({
  selector: 'app-system-notice-manage',
  templateUrl: './system-notice-manage.component.html',
  styleUrls: ['./system-notice-manage.component.scss']
})
export class SystemNoticeManageComponent implements OnInit, AfterViewInit {
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
    this.titleService.titleEventEmitter.emit('系统公告');
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
   * 编辑公告
   */
  openSystemNotice(id) {
    // 获取用户数据
    this.httpService.get(SystemConstant.NOTICE_DETAIL + '/' + id).subscribe({
      next: (data) => {
        this.openDetailNotice(data);
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', '获取公告详情失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {}
    });
  }

  openDetailNotice(noticeData) {
    const modalRef = this.ngbModal.open(SystemNoticeDetailComponent, {size: 'lg', backdrop: 'static', keyboard: false, centered: true});
    modalRef.componentInstance.sysNotice = noticeData;
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }

}
