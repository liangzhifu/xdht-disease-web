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
  selector: 'app-equipment-layout-edit',
  templateUrl: './equipment-layout-edit.component.html',
  styleUrls: ['./equipment-layout-edit.component.scss']
})
export class EquipmentLayoutEditComponent implements OnInit {
  recordEquipmentLayoutEditTitle: string;
  @Input() sceneId = 0;
  @Input() questionnaireId = 0;
  @Input() companyId = 0;
  @Input() recordData = {
    recordEquipmentLayout: {
      id: '',
      equipmentLayoutNo: '',
      verificationResult: '',
      sceneId : 0
    },
    recordEquipmentLayoutDataList: [{
      id: '',
      officeId: '',
      processAndEquipment: '',
      hazardFactors: '',
      layoutDetail: '',
      remarkds: '',
      officeName: '',
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
    if (this.recordData.recordEquipmentLayout === null
      || this.recordData.recordEquipmentLayout.id === null
      || this.recordData.recordEquipmentLayout.id === '') {
      this.addFlag = true;
      this.recordEquipmentLayoutEditTitle = '新增--设备设施布局调查表';
      this.recordData.recordEquipmentLayout = {
        id: '',
        equipmentLayoutNo: '',
        verificationResult: '',
        sceneId : 0
      };
    } else {
      this.addFlag = false;
      this.recordEquipmentLayoutEditTitle = '修改--设备设施布局调查表';

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
    if (this.recordData.recordEquipmentLayoutDataList === null) {
      this.recordData.recordEquipmentLayoutDataList = [];
    }
    const index = this.recordData.recordEquipmentLayoutDataList.length;
    this.recordData.recordEquipmentLayoutDataList[index] = {
        id: '',
        officeId: '',
        processAndEquipment: '',
        hazardFactors: '',
        layoutDetail: '',
        remarkds: '',
        officeName: '',
        relationId: ''
    };
  }
  /**
   * 删除部门
   */
  delOffice(item) {
    const index = this.recordData.recordEquipmentLayoutDataList.indexOf(item);
    this.recordData.recordEquipmentLayoutDataList.splice(index,  1);

  }

  /**
   * 提交
   */
  submitData() {
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.EQUIPMENT_LAYOUT_ADD;
     this.recordData.recordEquipmentLayoutDataList.splice( 1, this.recordData.recordEquipmentLayoutDataList.length + 1);
      this.recordData.recordEquipmentLayout.sceneId = this.sceneId;
      this.recordData.questionnaireId = this.questionnaireId;
    } else {
      url = SystemConstant.EQUIPMENT_LAYOUT_EDIT;
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
    this.recordData.recordEquipmentLayoutDataList[data.index].officeId = data.officeId;
  }

}
