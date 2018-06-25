import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpService} from '../../core/http/http.service';
import {ToastService} from '../../toast/toast.service';
import {WaitService} from '../../core/wait/wait.service';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastType} from '../../toast/toast-type.enum';
import {ToastConfig} from '../../toast/toast-config';
import {CompanyOfficeChooseComponent} from '../../sys/company-office-choose/company-office-choose.component';
import {ModalService} from '../../modal/modal.service';

@Component({
  selector: 'app-work-log-edit',
  templateUrl: './work-log-edit.component.html',
  styleUrls: ['./work-log-edit.component.scss']
})
export class WorkLogEditComponent implements OnInit {
  recordWorkLogEditTitle: string;
  @Input() sceneId = 0;
  @Input() companyId = 0;
  @Input() recordData = {
    recordWorkLog: {
      id: '',
      workLogNo: '',
      verificationResult: '',
      sceneId : 0
    },
    recordWorkLogDataList: [{
      id: '',
      companyOfficeId: '',
      officeName: '',
      postId: '',
      personOfClass: '',
      workHours: '',
      workPlace: '',
      workContent: '',
      hazardFactors: '',
      remarks: '',
      relationId: ''
    }]
  };
  sysPostList: [{
    'id': '',
    'postName': ''
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
    this.httpService.post(SystemConstant.SYS_POST_LIST, {} ).subscribe({
      next: (data) => {
        this.sysPostList = data;
      },
      complete: () => {
      }
    });
  }

  ngOnInit() {
    if (this.recordData.recordWorkLog === null
      || this.recordData.recordWorkLog.id === null
      || this.recordData.recordWorkLog.id === '') {
      this.addFlag = true;
      this.recordWorkLogEditTitle = '新增--工作日写实记录表';
      this.recordData.recordWorkLog = {
        id: '',
        workLogNo: '',
        verificationResult: '',
        sceneId : 0
      };
    } else {
      this.addFlag = false;
      this.recordWorkLogEditTitle = '修改--工作日写实记录表';
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
    if (this.recordData.recordWorkLogDataList === null) {
      this.recordData.recordWorkLogDataList = [];
    }
    const index = this.recordData.recordWorkLogDataList.length;
    this.recordData.recordWorkLogDataList[index] = {
      id : '',
      companyOfficeId: '',
      officeName: '',
      postId: '',
      personOfClass: '',
      workHours: '',
      workPlace: '',
      workContent: '',
      hazardFactors: '',
      remarks: '',
      relationId: ''
    };
  }

  /**
   * 删除一行
   */
  delOffice(item) {
    const index = this.recordData.recordWorkLogDataList.indexOf(item);
    this.recordData.recordWorkLogDataList.splice(index, index + 1);
  }

  /**
   * 提交
   */
  submitData() {
    // 获取部门id
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.WORK_LOG_ADD;
    } else {
      url = SystemConstant.WORK_LOG_EDIT;
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
          this.recordData.recordWorkLogDataList[index].companyOfficeId = sysCompanyOffice.id;
          this.recordData.recordWorkLogDataList[index].officeName = sysCompanyOffice.officeName;
        }
      }
    );
  }

}
