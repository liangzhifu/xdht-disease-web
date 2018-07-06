import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
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
import {TitleService} from '../../title.service';

@Component({
  selector: 'app-knowledge-manage',
  templateUrl: './knowledge-manage.component.html',
  styleUrls: ['./knowledge-manage.component.scss']
})
export class KnowledgeManageComponent implements OnInit, AfterViewInit {
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
    private toastService: ToastService,
    private titleService: TitleService
  ) {
    this.titleService.titleEventEmitter.emit('文档存储');
  }

  ngOnInit() {
    this.url = SystemConstant.KNOWLEDGE_PAGE_LIST;
  }

  ngAfterViewInit() {
    this.search();
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
    const modalRef = this.ngbModal.open(KnowledgeEditComponent, {size: 'lg', backdrop: 'static', keyboard: false, centered: true});
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
    const modalRef = this.ngbModal.open(KnowledgeEditComponent, {size: 'lg', backdrop: 'static', keyboard: false, centered: true});
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
  delKnowledge(id, knowledgeTitle) {
    const confirmCfg: ConfirmConfig = new ConfirmConfig('确定删除企业：' + knowledgeTitle + '！');
    this.modalService.confirm(confirmCfg).then(
      () => {
        this.httpService.get(SystemConstant.KNOWLEDGE_DEL + '?id=' + id).subscribe({
          next: (data) => {
            const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '删除知识库成功！', 3000);
            this.toastService.toast(toastCfg);
            this.search();
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
