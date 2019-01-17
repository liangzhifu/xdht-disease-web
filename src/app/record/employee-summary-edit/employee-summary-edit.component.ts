import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalService} from '../../modal/modal.service';
import {WaitService} from '../../core/wait/wait.service';
import {SystemConstant} from '../../core/class/system-constant';
import {HttpService} from '../../core/http/http.service';
import {ToastService} from '../../toast/toast.service';
import {ToastType} from '../../toast/toast-type.enum';
import {ToastConfig} from '../../toast/toast-config';
import {SelectEmployeeComponent} from '../select-employee/select-employee.component';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbDatepickerI18n, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import 'jquery';
import {I18nService} from '../../core/I18n/i18n.service';
import {CustomDatepickerI18nService} from '../../core/I18n/custom-datepicker-i18n.service';
import {CompanyWorkTypeDropdownComponent} from '../../sys/company-work-type-dropdown/company-work-type-dropdown.component';
declare var $: any;

@Component({
  selector: 'app-employee-summary-edit',
  templateUrl: './employee-summary-edit.component.html',
  styleUrls: ['./employee-summary-edit.component.scss'],
  providers: [I18nService, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18nService}]
})
export class EmployeeSummaryEditComponent implements OnInit {
@ViewChild('acod', undefined ) 'acod': CompanyWorkTypeDropdownComponent;
  employeeSummary = {

      id: '',
      empId: '',
      empName: '',
      companyId: '',
      officeId: '',
      workType: '',
    workTypeName: '',
      name: '',
      sex: '',
      age: '',
      inspectDate: '',
      inspectYear: '',
      inspect: '',
      contactTime: '',
      hazardFactor: '',
      bloodPressureShrink: '',
      bloodPressureDiastole: '',
      heart: '',
      lungs: '',
      skinMucousMembrane: '',
      lymphNode: '',
      thyroidGland: '',
      ear: '',
      whiteBloodCell: '',
      neutrophileGranulocyte: '',
      redBloodCell: '',
      hemoglobin: '',
      platelet: '',
      whiteBloodCellUrine: '',
      urineProtein: '',
      urineOccultBlood: '',
      urineSugar: '',
      altuL: '',
      electrocardiogram: '',
      dbhl500L: '',
      dbhl1kL: '',
      dbhl2kL: '',
      dbhl3kL: '',
      dbhl4kL: '',
      dbhl6kL: '',
      dbhl500R: '',
      dbhl1kR: '',
      dbhl2kR: '',
      dbhl3kR: '',
      dbhl4kR: '',
      dbhl6kR: '',

  };
   empWorkType: any = null;
  companyData: any = null;
  sysPostList: any = null;
  employeeSummaryEditTitle: string;
  addFlag: boolean;
  action = '';
  constructor(
    private ngbModal: NgbModal,
    private modalService: ModalService,
    private httpService: HttpService,
    private toastService: ToastService,
    private waitService: WaitService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    // 获取单位列表
    this.httpService.post(SystemConstant.COMPANY_LIST, {}).subscribe({
      next: (data) => {
        this.companyData = data;
      },
      complete: () => {
      }
    });
    // 新增时获取工种列表
    this.httpService.post(SystemConstant.DICTIONARY_LIST, {dictionaryTypeId: SystemConstant.DICTIONARY_TYPE_POST} ).subscribe({
      next: (data) => {
        this.sysPostList = data;
      },
      complete: () => {
      }
    });
    this.activeRoute.queryParams.subscribe(params => {
      const id = params['id'];
      if (id === undefined || id === null || id === '') {
        this.action = '新增';
        this.addFlag = true;
        this.employeeSummaryEditTitle = '新增职工体检信息';
      } else {
        this.action = '修改';
        this.addFlag = false;
        this.employeeSummaryEditTitle = '修改职工体检信息';
        // 获取企业数据
        this.httpService.get(SystemConstant.EMPLOYEE_SUMMARY_DETAIL + '/' + id).subscribe({
          next: (data) => {
            this.employeeSummary = data;
          },
          error: (err) => {
            const toastCfg = new ToastConfig(ToastType.ERROR, '', '获取职工体检信息失败！' + '失败原因：' + err, 3000);
            this.toastService.toast(toastCfg);
          },
          complete: () => {}
        });
      }
    });
  }

  /**
   * 修改单位
   */
  changeCompany() {
    this.employeeSummary.empId = '';
    this.employeeSummary.empName = '';
    this.acod.openZTree(this.employeeSummary.companyId, this.employeeSummary.workType);

  }
  onDataChanged(data) {
    this.employeeSummary.workType = data.workTypeId;


  }


  /**
   * 选择人员
   */
  selectEmployee() {
    const modalRef = this.ngbModal.open(SelectEmployeeComponent, {size: 'lg'});
    modalRef.componentInstance.companyId = this.employeeSummary.companyId;
    modalRef.result.then(
      (result) => {
        if (result.success === 'success') {
          this.employeeSummary.empId = result.sysEmployee.id;
          this.employeeSummary.empName = result.sysEmployee.empName;
          this.employeeSummary.officeId = result.sysEmployee.officeId;
          this.employeeSummary.workTypeName = result.sysEmployee.workTypeName;
          this.employeeSummary.workType = result.sysEmployee.officeId ;

        }
      }
    );

  }

  /**
   * 关闭职工体检信息修改框
   */
  close() {
    this.router.navigate(['/main/record/employeeSummaryManage']);
  }

  /**
   * 提交职工体检信息信息
   */
  submitData() {
    this.employeeSummary.inspectDate = $('#inspectDate').val();
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.EMPLOYEE_SUMMARY_ADD;
    } else {
      url = SystemConstant.EMPLOYEE_SUMMARY_EDIT;
    }
    this.httpService.post(url, this.employeeSummary).subscribe({
      next: (data) => {
        const toastCfg = new ToastConfig(ToastType.SUCCESS, '', this.action + '操作成功！', 3000);
        this.toastService.toast(toastCfg);
        this.router.navigate(['/main/record/employeeSummaryManage']);
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

  changeEmp() {
    
  }
}
