import {Component, OnInit, ViewChild} from '@angular/core';
import {SimpleDataHttpPageComponent} from '../../simple-data-table/simple-data-http-page/simple-data-http-page.component';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';
import {SystemConstant} from '../../core/class/system-constant';
import {ConfirmConfig} from '../../modal/confirm/confirm-config';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {WaitService} from '../../core/wait/wait.service';
import {ToastService} from '../../toast/toast.service';
import {ModalService} from '../../modal/modal.service';
import {HttpService} from '../../core/http/http.service';
import {KnowledgeEditComponent} from '../knowledge-edit/knowledge-edit.component';

@Component({
  selector: 'app-knowledge-manage',
  templateUrl: './knowledge-manage.component.html',
  styleUrls: ['./knowledge-manage.component.scss']
})
export class KnowledgeManageComponent implements OnInit {
  url: String;
  method: 'post';
  @ViewChild('sdhp', undefined) sdhp: SimpleDataHttpPageComponent;
  /**
   * 查询条件
   */
  param: any = {
    catalogId: 0,
    knowledgeTitle: ''
  };
  constructor(
    private ngbModal: NgbModal,
    private waitService: WaitService,
    private modalService: ModalService,
    private httpService: HttpService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.url = SystemConstant.KNOWLEDGE_PAGE_LIST;
  }

  /**
   * 修改知识库目录
   */
  onChangeCatalog(catalogId) {
    this.param.catalogId = catalogId;
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
   * 新增
   */
  addKnowledge() {
    const modalRef = this.ngbModal.open(KnowledgeEditComponent);
    modalRef.componentInstance.catalogId = this.param.catalogId;
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
   */
  editKnowledge(id) {
    // 获取知识库数据
    this.httpService.get(SystemConstant.KNOWLEDGE_DETAIL + '/' + id).subscribe({
      next: (data) => {
        this.openEditKnowledge(data);
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', '获取知识库详情失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {}
    });
  }

  /**
   * 打开修改知识库对话框
   */
  openEditKnowledge(data) {
    const modalRef = this.ngbModal.open(KnowledgeEditComponent);
    modalRef.componentInstance.sysKnowledge = data;
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.search();
        }
      }
    );
  }

  /**
   * 删除知识库
   */
  delKnowledge(userId, userName) {
    const confirmCfg = new ConfirmConfig('确定删除知识库：' + userName + '！');
    this.modalService.confirm(confirmCfg).then(
      () => {
        this.httpService.get(SystemConstant.KNOWLEDGE_DEL + '?id=' + userId).subscribe({
          next: (data) => {
            const status = data.status;
            if (status === '1') {
              const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '删除知识库成功！', 3000);
              this.toastService.toast(toastCfg);
              this.search();
            } else {
              const toastCfg = new ToastConfig(ToastType.ERROR, '', '删除知识库失败！' + '失败原因：' + data.message, 3000);
              this.toastService.toast(toastCfg);
            }
          },
          error: (err) => {
            const toastCfg = new ToastConfig(ToastType.ERROR, '',  '删除知识库失败！' + '失败原因：' + err, 3000);
            this.toastService.toast(toastCfg);
          },
          complete: () => {}
        });
      }
    );
  }

}
