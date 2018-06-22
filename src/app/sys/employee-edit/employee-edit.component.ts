import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SystemConstant} from '../../core/class/system-constant';
import {HttpService} from '../../core/http/http.service';
import {ToastService} from '../../toast/toast.service';
import {WaitService} from '../../core/wait/wait.service';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';
import {ModalService} from '../../modal/modal.service';
import {AlertType} from '../../modal/alert/alert-type';
import {AlertConfig} from '../../modal/alert/alert-config';
import {CompanyOfficeChooseComponent} from '../company-office-choose/company-office-choose.component';
import 'jquery';
declare var $: any;

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {

  @Input() sysEmpoiyeeRequest = {
    sysEmployee: {
      id: '',
      officeId: '',
      empName: '',
      empSex: '',
      empNative: '',
      empMarriage: '',
      empEducation: '',
      empHobby: '',
      empWorkDate: '',
      empIdentityNumber: ''
    },
    sysCompanyOffice: {
      id : '',
      companyId: '',
      officeName: ''
    },
    sysEmployeeJobList: [{
      id: '',
      employeeId: '',
      beginDate: '',
      endDate: '',
      companyName: '',
      workType: '',
      noiseDetectionResults: '',
      protectiveMeasures: '',
      status: ''
    }],
    sysEmployeeCaseList: [{
      id: '',
      employeeId: '',
      caseName: '',
      diagnosisDate: '',
      diagnosisHospital: '',
      treatmentResults: '',
      remarks: '',
      status: ''
    }],
    sysEmployeeDiseaseList: [{
      id: '',
      employeeId: '',
      diseaseName: '',
      diagnosisDate: '',
      diagnosisHospital: '',
      diagnosisLevel: '',
      remarks: '',
      status: ''
    }]
  };
  companyList = [{id: '', companyName: ''}];
  sysWorkTypeList = [{id: '', name: ''}];
  employeeEditTitle: string;
  addFlag: boolean;
  action = '';
  constructor(
    private ngbModal: NgbModal,
    private modalService: ModalService,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private toastService: ToastService,
    private waitService: WaitService
  ) {
  }

  ngOnInit() {
    // 获取部门列表
    this.httpService.post(SystemConstant.COMPANY_LIST, {} ).subscribe({
      next: (data) => {
        this.companyList = data;
      },
      complete: () => {
      }
    });
    // 获取工种列表
    this.httpService.post(SystemConstant.WORK_TYPE_LIST, {} ).subscribe({
      next: (data) => {
        this.sysWorkTypeList = data;
      },
      complete: () => {
      }
    });
    const preEvaluationId = this.sysEmpoiyeeRequest.sysEmployee.id;
    console.log(preEvaluationId);
    if (preEvaluationId === undefined || preEvaluationId === null || preEvaluationId === '') {
      this.action = '新增';
      this.addFlag = true;
      this.employeeEditTitle = '新增职工信息';
    } else {
      this.action = '修改';
      this.addFlag = false;
      this.employeeEditTitle = '修改职工信息';
    }
  }

  /**
   * 关闭职工修改框
   */
  close() {
    this.activeModal.dismiss('failed');
  }

  /**
   * 提交职工信息
   */
  submitData() {
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.EMPLOYEE_ADD;
    } else {
      url = SystemConstant.EMPLOYEE_EDIT;
    }
    this.sysEmpoiyeeRequest.sysEmployee.officeId = this.sysEmpoiyeeRequest.sysCompanyOffice.id;
    this.sysEmpoiyeeRequest.sysEmployee.empWorkDate = $('#sysEmployeeEmpWorkDate').val();
    for (let i = 0; i < this.sysEmpoiyeeRequest.sysEmployeeCaseList.length; i++) {
      this.sysEmpoiyeeRequest.sysEmployeeCaseList[i].diagnosisDate = $('#employeeCase_' + i + '_diagnosisDate').val();
    }
    for (let i = 0; i < this.sysEmpoiyeeRequest.sysEmployeeDiseaseList.length; i++) {
      this.sysEmpoiyeeRequest.sysEmployeeDiseaseList[i].diagnosisDate = $('#employeeDisease_' + i + '_diagnosisDate').val();
    }
    for (let i = 0; i < this.sysEmpoiyeeRequest.sysEmployeeJobList.length; i++) {
      this.sysEmpoiyeeRequest.sysEmployeeJobList[i].beginDate = $('#employeeJob_' + i + '_beginDate').val();
      this.sysEmpoiyeeRequest.sysEmployeeJobList[i].endDate = $('#employeeJob_' + i + '_endDate').val();
    }
    this.httpService.post(url, this.sysEmpoiyeeRequest).subscribe({
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

  /**
   * 增加职业史
   */
  addJob() {
    const index = this.sysEmpoiyeeRequest.sysEmployeeJobList.length;
    this.sysEmpoiyeeRequest.sysEmployeeJobList[index] = {
      'id': '',
      'employeeId': '',
      'beginDate': '',
      'endDate': '',
      'companyName': '',
      'workType': '',
      'noiseDetectionResults': '',
      'protectiveMeasures': '',
      'status': ''
    };
  }
  /**
   * 删除职业史
   */
  delJob(index) {
    const count = this.sysEmpoiyeeRequest.sysEmployeeJobList.length;
    this.sysEmpoiyeeRequest.sysEmployeeJobList.splice(index, 1);
  }
  /**
   * 增加病史
   */
  addCase() {
    const index = this.sysEmpoiyeeRequest.sysEmployeeCaseList.length;
    this.sysEmpoiyeeRequest.sysEmployeeCaseList[index] = {
      'id': '',
      'employeeId': '',
      'caseName': '',
      'diagnosisDate': '',
      'diagnosisHospital': '',
      'treatmentResults': '',
      'remarks': '',
      'status': ''
    };
  }
  /**
   * 删除病史
   */
  delCase(i) {
    const count = this.sysEmpoiyeeRequest.sysEmployeeCaseList.length;
    this.sysEmpoiyeeRequest.sysEmployeeCaseList.splice(i, 1);
  }
  /**
   * 增加诊断结果
   */
  addDisease() {
    const index = this.sysEmpoiyeeRequest.sysEmployeeDiseaseList.length;
    this.sysEmpoiyeeRequest.sysEmployeeDiseaseList[index] = {
      'id': '',
      'employeeId': '',
      'diseaseName': '',
      'diagnosisDate': '',
      'diagnosisHospital': '',
      'diagnosisLevel': '',
      'remarks': '',
      'status': ''
    };
  }
  /**
   * 删除诊断结果
   */
  delDisease(i) {
    const count = this.sysEmpoiyeeRequest.sysEmployeeDiseaseList.length;
    this.sysEmpoiyeeRequest.sysEmployeeDiseaseList.splice(i, 1);
  }

  /**
   * 选择部门
   */
  searchEmployeeOffice() {
    const companyId = this.sysEmpoiyeeRequest.sysCompanyOffice.companyId;
    if (companyId === undefined || companyId === null || companyId === '') {
      const alertConfig: AlertConfig = new AlertConfig(AlertType.INFO, null, '请先选择一个公司！');
      this.modalService.alert(alertConfig);
      return false;
    }
    const modalRef = this.ngbModal.open(CompanyOfficeChooseComponent);
    modalRef.componentInstance.companyId = companyId;
    modalRef.result.then(
      (result) => {
        if (result.success === 'success') {
          const sysCompanyOffice = result.sysCompanyOffice;
          this.sysEmpoiyeeRequest.sysCompanyOffice.id = sysCompanyOffice.id;
          this.sysEmpoiyeeRequest.sysCompanyOffice.officeName = sysCompanyOffice.officeName;
        }
      }
    );
  }
}
