import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';
import {SystemConstant} from '../../core/class/system-constant';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../../core/http/http.service';
import {ToastService} from '../../toast/toast.service';

@Component({
  selector: 'app-empoiyee-info',
  templateUrl: './empoiyee-info.component.html',
  styleUrls: ['./empoiyee-info.component.scss']
})
export class EmpoiyeeInfoComponent implements OnInit {
  companyList = [{id: '', companyName: ''}];
  sysWorkTypeList = [{id: '', dictionaryName: ''}];
  sysEmployeeRequest = {
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

  constructor(
    private activeRoute: ActivatedRoute,
    private httpService: HttpService,
    private toastService: ToastService
  ) {
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
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(params => {
      const id = params['id'];
      // 获取职工数据
      this.httpService.get(SystemConstant.EMPLOYEE_DETAIL + '/' + id).subscribe({
        next: (data) => {
          this.sysEmployeeRequest = data;
        },
        error: (err) => {
          const toastCfg = new ToastConfig(ToastType.ERROR, '', '获取职工详情失败！' + '失败原因：' + err, 3000);
          this.toastService.toast(toastCfg);
        },
        complete: () => {}
      });
    });
  }


}
