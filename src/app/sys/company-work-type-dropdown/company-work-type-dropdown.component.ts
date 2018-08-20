import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastType} from '../../toast/toast-type.enum';
import {ToastConfig} from '../../toast/toast-config';
import {HttpService} from '../../core/http/http.service';
import {ToastService} from '../../toast/toast.service';
import 'ztree';
import 'jquery';
declare var $: any;

@Component({
  selector: 'app-company-work-type-dropdown',
  templateUrl: './company-work-type-dropdown.component.html',
  styleUrls: ['./company-work-type-dropdown.component.scss']
})
export class CompanyWorkTypeDropdownComponent implements OnInit {
  @Input() companyId: any;
  @Input() workTypeId: any;
  @Input() addFlag: any;
  @Input() treeSeq: any;
  @Output() onDataChanged: EventEmitter<any> = new EventEmitter();
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
      onCheck: this.zTreeOnCheck.bind(this),
      onClick: this.zTreeOnClick.bind(this)
    }
  };
  zNodes = [];
  workTypeName: any = '';
  constructor(
    private httpService: HttpService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.openZTree(this.companyId, this.workTypeId);
    // 隐藏部门列表
    if (this.addFlag === 1) {
      $('.ztree').hide();
    }
  }
  /**
   * 打开部门树形结构
   */
  openZTree(companyId, workTypeId) {
    if (companyId == null || companyId === '') {
      $.fn.zTree.init($('#company_workType_ztree_' + this.treeSeq), this.setting, null);
      this.workTypeName = '';
    } else {
      this.httpService.post(SystemConstant.OFFICE_LIST, {companyId: companyId}).subscribe({
        next: (data) => {
          this.zNodes = data;
          $.fn.zTree.init($('#company_workType_ztree_' + this.treeSeq), this.setting, this.zNodes);
          const treeObj = $.fn.zTree.getZTreeObj('company_workType_ztree_' + this.treeSeq);
          treeObj.expandAll(true);
          const nodes = treeObj.transformToArray(treeObj.getNodes());
          if (nodes.length > 0) {
            for (let i = 0; i < nodes.length; i++) {
              if (nodes[i].officeType !== 2) {
                nodes[i].nocheck = true;
                treeObj.updateNode(nodes[i]);
              }
            }
          }
          if (workTypeId != null && workTypeId !== '') {
            const treeNode = treeObj.getNodeByParam('id', workTypeId, null);
            if (treeNode != null) {
              this.workTypeName = treeNode.officeName;
              treeObj.checkNode(treeNode, true);
            }
          } else {
            this.workTypeName = '';
          }
        },
        error: (err) => {
          const toastCfg = new ToastConfig(ToastType.ERROR, '',  '获取部门失败！' + '失败原因：' + err, 3000);
          this.toastService.toast(toastCfg);
        },
        complete: () => {}
      });
    }
  }

  /**
   * 菜单节点选择时间
   * @param event
   * @param treeId
   * @param treeNode
   */
  zTreeOnCheck(event, treeId, treeNode) {
    const treeObj = $.fn.zTree.getZTreeObj('company_workType_ztree_' + this.treeSeq);
    const checked = treeNode.checked;
    if (checked) {
      this.workTypeName = treeNode.officeName;
      const data = {
        index : this.treeSeq,
        workTypeId: treeNode.id,
        workTypeName: treeNode.officeName
      };
      const officeType = treeNode.officeType;
      if (officeType === 2) {
        this.onDataChanged.emit(data);
      }
    } else {
      this.workTypeName = '';
      const data = {
        index : this.treeSeq,
        workTypeId: null,
        workTypeName: null
      };
      const officeType = treeNode.officeType;
      if (officeType === 2) {
        this.onDataChanged.emit(data);
      }
    }
  }

  /**
   * 菜单节点点击事件
   * @param event
   * @param treeId
   * @param treeNode
   */
  zTreeOnClick(event, treeId, treeNode) {
    const treeObj = $.fn.zTree.getZTreeObj('company_workType_ztree_' + this.treeSeq);
    const checked = treeNode.checked;
    if (checked) {
      const officeType = treeNode.officeType;
      if (officeType === 2) {
        treeObj.checkNode(treeNode, false);
        this.workTypeName = '';
        const data = {
          index: this.treeSeq,
          workTypeId: null,
          workTypeName: null
        };
        this.onDataChanged.emit(data);
      }
    } else {
      const officeType = treeNode.officeType;
      if (officeType === 2) {
        treeObj.checkNode(treeNode, true);
        this.workTypeName = treeNode.officeName;
        const data = {
          index: this.treeSeq,
          workTypeId: treeNode.id,
          workTypeName: treeNode.officeName
        };
        this.onDataChanged.emit(data);
      }
    }
  }
}
