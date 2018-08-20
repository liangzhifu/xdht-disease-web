import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
import {HttpService} from '../../core/http/http.service';
import {WaitService} from '../../core/wait/wait.service';
import {FormBuilder} from '@angular/forms';
import {ToastService} from '../../toast/toast.service';
import {ModalService} from '../../modal/modal.service';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';
import {CustomDatepickerI18nService} from '../../core/I18n/custom-datepicker-i18n.service';
import {I18nService} from '../../core/I18n/i18n.service';
import 'jquery';
import {AlertType} from '../../modal/alert/alert-type';
import {AlertConfig} from '../../modal/alert/alert-config';
import {CompanyWorkTypeDropdownComponent} from '../../sys/company-work-type-dropdown/company-work-type-dropdown.component';
import {CompanyPostDropdownComponent} from '../../sys/company-post-dropdown/company-post-dropdown.component';
declare var $: any;
@Component({
  selector: 'app-workplace-noise-edit',
  templateUrl: './workplace-noise-edit.component.html',
  styleUrls: ['./workplace-noise-edit.component.scss'],
  providers: [I18nService, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18nService}]
})
export class WorkplaceNoiseEditComponent implements OnInit {
  @ViewChild('acod', undefined) acod: CompanyWorkTypeDropdownComponent;
  @Input() recordWorkplaceNoise: any = {
    'id' : '',
    'inspectDate' : '',
    'contactTime' : '',
    'companyId' : '',
    'checkPlace' : '',
    'workTypeId' : '',
    'soundLevel' : '',
    'analysisResult' : '',

  };
  workplaceNoiseEditTitle: string;
  addFlag: boolean;
  action = '';
  companyList = [{id: '', companyName: ''}];
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
    if (this.recordWorkplaceNoise.id === undefined || this.recordWorkplaceNoise.id  === null || this.recordWorkplaceNoise.id === '') {
      this.action = '新增';
      this.addFlag = true;
      this.workplaceNoiseEditTitle = '新增-工作场所噪声暴露评估';
    } else {
      this.action = '修改';
      this.addFlag = false;
      this.workplaceNoiseEditTitle = '修改-工作场所噪声暴露评估';
    }
    // 获取部门列表
    this.httpService.post(SystemConstant.COMPANY_LIST, {} ).subscribe({
      next: (data) => {
        this.companyList = data;
      },
      complete: () => {
      }
    });
  }
  close() {
    this.activeModal.dismiss('failed');
  }
  submitData() {
    this.recordWorkplaceNoise.inspectDate = $('#inspectDate').val();
    if (this.recordWorkplaceNoise.inspectDate === null || this.recordWorkplaceNoise.inspectDate === '') {
      const alertConfig: AlertConfig = new AlertConfig(AlertType.INFO, '日期选择', '请选择日期！');
      this.modalService.alert(alertConfig);
      return false;
    }
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.RECORD_WORKPLACE_NOISE_ADD;
    } else {
      url = SystemConstant.RECORD_WORKPLACE_NOISE_EDIT;
    }
    this.httpService.post(url, this.recordWorkplaceNoise).subscribe({
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

  /**
   * 选择工种
   * @param data
   */
  onDataChanged(data) {
    this.recordWorkplaceNoise.workTypeId = data.workTypeId;
  }

  /**
   * 单位修改
   */
  changeCompany() {
    this.recordWorkplaceNoise.workTypeId = '';
    this.acod.openZTree(this.recordWorkplaceNoise.companyId, this.recordWorkplaceNoise.workTypeId);
  }
}
