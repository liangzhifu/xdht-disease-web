import {Component, Input, OnInit} from '@angular/core';
import {ToastType} from '../../toast/toast-type.enum';
import {ToastConfig} from '../../toast/toast-config';
import {ToastService} from '../../toast/toast.service';
import {HttpService} from '../../core/http/http.service';
import {SystemConstant} from '../../core/class/system-constant';
import {WaitService} from '../../core/wait/wait.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-record-funds-edit',
  templateUrl: './record-funds-edit.component.html',
  styleUrls: ['./record-funds-edit.component.scss']
})
export class RecordFundsEditComponent implements OnInit {
  recordFundsEditTitle: string;
  @Input() sceneId = 0;
  @Input() questionnaireId = 0;
  @Input() companyId = 0;
  @Input() recordData = {
    recordFunds: {
      id: '',
      sceneId: 0,
      fundsNo: '',
      verificationResult: ''
    },
    recordFundsDataList: [{
      id: '',
      fundsId: '',
      fundsProjectId: '',
      expactOrPay: '',
      projectName: ''
    }],
    questionnaireId: 0
  };
  addFlag: boolean;
  action = '';

  constructor(
    private httpService: HttpService,
    private activeModal: NgbActiveModal,
    private toastService: ToastService,
    private waitService: WaitService
  ) {

  }

  ngOnInit() {
    if (this.recordData.recordFunds === null
      || this.recordData.recordFunds.id === null
      || this.recordData.recordFunds.id === '') {
      this.addFlag = true;
      this.recordFundsEditTitle = '新增--职业病防治经费投入情况调查表';
      this.recordData.recordFunds = {
        id: '',
        sceneId: 0,
        fundsNo: '',
        verificationResult: ''
      };
      // 获取项目列表
      this.httpService.post(SystemConstant.DICTIONARY_LIST, {dictionaryTypeId: 1} ).subscribe({
        next: (data) => {
          this.recordData.recordFundsDataList = [];
          for (let i = 0; i < data.length; i++) {
            const recordPreEvaluationData = {
              'id': '',
              'fundsId': '',
              'fundsProjectId': data[i].id,
              'expactOrPay': '',
              'projectName': data[i].dictionaryName
            };
            this.recordData.recordFundsDataList.push(recordPreEvaluationData);
          }
        },
        complete: () => {
        }
      });
    } else {
      this.addFlag = false;
      this.recordFundsEditTitle = '修改--职业病防治经费投入情况调查表';
    }
  }

  /**
   * 关闭对话框
   */
  close() {
    this.activeModal.dismiss('failed');
  }

  /**
   * 提交数据
   */
  submitData() {
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.FUNDS_ADD;
      this.recordData.recordFunds.sceneId = this.sceneId;
      this.recordData.questionnaireId = this.questionnaireId;
    } else {
      url = SystemConstant.FUNDS_EDIT;
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

}
