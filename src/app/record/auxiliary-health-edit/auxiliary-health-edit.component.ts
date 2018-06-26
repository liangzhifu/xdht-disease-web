import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from '../../core/http/http.service';
import {ToastConfig} from '../../toast/toast-config';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastService} from '../../toast/toast.service';
import {ToastType} from '../../toast/toast-type.enum';
import {ModalService} from '../../modal/modal.service';
import {WaitService} from '../../core/wait/wait.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CompanyOfficeChooseComponent} from '../../sys/company-office-choose/company-office-choose.component';

@Component({
  selector: 'app-auxiliary-health-edit',
  templateUrl: './auxiliary-health-edit.component.html',
  styleUrls: ['./auxiliary-health-edit.component.scss']
})
export class AuxiliaryHealthEditComponent implements OnInit {

  recordAuxiliaryHealthEditTitle: string;
  @Input() sceneId = 0;
  @Input() companyId = 0;
  @Input() recordData = {
    recordAuxiliaryHealth: {
      id: '',
      auxiliaryHealthNo: '',
      verificationResult: '',
      sceneId : 0
    },
    recordAuxiliaryHealthDataList: [{
      id: '',
      auxiliaryHealthId: '',
      officeId: '',
      officeName: '',
      workPlace: '',
      hygienicRoom: '',
      livingRoom: ''
    }]
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
    if (this.recordData.recordAuxiliaryHealth === null
      || this.recordData.recordAuxiliaryHealth.id === null
      || this.recordData.recordAuxiliaryHealth.id === '') {
      this.addFlag = true;
      this.recordAuxiliaryHealthEditTitle = '新增--辅助卫生用室调查表';
      this.recordData.recordAuxiliaryHealth = {
        id: '',
        auxiliaryHealthNo: '',
        verificationResult: '',
        sceneId : 0
      };
    } else {
      this.addFlag = false;
      this.recordAuxiliaryHealthEditTitle = '修改--辅助卫生用室调查表';
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
    if (this.recordData.recordAuxiliaryHealthDataList === null) {
      this.recordData.recordAuxiliaryHealthDataList = [];
    }
    const index = this.recordData.recordAuxiliaryHealthDataList.length;
    this.recordData.recordAuxiliaryHealthDataList[index] = {
      id: '',
      auxiliaryHealthId: '',
      officeId: '',
      officeName: '',
      workPlace: '',
      hygienicRoom: '',
      livingRoom: ''
    };
  }

  /**
   * 删除一行
   */
  delOffice(item) {
    const index = this.recordData.recordAuxiliaryHealthDataList.indexOf(item);
    this.recordData.recordAuxiliaryHealthDataList.splice(index, 1);
  }

  /**
   * 提交
   */
  submitData() {
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.RECORD_AUXILIARY_HEALTH_ADD;
      this.recordData.recordAuxiliaryHealth.sceneId = this.sceneId;
    } else {
      url = SystemConstant.RECORD_AUXILIARY_HEALTH_EDIT;
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
   */
  searchEmployeeOffice(index) {
    const modalRef = this.ngbModal.open(CompanyOfficeChooseComponent);
    modalRef.componentInstance.companyId = this.companyId;
    modalRef.result.then(
      (result) => {
        if (result.success === 'success') {
          const sysCompanyOffice = result.sysCompanyOffice;
          this.recordData.recordAuxiliaryHealthDataList[index].officeId = sysCompanyOffice.id;
          this.recordData.recordAuxiliaryHealthDataList[index].officeName = sysCompanyOffice.officeName;
        }
      }
    );
  }

}
