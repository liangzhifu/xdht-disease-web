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
  selector: 'app-empoiyee-info',
  templateUrl: './empoiyee-info.component.html',
  styleUrls: ['./empoiyee-info.component.scss']
})
export class EmpoiyeeInfoComponent implements OnInit {

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
      this.action = '详情';
      this.addFlag = true;
      this.empoiyeeEditTitle = '企业详情';
  }

  /**
   * 关闭企业修改框
   */
  close() {
    this.activeModal.dismiss('failed');
  }

}
