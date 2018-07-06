import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastService} from '../../toast/toast.service';
import {ModalService} from '../../modal/modal.service';
import {HttpService} from '../../core/http/http.service';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';
import {SystemConstant} from '../../core/class/system-constant';
import {AlertConfig} from '../../modal/alert/alert-config';
import {AlertType} from '../../modal/alert/alert-type';
import {ConfirmConfig} from '../../modal/confirm/confirm-config';
import {KnowledgeCatalogEditComponent} from '../knowledge-catalog-edit/knowledge-catalog-edit.component';
import 'ztree';
import 'jquery';
import {TitleService} from '../../title.service';
declare var $: any;

@Component({
  selector: 'app-knowledge-catalog-manage',
  templateUrl: './knowledge-catalog-manage.component.html',
  styleUrls: ['./knowledge-catalog-manage.component.scss']
})
export class KnowledgeCatalogManageComponent implements OnInit {
  setting = {
    data: {
      simpleData: {
        enable: true,
        pIdKey: 'parentId'
      },
      key: {
        name: 'catalogName'
      }
    },
    check: {
      enable: true,
      chkStyle: 'radio',
      radioType: 'all'
    },
    callback: {
      onClick: this.zTreeOnClick
    }
  };
  zNodes = [];
  constructor(
    private ngbModal: NgbModal,
    private httpService: HttpService,
    private toastService: ToastService,
    private modalService: ModalService,
    private titleService: TitleService
  ) {
    this.titleService.titleEventEmitter.emit('目录管理');
  }

  ngOnInit() {
    this.openZTree();
  }

  /**
   * 打开知识库目录树
   */
  openZTree() {
    this.httpService.post(SystemConstant.KNOWLEDGE_CATALOG_LIST, {}).subscribe({
      next: (data) => {
        this.zNodes = data;
        $.fn.zTree.init($('#ztree'), this.setting, this.zNodes);
        const treeObj = $.fn.zTree.getZTreeObj('ztree');
        treeObj.expandAll(true);
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '',  '获取知识库目录失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {}
    });
  }

  /**
   * 添加
   */
  addCatalog() {
    let parentId = 0;
    const treeObj = $.fn.zTree.getZTreeObj('ztree');
    const nodes = treeObj.getCheckedNodes(true);
    if (nodes !== undefined && nodes !== null) {
      for (let i = 0; i < nodes.length; i++) {
        parentId = nodes[i].id;
      }
    }
    const modalRef = this.ngbModal.open(KnowledgeCatalogEditComponent, {backdrop: 'static', keyboard: false, centered: true});
    modalRef.componentInstance.parentId = parentId;
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.openZTree();
        }
      }
    );
  }

  /**
   * 修改
   */
  editCatalog() {
    let id = 0;
    const treeObj = $.fn.zTree.getZTreeObj('ztree');
    const nodes = treeObj.getCheckedNodes(true);
    if (nodes === undefined || nodes === null || nodes.length === 0) {
      const alertConfig: AlertConfig = new AlertConfig(AlertType.INFO, '知识库目录修改', '必须选择一个知识库目录！');
      this.modalService.alert(alertConfig);
      return false;
    } else {
      for (let i = 0; i < nodes.length; i++) {
        id = nodes[i].id;
      }
    }
    // 获取菜单数据
    this.httpService.get(SystemConstant.KNOWLEDGE_CATALOG_DETAIL + '/' + id).subscribe({
      next: (data) => {
        this.openEditKnowledgeCatalog(data);
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', '获取知识库目录详情失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {}
    });
  }

  /**
   * 打开修改知识库目录对话框
   */
  openEditKnowledgeCatalog(data) {
    const modalRef = this.ngbModal.open(KnowledgeCatalogEditComponent, {backdrop: 'static', keyboard: false, centered: true});
    modalRef.componentInstance.sysKnowledgeCatalog = data;
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.openZTree();
        }
      }
    );
  }

  /**
   * 删除
   */
  delCatalog() {
    let catalogId = 0;
    let catalogName = '';
    const treeObj = $.fn.zTree.getZTreeObj('ztree');
    const nodes = treeObj.getCheckedNodes(true);
    if (nodes === undefined || nodes === null || nodes.length === 0) {
      const alertConfig: AlertConfig = new AlertConfig(AlertType.INFO, '知识库目录删除', '必须选择一个知识库目录！');
      this.modalService.alert(alertConfig);
      return false;
    } else {
      for (let i = 0; i < nodes.length; i++) {
        catalogId = nodes[i].id;
        catalogName = nodes[i].catalogName;
      }
    }
    const confirmCfg = new ConfirmConfig('确定删除知识库目录：' + catalogName + '！');
    this.modalService.confirm(confirmCfg).then(
      () => {
        this.httpService.post(SystemConstant.KNOWLEDGE_CATALOG_DEL + '?id=' + catalogId, {}).subscribe({
          next: (data) => {
            const toastCfg = new ToastConfig(ToastType.SUCCESS, '', '删除知识库目录成功！', 3000);
            this.toastService.toast(toastCfg);
            this.openZTree();
          },
          error: (err) => {
            const toastCfg = new ToastConfig(ToastType.ERROR, '',  '删除知识库目录失败！' + '失败原因：' + err, 3000);
            this.toastService.toast(toastCfg);
          },
          complete: () => {}
        });
      }
    );
  }

  /**
   * 菜单节点点击事件
   * @param event
   * @param treeId
   * @param treeNode
   */
  zTreeOnClick(event, treeId, treeNode) {
    const treeObj = $.fn.zTree.getZTreeObj('ztree');
    const checked = treeNode.checked;
    if (checked) {
      treeObj.checkNode(treeNode, false);
    } else {
      treeObj.checkNode(treeNode, true);
    }
  }
}
