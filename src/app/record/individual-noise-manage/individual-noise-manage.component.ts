import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SimpleDataHttpPageComponent} from '../../simple-data-table/simple-data-http-page/simple-data-http-page.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpService} from '../../core/http/http.service';
import {WaitService} from '../../core/wait/wait.service';
import {Router} from '@angular/router';
import {ToastService} from '../../toast/toast.service';
import {ModalService} from '../../modal/modal.service';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';
import {ConfirmConfig} from '../../modal/confirm/confirm-config';
import {IndividualNoiseEditComponent} from '../individual-noise-edit/individual-noise-edit.component';
import {TitleService} from '../../title.service';

@Component({
  selector: 'app-individual-noise-manage',
  templateUrl: './individual-noise-manage.component.html',
  styleUrls: ['./individual-noise-manage.component.scss']
})
export class IndividualNoiseManageComponent implements OnInit,  AfterViewInit {
  url: String;
  method: 'post';
  @ViewChild('sdhp', undefined) sdhp: SimpleDataHttpPageComponent;
  /**
   * 查询条件
   */
  param: any = {
    workshop: ''
  };
  sysWorkTypeList = [{id: '', dictionaryName: ''}];
  constructor(
    private ngbModal: NgbModal,
    private waitService: WaitService,
    private modalService: ModalService,
    private httpService: HttpService,
    private toastService: ToastService,
    private  titleService: TitleService
  ) {
    this.titleService.titleEventEmitter.emit('劳动者个体噪声暴露评估');

    // 获取工种列表
    this.httpService.post(SystemConstant.DICTIONARY_LIST, {dictionaryTypeId: SystemConstant.DICTIONARY_TYPE_POST} ).subscribe({
      next: (data) => {
        this.sysWorkTypeList = data;
      },
      complete: () => {
      }
    });
  }

  ngOnInit() {
    this.url = SystemConstant.RECORD_INDIVIDUAL_NOISE_PAGE;
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
   * 新增--劳动者个体噪声暴露评估
   */
  addIndividualNoise() {
    const modalRef = this.ngbModal.open(IndividualNoiseEditComponent,{ size: 'lg', backdrop: 'static', keyboard: false, centered: true});
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }


  /**
   * 修改--劳动者个体噪声暴露评估
   */
  editIndividualNoise(id) {
    // 获取用户数据
    this.httpService.get(SystemConstant.RECORD_INDIVIDUAL_NOISE_DETAIL + '/' + id).subscribe({
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
   * 打开修改(劳动者个体噪声暴露评估)对话框
   */
  openEdit(myData) {
    const modalRef = this.ngbModal.open(IndividualNoiseEditComponent,{ size: 'lg', backdrop: 'static', keyboard: false, centered: true});
    modalRef.componentInstance.recordIndividualNoise = myData;
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }

  /**
   * 删除--劳动者个体噪声暴露评估
   */
  delIndividualNoise(id) {
    const confirmCfg = new ConfirmConfig('确定删除！');
    this.modalService.confirm(confirmCfg).then(
      () => {
        this.httpService.post(SystemConstant.RECORD_INDIVIDUAL_NOISE_DELETE + '/' + id , {} ).subscribe({
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
