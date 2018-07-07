import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalService} from '../../modal/modal.service';
import {FormBuilder} from '@angular/forms';
import {ToastService} from '../../toast/toast.service';
import {WaitService} from '../../core/wait/wait.service';
import {HttpService} from '../../core/http/http.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SimpleDataHttpPageComponent} from '../../simple-data-table/simple-data-http-page/simple-data-http-page.component';
import {SystemConstant} from '../../core/class/system-constant';
import {AlertType} from '../../modal/alert/alert-type';
import {AlertConfig} from '../../modal/alert/alert-config';
import {SimpleDataTableDirective} from '../../simple-data-table/simple-data-table.directive';
import 'jquery';
import {ToastType} from '../../toast/toast-type.enum';
import {ToastConfig} from '../../toast/toast-config';
declare var $: any;

@Component({
  selector: 'app-select-employee',
  templateUrl: './select-employee.component.html',
  styleUrls: ['./select-employee.component.scss']
})
export class SelectEmployeeComponent implements OnInit, AfterViewInit {
  @Input() companyId = '';
  officeData: any;
  selectEmployeeTitle: string;
  param = {
    companyId: '',
    empName: ''
  };
  url: String;
  method: 'post';

  @ViewChild('sdhp', undefined) sdhp: SimpleDataHttpPageComponent;
  @ViewChild('sdt', undefined) sdt: SimpleDataTableDirective;
  constructor(
    private ngbModal: NgbModal,
    private modalService: ModalService,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private activeModal: NgbActiveModal,
    private waitService: WaitService
  ) {
    // 查询部门信息
    this.httpService.post(SystemConstant.OFFICE_LIST, {companyId: this.companyId}).subscribe({
      next: (data) => {
        this.officeData = data;
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '',  '获取部门失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {}
    });
  }

  ngOnInit() {
    this.param.companyId = this.companyId;
    this.selectEmployeeTitle = '选择人员';
    this.url = SystemConstant.EMPLOYEE_PAGE_LIST;
  }

  ngAfterViewInit() {
    this.search();
  }

  /**
   * 关闭对话框
   */
  close() {
    this.activeModal.dismiss('failed');
  }

  /**
   * 查询
   */
  search() {
    this.waitService.wait(true);
    this.sdhp.search();
    this.waitService.wait(false);
  }

  /**
   * 提交
   */
  submitData() {
    let sysEmployee = {
      id : 0,
      empName: '',
      officeId: ''
    };
    const index = $('input[name="employeeRadio"]:checked').val();
    if (index === undefined || index === null) {
      const alertConfig: AlertConfig = new AlertConfig(AlertType.INFO, '人员选择', '必须选择一个人员！');
      this.modalService.alert(alertConfig);
      return false;
    } else {
      const data = this.sdt.data[index];
      sysEmployee = {
        id : data.id,
        empName: data.empName,
        officeId: data.officeId
      };
    }
    this.activeModal.close({success: 'success', sysEmployee: sysEmployee});
  }
}
