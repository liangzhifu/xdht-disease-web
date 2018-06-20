import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {WaitService} from '../../core/wait/wait.service';
import {HttpService} from '../../core/http/http.service';
import {ToastService} from '../../toast/toast.service';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';

@Component({
  selector: 'app-individual-protective-edit',
  templateUrl: './individual-protective-edit.component.html',
  styleUrls: ['./individual-protective-edit.component.scss']
})
export class IndividualProtectiveEditComponent implements OnInit {
  recordIndividualProtectiveEditTitle: string;
  @Input() recordIndividualProtectiveInputRequest = {
    'recordIndividualProtective': {
      'id': '',
      'individualProtectiveEquipmentNo': '',
      'verificationResult': ''
    },
    'recordIndividualProtectiveDataList': [{
      'id': '',
      'companyOfficeId': '',
      'postId': '',
      'hazardFactors': '',
      'protectiveEquipment': '',
      'technicalParameter': '',
      'number': '',
      'usaged': '',
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
    this.httpService.post(SystemConstant.SYS_COMPANY_OFFICE_LIST, {} ).subscribe({
      next: (data) => {
        this.recordIndividualProtectiveInputRequest.sysCompanyOfficeList = data;
      },
      complete: () => {
      }
    });
    this.httpService.post(SystemConstant.SYS_POST_LIST, {} ).subscribe({
      next: (data) => {
        this.recordIndividualProtectiveInputRequest.sysPostList = data;
      },
      complete: () => {
      }
    });
  }

  ngOnInit() {
    const relationId = this.recordIndividualProtectiveInputRequest.recordIndividualProtective.id;
    if (relationId === undefined || relationId === null || relationId === '') {
      this.addFlag = true;
      this.recordIndividualProtectiveEditTitle = '新增--个体防护用品调查表';
    } else {
      this.addFlag = false;
      this.recordIndividualProtectiveEditTitle = '修改--个体防护用品调查表';
      const  dataList = this.recordIndividualProtectiveInputRequest.recordIndividualProtectiveDataList;
      this.recordIndividualProtectiveInputRequest.recordIndividualProtectiveDataList = [];

      for (let i = 0; i < dataList.length; i++) {
        const recordIndividualProtectiveData = {
          'id': dataList[i].id,
          'companyOfficeId': dataList[i].companyOfficeId,
          'postId': dataList[i].postId,
          'hazardFactors': dataList[i].hazardFactors,
          'protectiveEquipment': dataList[i].protectiveEquipment,
          'technicalParameter': dataList[i].technicalParameter,
          'number': dataList[i].number,
          'usaged': dataList[i].usaged,
          'relationId': dataList[i].relationId
        };
        this.recordIndividualProtectiveInputRequest.recordIndividualProtectiveDataList.push(recordIndividualProtectiveData);
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
    const index = this.recordIndividualProtectiveInputRequest.recordIndividualProtectiveDataList.length;
    this.recordIndividualProtectiveInputRequest.recordIndividualProtectiveDataList[index] = { 'id' : '', 'companyOfficeId' : '', 'postId' : '', 'hazardFactors' : '', 'protectiveEquipment' : '', 'technicalParameter' : '', 'number' : '', 'usaged' : '', 'relationId' : '' };
    this.httpService.post(SystemConstant.SYS_COMPANY_OFFICE_LIST, {} ).subscribe({
      next: (data) => {
        this.recordIndividualProtectiveInputRequest.sysCompanyOfficeList = data;
      },
      complete: () => {
      }
    });
  }

  /**
   * 删除一行
   */
  delOffice(item) {
    const index = this.recordIndividualProtectiveInputRequest.recordIndividualProtectiveDataList.indexOf(item);
    this.recordIndividualProtectiveInputRequest.recordIndividualProtectiveDataList.splice(index, 1);
  }

  /**
   * 提交
   */
  submitData() {
    // 获取部门id
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.INDIVIDUAL_PROTECTIVE_ADD;
    } else {
      url = SystemConstant.INDIVIDUAL_PROTECTIVE_EDIT;
    }
    // 保存调查表
    this.httpService.post(url, this.recordIndividualProtectiveInputRequest).subscribe({
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
