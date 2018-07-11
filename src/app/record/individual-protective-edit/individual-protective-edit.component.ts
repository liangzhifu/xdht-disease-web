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
  selector: 'app-individual-protective-edit',
  templateUrl: './individual-protective-edit.component.html',
  styleUrls: ['./individual-protective-edit.component.scss']
})
export class IndividualProtectiveEditComponent implements OnInit {
  recordIndividualProtectiveEditTitle: string;
  @Input() sceneId = 0;
  @Input() questionnaireId = 0;
  @Input() companyId = 0;
  @Input() recordData = {
    recordIndividualProtective: {
      id: '',
      individualProtectiveEquipmentNo: '',
      verificationResult: '',
      sceneId : 0
    },
    recordIndividualProtectiveDataList: [{
      id: '',
      companyOfficeId: '',
      postId: '',
      hazardFactors: '',
      protectiveEquipment: '',
      technicalParameter: '',
      number: '',
      usaged: '',
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
    if (this.recordData.recordIndividualProtective === null
      || this.recordData.recordIndividualProtective === null
      || this.recordData.recordIndividualProtective.id === '') {
      this.addFlag = true;
      this.recordIndividualProtectiveEditTitle = '新增--个体防护用品调查表';
      this.recordData.recordIndividualProtective = {
        id: '',
        individualProtectiveEquipmentNo: '',
        verificationResult: '',
        sceneId : 0
      };
    } else {
      this.addFlag = false;
      this.recordIndividualProtectiveEditTitle = '修改--个体防护用品调查表';
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
    if (this.recordData.recordIndividualProtectiveDataList === null) {
      this.recordData.recordIndividualProtectiveDataList = [];
    }
    const index = this.recordData.recordIndividualProtectiveDataList.length;
    this.recordData.recordIndividualProtectiveDataList[index] = {
        id: '',
        companyOfficeId: '',
        postId: '',
        hazardFactors: '',
        protectiveEquipment: '',
        technicalParameter: '',
        number: '',
        usaged: '',
        relationId: ''
    };
  }

  /**
   * 删除一行
   */
  delOffice(item) {
    const index = this.recordData.recordIndividualProtectiveDataList.indexOf(item);
    this.recordData.recordIndividualProtectiveDataList.splice(index, 1);
  }

  /**
   * 提交
   */
  submitData() {
    // 获取部门id
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.INDIVIDUAL_PROTECTIVE_ADD;
      this.recordData.recordIndividualProtective.sceneId = this.sceneId;
      this.recordData.questionnaireId = this.questionnaireId;
    } else {
      url = SystemConstant.INDIVIDUAL_PROTECTIVE_EDIT;
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
    this.recordData.recordIndividualProtectiveDataList[data.index].companyOfficeId = data.officeId;
  }


}
