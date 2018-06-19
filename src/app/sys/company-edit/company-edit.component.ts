import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {WaitService} from '../../core/wait/wait.service';
import {ToastConfig} from '../../toast/toast-config';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SystemConstant} from '../../core/class/system-constant';
import {ModalService} from '../../modal/modal.service';
import {HttpService} from '../../core/http/http.service';
import {ToastService} from '../../toast/toast.service';
import {ToastType} from '../../toast/toast-type.enum';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {
  @Input() sysCompanyRequest = {
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
  companyEditTitle: string;
  addFlag: boolean;
  action = '';
  constructor(
    private modalService: ModalService,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private toastService: ToastService,
    private waitService: WaitService
  ) {
  }

  ngOnInit() {
    const preEvaluationId = this.sysCompanyRequest.id;
    console.log(preEvaluationId);
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
  companyEditSubmit() {
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.COMPANY_ADD;
    } else {
      url = SystemConstant.COMPANY_EDIT;
    }
    this.httpService.post(url, this.sysCompanyRequest).subscribe({
      next: (data) => {
        const toastCfg = new ToastConfig(ToastType.SUCCESS, '', this.action + '操作成功！', 3000);
        this.toastService.toast(toastCfg);
        this.activeModal.close('success');
        const status = data.status;
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
