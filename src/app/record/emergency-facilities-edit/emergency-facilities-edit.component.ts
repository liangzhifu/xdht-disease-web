import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {WaitService} from '../../core/wait/wait.service';
import {HttpService} from '../../core/http/http.service';
import {ToastService} from '../../toast/toast.service';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';
import {ModalService} from '../../modal/modal.service';

@Component({
  selector: 'app-emergency-facilities-edit',
  templateUrl: './emergency-facilities-edit.component.html',
  styleUrls: ['./emergency-facilities-edit.component.scss']
})
export class EmergencyFacilitiesEditComponent implements OnInit {
  recordEmergencyFacilitiesEditTitle: string;
  @Input() sceneId = 0;
  @Input() questionnaireId = 0;
  @Input() companyId = 0;
  @Input() recordData = {
    recordEmergencyFacilities: {
      id: '',
      emergencyFacilitiesNo: '',
      verificationResult: '',
      sceneId : 0
    },
    recordEmergencyFacilitiesDataList: [{
      id: '',
      officeId: '',
      workPlace: '',
      emergencyFacilities: '',
      number: '',
      operationAndMaintenance: '',
      technicalParameter: '',
      hazardFactors: '',
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
  ) {

  }

  ngOnInit() {
    if (this.recordData.recordEmergencyFacilities === null
      || this.recordData.recordEmergencyFacilities === null
      || this.recordData.recordEmergencyFacilities.id === '') {
      this.addFlag = true;
      this.recordEmergencyFacilitiesEditTitle = '新增--应急设施调查表';
      this.recordData.recordEmergencyFacilities = {
        id: '',
        emergencyFacilitiesNo: '',
        verificationResult: '',
        sceneId : 0
      };
    } else {
      this.addFlag = false;
      this.recordEmergencyFacilitiesEditTitle = '修改--应急设施调查表';
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
    if (this.recordData.recordEmergencyFacilitiesDataList === null) {
      this.recordData.recordEmergencyFacilitiesDataList = [];
    }
    const index = this.recordData.recordEmergencyFacilitiesDataList.length;
    this.recordData.recordEmergencyFacilitiesDataList[index] = {
        id: '',
        officeId: '',
        workPlace: '',
        emergencyFacilities: '',
        number: '',
        operationAndMaintenance: '',
        technicalParameter: '',
        hazardFactors: '',
        relationId: ''
    };
  }

  /**
   * 删除一行
   */
  delOffice(item) {
    const index = this.recordData.recordEmergencyFacilitiesDataList.indexOf(item);
    this.recordData.recordEmergencyFacilitiesDataList.splice(index,  1);
  }

  /**
   * 提交
   */
  submitData() {
    // 获取部门id
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.EMERGENCY_FACILITIES_ADD;
      this.recordData.recordEmergencyFacilities.sceneId = this.sceneId;
      this.recordData.questionnaireId = this.questionnaireId;
    } else {
      url = SystemConstant.EMERGENCY_FACILITIES_EDIT;
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
    this.recordData.recordEmergencyFacilitiesDataList[data.index].officeId = data.officeId;
  }
}
