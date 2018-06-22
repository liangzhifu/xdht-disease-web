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
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  recordProductEditTitle: string;
  @Input() recordProductInputRequest = {
    'recordProduct': {
      'id': '',
      'productNo': '',
      'verificationResult': ''
    },
    'recordProductDataList': [{
      'id': '',
      'companyOfficeId': '',
      // 'officdName': '',
      'processName': '',
      'productType': '',
      'productName': '',
      'productShape': '',
      'chemicalComposition': '',
      'storageMode': '',
      'transportMode': '',
      'annualAmount': '',
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
    const relationId = this.recordProductInputRequest.recordProduct.id;
    if (relationId === undefined || relationId === null || relationId === '') {
      this.addFlag = true;
      this.recordProductEditTitle = '新增--';
      // 新增时 部门id 获取部门列表
      this.httpService.post(SystemConstant.COMPANY_LIST, {} ).subscribe({
        next: (data) => {
          this.recordProductInputRequest.sysCompanyOfficeList = data;
        },
        complete: () => {
        }
      });
    } else {
      this.addFlag = false;
      this.recordProductEditTitle = '修改--';
      // 修改时 获取内容列表
      const  dataList = this.recordProductInputRequest.recordProductDataList;
      this.recordProductInputRequest.recordProductDataList = [];
      // 项目列表
      for (let i = 0; i < dataList.length; i++) {
        const recordProductData = {
          'id': dataList[i].id,
          'companyOfficeId': dataList[i].companyOfficeId,
          'processName': dataList[i].processName,
          'productType': dataList[i].productType,
          'productName': dataList[i].productName,
          'productShape': dataList[i].productShape,
          'chemicalComposition': dataList[i].chemicalComposition,
          'storageMode': dataList[i].storageMode,
          'transportMode': dataList[i].transportMode,
          'annualAmount': dataList[i].annualAmount,
          'relationId': dataList[i].relationId
        };
        this.recordProductInputRequest.recordProductDataList.push(recordProductData);
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
    const index = this.recordProductInputRequest.recordProductDataList.length;
    this.recordProductInputRequest.recordProductDataList[index] = { 'id' : '', 'companyOfficeId' : '', 'processName' : '', 'productType' : '', 'productName' : '', 'productShape' : '', 'chemicalComposition' : '', 'storageMode' : '', 'transportMode' : '', 'annualAmount' : '', 'relationId' : ''};
    this.httpService.post(SystemConstant.COMPANY_LIST, {} ).subscribe({
      next: (data) => {
        this.recordProductInputRequest.sysCompanyOfficeList = data;
      },
      complete: () => {
      }
    });
  }
  /**
   * 删除一行
   */
  delOffice(item) {
    const index = this.recordProductInputRequest.recordProductDataList.indexOf(item);
    this.recordProductInputRequest.recordProductDataList.splice(index, index + 1);
  }

  /**
   * 提交
   */
  submitData() {
    // 获取部门id
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.PRODUCT_ADD;
    } else {
      url = SystemConstant.PRODUCT_EDIT;
    }
    // 保存调查表
    this.httpService.post(url, this.recordProductInputRequest).subscribe({
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
