import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from '../../core/http/http.service';
import {FormBuilder} from '@angular/forms';
import {ModalService} from '../../modal/modal.service';
import {WaitService} from '../../core/wait/wait.service';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastService} from '../../toast/toast.service';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';
import {SystemConstant} from '../../core/class/system-constant';
import {SessionStorageService} from '../../core/storage/session-storage.service';

@Component({
  selector: 'app-dictionary-edit',
  templateUrl: './dictionary-edit.component.html',
  styleUrls: ['./dictionary-edit.component.scss']
})
export class DictionaryEditComponent implements OnInit {

  @Input() sysDictionary = {
    id : '',
    dictionaryTypeId: '',
    dictionaryName: ''
  };
  dictionaryEditTitle: string;
  addFlag: boolean;
  action = '';
  dictionaryTypeList = [{id: '', dictionaryTypeName: ''}];
  constructor(
    private modalService: ModalService,
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal,
    private toastService: ToastService,
    private waitService: WaitService,
    private sessionStorage: SessionStorageService
  ) {
  }

  ngOnInit() {
    if (this.sysDictionary.id === undefined || this.sysDictionary.id  === null || this.sysDictionary.id === '') {
      this.action = '新增';
      this.addFlag = true;
      this.dictionaryEditTitle = '新增字典数据';
    } else {
      this.action = '修改';
      this.addFlag = false;
      this.dictionaryEditTitle = '修改字典数据';
    }
    this.dictionaryTypeList = this.sessionStorage.getObject('dictionary_type');
  }

  /**
   * 关闭修改框
   */
  close() {
    this.activeModal.dismiss('failed');
  }

  /**
   * 提交角色信息
   */
  submitData() {
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.DICTIONARY_ADD;
    } else {
      url = SystemConstant.DICTIONARY_EDIT;
    }
    this.httpService.post(url, this.sysDictionary).subscribe({
      next: (data) => {
        const toastCfg = new ToastConfig(ToastType.SUCCESS, '', this.action + '字典数据成功！', 3000);
        this.toastService.toast(toastCfg);
        this.activeModal.close('success');
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', this.action + '字典数据失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
        this.activeModal.dismiss('failed');
      },
      complete: () => {
      }
    });
    this.waitService.wait(false);
  }
}
