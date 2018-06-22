import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from '../../core/http/http.service';
import {WaitService} from '../../core/wait/wait.service';
import {ToastService} from '../../toast/toast.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';
import * as $ from 'jquery';
@Component({
  selector: 'app-equipment-layout-edit',
  templateUrl: './equipment-layout-edit.component.html',
  styleUrls: ['./equipment-layout-edit.component.scss']
})
export class EquipmentLayoutEditComponent implements OnInit {
  recordEquipmentLayoutEditTitle: string;
  @Input() recordEquipmentLayoutInputRequest = {
    'recordEquipmentLayout': {
      'id': '',
      'equipmentLayoutNo': '',
      'verificationResult': ''
    },
    'recordEquipmentLayoutDataList': [{
      'id': '',
      'officdId': '',
      'processAndEquipment': '',
      'hazardFactors': '',
      'layoutDetail': '',
      'remarkds': '',
      'officdName': '',
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
    const relationId = this.recordEquipmentLayoutInputRequest.recordEquipmentLayout.id;
    if (relationId === undefined || relationId === null || relationId === '') {
      this.addFlag = true;
      this.recordEquipmentLayoutEditTitle = '新增--';
      // 新增时 部门id 获取部门列表
      this.httpService.post(SystemConstant.COMPANY_LIST, {} ).subscribe({
        next: (data) => {;
          this.recordEquipmentLayoutInputRequest.sysCompanyOfficeList = data;
        },
        complete: () => {
        }
      });
    } else {
      this.addFlag = false;
      this.recordEquipmentLayoutEditTitle = '修改--';
      // 修改时 获取项目列表
      const  dataList = this.recordEquipmentLayoutInputRequest.recordEquipmentLayoutDataList;
      this.recordEquipmentLayoutInputRequest.recordEquipmentLayoutDataList = [];
      // 项目列表
      const  officeList = this.recordEquipmentLayoutInputRequest.sysCompanyOfficeList;
      for (let i = 0; i < dataList.length; i++) {
        const recordEquipmentLayoutData = {
          'id': dataList[i].id,
          'officdId': dataList[i].officdId,
          'processAndEquipment': dataList[i].processAndEquipment,
          'hazardFactors': dataList[i].hazardFactors,
          'layoutDetail': dataList[i].layoutDetail,
          'remarkds': dataList[i].remarkds,
          'relationId': dataList[i].relationId,
          'officdName': officeList[i].officeName
        };
        this.recordEquipmentLayoutInputRequest.recordEquipmentLayoutDataList.push(recordEquipmentLayoutData);
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
    const index = this.recordEquipmentLayoutInputRequest.recordEquipmentLayoutDataList.length;
    this.recordEquipmentLayoutInputRequest.recordEquipmentLayoutDataList[index] = { 'id' : '', 'officdId' : '', 'officdName' : '', 'processAndEquipment' : '', 'hazardFactors' : '', 'layoutDetail' : '', 'remarkds' : '', 'relationId' : ''};
    this.httpService.post(SystemConstant.COMPANY_LIST, {} ).subscribe({
      next: (data) => {;
        this.recordEquipmentLayoutInputRequest.sysCompanyOfficeList = data;
      },
      complete: () => {
      }
    });
  }
  /**
   * 删除部门
   */
  delOffice(item) {
    const index = this.recordEquipmentLayoutInputRequest.recordEquipmentLayoutDataList.indexOf(item);
    this.recordEquipmentLayoutInputRequest.recordEquipmentLayoutDataList.splice(index, index + 1);

  }

  /**
   * 提交
   */
  submitData() {
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.EQUIPMENT_LAYOUT_ADD;
    } else {
      url = SystemConstant.EQUIPMENT_LAYOUT_EDIT;
    }
    // 保存调查表
    this.httpService.post(url, this.recordEquipmentLayoutInputRequest).subscribe({
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
