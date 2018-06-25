import {Component, Input, OnInit} from '@angular/core';
import {ToastService} from '../../toast/toast.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {WaitService} from '../../core/wait/wait.service';
import {HttpService} from '../../core/http/http.service';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';

@Component({
  selector: 'app-other-protective-edit',
  templateUrl: './other-protective-edit.component.html',
  styleUrls: ['./other-protective-edit.component.scss']
})
export class OtherProtectiveEditComponent implements OnInit {
  recordOtherProtectiveEditTitle: string;
  @Input() recordData = {
    'recordOtherProtective': {
      'id': '',
      'otherProtectiveFacilitiesNo': '',
      'verificationResult': ''
    },
    'recordOtherProtectiveDataList': [{
      'id': '',
      'officeId': '',
      'postId': '',
      'workPlace': '',
      'hazardFactors': '',
      'protectiveFacilities': '',
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
        this.recordData.sysCompanyOfficeList = data;
      },
      complete: () => {
      }
    });
    this.httpService.post(SystemConstant.SYS_POST_LIST, {} ).subscribe({
      next: (data) => {
        this.recordData.sysPostList = data;
      },
      complete: () => {
      }
    });
  }

  ngOnInit() {
    const relationId = this.recordData.recordOtherProtective.id;
    if (relationId === undefined || relationId === null || relationId === '') {
      this.addFlag = true;
      this.recordOtherProtectiveEditTitle = '新增--其他防护设施调查表';
    } else {
      this.addFlag = false;
      this.recordOtherProtectiveEditTitle = '修改--其他防护设施调查表';
      const  dataList = this.recordData.recordOtherProtectiveDataList;
      this.recordData.recordOtherProtectiveDataList = [];

      for (let i = 0; i < dataList.length; i++) {
        const recordOtherProtectiveData = {
          'id': dataList[i].id,
          'officeId': dataList[i].officeId,
          'postId': dataList[i].postId,
          'workPlace': dataList[i].workPlace,
          'hazardFactors': dataList[i].hazardFactors,
          'protectiveFacilities': dataList[i].protectiveFacilities,
          'operationAndMaintenance': dataList[i].operationAndMaintenance,
          'relationId': dataList[i].relationId
        };
        this.recordData.recordOtherProtectiveDataList.push(recordOtherProtectiveData);
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
    const index = this.recordData.recordOtherProtectiveDataList.length;
    this.recordData.recordOtherProtectiveDataList[index] = { 'id' : '', 'officeId' : '', 'postId' : '', 'workPlace' : '', 'hazardFactors' : '', 'protectiveFacilities' : '', 'operationAndMaintenance' : '',  'relationId' : ''};
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
    const index = this.recordData.recordOtherProtectiveDataList.indexOf(item);
    this.recordData.recordOtherProtectiveDataList.splice(index, index + 1);
  }

  /**
   * 提交
   */
  submitData() {
    // 获取部门id
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.OTHER_PROTECTIVE_ADD;
    } else {
      url = SystemConstant.OTHER_PROTECTIVE_EDIT;
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
