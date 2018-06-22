import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from '../../core/http/http.service';
import {WaitService} from '../../core/wait/wait.service';
import {ToastService} from '../../toast/toast.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SystemConstant} from '../../core/class/system-constant';
import * as $ from 'jquery';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';
@Component({
  selector: 'app-equipment-edit',
  templateUrl: './equipment-edit.component.html',
  styleUrls: ['./equipment-edit.component.scss']
})
export class EquipmentEditComponent implements OnInit {
  recordEquipmentEditTitle: string;
  @Input() recordEquipmentInputRequest = {
    'recordEquipment': {
      'id': '',
      'equipmentNo': '',
      'verificationResult': ''
    },
    'recordEquipmentDataList': [{
      'id': '',
      'officdId': '',
      'officdName': '',
      'processName': '',
      'equipmentName': '',
      'epuipmentNumber': '',
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
  ) { }

  ngOnInit() {
    const relationId = this.recordEquipmentInputRequest.recordEquipment.id;
    if (relationId === undefined || relationId === null || relationId === '') {
      this.addFlag = true;
      this.recordEquipmentEditTitle = '新增--';
      // 新增时 部门id 获取部门列表
      this.httpService.post(SystemConstant.COMPANY_LIST, {} ).subscribe({
        next: (data) => {;
          this.recordEquipmentInputRequest.sysCompanyOfficeList = data;
        },
        complete: () => {
        }
      });
    } else {
      this.addFlag = false;
      this.recordEquipmentEditTitle = '修改--';
      // 修改时 获取项目列表
      const  dataList = this.recordEquipmentInputRequest.recordEquipmentDataList;
      this.recordEquipmentInputRequest.recordEquipmentDataList = [];
      // 项目列表
      const  officeList = this.recordEquipmentInputRequest.sysCompanyOfficeList;
      for (let i = 0; i < dataList.length; i++) {
        const recordEquipmentData = {
          'id': dataList[i].id,
          'officdId': dataList[i].officdId,
          'processName': dataList[i].processName,
          'equipmentName': dataList[i].equipmentName,
          'epuipmentNumber': dataList[i].epuipmentNumber,
          'relationId': dataList[i].relationId,
          'officdName': officeList[i].officeName
        };
        this.recordEquipmentInputRequest.recordEquipmentDataList.push(recordEquipmentData);
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
   * 添加部门
   */
  addOffice() {
    const index = this.recordEquipmentInputRequest.recordEquipmentDataList.length;
    this.recordEquipmentInputRequest.recordEquipmentDataList[index] = { 'id' : '', 'officdId' : '', 'officdName' : '', 'processName' : '', 'equipmentName' : '', 'epuipmentNumber' : '', 'relationId' : ''};
    this.httpService.post(SystemConstant.COMPANY_LIST, {} ).subscribe({
      next: (data) => {;
        this.recordEquipmentInputRequest.sysCompanyOfficeList = data;
      },
      complete: () => {
      }
    });
  }
  /**
   * 删除部门
   * @param index 序号
   */
  delOffice(item) {
    const index = this.recordEquipmentInputRequest.recordEquipmentDataList.indexOf(item);
    this.recordEquipmentInputRequest.recordEquipmentDataList.splice(index, index + 1);
  }

  /**
   * 提交
   */
  submitData() {
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.EQUIPMENT_ADD;
    } else {
      url = SystemConstant.EQUIPMENT_EDIT;
    }
    // 保存调查表
    this.httpService.post(url, this.recordEquipmentInputRequest).subscribe({
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
