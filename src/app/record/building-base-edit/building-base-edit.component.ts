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
  selector: 'app-building-base-edit',
  templateUrl: './building-base-edit.component.html',
  styleUrls: ['./building-base-edit.component.scss']
})
export class BuildingBaseEditComponent implements OnInit {
  recordBuildingBaseEditTitle: string;
  @Input() sceneId = 0;
  @Input() questionnaireId = 0;
  @Input() companyId = 0;
  @Input() recordData = {
    recordBuildingBase: {
      id: '',
      buildingBaseNo: '',
      verificationResult: '',
      sceneId : 0
    },
    recordBuildingBaseDataList: [{
      id: '',
      buildingBaseId: '',
      buildingName: '',
      structure: '',
      layers: '',
      builtUpArea: '',
      lightingMode: '',
      lightingSystem: '',
      lightingLamps: ''
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
    if (this.recordData.recordBuildingBase === null
      || this.recordData.recordBuildingBase.id === null
      || this.recordData.recordBuildingBase.id === '') {
      this.addFlag = true;
      this.recordBuildingBaseEditTitle = '新增--建筑物基本情况及采光照明调查表';
      this.recordData.recordBuildingBase = {
        id: '',
        buildingBaseNo: '',
        verificationResult: '',
        sceneId : 0
      };
    } else {
      this.addFlag = false;
      this.recordBuildingBaseEditTitle = '修改--建筑物基本情况及采光照明调查表';
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
    if (this.recordData.recordBuildingBaseDataList === null) {
      this.recordData.recordBuildingBaseDataList = [];
    }
    const index = this.recordData.recordBuildingBaseDataList.length;
    this.recordData.recordBuildingBaseDataList[index] = {
      id: '',
      buildingBaseId: '',
      buildingName: '',
      structure: '',
      layers: '',
      builtUpArea: '',
      lightingMode: '',
      lightingSystem: '',
      lightingLamps: ''
    };
  }

  /**
   * 删除一行
   */
  delRecord(index) {
    this.recordData.recordBuildingBaseDataList.splice(index, 1);
  }

  /**
   * 提交
   */
  submitData() {
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.BUILDING_BASE_ADD;
      this.recordData.recordBuildingBase.sceneId = this.sceneId;
      this.recordData.questionnaireId = this.questionnaireId;
    } else {
      url = SystemConstant.BUILDING_BASE_EDIT;
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
