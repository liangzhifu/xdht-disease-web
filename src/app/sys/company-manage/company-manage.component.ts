import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {WaitService} from '../../core/wait/wait.service';
import {ToastConfig} from '../../toast/toast-config';
import {ConfirmConfig} from '../../modal/confirm/confirm-config';
import {SystemConstant} from '../../core/class/system-constant';
import {SimpleDataHttpPageComponent} from '../../simple-data-table/simple-data-http-page/simple-data-http-page.component';
import {ModalService} from '../../modal/modal.service';
import {HttpService} from '../../core/http/http.service';
import {ToastService} from '../../toast/toast.service';
import {ToastType} from '../../toast/toast-type.enum';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CompanyEditComponent} from '../company-edit/company-edit.component';
import {CompanyOfficeManageComponent} from '../company-office-manage/company-office-manage.component';
import 'jquery';
declare var $: any;

@Component({
  selector: 'app-company-manage',
  templateUrl: './company-manage.component.html',
  styleUrls: ['./company-manage.component.scss']
})
export class CompanyManageComponent implements OnInit,AfterViewInit {

  url: String;
  method: 'post';

  @ViewChild('sdhp', undefined) sdhp: SimpleDataHttpPageComponent;
  /**
   * 查询条件
   */
  param: any = {
    componentName: '',
    contactUsername: '',
    legalRepresentative: '',
    belongToJurisdiction: '',
    companyNature: '',
    establishDate: ''
  };
  companyNature: any;
  constructor(
    private ngbModal: NgbModal,
    private waitService: WaitService,
    private modalService: ModalService,
    private httpService: HttpService,
    private toastService: ToastService
  ) {
    // 获取单位性质
    this.httpService.post(SystemConstant.DICTIONARY_LIST, {dictionaryTypeId: 7} ).subscribe({
      next: (data) => {
        this.companyNature = data;
      },
      complete: () => {
      }
    });
  }

  ngOnInit() {
    this.url = SystemConstant.COMPANY_PAGE_LIST;
  }

  ngAfterViewInit() {
    this.search();
  }


  /**
   * 查询
   */
  search() {
    this.param.establishDate = $('#establishDate').val();
    this.waitService.wait(true);
    this.sdhp.search();
    this.waitService.wait(false);
  }

  /**
   * 新增企业
   */
  addCompany() {
    const modalRef = this.ngbModal.open(CompanyEditComponent, {backdrop: 'static', keyboard: false, size: 'lg', centered: true});
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }

  /**
   * 修改企业
   */
  editCompany(companyId) {
    // 获取企业数据
    this.httpService.get(SystemConstant.COMPANY_DETAIL + '/' + companyId).subscribe({
      next: (data) => {
        this.openEditCompany(data);
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', '获取企业详情失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {}
    });
  }

  /**
   * 打开修改企业对话框
   */
  openEditCompany(companyData) {
    const modalRef = this.ngbModal.open(CompanyEditComponent, {backdrop: 'static', keyboard: false, size: 'lg', centered: true});
    modalRef.componentInstance.sysCompany = companyData;
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }

  /**
   * 删除企业
   */
  delCompany(companyId, companyName) {
    const confirmCfg: ConfirmConfig = new ConfirmConfig('确定删除企业：' + companyName + '！');
    this.modalService.confirm(confirmCfg).then(
      () => {
        this.httpService.get(SystemConstant.COMPANY_DEL + '?id=' + companyId).subscribe({
          next: (data) => {
              const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '删除企业成功！', 3000);
              this.toastService.toast(toastCfg);
              this.search();
          },
          error: (err) => {
            const toastCfg = new ToastConfig(ToastType.ERROR, '',  '删除企业失败！' + '失败原因：' + err, 3000);
            this.toastService.toast(toastCfg);
          },
          complete: () => {}
        });
      }
    );
  }

  /**
   * 修改公司部门
   * @param companyId
   */
  editCompanyOffice(companyId) {
    const modalRef = this.ngbModal.open(CompanyOfficeManageComponent, {backdrop: 'static', keyboard: false, size: 'lg', centered: true});
    modalRef.componentInstance.companyId = companyId;
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
        }
      }
    );
  }
}
