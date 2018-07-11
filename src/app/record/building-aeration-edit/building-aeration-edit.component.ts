import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from '../../core/http/http.service';
import {ToastConfig} from '../../toast/toast-config';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastService} from '../../toast/toast.service';
import {ToastType} from '../../toast/toast-type.enum';
import {ModalService} from '../../modal/modal.service';
import {WaitService} from '../../core/wait/wait.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-building-aeration-edit',
  templateUrl: './building-aeration-edit.component.html',
  styleUrls: ['./building-aeration-edit.component.scss']
})
export class BuildingAerationEditComponent implements OnInit {
  recordBuildingAerationEditTitle: string;
  @Input() sceneId = 0;
  @Input() questionnaireId = 0;
  @Input() companyId = 0;
  @Input() recordData = {
    recordBuildingAeration: {
      id: '',
      buildingAerationNo: '',
      verificationResult: '',
      sceneId : 0
    },
    recordBuildingAerationDataList: [{
      id: '',
      buildingName: '',
      regulationMode: '',
      adjustmentFacilities: '',
      number: '',
      heatingMode: ''
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
    if (this.recordData.recordBuildingAeration === null
      || this.recordData.recordBuildingAeration.id === null
      || this.recordData.recordBuildingAeration.id === '') {
      this.addFlag = true;
      this.recordBuildingAerationEditTitle = '新增--建筑物采暖通风及空调调查表';
      this.recordData.recordBuildingAeration = {
        id: '',
        buildingAerationNo: '',
        verificationResult: '',
        sceneId : 0
      };
    } else {
      this.addFlag = false;
      this.recordBuildingAerationEditTitle = '修改--建筑物采暖通风及空调调查表';
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
  addRecord() {
    if (this.recordData.recordBuildingAerationDataList === null) {
      this.recordData.recordBuildingAerationDataList = [];
    }
    const index = this.recordData.recordBuildingAerationDataList.length;
    this.recordData.recordBuildingAerationDataList[index] = {
      id: '',
      buildingName: '',
      regulationMode: '',
      adjustmentFacilities: '',
      number: '',
      heatingMode: ''
    };
  }

  /**
   * 删除一行
   */
  delRecord(index) {
    this.recordData.recordBuildingAerationDataList.splice(index, 1);
  }

  /**
   * 提交
   */
  submitData() {
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.BUILDING_AERATION_ADD;
      this.recordData.recordBuildingAeration.sceneId = this.sceneId;
      this.recordData.questionnaireId = this.questionnaireId;
    } else {
      url = SystemConstant.BUILDING_AERATION_EDIT;
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

}
