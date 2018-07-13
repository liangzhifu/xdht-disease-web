import {Component, Input, OnInit} from '@angular/core';
import {ToastConfig} from '../../toast/toast-config';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastType} from '../../toast/toast-type.enum';
import {NgbActiveModal, NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
import {HttpService} from '../../core/http/http.service';
import {WaitService} from '../../core/wait/wait.service';
import {FormBuilder} from '@angular/forms';
import {ToastService} from '../../toast/toast.service';
import {ModalService} from '../../modal/modal.service';
import {CustomDatepickerI18nService} from '../../core/I18n/custom-datepicker-i18n.service';
import {I18nService} from '../../core/I18n/i18n.service';
import 'jquery';
import {AlertType} from '../../modal/alert/alert-type';
import {AlertConfig} from '../../modal/alert/alert-config';
declare var $: any;

@Component({
  selector: 'app-individual-noise-edit',
  templateUrl: './individual-noise-edit.component.html',
  styleUrls: ['./individual-noise-edit.component.scss'],
  providers: [I18nService, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18nService}]
})
export class IndividualNoiseEditComponent implements OnInit {
  @Input() recordIndividualNoise: any = {
    'id' : '',
    'workshop' : '',
    'postId' : '',
    'stopPlace' : '',
    'contactTime' : '',
    'soundLevel' : ''

  };
  individualNoiseEditTitle: string;
  addFlag: boolean;
  action = '';
  sysPostList: [{
    id: '',
    dictionaryName: ''
  }];
  constructor(
    private modalService: ModalService,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
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
  if (this.recordIndividualNoise.id === undefined || this.recordIndividualNoise.id  === null || this.recordIndividualNoise.id === '') {
    this.action = '新增';
    this.addFlag = true;
    this.individualNoiseEditTitle = '新增-劳动者个体噪声暴露评估';
  } else {
    this.action = '修改';
    this.addFlag = false;
    this.individualNoiseEditTitle = '修改-劳动者个体噪声暴露评估';
  }
}

  close() {
    this.activeModal.dismiss('failed');
  }
  submitData() {
    this.recordIndividualNoise.contactTime = $('#contactTime').val();
    if (this.recordIndividualNoise.contactTime === null || this.recordIndividualNoise.contactTime === '') {
      const alertConfig: AlertConfig = new AlertConfig(AlertType.INFO, '日期选择', '请选择日期！');
      this.modalService.alert(alertConfig);
      return false;
    }
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.RECORD_INDIVIDUAL_NOISE_ADD;
    } else {
      url = SystemConstant.RECORD_INDIVIDUAL_NOISE_EDIT;
    }
    this.httpService.post(url, this.recordIndividualNoise).subscribe({
      next: (data) => {
        const toastCfg = new ToastConfig(ToastType.SUCCESS, '', this.action + '操作成功！', 3000);
        this.toastService.toast(toastCfg);
        this.activeModal.close('success');
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', this.action + '操作失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
        this.activeModal.dismiss('failed');
      },
      complete: () => {
      }
    });
    this.waitService.wait(false);
  }
}
