import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpService} from '../../core/http/http.service';
import {ToastService} from '../../toast/toast.service';
import {WaitService} from '../../core/wait/wait.service';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastType} from '../../toast/toast-type.enum';
import {ToastConfig} from '../../toast/toast-config';
import {ModalService} from '../../modal/modal.service';

@Component({
  selector: 'app-anti-noise-edit',
  templateUrl: './anti-noise-edit.component.html',
  styleUrls: ['./anti-noise-edit.component.scss']
})
export class AntiNoiseEditComponent implements OnInit {
  recordAntiNoiseEditTitle: string;
  @Input() sceneId = 0;
  @Input() questionnaireId = 0;
  @Input() companyId = 0;
  @Input() recordData = {
    recordAntiNoiseFacilities: {
      id: '',
      antiNoiseFacilitiesNo: '',
      verificationResult: '',
      sceneId: 0
    },
    recordAntiNoiseFacilitiesDataList: [{
      id: '',
      companyOfficeId: '',
      postId: '',
      workPlace: '',
      noiseSource: '',
      noiseProtectionFacilities: '',
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
    if (this.recordData.recordAntiNoiseFacilities === null
      || this.recordData.recordAntiNoiseFacilities.id === null
      || this.recordData.recordAntiNoiseFacilities.id === '') {
      this.addFlag = true;
      this.recordAntiNoiseEditTitle = '新增--防噪声设施调查表';
      this.recordData.recordAntiNoiseFacilities = {
        id: '',
        antiNoiseFacilitiesNo: '',
        verificationResult: '',
        sceneId: 0
      };
    } else {
      this.addFlag = false;
      this.recordAntiNoiseEditTitle = '修改--防噪声设施调查表';
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
    if (this.recordData.recordAntiNoiseFacilitiesDataList === null) {
      this.recordData.recordAntiNoiseFacilitiesDataList = [];
    }
    const index = this.recordData.recordAntiNoiseFacilitiesDataList.length;
    this.recordData.recordAntiNoiseFacilitiesDataList[index] = {
        id: '',
        companyOfficeId: '',
        postId: '',
        workPlace: '',
        noiseSource: '',
        noiseProtectionFacilities: '',
        operationAndMaintenance: '',
        relationId: ''
    };
  }

  /**
   * 删除一行
   */
  delOffice(item) {
    const index = this.recordData.recordAntiNoiseFacilitiesDataList.indexOf(item);
    this.recordData.recordAntiNoiseFacilitiesDataList.splice(index, 1);
  }

  /**
   * 提交
   */
  submitData() {
    // 获取部门id
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.ANTI_NOISE_ADD;
      this.recordData.recordAntiNoiseFacilities.sceneId = this.sceneId;
      this.recordData.questionnaireId = this.questionnaireId;
    } else {
      url = SystemConstant.ANTI_NOISE_EDIT;
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
    this.recordData.recordAntiNoiseFacilitiesDataList[data.index].companyOfficeId = data.officeId;
  }

}
