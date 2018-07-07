import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ModalService} from '../../modal/modal.service';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastService} from '../../toast/toast.service';
import {ToastConfig} from '../../toast/toast-config';
import {HttpService} from '../../core/http/http.service';
import {ToastType} from '../../toast/toast-type.enum';
import {NgbActiveModal, NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
import {WaitService} from '../../core/wait/wait.service';
import 'jquery';
import {I18nService} from '../../core/I18n/i18n.service';
import {CustomDatepickerI18nService} from '../../core/I18n/custom-datepicker-i18n.service';
declare var $: any;

@Component({
  selector: 'app-company-summary-edit',
  templateUrl: './company-summary-edit.component.html',
  styleUrls: ['./company-summary-edit.component.scss'],
  providers: [I18nService, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18nService}]
})
export class CompanySummaryEditComponent implements OnInit {
  @Input() companySummary = {
    id: '',
    companyId: '',
    inspectionDate: '',
    inspectionDatepicker: null,
    inspectionAgency: '',
    physicalExaminationType: '',
    inspectedNumber: '',
    actualInspectdNumber: '',
    noAbnormality: '',
    reviewNumber: '',
    doubtfulNumber: '',
    tabooNumber: '',
    otherDiseasesNumber: '',
    status: '',
    remarks: ''
  };
  companyList = [{id: '', companyName: ''}];
  companySummaryEditTitle: string;
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
    // 获取企业列表
    this.httpService.post(SystemConstant.COMPANY_LIST, {} ).subscribe({
      next: (data) => {
        this.companyList = data;
      },
      complete: () => {
      }
    });
    const preEvaluationId = this.companySummary.id;
    if (preEvaluationId === undefined || preEvaluationId === null || preEvaluationId === '') {
      this.action = '新增';
      this.addFlag = true;
      this.companySummaryEditTitle = '新增企业体检信息';
    } else {
      this.action = '修改';
      this.addFlag = false;
      this.companySummaryEditTitle = '修改企业体检信息';
      $('#inspectionDate').val(this.companySummary.inspectionDate);
      this.companySummary.inspectionDatepicker = {
        year: Number(this.companySummary.inspectionDate.substring(0, 4)),
        month: Number(this.companySummary.inspectionDate.substring(5, 7)),
        day: Number(this.companySummary.inspectionDate.substring(8, 10))
      };
    }
  }

  /**
   * 关闭企业体检信息修改框
   */
  close() {
    this.activeModal.dismiss('failed');
  }

  /**
   * 提交企业体检信息信息
   */
  submitData() {
    this.companySummary.inspectionDate = $('#inspectionDate').val();
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.COMPANY_SUMMARY_MANAGE_ADD;
    } else {
      url = SystemConstant.COMPANY_SUMMARY_MANAGE_EDIT;
    }
    this.httpService.post(url, this.companySummary).subscribe({
      next: (data) => {
        const toastCfg = new ToastConfig(ToastType.SUCCESS, '', this.action + '操作成功！', 3000);
        this.toastService.toast(toastCfg);
        this.activeModal.close('success');
        const status = data.status;
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', this.action + '操作失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
        this.activeModal.dismiss('failed');
      },
      complete: () => {
      }
    });
    this.waitService.wait(false);
  }
}
