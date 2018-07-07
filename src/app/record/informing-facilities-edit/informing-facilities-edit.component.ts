import {Component, Input, OnInit} from '@angular/core';
import {SystemConstant} from '../../core/class/system-constant';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {WaitService} from '../../core/wait/wait.service';
import {HttpService} from '../../core/http/http.service';
import {ToastService} from '../../toast/toast.service';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';
import {ModalService} from '../../modal/modal.service';

@Component({
  selector: 'app-informing-facilities-edit',
  templateUrl: './informing-facilities-edit.component.html',
  styleUrls: ['./informing-facilities-edit.component.scss']
})
export class InformingFacilitiesEditComponent implements OnInit {
  recordInformingFacilitiesEditTitle: string;
  @Input() sceneId = 0;
  @Input() questionnaireId = 0;
  @Input() companyId = 0;
  @Input() recordData = {
    recordInformingFacilities: {
      id: '',
      informingFacilitiesNo: '',
      verificationResult: '',
      sceneId : 0
    },
    recordInformingFacilitiesDataList: [{
      id: '',
      companyOfficeId: '',
      processName: '',
      hazardFactors: '',
      informingFacilities: '',
      settingPlace: '',
      remarks: '',
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
    if (this.recordData.recordInformingFacilities === null
      || this.recordData.recordInformingFacilities === null
      || this.recordData.recordInformingFacilities.id === '') {
      this.addFlag = true;
      this.recordInformingFacilitiesEditTitle = '新增--职业病危害告知设施调查表';
      this.recordData.recordInformingFacilities = {
        id: '',
        informingFacilitiesNo: '',
        verificationResult: '',
        sceneId : 0
      };
    } else {
      this.addFlag = false;
      this.recordInformingFacilitiesEditTitle = '修改--职业病危害告知设施调查表';
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
    if (this.recordData.recordInformingFacilitiesDataList === null) {
      this.recordData.recordInformingFacilitiesDataList = [];
    }
    const index = this.recordData.recordInformingFacilitiesDataList.length;
    this.recordData.recordInformingFacilitiesDataList[index] = {
        id: '',
        companyOfficeId: '',
        processName: '',
        hazardFactors: '',
        informingFacilities: '',
        settingPlace: '',
        remarks: '',
        relationId: ''
    };
  }

  /**
   * 删除一行
   */
  delRecord(index) {
    this.recordData.recordInformingFacilitiesDataList.splice(index, 1 );
  }

  /**
   * 提交
   */
  submitData() {
    // 获取部门id
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.INFORMING_FACILITIES_ADD;
      this.recordData.recordInformingFacilities.sceneId = this.sceneId;
      this.recordData.questionnaireId = this.questionnaireId;
    } else {
      url = SystemConstant.INFORMING_FACILITIES_EDIT;
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
    this.recordData.recordInformingFacilitiesDataList[data.index].companyOfficeId = data.officeId;
  }
}
