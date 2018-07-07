import {Component, Input, OnInit} from '@angular/core';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastService} from '../../toast/toast.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {WaitService} from '../../core/wait/wait.service';
import {HttpService} from '../../core/http/http.service';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';
import {ModalService} from '../../modal/modal.service';

@Component({
  selector: 'app-temperature-protection-edit',
  templateUrl: './temperature-protection-edit.component.html',
  styleUrls: ['./temperature-protection-edit.component.scss']
})
export class TemperatureProtectionEditComponent implements OnInit {
  recordTemperatureEditTitle: string;
  @Input() sceneId = 0;
  @Input() questionnaireId = 0;
  @Input() companyId = 0;
  @Input() recordData = {
    recordTemperature: {
      id: '',
      temperatureProtectionFacilitiesNo: '',
      verificationResult: '',
      sceneId : 0
    },
    recordTemperatureDataList: [{
      id: '',
      companyOfficeId: '',
      postId: '',
      workPlace: '',
      productiveHeatSource: '',
      temperatureProtectionFacilities: '',
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
    if (this.recordData.recordTemperature === null
      || this.recordData.recordTemperature.id === null
      || this.recordData.recordTemperature.id === '') {
      this.addFlag = true;
      this.recordTemperatureEditTitle = '新增--防高温设施调查表';
      this.recordData.recordTemperature = {
        id: '',
        temperatureProtectionFacilitiesNo: '',
        verificationResult: '',
        sceneId : 0
      };
    } else {
      this.addFlag = false;
      this.recordTemperatureEditTitle = '修改--防高温设施调查表';
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
    if (this.recordData.recordTemperatureDataList === null) {
      this.recordData.recordTemperatureDataList = [];
    }
    const index = this.recordData.recordTemperatureDataList.length;
    this.recordData.recordTemperatureDataList[index] = {
        id: '',
        companyOfficeId: '',
        postId: '',
        workPlace: '',
        productiveHeatSource: '',
        temperatureProtectionFacilities: '',
        operationAndMaintenance: '',
        relationId: ''
    };
  }

  /**
   * 删除一行
   */
  delOffice(item) {
    const index = this.recordData.recordTemperatureDataList.indexOf(item);
    this.recordData.recordTemperatureDataList.splice(index, 1);
  }

  /**
   * 提交
   */
  submitData() {
    // 获取部门id
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.TEMPERATURE_ADD;
      this.recordData.recordTemperature.sceneId = this.sceneId;
      this.recordData.questionnaireId = this.questionnaireId;
    } else {
      url = SystemConstant.TEMPERATURE_EDIT;
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
    this.recordData.recordTemperatureDataList[data.index].companyOfficeId = data.officeId;
  }


}
