import {Component, Input, OnInit} from '@angular/core';
import {ToastService} from '../../toast/toast.service';
import {HttpService} from '../../core/http/http.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {WaitService} from '../../core/wait/wait.service';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastType} from '../../toast/toast-type.enum';
import {ToastConfig} from '../../toast/toast-config';
import {ModalService} from '../../modal/modal.service';

@Component({
  selector: 'app-vdd-equipment-edit',
  templateUrl: './vdd-equipment-edit.component.html',
  styleUrls: ['./vdd-equipment-edit.component.scss']
})
export class VddEquipmentEditComponent implements OnInit {
  recordVddEquipmentEditTitle: string;
  @Input() sceneId = 0;
  @Input() questionnaireId = 0;
  @Input() companyId = 0;
  @Input() recordData = {
    recordVddEquipment: {
      id: '',
      vddEquipmentNo: '',
      verificationResult: '',
      sceneId : 0
    },
    recordVddEquipmentDataList: [{
      id: '',
      officeId: '',
      postId: '',
      workPlace: '',
      vddEquipmentName: '',
      poisonOrDustName: '',
      number: '',
      operationAndMaintenance: '',
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
    if (this.recordData.recordVddEquipment === null
      || this.recordData.recordVddEquipment.id === null
      || this.recordData.recordVddEquipment.id === '') {
      this.addFlag = true;
      this.recordVddEquipmentEditTitle = '新增--通风排毒除尘设施调查表';
      this.recordData.recordVddEquipment = {
        id: '',
        vddEquipmentNo: '',
        verificationResult: '',
        sceneId : 0
      };
    } else {
      this.addFlag = false;
      this.recordVddEquipmentEditTitle = '修改--通风排毒除尘设施调查表';
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
    if (this.recordData.recordVddEquipmentDataList === null) {
      this.recordData.recordVddEquipmentDataList = [];
    }
    const index = this.recordData.recordVddEquipmentDataList.length;
    this.recordData.recordVddEquipmentDataList[index] = {
      id: '',
      officeId: '',
      postId: '',
      workPlace: '',
      vddEquipmentName: '',
      poisonOrDustName: '',
      number: '',
      operationAndMaintenance: '',
      relationId: ''
    };
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
      this.recordData.recordVddEquipment.sceneId = this.sceneId;
      this.recordData.questionnaireId = this.questionnaireId;
    } else {
      url = SystemConstant.VDD_EQUIPMENT_EDIT;
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
    this.recordData.recordVddEquipmentDataList[data.index].officeId = data.officeId;
  }
}
