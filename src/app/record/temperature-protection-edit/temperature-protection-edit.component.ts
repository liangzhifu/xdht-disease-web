import {Component, Input, OnInit} from '@angular/core';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastService} from '../../toast/toast.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {WaitService} from '../../core/wait/wait.service';
import {HttpService} from '../../core/http/http.service';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';

@Component({
  selector: 'app-temperature-protection-edit',
  templateUrl: './temperature-protection-edit.component.html',
  styleUrls: ['./temperature-protection-edit.component.scss']
})
export class TemperatureProtectionEditComponent implements OnInit {
  recordTemperatureEditTitle: string;
  @Input() recordTemperatureInputRequest = {
    'recordTemperature': {
      'id': '',
      'temperatureProtectionFacilitiesNo': '',
      'verificationResult': ''
    },
    'recordTemperatureDataList': [{
      'id': '',
      'companyOfficeId': '',
      'postId': '',
      'workPlace': '',
      'productiveHeatSource': '',
      'temperatureProtectionFacilities': '',
      'operationAndMaintenance': '',
      'relationId': ''
    }],
    'sysCompanyOfficeList': [{
      'id': '',
      'officeName': '',
      'status': ''
    }],
    'sysPostList': [{
      'id': '',
      'postName': '',
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
        this.recordTemperatureInputRequest.sysCompanyOfficeList = data;
      },
      complete: () => {
      }
    });
    this.httpService.post(SystemConstant.SYS_POST_LIST, {} ).subscribe({
      next: (data) => {
        this.recordTemperatureInputRequest.sysPostList = data;
      },
      complete: () => {
      }
    });
  }

  ngOnInit() {
    const relationId = this.recordTemperatureInputRequest.recordTemperature.id;
    if (relationId === undefined || relationId === null || relationId === '') {
      this.addFlag = true;
      this.recordTemperatureEditTitle = '新增--防高温设施调查表';
    } else {
      this.addFlag = false;
      this.recordTemperatureEditTitle = '修改--防高温设施调查表';
      const  dataList = this.recordTemperatureInputRequest.recordTemperatureDataList;
      this.recordTemperatureInputRequest.recordTemperatureDataList = [];

      for (let i = 0; i < dataList.length; i++) {
        const recordTemperatureData = {
          'id': dataList[i].id,
          'companyOfficeId': dataList[i].companyOfficeId,
          'postId': dataList[i].postId,
          'workPlace': dataList[i].workPlace,
          'productiveHeatSource': dataList[i].productiveHeatSource,
          'temperatureProtectionFacilities': dataList[i].temperatureProtectionFacilities,
          'operationAndMaintenance': dataList[i].operationAndMaintenance,
          'relationId': dataList[i].relationId
        };
        this.recordTemperatureInputRequest.recordTemperatureDataList.push(recordTemperatureData);
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
    const index = this.recordTemperatureInputRequest.recordTemperatureDataList.length;
    this.recordTemperatureInputRequest.recordTemperatureDataList[index] = { 'id' : '', 'companyOfficeId' : '', 'postId' : '', 'workPlace' : '', 'productiveHeatSource' : '', 'temperatureProtectionFacilities' : '', 'operationAndMaintenance' : '',  'relationId' : ''};
    this.httpService.post(SystemConstant.COMPANY_LIST, {} ).subscribe({
      next: (data) => {
        this.recordTemperatureInputRequest.sysCompanyOfficeList = data;
      },
      complete: () => {
      }
    });
  }

  /**
   * 删除一行
   */
  delOffice(item) {
    const index = this.recordTemperatureInputRequest.recordTemperatureDataList.indexOf(item);
    this.recordTemperatureInputRequest.recordTemperatureDataList.splice(index, index + 1);
  }

  /**
   * 提交
   */
  submitData() {
    // 获取部门id
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.TEMPERATURE_ADD;
    } else {
      url = SystemConstant.TEMPERATURE_EDIT;
    }
    // 保存调查表
    this.httpService.post(url, this.recordTemperatureInputRequest).subscribe({
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
