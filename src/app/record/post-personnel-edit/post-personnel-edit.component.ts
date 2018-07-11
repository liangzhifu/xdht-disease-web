import {Component, Input, OnInit} from '@angular/core';
import {WaitService} from '../../core/wait/wait.service';
import {ToastService} from '../../toast/toast.service';
import {HttpService} from '../../core/http/http.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastType} from '../../toast/toast-type.enum';
import {ToastConfig} from '../../toast/toast-config';
import {ModalService} from '../../modal/modal.service';

@Component({
  selector: 'app-post-personnel-edit',
  templateUrl: './post-personnel-edit.component.html',
  styleUrls: ['./post-personnel-edit.component.scss']
})
export class PostPersonnelEditComponent implements OnInit {
  recordPostPersonnelEditTitle: string;
  @Input() sceneId = 0;
  @Input() questionnaireId = 0;
  @Input() companyId = 0;
  @Input() recordData = {
    recordPostPersonnel: {
      id: '',
      postPersonnelNo: '',
      verificationResult: '',
      sceneId : 0
    },
    recordPostPersonnelDataList: [{
      id: '',
      companyOfficeId: '',
      postId: '',
      perShift: '',
      totalNumber: '',
      dayOfWeek: '',
      classOfDate: '',
      hourOfClass: '',
      postPersonnelId: ''
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
    if (this.recordData.recordPostPersonnel === null
      || this.recordData.recordPostPersonnel.id === null
      || this.recordData.recordPostPersonnel.id === '') {
      this.addFlag = true;
      this.recordPostPersonnelEditTitle = '新增--岗位定员及工作制度调查表';
      this.recordData.recordPostPersonnel = {
          id: '',
          postPersonnelNo: '',
          verificationResult: '',
          sceneId : 0
      };
    } else {
      this.addFlag = false;
      this.recordPostPersonnelEditTitle = '修改--岗位定员及工作制度调查表';
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
    if (this.recordData.recordPostPersonnelDataList === null) {
      this.recordData.recordPostPersonnelDataList = [];
    }
    const index = this.recordData.recordPostPersonnelDataList.length;
    this.recordData.recordPostPersonnelDataList[index] = {
        id: '',
        companyOfficeId: '',
        postId: '',
        perShift: '',
        totalNumber: '',
        dayOfWeek: '',
        classOfDate: '',
        hourOfClass: '',
        postPersonnelId: ''
    };
  }

  /**
   * 删除一行
   */
  delOffice(item) {
    const index = this.recordData.recordPostPersonnelDataList.indexOf(item);
    this.recordData.recordPostPersonnelDataList.splice(index, 1);
  }

  /**
   * 提交
   */
  submitData() {
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.POST_PERSONNEL_ADD;
      this.recordData.recordPostPersonnel.sceneId = this.sceneId;
      this.recordData.questionnaireId = this.questionnaireId;
    } else {
      url = SystemConstant.POST_PERSONNEL_EDIT;
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
    this.recordData.recordPostPersonnelDataList[data.index].companyOfficeId = data.officeId;
  }


}
