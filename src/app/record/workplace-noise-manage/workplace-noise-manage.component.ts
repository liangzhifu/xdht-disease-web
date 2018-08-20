import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SimpleDataHttpPageComponent} from '../../simple-data-table/simple-data-http-page/simple-data-http-page.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpService} from '../../core/http/http.service';
import {WaitService} from '../../core/wait/wait.service';
import {ToastService} from '../../toast/toast.service';
import {ModalService} from '../../modal/modal.service';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';
import {ConfirmConfig} from '../../modal/confirm/confirm-config';
import {WorkplaceNoiseEditComponent} from '../workplace-noise-edit/workplace-noise-edit.component';
import {TitleService} from '../../title.service';

@Component({
  selector: 'app-workplace-noise-manage',
  templateUrl: './workplace-noise-manage.component.html',
  styleUrls: ['./workplace-noise-manage.component.scss']
})
export class WorkplaceNoiseManageComponent implements OnInit, AfterViewInit{
  url: String;
  method: 'post';
  @ViewChild('sdhp', undefined) sdhp: SimpleDataHttpPageComponent;
  /**
   * 查询条件
   */
  param: any = {
    workshop: ''
  };
  sysWorkTypeList = [{id: '', officeName: ''}];
  sysCompanyTypeList = [{id: '' , CompanyName: ''}];
  constructor(
    private ngbModal: NgbModal,
    private waitService: WaitService,
    private modalService: ModalService,
    private httpService: HttpService,
    private toastService: ToastService,
    private titleService: TitleService
  ) {
    this.titleService.titleEventEmitter.emit('工作场所噪声暴露评估');
    // 获取工种列表
    this.httpService.post(SystemConstant.OFFICE_LIST, {Id: ''} ).subscribe({
      next: (data) => {
        this.sysWorkTypeList = data;
      },
      complete: () => {
      }

    });
    // 获取公司列表                                             /*修改*/
    this.httpService.post(SystemConstant.COMPANY_LIST, {dictionaryTypeId: ''} ).subscribe({
      next: (data) => {
        this.sysCompanyTypeList = data;
      },
      complete: () => {
      }
    });
  }

  ngOnInit() {
    this.url = SystemConstant.RECORD_WORKPLACE_NOISE_PAGE;
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
   * 新增--工作场所噪声暴露评估
   */
  addWorkplaceNoise() {
    const modalRef = this.ngbModal.open(WorkplaceNoiseEditComponent,{ size: 'lg', backdrop: 'static', keyboard: false, centered: true});
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }


  /**
   * 修改--工作场所噪声暴露评估
   */
  editWorkplaceNoise(id) {
    // 获取用户数据
    this.httpService.get(SystemConstant.RECORD_WORKPLACE_NOISE_DETAIL + '/' + id).subscribe({
      next: (data) => {
        this.openEdit(data);
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', '获取详情失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {}
    });
  }

  /**
   * 打开修改(工作场所噪声暴露评估)对话框
   */
  openEdit(myData) {
    const modalRef = this.ngbModal.open(WorkplaceNoiseEditComponent,{ size: 'lg', backdrop: 'static', keyboard: false, centered: true});
    modalRef.componentInstance.recordWorkplaceNoise = myData;
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }

  /**
   * 删除--工作场所噪声暴露评估
   */
  delWorkplaceNoise(id) {
    const confirmCfg = new ConfirmConfig('确定删除！');
    this.modalService.confirm(confirmCfg).then(
      () => {
        this.httpService.post(SystemConstant.RECORD_WORKPLACE_NOISE_DELETE + '/' + id , {} ).subscribe({
          next: (data) => {
            const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '删除成功！', 3000);
            this.toastService.toast(toastCfg);
            this.search();
          },
          error: (err) => {
            const toastCfg = new ToastConfig(ToastType.ERROR, '',  '删除失败！' + '失败原因：' + err, 3000);
            this.toastService.toast(toastCfg);
          },
          complete: () => {}
        });
      }
    );
  }
}
