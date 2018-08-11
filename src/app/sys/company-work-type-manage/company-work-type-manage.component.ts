import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';
import {SystemConstant} from '../../core/class/system-constant';
import {HttpService} from '../../core/http/http.service';
import {ToastService} from '../../toast/toast.service';
import {ModalService} from '../../modal/modal.service';
import {AlertConfig} from '../../modal/alert/alert-config';
import {AlertType} from '../../modal/alert/alert-type';
import {WaitService} from '../../core/wait/wait.service';
import 'ztree';
import 'jquery';
declare var $: any;

@Component({
  selector: 'app-company-work-type-manage',
  templateUrl: './company-work-type-manage.component.html',
  styleUrls: ['./company-work-type-manage.component.scss']
})
export class CompanyWorkTypeManageComponent implements OnInit {
  setting = {
    view: {
      fontCss: this.fontCss,
      nameIsHTML: true
    },
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
  sysCompanyOffice = {
    id : '',
    parentId : 0,
    companyId : this.companyId,
    officeName : '',
    officeType: 1
  };
  addFlag = null;
  action = null;
  officeEditFlag = false;
  constructor(
    private activeModal: NgbActiveModal,
    private ngbModal: NgbModal,
    private httpService: HttpService,
    private toastService: ToastService,
    private modalService: ModalService,
    private waitService: WaitService
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
        const toastCfg = new ToastConfig(ToastType.ERROR, '',  '获取工种失败！' + '失败原因：' + err, 3000);
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

  officeEditClose() {
    this.officeEditFlag = false;
  }

  /**
   * 新增工种
   */
  addCompanyWorkType() {
    let parentId = 0;
    const treeObj = $.fn.zTree.getZTreeObj('ztree');
    const nodes = treeObj.getCheckedNodes(true);
    if (nodes !== undefined && nodes !== null) {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].officeType === 1) {
          parentId = nodes[i].id;
        }
      }
    }
    if (parentId === 0) {
      const alertConfig: AlertConfig = new AlertConfig(AlertType.INFO, '新增工种', '必须选择部门！');
      this.modalService.alert(alertConfig);
      return false;
    }
    this.addFlag = true;
    this.action = '新增';
    this.sysCompanyOffice = {
      id : '',
      parentId : parentId,
      companyId : this.companyId,
      officeName : '',
      officeType: 2
    };
    this.officeEditFlag = true;
  }

  /**
   * 修改工种
   * @returns {boolean}
   */
  editCompanyWorkType() {
    let sysCompanyOfficeTemp = {
      id : '',
      parentId : 0,
      officeName: '',
      officeType: 2
    };
    const treeObj = $.fn.zTree.getZTreeObj('ztree');
    const nodes = treeObj.getCheckedNodes(true);
    if (nodes === undefined || nodes === null || nodes.length === 0) {
      const alertConfig: AlertConfig = new AlertConfig(AlertType.INFO, '工种修改', '必须选择一个工种！');
      this.modalService.alert(alertConfig);
      return false;
    } else {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].officeType === 2) {
          sysCompanyOfficeTemp = {
            id: nodes[i].id,
            parentId: nodes[i].parentId,
            officeName: nodes[i].officeName,
            officeType: 2
          };
        }
      }
    }
    if (sysCompanyOfficeTemp.id === '') {
      const alertConfig: AlertConfig = new AlertConfig(AlertType.INFO, '修改工种', '必须选择一个工种！');
      this.modalService.alert(alertConfig);
      return false;
    }
    this.addFlag = false;
    this.action = '修改';
    this.sysCompanyOffice = {
      id : sysCompanyOfficeTemp.id,
      parentId : sysCompanyOfficeTemp.parentId,
      companyId : this.companyId,
      officeName : sysCompanyOfficeTemp.officeName,
      officeType: 2
    };
    this.officeEditFlag = true;
  }

  /**
   * 删除工种
   */
  delCompanyWorkType() {
    let id = 0;
    const treeObj = $.fn.zTree.getZTreeObj('ztree');
    const nodes = treeObj.getCheckedNodes(true);
    if (nodes === undefined || nodes === null || nodes.length === 0) {
      const alertConfig: AlertConfig = new AlertConfig(AlertType.INFO, '工种删除', '必须选择一个工种！');
      this.modalService.alert(alertConfig);
      return false;
    } else {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].officeType === 2) {
          id = nodes[i].id;
        }
      }
    }
    if (id === 0) {
      const alertConfig: AlertConfig = new AlertConfig(AlertType.INFO, '删除工种', '必须选择一个工种！');
      this.modalService.alert(alertConfig);
      return false;
    }
    this.httpService.get(SystemConstant.OFFICE_DEL + '?id=' + id).subscribe({
      next: (data) => {
        this.openZTree();
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '',  '删除工种失败！' + '失败原因：' + err, 3000);
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

  /**
   * 部门字体颜色
   * @param treeId
   * @param node
   * @returns {{}}
   */
  fontCss(treeId, node) {
    return node.officeType === 1 ? {'color': 'red'} : {};
  }

  /**
   * 提交信息
   */
  submitData() {
    this.waitService.wait(true);
    let url = '';
    if (this.addFlag) {
      url = SystemConstant.OFFICE_ADD;
    } else {
      url = SystemConstant.OFFICE_EDIT;
    }
    this.httpService.post(url, this.sysCompanyOffice).subscribe({
      next: (data) => {
        const toastCfg = new ToastConfig(ToastType.SUCCESS, '', this.action + '操作成功！', 3000);
        this.toastService.toast(toastCfg);
        this.openZTree();
        this.officeEditFlag = false;
      },
      error: (err) => {
        const toastCfg = new ToastConfig(ToastType.ERROR, '', this.action + '操作失败！' + '失败原因：' + err, 3000);
        this.toastService.toast(toastCfg);
      },
      complete: () => {
      }
    });
    this.waitService.wait(false);
  }

}
