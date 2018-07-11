import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SimpleDataHttpPageComponent} from '../../simple-data-table/simple-data-http-page/simple-data-http-page.component';
import {HttpService} from '../../core/http/http.service';
import {ModalService} from '../../modal/modal.service';
import {WaitService} from '../../core/wait/wait.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastService} from '../../toast/toast.service';
import {SessionStorageService} from '../../core/storage/session-storage.service';
import {DictionaryEditComponent} from '../dictionary-edit/dictionary-edit.component';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';
import {ConfirmConfig} from '../../modal/confirm/confirm-config';
import {TitleService} from '../../title.service';

@Component({
  selector: 'app-dictionary-manage',
  templateUrl: './dictionary-manage.component.html',
  styleUrls: ['./dictionary-manage.component.scss']
})
export class DictionaryManageComponent implements OnInit, AfterViewInit {
  url: String;
  method: 'post';
  @ViewChild('sdhp', undefined) sdhp: SimpleDataHttpPageComponent;
  /**
   * 查询条件
   */
  param: any = {
    dictionaryTypeId: '',
    dictionaryName: ''
  };
  dictionaryTypeList = [{id: '', dictionaryTypeName: ''}];
  constructor(
    private ngbModal: NgbModal,
    private waitService: WaitService,
    private modalService: ModalService,
    private httpService: HttpService,
    private toastService: ToastService,
    private sessionStorage: SessionStorageService,
    private titleService: TitleService
  ) {
    this.titleService.titleEventEmitter.emit('字典管理');
  }

  ngOnInit() {
    this.dictionaryTypeList = this.sessionStorage.getObject('dictionary_type');
    this.url = SystemConstant.DICTIONARY_PAGE_LIST;
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
   * 新增字典数据
   */
  addDictionary() {
    const modalRef = this.ngbModal.open(DictionaryEditComponent, {size: 'lg', backdrop: 'static', keyboard: false, centered: true});
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }

  /**
   * 修改
   * @param id
   */
  editDictionary(id) {
// 获取用户数据
    this.httpService.get(SystemConstant.DICTIONARY_DETAIL + '/' + id).subscribe({
      next: (data) => {
        this.openEditDictionary(data);
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', '获取字典详情失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {}
    });
  }

  /**
   * 打开修改对话框
   */
  openEditDictionary(dictionaryData) {
    const modalRef = this.ngbModal.open(DictionaryEditComponent, {size: 'lg', backdrop: 'static', keyboard: false, centered: true});
    modalRef.componentInstance.sysDictionary = dictionaryData;
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }

  /**
   * 删除
   * @param id
   * @param dictionaryName
   */
  delDictionary(id, dictionaryName) {
      const confirmCfg = new ConfirmConfig('确定删除字典数据：' + dictionaryName + '！');
      this.modalService.confirm(confirmCfg).then(
        () => {
          this.httpService.get(SystemConstant.DICTIONARY_DEL + '?id=' + id).subscribe({
            next: (data) => {
              const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '删除字典数据成功！', 3000);
              this.toastService.toast(toastCfg);
              this.search();
            },
            error: (err) => {
              const toastCfg = new ToastConfig(ToastType.ERROR, '',  '删除字典数据失败！' + '失败原因：' + err, 3000);
              this.toastService.toast(toastCfg);
            },
            complete: () => {}
          });
        }
      );
  }
}
