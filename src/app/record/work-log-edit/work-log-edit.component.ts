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
      postId: '',
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
  sysPostList: [{
    'id': '',
    'dictionaryName': ''
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
    this.recordData.recordWorkLogDataList[data.index].companyOfficeId = data.officeId;
  }

}
