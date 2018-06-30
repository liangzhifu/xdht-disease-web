import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {WaitService} from '../../core/wait/wait.service';
import {ToastService} from '../../toast/toast.service';
import {HttpService} from '../../core/http/http.service';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';
import {SystemConstant} from '../../core/class/system-constant';
import 'ztree';
import 'jquery';
declare var $: any;

@Component({
  selector: 'app-knowledge-catalog-choose',
  templateUrl: './knowledge-catalog-choose.component.html',
  styleUrls: ['./knowledge-catalog-choose.component.scss']
})
export class KnowledgeCatalogChooseComponent implements OnInit {
  @Input() roleId: any = null;
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
      chkStyle: 'checkbox',
      autoCheckTrigger: true,
      chkboxType: {Y: 'p', N: 's'}
    },
    callback: {
      onClick: this.zTreeOnClick
    }
  };
  zNodes = null;
  constructor(
    private activeModal: NgbActiveModal,
    private httpService: HttpService,
    private toastService: ToastService,
    private waitService: WaitService
  ) { }

  ngOnInit() {
    this.httpService.post(SystemConstant.KNOWLEDGE_CATALOG_LIST, {}).subscribe({
      next: (data) => {
        this.zNodes = data;
        $.fn.zTree.init($('#ztree'), this.setting, this.zNodes);
        const treeObj = $.fn.zTree.getZTreeObj('ztree');
        treeObj.expandAll(true);
        // 获取角色知识库目录
        this.getRoleKnowledgeCatalog();
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '',  '获取知识库目录失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {}
    });
  }

  /**
   * 获取角色知识库目录关联
   */
  getRoleKnowledgeCatalog() {
    const zTree = $.fn.zTree.getZTreeObj('ztree');
    this.httpService.post(SystemConstant.ROLE_KNOWLEDGE_CATALOG_LIST, {roleId: this.roleId}).subscribe({
      next: (data) => {
        for (let i = 0; i < data.length; i ++) {
          const sysRoleMenu = data[i];
          const catalogId = sysRoleMenu.catalogId;
          const node = zTree.getNodeByParam('id', catalogId);
          node.checked = true;
          zTree.updateNode(node);
        }
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '',  '获取角色知识库目录关联失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {
      }
    });
  }

  /**
   * 关闭角色修改框
   */
  close() {
    this.activeModal.dismiss('failed');
  }

  /**
   * 提交数据
   */
  submitData() {
    const treeObj = $.fn.zTree.getZTreeObj('ztree');
    const nodes = treeObj.getCheckedNodes();
    let catalogIds = '';
    if (nodes != null) {
      for (let i = 0; i < nodes.length; i++) {
        catalogIds += ',' + nodes[i].id;
      }
      if (catalogIds !== '') {
        catalogIds = catalogIds.substring(1);
      }
    }
    this.waitService.wait(true);
    this.httpService.post(SystemConstant.ROLE_KNOWLEDGE_CATALOG_EDIT, {roleId: this.roleId, knowledgeCatalogIds: catalogIds}).subscribe({
      next: (data) => {
        const toastCfg = new ToastConfig(ToastType.SUCCESS, '',  '修改角色知识库目录成功！', 3000);
        this.toastService.toast(toastCfg);
        this.activeModal.close('success');
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '',  '修改角色知识库目录失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
        this.activeModal.dismiss('failed');
      },
      complete: () => {
      }
    });
    this.waitService.wait(false);
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
