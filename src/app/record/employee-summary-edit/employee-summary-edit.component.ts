import {Component, Input, OnInit} from '@angular/core';
import {ModalService} from '../../modal/modal.service';
import {WaitService} from '../../core/wait/wait.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SystemConstant} from '../../core/class/system-constant';
import {FormBuilder} from '@angular/forms';
import {HttpService} from '../../core/http/http.service';
import {ToastService} from '../../toast/toast.service';
import {ToastType} from '../../toast/toast-type.enum';
import {ToastConfig} from '../../toast/toast-config';
import 'jquery';
declare var $: any;

@Component({
  selector: 'app-employee-summary-edit',
  templateUrl: './employee-summary-edit.component.html',
  styleUrls: ['./employee-summary-edit.component.scss']
})
export class EmployeeSummaryEditComponent implements OnInit {
  @Input() employeeSummaryRequest = {
    'employeeSummary': {
      id: '',
      empId: '',
      officeId: '',
      workType: '',
      name: '',
      sex: '',
      age: '',
      inspectDate: '',
      inspect: '',
      contactTime: '',
      hazardFactor: '',
      bloodPressureShrink: '',
      bloodPressureDiastole: '',
      heart: '',
      lungs: '',
      skinMucousMembrane: '',
      lymphNode: '',
      thyroidGland: '',
      ear: '',
      whiteBloodCell: '',
      neutrophileGranulocyte: '',
      redBloodCell: '',
      hemoglobin: '',
      platelet: '',
      whiteBloodCellUrine: '',
      urineProtein: '',
      urineOccultBlood: '',
      urineSugar: '',
      altuL: '',
      electrocardiogram: '',
      dbhl500L: '',
      dbhl1kL: '',
      dbhl2kL: '',
      dbhl3kL: '',
      dbhl4kL: '',
      dbhl6kL: '',
      dbhl500R: '',
      dbhl1kR: '',
      dbhl2kR: '',
      dbhl3kR: '',
      dbhl4kR: '',
      dbhl6kR: '',
      status: ''
    },
    'sysCompanyOfficeList': [{
      'id': '',
      'officeName': '',
      'status': ''
    }],
    'SysPostList': [{
      'id': '',
      'postName': ''
    }]
  };
  employeeSummaryEditTitle: string;
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
    // 新增时获取部门列表
    this.httpService.post(SystemConstant.COMPANY_LIST, {} ).subscribe({
      next: (data) => {
        this.employeeSummaryRequest.sysCompanyOfficeList = data;
      },
      complete: () => {
      }
    });
    // 新增时获取工种列表
    this.httpService.post(SystemConstant.SYS_POST_LIST, {} ).subscribe({
      next: (data) => {
        this.employeeSummaryRequest.SysPostList = data;
      },
      complete: () => {
      }
    });
    const preEvaluationId = this.employeeSummaryRequest.employeeSummary.id;
    console.log(preEvaluationId);
    if (preEvaluationId === undefined || preEvaluationId === null || preEvaluationId === '') {
      this.action = '新增';
      this.addFlag = true;
      this.employeeSummaryEditTitle = '新增职工体检信息';
    } else {
      this.action = '修改';
      this.addFlag = false;
      this.employeeSummaryEditTitle = '修改职工体检信息';
    }
  }

  /**
   * 关闭职工体检信息修改框
   */
  close() {
    this.activeModal.dismiss('failed');
  }

  /**
   * 提交职工体检信息信息
   */
  submitData() {
    this.employeeSummaryRequest.employeeSummary.inspectDate = $('#inspectDate').val();
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.EMPLOYEE_SUMMARY_ADD;
    } else {
      url = SystemConstant.EMPLOYEE_SUMMARY_EDIT;
    }
    this.httpService.post(url, this.employeeSummaryRequest).subscribe({
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
