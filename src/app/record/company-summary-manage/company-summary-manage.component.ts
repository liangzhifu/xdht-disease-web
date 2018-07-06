import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SystemConstant} from '../../core/class/system-constant';
import {ConfirmConfig} from '../../modal/confirm/confirm-config';
import {ModalService} from '../../modal/modal.service';
import {ToastService} from '../../toast/toast.service';
import {ToastConfig} from '../../toast/toast-config';
import {SimpleDataHttpPageComponent} from '../../simple-data-table/simple-data-http-page/simple-data-http-page.component';
import {HttpService} from '../../core/http/http.service';
import {ToastType} from '../../toast/toast-type.enum';
import {WaitService} from '../../core/wait/wait.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CompanySummaryEditComponent} from '../company-summary-edit/company-summary-edit.component';
import {TitleService} from '../../title.service';

@Component({
  selector: 'app-company-summary-manage',
  templateUrl: './company-summary-manage.component.html',
  styleUrls: ['./company-summary-manage.component.scss']
})
export class CompanySummaryManageComponent implements OnInit, AfterViewInit {
  url: String;
  method: 'post';

  @ViewChild('sdhp', undefined) sdhp: SimpleDataHttpPageComponent;
  /**
   * 查询条件
   */
  param: any = {
    inspectionAgency: ''
  };
  constructor(
    private ngbModal: NgbModal,
    private waitService: WaitService,
    private modalService: ModalService,
    private httpService: HttpService,
    private toastService: ToastService,
    private titleService: TitleService
  ) {
    this.titleService.titleEventEmitter.emit('企业体检信息');
  }

  ngOnInit() {
    this.url = SystemConstant.COMPANY_SUMMARY_MANAGE_PAGE;
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
   * 新增企业体检信息
   */
  addCompanySummary() {
    const modalRef = this.ngbModal.open(CompanySummaryEditComponent, {backdrop: 'static', keyboard: false, size: 'lg', centered: true});
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }

  /**
   * 修改企业体检信息
   */
  editCompanySummary(companySummaryId) {
    // 获取企业体检信息
    this.httpService.get(SystemConstant.COMPANY_SUMMARY_MANAGE_DETAIL + '/' + companySummaryId).subscribe({
      next: (data) => {
        this.openEditCompanySummary(data);
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', '获取企业详情失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {}
    });
  }

  /**
   * 打开修改企业体检信息
   */
  openEditCompanySummary(companySummaryData) {
    const modalRef = this.ngbModal.open(CompanySummaryEditComponent, {backdrop: 'static', keyboard: false, size: 'lg', centered: true});
    modalRef.componentInstance.companySummary = companySummaryData;
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }

  /**
   * 删除企业体检信息
   */
  delCompanySummary(companySummaryId, inspectionDate) {
    const confirmCfg = new ConfirmConfig('确定删除：' + inspectionDate + '企业体检信息' + '！');
    this.modalService.confirm(confirmCfg).then(
      () => {
        this.httpService.get(SystemConstant.COMPANY_SUMMARY_MANAGE_DEL + '?id=' + companySummaryId).subscribe({
          next: (data) => {
            const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '删除企业体检信息成功！', 3000);
            this.toastService.toast(toastCfg);
            this.search();
          },
          error: (err) => {
            const toastCfg = new ToastConfig(ToastType.ERROR, '',  '删除企业体检信息失败！' + '失败原因：' + err, 3000);
            this.toastService.toast(toastCfg);
          },
          complete: () => {}
        });
      }
    );
  }
}
