import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from '../../core/http/http.service';
import {WaitService} from '../../core/wait/wait.service';
import {ToastService} from '../../toast/toast.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';
import {ModalService} from '../../modal/modal.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  recordProductEditTitle: string;
  @Input() sceneId = 0;
  @Input() questionnaireId = 0;
  @Input() companyId = 0;
  @Input() recordData = {
    recordProduct: {
      id: '',
      productNo: '',
      verificationResult: '',
      sceneId : 0
    },
    recordProductDataList: [{
      id: '',
      companyOfficeId: '',
      processName: '',
      productType: '',
      productName: '',
      productShape: '',
      chemicalComposition: '',
      storageMode: '',
      transportMode: '',
      annualAmount: '',
      relationId: ''
    }],
    questionnaireId: 0
  };
  sysPostList: [{
    id: '',
    dictionaryName: ''
  }];
  addFlag: boolean;
  action = '';
  constructor(
    private ngbModal: NgbModal,
    private modalService: ModalService,
    private httpService: HttpService,
    private activeModal: NgbActiveModal,
    private toastService: ToastService,
    private waitService: WaitService
  ) {
    this.httpService.post(SystemConstant.DICTIONARY_LIST, {dictionaryTypeId: SystemConstant.DICTIONARY_TYPE_POST} ).subscribe({
      next: (data) => {
        this.sysPostList = data;
      },
      complete: () => {
      }
    });
  }

  ngOnInit() {
    if (this.recordData.recordProduct === null
      || this.recordData.recordProduct.id === null
      || this.recordData.recordProduct.id === '') {
      this.addFlag = true;
      this.recordProductEditTitle = '新增--物料及产品调查表';
      this.recordData.recordProduct = {
        id: '',
        productNo: '',
        verificationResult: '',
        sceneId : 0
      };
    } else {
      this.addFlag = false;
      this.recordProductEditTitle = '修改--物料及产品调查表';

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
    if (this.recordData.recordProductDataList === null) {
      this.recordData.recordProductDataList = [];
    }
    const index = this.recordData.recordProductDataList.length;
    this.recordData.recordProductDataList[index] = {
      id: '',
      companyOfficeId: '',
      processName: '',
      productType: '',
      productName: '',
      productShape: '',
      chemicalComposition: '',
      storageMode: '',
      transportMode: '',
      annualAmount: '',
      relationId: ''
    };
  }
  /**
   * 删除一行
   */
  delOffice(item) {
    const index = this.recordData.recordProductDataList.indexOf(item);
    this.recordData.recordProductDataList.splice(index,  1);
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
      this.recordData.recordProduct.sceneId = this.sceneId;
      this.recordData.questionnaireId = this.questionnaireId;
    } else {
      url = SystemConstant.PRODUCT_EDIT;
    }
    // 保存调查表
    this.httpService.post(url, this.recordData).subscribe({
      next: (data) => {
        const toastCfg = new ToastConfig(ToastType.SUCCESS, '', this.action + '操作成功！', 3000);
        this.toastService.toast(toastCfg);
        this.activeModal.close('success');
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

  /**
   * 选择部门
   * @param data
   */
  onDataChanged(data) {
    this.recordData.recordProductDataList[data.index].companyOfficeId = data.officeId;
  }


}
