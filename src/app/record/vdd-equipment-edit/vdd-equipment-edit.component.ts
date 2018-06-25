import {Component, Input, OnInit} from '@angular/core';
import {ToastService} from '../../toast/toast.service';
import {HttpService} from '../../core/http/http.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {WaitService} from '../../core/wait/wait.service';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastType} from '../../toast/toast-type.enum';
import {ToastConfig} from '../../toast/toast-config';

@Component({
  selector: 'app-vdd-equipment-edit',
  templateUrl: './vdd-equipment-edit.component.html',
  styleUrls: ['./vdd-equipment-edit.component.scss']
})
export class VddEquipmentEditComponent implements OnInit {
  recordVddEquipmentEditTitle: string;
  @Input() recordData = {
    'recordVddEquipment': {
      'id': '',
      'vddEquipmentNo': '',
      'verificationResult': ''
    },
    'recordVddEquipmentDataList': [{
      'id': '',
      'officeId': '',
      'postId': '',
      'workPlace': '',
      'vddEquipmentName': '',
      'poisonOrDustName': '',
      'number': '',
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
    const relationId = this.recordData.recordVddEquipment.id;
    if (relationId === undefined || relationId === null || relationId === '') {
      this.addFlag = true;
      this.recordVddEquipmentEditTitle = '新增--通风排毒除尘设施调查表';
    } else {
      this.addFlag = false;
      this.recordVddEquipmentEditTitle = '修改--通风排毒除尘设施调查表';
      const  dataList = this.recordData.recordVddEquipmentDataList;
      this.recordData.recordVddEquipmentDataList = [];

      for (let i = 0; i < dataList.length; i++) {
        const recordVddEquipmentData = {
          'id': dataList[i].id,
          'officeId': dataList[i].officeId,
          'postId': dataList[i].postId,
          'workPlace': dataList[i].workPlace,
          'vddEquipmentName': dataList[i].vddEquipmentName,
          'poisonOrDustName': dataList[i].poisonOrDustName,
          'number': dataList[i].number,
          'operationAndMaintenance': dataList[i].operationAndMaintenance,
          'relationId': dataList[i].relationId
        };
        this.recordData.recordVddEquipmentDataList.push(recordVddEquipmentData);
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
    const index = this.recordData.recordVddEquipmentDataList.length;
    this.recordData.recordVddEquipmentDataList[index] = { 'id' : '', 'officeId' : '', 'postId' : '', 'workPlace' : '', 'vddEquipmentName' : '', 'poisonOrDustName' : '', 'number' : '' , 'operationAndMaintenance' : '',  'relationId' : ''};
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
    // const index = this.recordData.recordVddEquipmentDataList.indexOf(item);
    this.recordData.recordVddEquipmentDataList.splice(index,  1);
  }

  /**
   * 提交
   */
  submitData() {
    // 获取部门id
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.VDD_EQUIPMENT_ADD;
    } else {
      url = SystemConstant.VDD_EQUIPMENT_EDIT;
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
