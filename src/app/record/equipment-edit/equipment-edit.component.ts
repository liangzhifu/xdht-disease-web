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
  selector: 'app-equipment-edit',
  templateUrl: './equipment-edit.component.html',
  styleUrls: ['./equipment-edit.component.scss']
})
export class EquipmentEditComponent implements OnInit {
  recordEquipmentEditTitle: string;
  @Input() sceneId = 0;
  @Input() questionnaireId = 0;
  @Input() companyId = 0;
  @Input() recordData = {
    recordEquipment: {
      id: '',
      equipmentNo: '',
      verificationResult: '',
      sceneId : 0
    },
    recordEquipmentDataList: [{
      id: '',
      officdId: '',
      processName: '',
      equipmentName: '',
      epuipmentNumber: '',
      relationId: ''
    }],
    questionnaireId: 0

  };

  addFlag: boolean;
  action = '';
  constructor(
    private ngbModal: NgbModal,
    private modalService: ModalService,
    private httpService: HttpService,
    private activeModal: NgbActiveModal,
    private toastService: ToastService,
    private waitService: WaitService
  ) { }

  ngOnInit() {
    if (this.recordData.recordEquipment === null
      || this.recordData.recordEquipment.id === null
      || this.recordData.recordEquipment.id === '') {
      this.addFlag = true;
      this.recordEquipmentEditTitle = '新增--设备设施调查表';
      this.recordData.recordEquipment = {
        id: '',
        equipmentNo: '',
        verificationResult: '',
        sceneId : 0
      };
    } else {
      this.addFlag = false;
      this.recordEquipmentEditTitle = '修改--设备设施调查表';

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
    if (this.recordData.recordEquipmentDataList === null) {
      this.recordData.recordEquipmentDataList = [];
    }
    const index = this.recordData.recordEquipmentDataList.length;
    this.recordData.recordEquipmentDataList[index] = {
      id: '',
      officdId: '',
      processName: '',
      equipmentName: '',
      epuipmentNumber: '',
      relationId: ''
    };
  }
  /**
   * 删除部门
   * @param index 序号
   */
  delOffice(item) {
    const index = this.recordData.recordEquipmentDataList.indexOf(item);
    this.recordData.recordEquipmentDataList.splice(index, 1);
  }

  /**
   * 提交
   */
  submitData() {
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.EQUIPMENT_ADD;
      this.recordData.recordEquipment.sceneId = this.sceneId;
      this.recordData.questionnaireId = this.questionnaireId;
    } else {
      url = SystemConstant.EQUIPMENT_EDIT;
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
    this.recordData.recordEquipmentDataList[data.index].officdId = data.officeId;
  }

}
