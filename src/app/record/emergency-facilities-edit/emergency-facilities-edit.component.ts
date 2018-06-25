import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {WaitService} from '../../core/wait/wait.service';
import {HttpService} from '../../core/http/http.service';
import {ToastService} from '../../toast/toast.service';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';

@Component({
  selector: 'app-emergency-facilities-edit',
  templateUrl: './emergency-facilities-edit.component.html',
  styleUrls: ['./emergency-facilities-edit.component.scss']
})
export class EmergencyFacilitiesEditComponent implements OnInit {
  recordEmergencyFacilitiesEditTitle: string;
  @Input() recordData = {
    'recordEmergencyFacilities': {
      'id': '',
      'emergencyFacilitiesNo': '',
      'verificationResult': ''
    },
    'recordEmergencyFacilitiesDataList': [{
      'id': '',
      'officeId': '',
      'workPlace': '',
      'emergencyFacilities': '',
      'number': '',
      'operationAndMaintenance': '',
      'technicalParameter': '',
      'hazardFactors': '',
      'relationId': ''
    }],
    'sysCompanyOfficeList': [{
      'id': '',
      'officeName': '',
      'status': ''
    }]

  };
  addFlag: boolean;
  action = '';
  constructor(
    private httpService: HttpService,
    private activeModal: NgbActiveModal,
    private toastService: ToastService,
    private waitService: WaitService
  ) {
    this.httpService.post(SystemConstant.COMPANY_LIST, {} ).subscribe({
      next: (data) => {
        this.recordData.sysCompanyOfficeList = data;
      },
      complete: () => {
      }
    });
  }

  ngOnInit() {
    // const relationId = this.recordData.recordEmergencyFacilities.id;
    // if (relationId === undefined || relationId === null || relationId === '') {
    console.log('recordDAa:' + this.recordData.sysCompanyOfficeList);
    if (this.recordData.recordEmergencyFacilities === null ) {
      this.addFlag = true;
      this.recordEmergencyFacilitiesEditTitle = '新增--应急设施调查表';
    } else {
      this.addFlag = false;
      this.recordEmergencyFacilitiesEditTitle = '修改--应急设施调查表';
      const  dataList = this.recordData.recordEmergencyFacilitiesDataList;
      this.recordData.recordEmergencyFacilitiesDataList = [];

      for (let i = 0; i < dataList.length; i++) {
        const recordEmergencyFacilitiesData = {
          'id': dataList[i].id,
          'officeId': dataList[i].officeId,
          'workPlace': dataList[i].workPlace,
          'emergencyFacilities': dataList[i].emergencyFacilities,
          'number': dataList[i].number,
          'operationAndMaintenance': dataList[i].operationAndMaintenance,
          'technicalParameter': dataList[i].technicalParameter,
          'hazardFactors': dataList[i].hazardFactors,
          'relationId': dataList[i].relationId
        };
        this.recordData.recordEmergencyFacilitiesDataList.push(recordEmergencyFacilitiesData);
      }
    }
  }
  /**
   * 关闭对话框
   */
  close() {
    this.activeModal.dismiss('failed');
  }
  /**
   * 添加一行
   */
  addOffice() {
    const index = this.recordData.recordEmergencyFacilitiesDataList.length;
    this.recordData.recordEmergencyFacilitiesDataList[index] = { 'id' : '', 'officeId' : '', 'workPlace' : '', 'emergencyFacilities' : '', 'number' : '', 'technicalParameter' : '',  'operationAndMaintenance' : '',  'hazardFactors' : '',  'relationId' : ''};
    this.httpService.post(SystemConstant.COMPANY_LIST, {} ).subscribe({
      next: (data) => {
        this.recordData.sysCompanyOfficeList = data;
      },
      complete: () => {
      }
    });
  }

  /**
   * 删除一行
   */
  delOffice(item) {
    const index = this.recordData.recordEmergencyFacilitiesDataList.indexOf(item);
    this.recordData.recordEmergencyFacilitiesDataList.splice(index, index + 1);
  }

  /**
   * 提交
   */
  submitData() {
    // 获取部门id
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.EMERGENCY_FACILITIES_ADD;
    } else {
      url = SystemConstant.EMERGENCY_FACILITIES_EDIT;
    }
    // 保存调查表
    this.httpService.post(url, this.recordData).subscribe({
      next: (data) => {
        const toastCfg = new ToastConfig(ToastType.SUCCESS, '', this.action + '操作成功！', 3000);
        this.toastService.toast(toastCfg);
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', this.action + '操作失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {
      }
    });
    this.waitService.wait(false);
  }

}
