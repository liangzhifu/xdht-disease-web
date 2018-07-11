import {Component, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {NgbActiveModal, NgbDatepickerI18n, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SystemConstant} from '../../core/class/system-constant';
import {HttpService} from '../../core/http/http.service';
import {ToastService} from '../../toast/toast.service';
import {WaitService} from '../../core/wait/wait.service';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';
import {ModalService} from '../../modal/modal.service';
import {FileUploader} from 'ng2-file-upload';
import {SessionStorageService} from '../../core/storage/session-storage.service';
import {CompanyOfficeDropdownComponent} from '../company-office-dropdown/company-office-dropdown.component';
import 'jquery';
import {I18nService} from '../../core/I18n/i18n.service';
import {CustomDatepickerI18nService} from '../../core/I18n/custom-datepicker-i18n.service';
declare var $: any;

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss'],
  providers: [I18nService, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18nService}]
})
export class EmployeeEditComponent implements OnInit {
  @ViewChild('acod', undefined) acod: CompanyOfficeDropdownComponent;
  @Input()
  change: any;
  defImg: string;
  authToken: string;
  @Input()
  defType: Number = 1;
  uploader: FileUploader;
  @Input() sysEmployeeRequest = {
    sysEmployee: {
      id: '',
      companyId: '',
      officeId: '',
      empName: '',
      empSex: '',
      empNative: '',
      empMarriage: '',
      empEducation: '',
      empHobby: '',
      empWorkDate: '',
      empIdentityNumber: '',
      imageName: ''
    },
    sysCompanyOffice: {
      id: '',
      companyId: ''
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
  sysWorkTypeList = [{id: '', dictionaryName: ''}];
  sysEmpHobbyList = [{id: '', dictionaryName: ''}];
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
    private waitService: WaitService,
    private sessionStorageService: SessionStorageService
  ) {
  }

  ngOnInit() {
    this.authToken = this.sessionStorageService.get('token');
    this.uploader = new FileUploader({
      url: SystemConstant.FILE_UPLOAD,
      method: 'POST',
      itemAlias: 'uploadFile',
      authToken: this.authToken,
      authTokenHeader: 'authorization',
      removeAfterUpload: true
    });
    // 获取部门列表
    this.httpService.post(SystemConstant.COMPANY_LIST, {} ).subscribe({
      next: (data) => {
        this.companyList = data;
      },
      complete: () => {
      }
    });
    // 获取工种列表
    this.httpService.post(SystemConstant.DICTIONARY_LIST, {dictionaryTypeId: SystemConstant.DICTIONARY_TYPE_POST} ).subscribe({
      next: (data) => {
        this.sysWorkTypeList = data;
      },
      complete: () => {
      }
    });
    // 获取文化程度列表
    this.httpService.post(SystemConstant.DICTIONARY_LIST, {dictionaryTypeId: 11} ).subscribe({
      next: (data) => {
        this.sysEmpHobbyList = data;
      },
      complete: () => {
      }
    });
    const preEvaluationId = this.sysEmployeeRequest.sysEmployee.id;
    if (preEvaluationId === undefined || preEvaluationId === null || preEvaluationId === '') {
      this.action = '新增';
      this.addFlag = true;
      this.employeeEditTitle = '新增职工信息';
    } else {
      this.action = '修改';
      this.addFlag = false;
      this.employeeEditTitle = '修改职工信息';
      $('#employeeImg').attr('src', SystemConstant.IMAG_PATH + this.sysEmployeeRequest.sysEmployee.imageName);
      this.sysEmployeeRequest.sysEmployee.companyId = this.sysEmployeeRequest.sysCompanyOffice.companyId;
      this.sysEmployeeRequest.sysEmployee.officeId = this.sysEmployeeRequest.sysCompanyOffice.id;
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
    this.sysEmployeeRequest.sysEmployee.empWorkDate = $('#sysEmployeeEmpWorkDate').val();
    for (let i = 0; i < this.sysEmployeeRequest.sysEmployeeCaseList.length; i++) {
      this.sysEmployeeRequest.sysEmployeeCaseList[i].diagnosisDate = $('#employeeCase_' + i + '_diagnosisDate').val();
    }
    for (let i = 0; i < this.sysEmployeeRequest.sysEmployeeDiseaseList.length; i++) {
      this.sysEmployeeRequest.sysEmployeeDiseaseList[i].diagnosisDate = $('#employeeDisease_' + i + '_diagnosisDate').val();
    }
    for (let i = 0; i < this.sysEmployeeRequest.sysEmployeeJobList.length; i++) {
      this.sysEmployeeRequest.sysEmployeeJobList[i].beginDate = $('#employeeJob_' + i + '_beginDate').val();
      this.sysEmployeeRequest.sysEmployeeJobList[i].endDate = $('#employeeJob_' + i + '_endDate').val();
    }
    this.httpService.post(url, this.sysEmployeeRequest).subscribe({
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
    const index = this.sysEmployeeRequest.sysEmployeeJobList.length;
    this.sysEmployeeRequest.sysEmployeeJobList[index] = {
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
    const count = this.sysEmployeeRequest.sysEmployeeJobList.length;
    this.sysEmployeeRequest.sysEmployeeJobList.splice(index, 1);
  }
  /**
   * 增加病史
   */
  addCase() {
    const index = this.sysEmployeeRequest.sysEmployeeCaseList.length;
    this.sysEmployeeRequest.sysEmployeeCaseList[index] = {
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
    const count = this.sysEmployeeRequest.sysEmployeeCaseList.length;
    this.sysEmployeeRequest.sysEmployeeCaseList.splice(i, 1);
  }
  /**
   * 增加诊断结果
   */
  addDisease() {
    const index = this.sysEmployeeRequest.sysEmployeeDiseaseList.length;
    this.sysEmployeeRequest.sysEmployeeDiseaseList[index] = {
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
    const count = this.sysEmployeeRequest.sysEmployeeDiseaseList.length;
    this.sysEmployeeRequest.sysEmployeeDiseaseList.splice(i, 1);
  }

  /**
   * 选择部门
   * @param data
   */
  onDataChanged(data) {
    this.sysEmployeeRequest.sysEmployee.officeId = data.officeId;
  }

  /**
   * 选择文件上传
   */
  selectedFileOnChanged() {
    // 上传
    this.uploader.queue[0].onSuccess = this.fileSuccess.bind(this);
    this.uploader.queue[0].upload(); // 开始上传
  }

  /**
   * 文件上传成功回调函数
   * @param response
   * @param status
   */
  fileSuccess(response, status) {
    // 上传文件成功
    if (status === 200) {
      // 上传文件后获取服务器返回的数据
      const ret = JSON.parse(response);
      if ( ret.code === 100 ) {
        this.sysEmployeeRequest.sysEmployee.imageName = ret.content;
        $('#employeeImg').attr('src', SystemConstant.IMAG_PATH + ret.content);
      } else {
        alert('文件上传失败:' + ret.message);
      }
    } else {
      // 上传文件后获取服务器返回的数据错误
      alert('文件上传失败');
    }
  }

  /**
   * 单位修改
   */
  changeCompany() {
    this.sysEmployeeRequest.sysEmployee.officeId = '';
    this.acod.openZTree(this.sysEmployeeRequest.sysEmployee.companyId, this.sysEmployeeRequest.sysEmployee.officeId);
  }
}
