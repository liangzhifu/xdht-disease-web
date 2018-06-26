import {Component, Input, OnInit} from '@angular/core';
import {ToastService} from '../../toast/toast.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {WaitService} from '../../core/wait/wait.service';
import {HttpService} from '../../core/http/http.service';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';
import {ModalService} from '../../modal/modal.service';
import {CompanyOfficeChooseComponent} from '../../sys/company-office-choose/company-office-choose.component';

@Component({
  selector: 'app-other-protective-edit',
  templateUrl: './other-protective-edit.component.html',
  styleUrls: ['./other-protective-edit.component.scss']
})
export class OtherProtectiveEditComponent implements OnInit {
  recordOtherProtectiveEditTitle: string;
  @Input() sceneId = 0;
  @Input() companyId = 0;
  @Input() recordData = {
    recordOtherProtective: {
      id: '',
      otherProtectiveFacilitiesNo: '',
      verificationResult: '',
      sceneId : 0
    },
    recordOtherProtectiveDataList: [{
      id: '',
      officeId: '',
      officeName: '',
      postId: '',
      workPlace: '',
      hazardFactors: '',
      protectiveFacilities: '',
      operationAndMaintenance: '',
      relationId: ''
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
    if (this.recordData.recordOtherProtective === null
      || this.recordData.recordOtherProtective === null
      || this.recordData.recordOtherProtective.id === '') {
      this.addFlag = true;
      this.recordOtherProtectiveEditTitle = '新增--其他防护设施调查表';
      this.recordData.recordOtherProtective = {
        id: '',
        otherProtectiveFacilitiesNo: '',
        verificationResult: '',
        sceneId : 0
      };
    } else {
      this.addFlag = false;
      this.recordOtherProtectiveEditTitle = '修改--其他防护设施调查表';
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
    if (this.recordData.recordOtherProtectiveDataList === null) {
      this.recordData.recordOtherProtectiveDataList = [];
    }
    const index = this.recordData.recordOtherProtectiveDataList.length;
    this.recordData.recordOtherProtectiveDataList[index] = {
        id: '',
        officeId: '',
        officeName: '',
        postId: '',
        workPlace: '',
        hazardFactors: '',
        protectiveFacilities: '',
        operationAndMaintenance: '',
        relationId: ''
    };
  }

  /**
   * 删除一行
   */
  delOffice(item) {
    const index = this.recordData.recordOtherProtectiveDataList.indexOf(item);
    this.recordData.recordOtherProtectiveDataList.splice(index,  1);
  }

  /**
   * 提交
   */
  submitData() {
    // 获取部门id
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.OTHER_PROTECTIVE_ADD;
      this.recordData.recordOtherProtective.sceneId = this.sceneId;
    } else {
      url = SystemConstant.OTHER_PROTECTIVE_EDIT;
    }
    // 保存调查表
    this.httpService.post(url, this.recordData).subscribe({
      next: (data) => {
        const toastCfg = new ToastConfig(ToastType.SUCCESS, '', this.action + '操作成功！', 3000);
        this.toastService.toast(toastCfg);
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
          this.recordData.recordOtherProtectiveDataList[index].officeId = sysCompanyOffice.id;
          this.recordData.recordOtherProtectiveDataList[index].officeName = sysCompanyOffice.officeName;
        }
      }
    );
  }

}
