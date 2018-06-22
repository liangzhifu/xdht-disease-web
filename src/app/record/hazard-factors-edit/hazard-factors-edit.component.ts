import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpService} from '../../core/http/http.service';
import {ToastService} from '../../toast/toast.service';
import {WaitService} from '../../core/wait/wait.service';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastType} from '../../toast/toast-type.enum';
import {ToastConfig} from '../../toast/toast-config';

@Component({
  selector: 'app-hazard-factors-edit',
  templateUrl: './hazard-factors-edit.component.html',
  styleUrls: ['./hazard-factors-edit.component.scss']
})
export class HazardFactorsEditComponent implements OnInit {
  recordHazardFactorsEditTitle: string;
  @Input() recordHazardFactorsInputRequest = {
    'recordHazardFactors': {
      'id': '',
      'hazardFactorsNo': '',
      'verificationResult': ''
    },
    'recordHazardFactorsDataList': [{
      'id': '',
      'officeId': '',
      'processName': '',
      'hazardFactors': '',
      'exposureMode': '',
      'exposureTime': '',
      'remarks': '',
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
// 获取部门列表
    this.httpService.post(SystemConstant.COMPANY_LIST, {} ).subscribe({
      next: (data) => {
        this.recordHazardFactorsInputRequest.sysCompanyOfficeList = data;
      },
      complete: () => {
      }
    });
  }

  ngOnInit() {
    const relationId = this.recordHazardFactorsInputRequest.recordHazardFactors.id;
    if (relationId === undefined || relationId === null || relationId === '') {
      this.addFlag = true;
      this.recordHazardFactorsEditTitle = '新增--职业病危害因素调查表';
    } else {
      this.addFlag = false;
      this.recordHazardFactorsEditTitle = '修改--职业病危害因素调查表';
      // 修改时 获取内容列表
      const  dataList = this.recordHazardFactorsInputRequest.recordHazardFactorsDataList;
      this.recordHazardFactorsInputRequest.recordHazardFactorsDataList = [];
      // 项目列表
      for (let i = 0; i < dataList.length; i++) {
        const recordHazardFactorsData = {
          'id': dataList[i].id,
          'officeId': dataList[i].officeId,
          'processName': dataList[i].processName,
          'hazardFactors': dataList[i].hazardFactors,
          'exposureMode': dataList[i].exposureMode,
          'exposureTime': dataList[i].exposureTime,
          'remarks': dataList[i].remarks,
          'relationId': dataList[i].relationId
        };
        this.recordHazardFactorsInputRequest.recordHazardFactorsDataList.push(recordHazardFactorsData);
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
    const index = this.recordHazardFactorsInputRequest.recordHazardFactorsDataList.length;
    this.recordHazardFactorsInputRequest.recordHazardFactorsDataList[index] = { 'id' : '', 'officeId' : '', 'processName' : '', 'hazardFactors' : '', 'exposureMode' : '', 'exposureTime' : '', 'remarks' : '',  'relationId' : ''};
    this.httpService.post(SystemConstant.COMPANY_LIST, {} ).subscribe({
      next: (data) => {
        this.recordHazardFactorsInputRequest.sysCompanyOfficeList = data;
      },
      complete: () => {
      }
    });
  }
  /**
   * 删除一行
   */
  delOffice(item) {
    const index = this.recordHazardFactorsInputRequest.recordHazardFactorsDataList.indexOf(item);
    this.recordHazardFactorsInputRequest.recordHazardFactorsDataList.splice(index, index + 1);
  }
  /**
   * 提交
   */
  submitData() {
    // 获取部门id
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.HAZARD_FACTORS_ADD;
    } else {
      url = SystemConstant.HAZARD_FACTORS_EDIT;
    }
    // 保存调查表
    this.httpService.post(url, this.recordHazardFactorsInputRequest).subscribe({
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
