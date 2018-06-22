import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpService} from '../../core/http/http.service';
import {ToastService} from '../../toast/toast.service';
import {WaitService} from '../../core/wait/wait.service';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastType} from '../../toast/toast-type.enum';
import {ToastConfig} from '../../toast/toast-config';

@Component({
  selector: 'app-anti-noise-edit',
  templateUrl: './anti-noise-edit.component.html',
  styleUrls: ['./anti-noise-edit.component.scss']
})
export class AntiNoiseEditComponent implements OnInit {
  recordAntiNoiseEditTitle: string;
  @Input() recordAntiNoiseInputRequest = {
    'recordAntiNoiseFacilities': {
      'id': '',
      'antiNoiseFacilitiesNo': '',
      'verificationResult': ''
    },
    'recordAntiNoiseFacilitiesDataList': [{
      'id': '',
      'companyOfficeId': '',
      'postId': '',
      'workPlace': '',
      'noiseSource': '',
      'noiseProtectionFacilities': '',
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
        this.recordAntiNoiseInputRequest.sysCompanyOfficeList = data;
      },
      complete: () => {
      }
    });
    this.httpService.post(SystemConstant.SYS_POST_LIST, {} ).subscribe({
      next: (data) => {
        this.recordAntiNoiseInputRequest.sysPostList = data;
      },
      complete: () => {
      }
    });
  }

  ngOnInit() {
    const relationId = this.recordAntiNoiseInputRequest.recordAntiNoiseFacilities.id;
    if (relationId === undefined || relationId === null || relationId === '') {
      this.addFlag = true;
      this.recordAntiNoiseEditTitle = '新增--防噪声设施调查表';
    } else {
      this.addFlag = false;
      this.recordAntiNoiseEditTitle = '修改--防噪声设施调查表';
      const  dataList = this.recordAntiNoiseInputRequest.recordAntiNoiseFacilitiesDataList;
      this.recordAntiNoiseInputRequest.recordAntiNoiseFacilitiesDataList = [];

      for (let i = 0; i < dataList.length; i++) {
        const recordAntiNoiseData = {
          'id': dataList[i].id,
          'companyOfficeId': dataList[i].companyOfficeId,
          'postId': dataList[i].postId,
          'workPlace': dataList[i].workPlace,
          'noiseSource': dataList[i].noiseSource,
          'noiseProtectionFacilities': dataList[i].noiseProtectionFacilities,
          'operationAndMaintenance': dataList[i].operationAndMaintenance,
          'relationId': dataList[i].relationId
        };
        this.recordAntiNoiseInputRequest.recordAntiNoiseFacilitiesDataList.push(recordAntiNoiseData);
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
    const index = this.recordAntiNoiseInputRequest.recordAntiNoiseFacilitiesDataList.length;
    this.recordAntiNoiseInputRequest.recordAntiNoiseFacilitiesDataList[index] = { 'id' : '', 'companyOfficeId' : '', 'postId' : '', 'workPlace' : '', 'noiseSource' : '', 'noiseProtectionFacilities' : '', 'operationAndMaintenance' : '',  'relationId' : ''};
    this.httpService.post(SystemConstant.COMPANY_LIST, {} ).subscribe({
      next: (data) => {
        this.recordAntiNoiseInputRequest.sysCompanyOfficeList = data;
      },
      complete: () => {
      }
    });
  }

  /**
   * 删除一行
   */
  delOffice(item) {
    const index = this.recordAntiNoiseInputRequest.recordAntiNoiseFacilitiesDataList.indexOf(item);
    this.recordAntiNoiseInputRequest.recordAntiNoiseFacilitiesDataList.splice(index, index + 1);
  }

  /**
   * 提交
   */
  submitData() {
    // 获取部门id
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.ANTI_NOISE_ADD;
    } else {
      url = SystemConstant.ANTI_NOISE_EDIT;
    }
    // 保存调查表
    this.httpService.post(url, this.recordAntiNoiseInputRequest).subscribe({
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
