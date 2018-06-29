import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {WaitService} from '../../core/wait/wait.service';
import {ToastService} from '../../toast/toast.service';
import {HttpService} from '../../core/http/http.service';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';
import {SystemConstant} from '../../core/class/system-constant';

@Component({
  selector: 'app-knowledge-catalog-edit',
  templateUrl: './knowledge-catalog-edit.component.html',
  styleUrls: ['./knowledge-catalog-edit.component.scss']
})
export class KnowledgeCatalogEditComponent implements OnInit {
  @Input() parentId = 0;
  @Input() sysKnowledgeCatalog = {
    id : '',
    parentId : 0,
    catalogName : ''
  };
  action = null;
  addFlag = null;
  knowledgeCatalogEditTitle = '';
  constructor(
    private activeModal: NgbActiveModal,
    private waitService: WaitService,
    private httpService: HttpService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    if (this.sysKnowledgeCatalog.id === undefined || this.sysKnowledgeCatalog.id === null || this.sysKnowledgeCatalog.id === '') {
      this.action = '新增';
      this.addFlag = true;
      this.knowledgeCatalogEditTitle = '新增知识库目录';
    } else {
      this.action = '修改';
      this.addFlag = false;
      this.knowledgeCatalogEditTitle = '修改知识库目录';
    }
  }

  /**
   * 关闭修改框
   */
  close() {
    this.activeModal.dismiss('failed');
  }

  /**
   * 提交信息
   */
  submitData() {
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.KNOWLEDGE_CATALOG_ADD;
      this.sysKnowledgeCatalog.parentId = this.parentId;
    } else {
      url = SystemConstant.KNOWLEDGE_CATALOG_EDIT;
    }
    this.httpService.post(url, this.sysKnowledgeCatalog).subscribe({
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
