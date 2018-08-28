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
  selector: 'app-work-log-edit',
  templateUrl: './work-log-edit.component.html',
  styleUrls: ['./work-log-edit.component.scss']
})
export class WorkLogEditComponent implements OnInit {
  recordWorkLogEditTitle: string;
  @Input() numberSeq: any;
  @Input() sceneId = 0;
  @Input() questionnaireId = 0;
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
      companyOfficeName: '',
      postId: '',
      postName: '',
      personOfClass: '',
      workHours: '',
      workPlace: '',
      workContent: '',
      hazardFactors: '',
      remarks: '',
      relationId: ''
    }],
    questionnaireId: 0
  };
  sysCompanyOffice: [{
    'id': '',
    'parentId': '',
    'officeName': ''
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
    this.httpService.post( SystemConstant.OFFICE_LIST , {}).subscribe({
      next: (data) => {
        this.sysCompanyOffice = data;
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
      this.httpService.get(SystemConstant.SYS_QUESTIONNAIRE + '/' + this.questionnaireId).subscribe({
        next: (data) => {
          this.recordData.recordWorkLog.workLogNo = this.numberSeq + data.questionnaireNum ;
        },
        complete: () => {}
      });
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
      companyOfficeName: '',
      postId: '',
      postName: '',
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
    this.recordData.recordWorkLogDataList.splice(index, 1);
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
      this.recordData.recordWorkLog.sceneId = this.sceneId;
      this.recordData.questionnaireId = this.questionnaireId;
    } else {
      url = SystemConstant.WORK_LOG_EDIT;
    }
     if (this.recordData.recordWorkLogDataList.length === 0) {
       const toastcfg = new ToastConfig(ToastType.ERROR, ' ' , '至少填入一张调查表' , 3000);
       this.toastService.toast(toastcfg);
     } else {
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

  /**
   * 选择部门
   * @param data
   */
  onDataChanged(data) {
    this.recordData.recordWorkLogDataList[data.index].companyOfficeId = data.officeId;
    this.recordData.recordWorkLogDataList[data.index].postId = data.workTypeId;
    this.recordData.recordWorkLogDataList[data.index].postName = data.workTypeName;
    let parentId = '';
    for (let i = 0 ; i < this.sysCompanyOffice.length; i++) {
      if (data.workTypeId === this.sysCompanyOffice[i].id) {
        parentId = this.sysCompanyOffice[i].parentId;
      }
    }
    if (parentId !== '') {
      for (let i = 0 ; i < this.sysCompanyOffice.length; i++) {
        if (parentId === this.sysCompanyOffice[i].id) {
          this.recordData.recordWorkLogDataList[data.index].companyOfficeId = parentId;
          this.recordData.recordWorkLogDataList[data.index].companyOfficeName = this.sysCompanyOffice[i].officeName;
        }
      }
    }

      }


}
