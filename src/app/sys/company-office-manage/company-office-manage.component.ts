import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CompanyOfficeEditComponent} from '../company-office-edit/company-office-edit.component';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';
import {SystemConstant} from '../../core/class/system-constant';
import {HttpService} from '../../core/http/http.service';
import {ToastService} from '../../toast/toast.service';
import {ModalService} from '../../modal/modal.service';
import {AlertConfig} from '../../modal/alert/alert-config';
import {AlertType} from '../../modal/alert/alert-type';
import 'ztree';
import 'jquery';
declare var $: any;

@Component({
  selector: 'app-company-office-manage',
  templateUrl: './company-office-manage.component.html',
  styleUrls: ['./company-office-manage.component.scss']
})
export class CompanyOfficeManageComponent implements OnInit {
  setting = {
    data: {
      simpleData: {
        enable: true,
        pIdKey: 'parentId'
      },
      key: {
        name: 'officeName'
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
  @Input() companyId = null;
  constructor(
    private activeModal: NgbActiveModal,
    private ngbModal: NgbModal,
    private httpService: HttpService,
    private toastService: ToastService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.openZTree();
  }

  /**
   * 打开部门树
   */
  openZTree() {
    this.httpService.post(SystemConstant.OFFICE_LIST, {companyId: this.companyId}).subscribe({
      next: (data) => {
        this.zNodes = data;
        $.fn.zTree.init($('#ztree'), this.setting, this.zNodes);
        const treeObj = $.fn.zTree.getZTreeObj('ztree');
        treeObj.expandAll(true);
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '',  '获取部门失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {}
    });
  }

  /**
   * 关闭模态框
   */
  close() {
    this.activeModal.dismiss('failed');
  }

  /**
   * 新增部门
   */
  addCompanyOffice() {
    let parentId = 0;
    const treeObj = $.fn.zTree.getZTreeObj('ztree');
    const nodes = treeObj.getCheckedNodes(true);
    if (nodes !== undefined && nodes !== null) {
      for (let i = 0; i < nodes.length; i++) {
        parentId = nodes[i].id;
      }
    }
    const modalRef = this.ngbModal.open(CompanyOfficeEditComponent);
    modalRef.componentInstance.companyId = this.companyId;
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
   * 修改部门
   * @returns {boolean}
   */
  editCompanyOffice() {
    let sysCompanyOffice = {
      id : 0,
      parentId : 0,
      officeName: ''
    };
    const treeObj = $.fn.zTree.getZTreeObj('ztree');
    const nodes = treeObj.getCheckedNodes(true);
    if (nodes === undefined || nodes === null || nodes.length === 0) {
      const alertConfig: AlertConfig = new AlertConfig(AlertType.INFO, '部门修改', '必须选择一个部门！');
      this.modalService.alert(alertConfig);
      return false;
    } else {
      for (let i = 0; i < nodes.length; i++) {
        sysCompanyOffice = {
          id: nodes[i].id,
          parentId: nodes[i].parentId,
          officeName: nodes[i].officeName
        };
      }
    }
    const modalRef = this.ngbModal.open(CompanyOfficeEditComponent);
    modalRef.componentInstance.companyId = this.companyId;
    modalRef.componentInstance.parentId = sysCompanyOffice.parentId;
    modalRef.componentInstance.SysCompanyOffice = sysCompanyOffice;
    modalRef.result.then(
      (result) => {
        if (result === 'success') {
          this.openZTree();
        }
      }
    );
  }

  /**
   * 删除部门
   */
  delCompanyOffice() {
    let id = 0;
    const treeObj = $.fn.zTree.getZTreeObj('ztree');
    const nodes = treeObj.getCheckedNodes(true);
    if (nodes === undefined || nodes === null || nodes.length === 0) {
      const alertConfig: AlertConfig = new AlertConfig(AlertType.INFO, '部门删除', '必须选择一个部门！');
      this.modalService.alert(alertConfig);
      return false;
    } else {
      for (let i = 0; i < nodes.length; i++) {
        id = nodes[i].id;
      }
    }
    this.httpService.get(SystemConstant.OFFICE_DEL + '?id=' + id).subscribe({
      next: (data) => {
        this.openZTree();
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '',  '删除部门失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {}
    });
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
