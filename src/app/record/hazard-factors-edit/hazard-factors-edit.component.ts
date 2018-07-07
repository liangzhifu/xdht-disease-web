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
  selector: 'app-hazard-factors-edit',
  templateUrl: './hazard-factors-edit.component.html',
  styleUrls: ['./hazard-factors-edit.component.scss']
})
export class HazardFactorsEditComponent implements OnInit {
  recordHazardFactorsEditTitle: string;
  @Input() sceneId = 0;
  @Input() questionnaireId = 0;
  @Input() companyId = 0;
  @Input() recordData = {
    recordHazardFactors: {
      id: '',
      hazardFactorsNo: '',
      verificationResult: '',
      sceneId : 0
    },
    recordHazardFactorsDataList: [{
      id: '',
      officeId: '',
      officeName: '',
      processName: '',
      hazardFactors: '',
      exposureMode: '',
      exposureTime: '',
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
    if (this.recordData.recordHazardFactors === null
      || this.recordData.recordHazardFactors.id === null
      || this.recordData.recordHazardFactors.id === '') {
      this.addFlag = true;
      this.recordHazardFactorsEditTitle = '新增--职业病危害因素调查表';
      this.recordData.recordHazardFactors = {
        id: '',
        hazardFactorsNo: '',
        verificationResult: '',
        sceneId: 0
        };
      } else {
      this.addFlag = false;
      this.recordHazardFactorsEditTitle = '修改--职业病危害因素调查表';

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
    if (this.recordData.recordHazardFactorsDataList === null) {
      this.recordData.recordHazardFactorsDataList = [];
    }
    const index = this.recordData.recordHazardFactorsDataList.length;
    this.recordData.recordHazardFactorsDataList[index] = {
      id: '',
      officeId: '',
      officeName: '',
      processName: '',
      hazardFactors: '',
      exposureMode: '',
      exposureTime: '',
      remarks: '',
      relationId: ''
    };
  }
  /**
   * 删除一行
   */
  delOffice(item) {
    const index = this.recordData.recordHazardFactorsDataList.indexOf(item);
    this.recordData.recordHazardFactorsDataList.splice(index,  1);
  }
  /**
   * 提交
   */
  submitData() {
    // 获取部门id
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.HAZARD_FACTORS_ADD;
      this.recordData.recordHazardFactors.sceneId = this.sceneId;
      this.recordData.questionnaireId = this.questionnaireId;
    } else {
      url = SystemConstant.HAZARD_FACTORS_EDIT;
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
    this.recordData.recordHazardFactorsDataList[data.index].officeId = data.officeId;
  }
}
