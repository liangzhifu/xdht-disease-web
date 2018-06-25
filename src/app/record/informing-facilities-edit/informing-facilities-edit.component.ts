import {Component, Input, OnInit} from '@angular/core';
import {SystemConstant} from '../../core/class/system-constant';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {WaitService} from '../../core/wait/wait.service';
import {HttpService} from '../../core/http/http.service';
import {ToastService} from '../../toast/toast.service';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';

@Component({
  selector: 'app-informing-facilities-edit',
  templateUrl: './informing-facilities-edit.component.html',
  styleUrls: ['./informing-facilities-edit.component.scss']
})
export class InformingFacilitiesEditComponent implements OnInit {
  recordInformingFacilitiesEditTitle: string;
  @Input() recordData = {
    'recordInformingFacilities': {
      'id': '',
      'informingFacilitiesNo': '',
      'verificationResult': ''
    },
    'recordInformingFacilitiesDataList': [{
      'id': '',
      'companyOfficeId': '',
      'processName': '',
      'hazardFactors': '',
      'informingFacilities': '',
      'settingPlace': '',
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
    this.httpService.post(SystemConstant.COMPANY_LIST, {} ).subscribe({
      next: (data) => {
        this.recordData.sysCompanyOfficeList = data;
      },
      complete: () => {
      }
    });
  }

  ngOnInit() {
    const relationId = this.recordData.recordInformingFacilities.id;
    if (relationId === undefined || relationId === null || relationId === '') {
      this.addFlag = true;
      this.recordInformingFacilitiesEditTitle = '新增--职业病危害告知设施调查表';
    } else {
      this.addFlag = false;
      this.recordInformingFacilitiesEditTitle = '修改--职业病危害告知设施调查表';
      const  dataList = this.recordData.recordInformingFacilitiesDataList;
      this.recordData.recordInformingFacilitiesDataList = [];

      for (let i = 0; i < dataList.length; i++) {
        const recordInformingFacilitiesData = {
          'id': dataList[i].id,
          'companyOfficeId': dataList[i].companyOfficeId,
          'processName': dataList[i].processName,
          'hazardFactors': dataList[i].hazardFactors,
          'informingFacilities': dataList[i].informingFacilities,
          'settingPlace': dataList[i].settingPlace,
          'remarks': dataList[i].remarks,
          'relationId': dataList[i].relationId
        };
        this.recordData.recordInformingFacilitiesDataList.push(recordInformingFacilitiesData);
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
    const index = this.recordData.recordInformingFacilitiesDataList.length;
    this.recordData.recordInformingFacilitiesDataList[index] = { 'id' : '', 'companyOfficeId' : '', 'processName' : '', 'hazardFactors' : '', 'informingFacilities' : '', 'settingPlace' : '', 'remarks' : '',   'relationId' : ''};
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
  delOffice(index) {
    // const index = this.recordIndividualProtectiveInputRequest.recordIndividualProtectiveDataList.indexOf(item);
    this.recordData.recordInformingFacilitiesDataList.splice(index, 1 );
  }

  /**
   * 提交
   */
  submitData() {
    // 获取部门id
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.INFORMING_FACILITIES_ADD;
    } else {
      url = SystemConstant.INFORMING_FACILITIES_EDIT;
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
