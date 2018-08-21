import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ModalService} from '../../modal/modal.service';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastService} from '../../toast/toast.service';
import {ToastConfig} from '../../toast/toast-config';
import {ConfirmConfig} from '../../modal/confirm/confirm-config';
import {SimpleDataHttpPageComponent} from '../../simple-data-table/simple-data-http-page/simple-data-http-page.component';
import {HttpService} from '../../core/http/http.service';
import {ToastType} from '../../toast/toast-type.enum';
import {WaitService} from '../../core/wait/wait.service';
import {Router} from '@angular/router';
import {TitleService} from '../../title.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FileUploadComponent} from '../../sys/file-upload/file-upload.component';

@Component({
  selector: 'app-employee-summary-manage',
  templateUrl: './employee-summary-manage.component.html',
  styleUrls: ['./employee-summary-manage.component.scss']
})
export class EmployeeSummaryManageComponent implements OnInit {
  url: String;
  method: 'post';

  @ViewChild('sdhp', undefined) sdhp: SimpleDataHttpPageComponent;
  /**
   * 查询条件
   */
  param: any = {
    empName: ''
  };
  constructor(
    private ngbModal: NgbModal,
    private waitService: WaitService,
    private modalService: ModalService,
    private httpService: HttpService,
    private toastService: ToastService,
    private router: Router,
    private  titleService: TitleService
  ) {
    this.titleService.titleEventEmitter.emit('职工体检信息');
  }

  ngOnInit() {
    this.url = SystemConstant.EMPLOYEE_SUMMARY_PAGE;
  }

  ngAfterViewInit() {
    this.search();
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
   * 新增职工体检信息
   */
  addEmployeeSummary() {
    this.router.navigate(['/main/record/employeeSummaryEdit'], {queryParams: {id: null}});
  }

  /**
   * 修改职工体检信息
   */
  editEmployeeSummary(employeeSummaryId) {
    this.router.navigate(['/main/record/employeeSummaryEdit'], {queryParams: {id: employeeSummaryId}});
  }

  /**
   * 删除职工体检信息
   */
  delEmployeeSummary(employeeSummaryId, name) {
    const confirmCfg = new ConfirmConfig('确定删除职工体检信息：' + name + '！');
    this.modalService.confirm(confirmCfg).then(
      () => {
        this.httpService.get(SystemConstant.EMPLOYEE_SUMMARY_DEL + '?id=' + employeeSummaryId).subscribe({
          next: (data) => {
            const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '删除职工体检信息！', 3000);
            this.toastService.toast(toastCfg);
            this.search();
          },
          error: (err) => {
            const toastCfg = new ToastConfig(ToastType.ERROR, '',  '删除职工体检信息！' + '失败原因：' + err, 3000);
            this.toastService.toast(toastCfg);
          },
          complete: () => {}
        });
      }
    );
  }

  /**
   * 导入Excel
   */
  importExcel() {
    const modalRef = this.ngbModal.open(FileUploadComponent, {
      backdrop: 'static',
      keyboard: false,
      centered: true
    });
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }
}
