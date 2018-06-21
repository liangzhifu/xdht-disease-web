import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SystemConstant} from '../../core/class/system-constant';
import {HttpService} from '../../core/http/http.service';
import {ToastService} from '../../toast/toast.service';
import {WaitService} from '../../core/wait/wait.service';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';
import {ModalService} from '../../modal/modal.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {

  @Input() sysEmpoiyeeRequest = {
    'sysEmployee': {
      'id': '',
      'officeId': '',
      'empName': '',
      'empSex': '',
      'empNative': '',
      'empMarriage': '',
      'empEducation': '',
      'empHobby': '',
      'empWorkDate': '',
      'empIdentityNumber': '',
      'status': '',
      'remarks': ''
    },
    'sysEmployeeJobList': [{
      'id': '',
      'employeeId': '',
      'beginDate': '',
      'endDate': '',
      'companyName': '',
      'workType': '',
      'noiseDetectionResults': '',
      'protectiveMeasures': '',
      'status': ''
    }],
    'sysEmployeeCaseList': [{
      'id': '',
      'employeeId': '',
      'caseName': '',
      'diagnosisDate': '',
      'diagnosisHospital': '',
      'treatmentResults': '',
      'remarks': '',
      'status': ''
    }],
    'sysEmployeeDiseaseList': [{
      'id': '',
      'employeeId': '',
      'diseaseName': '',
      'diagnosisDate': '',
      'diagnosisHospital': '',
      'diagnosisLevel': '',
      'remarks': '',
      'status': ''
    }],
    'sysCompanyOfficeList': [{
      'id': '',
      'officeName': '',
      'status': ''
    }],
    'sysWorkTypeList': [{
      'id': '',
      'name': ''
    }]
  };
  empoiyeeEditTitle: string;
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
    const preEvaluationId = this.sysEmpoiyeeRequest.sysEmployee.id;
    console.log(preEvaluationId);
    // 新增时获取部门列表
    this.httpService.post(SystemConstant.SYS_COMPANY_OFFICE_LIST, {} ).subscribe({
      next: (data) => {
        this.sysEmpoiyeeRequest.sysCompanyOfficeList = data;
      },
      complete: () => {
      }
    });
    // 新增时获取工种列表
    this.httpService.post(SystemConstant.WORK_TYPE_LIST, {} ).subscribe({
      next: (data) => {
        this.sysEmpoiyeeRequest.sysWorkTypeList = data;
      },
      complete: () => {
      }
    });
    if (preEvaluationId === undefined || preEvaluationId === null || preEvaluationId === '') {
      this.action = '新增';
      this.addFlag = true;
      this.empoiyeeEditTitle = '新增职工信息';
    } else {
      this.action = '修改';
      this.addFlag = false;
      this.empoiyeeEditTitle = '修改职工信息';
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
  empoiyeeEditSubmit() {
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.EMPLOYEE_ADD;
    } else {
      url = SystemConstant.EMPLOYEE_EDIT;
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
    if (count > 1) {
      this.sysEmpoiyeeRequest.sysEmployeeJobList.splice(index, 1);
    } else {
      const toastCfg = new ToastConfig(ToastType.SUCCESS, '', this.action + '至少一条职业史！', 3000);
      this.toastService.toast(toastCfg);
    }
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
    if (count > 1) {
      this.sysEmpoiyeeRequest.sysEmployeeCaseList.splice(i, 1);
    } else {
      const toastCfg = new ToastConfig(ToastType.SUCCESS, '', this.action + '至少一条病史！', 3000);
      this.toastService.toast(toastCfg);
    }
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
    if (count > 1) {
      this.sysEmpoiyeeRequest.sysEmployeeDiseaseList.splice(i, 1);
    } else {
      const toastCfg = new ToastConfig(ToastType.SUCCESS, '', this.action + '至少一条诊断结果！', 3000);
      this.toastService.toast(toastCfg);
    }
  }
}
