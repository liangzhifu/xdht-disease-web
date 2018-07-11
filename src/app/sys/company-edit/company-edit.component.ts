import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
import {WaitService} from '../../core/wait/wait.service';
import {ToastConfig} from '../../toast/toast-config';
import {SystemConstant} from '../../core/class/system-constant';
import {ModalService} from '../../modal/modal.service';
import {HttpService} from '../../core/http/http.service';
import {ToastService} from '../../toast/toast.service';
import {ToastType} from '../../toast/toast-type.enum';
import {I18nService} from '../../core/I18n/i18n.service';
import {CustomDatepickerI18nService} from '../../core/I18n/custom-datepicker-i18n.service';
import 'jquery';
declare var $: any;

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss'],
  providers: [I18nService, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18nService}]
})
export class CompanyEditComponent implements OnInit {
  @Input() sysCompany = {
      id: '',
      companyName: '',
      nationalEconomicIndustry: '',
      companyNature: '',
      industrialDiseaseCategory: '',
      belongToJurisdiction: '',
      economicType: '',
      contactNumber: '',
      faxPhone: '',
      legalRepresentative: '',
      contactUsername: '',
      registeredAddress: '',
      actualOperateAddress: '',
      companyUrl: '',
      establishDate: '',
      productionScale: '',
      mainProducts: '',
      mainRawMaterials: '',
      occupationalHazardFactors: '',
      remarks: ''
  };
  companyNature: any;
  economicType: any;
  productionScale: any;
  companyEditTitle: string;
  addFlag: boolean;
  action = '';
  constructor(
    private modalService: ModalService,
    private httpService: HttpService,
    private activeModal: NgbActiveModal,
    private toastService: ToastService,
    private waitService: WaitService
  ) {
    // 获取单位性质
    this.httpService.post(SystemConstant.DICTIONARY_LIST, {dictionaryTypeId: 7} ).subscribe({
      next: (data) => {
        this.companyNature = data;
      },
      complete: () => {
      }
    });
    // 获取经济类型
    this.httpService.post(SystemConstant.DICTIONARY_LIST, {dictionaryTypeId: 8} ).subscribe({
      next: (data) => {
        this.economicType = data;
      },
      complete: () => {
      }
    });
    // 生产规模
    this.httpService.post(SystemConstant.DICTIONARY_LIST, {dictionaryTypeId: 9} ).subscribe({
      next: (data) => {
        this.productionScale = data;
      },
      complete: () => {
      }
    });
  }

  ngOnInit() {
    const preEvaluationId = this.sysCompany.id;
    if (preEvaluationId === undefined || preEvaluationId === null || preEvaluationId === '') {
      this.action = '新增';
      this.addFlag = true;
      this.companyEditTitle = '新增企业';
    } else {
      this.action = '修改';
      this.addFlag = false;
      this.companyEditTitle = '修改企业';
    }
  }

  /**
   * 关闭企业修改框
   */
  close() {
    this.activeModal.dismiss('failed');
  }

  /**
   * 提交企业信息
   */
  submitData() {
    console.log('establishDate:' + $('#sysCompanyEstablishDate').val());
    this.sysCompany.establishDate = $('#sysCompanyEstablishDate').val();
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.COMPANY_ADD;
    } else {
      url = SystemConstant.COMPANY_EDIT;
    }
    this.httpService.post(url, this.sysCompany).subscribe({
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
