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
  selector: 'app-company-office-dropdown',
  templateUrl: './company-office-dropdown.component.html',
  styleUrls: ['./company-office-dropdown.component.scss']
})
export class CompanyOfficeDropdownComponent implements OnInit {
  @Input() companyId: any;
  @Input() officeId: any;
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
  officeName: any = '';
  constructor(
    private httpService: HttpService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
      this.openZTree(this.companyId, this.officeId);
      // 隐藏部门列表
      if (this.addFlag === 1) {
        $('.ztree').hide();
      }
  }

  /**
   * 打开部门树形结构
   */
  openZTree(companyId, officeId) {
    if (companyId == null || companyId === '') {
      $.fn.zTree.init($('#company_office_ztree_' + this.treeSeq), this.setting, null);
      this.officeName = '';
    } else {
      this.httpService.post(SystemConstant.OFFICE_LIST, {companyId: companyId, officeType: '1' }).subscribe({
        next: (data) => {
          this.zNodes = data;
          $.fn.zTree.init($('#company_office_ztree_' + this.treeSeq), this.setting, this.zNodes);
          const treeObj = $.fn.zTree.getZTreeObj('company_office_ztree_' + this.treeSeq);
          treeObj.expandAll(true);
          if (officeId != null && officeId !== '') {
            const treeNode = treeObj.getNodeByParam('id', officeId, null);
            if (treeNode != null) {
              this.officeName = treeNode.officeName;
              treeObj.checkNode(treeNode, true);
            }
          } else {
            this.officeName = '';
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
    const treeObj = $.fn.zTree.getZTreeObj('company_office_ztree_' + this.treeSeq);
    const checked = treeNode.checked;
    if (checked) {
     /* const  workType = treeNode.officeType;
      if (workType === 2 ) {*/
      this.officeName = treeNode.officeName;
      const data = {
        index : this.treeSeq,
        officeId: treeNode.id,
        officeName: treeNode.officeName
      };
      this.onDataChanged.emit(data);
      /*}*/
    } else {
    /*  const  workType = treeNode.officeType;
      if ( workType === 2 ) {*/
      this.officeName = '';
      const data = {
        index : this.treeSeq,
        officeId: null,
        officeName: null
      };
      this.onDataChanged.emit(data);
    /*  }*/
    }
  }



  /**
   * 菜单节点点击事件
   * @param event
   * @param treeId
   * @param treeNode
   */
  zTreeOnClick(event, treeId, treeNode) {

    const treeObj = $.fn.zTree.getZTreeObj('company_office_ztree_' + this.treeSeq);
    const checked = treeNode.checked;

    if (checked) {
      /*const workType = treeNode.officeType;
      if (workType === 2) {*/
        treeObj.checkNode(treeNode, false);
        this.officeName = '';
        const data = {
          index: this.treeSeq,
          officeId: null,
          officeName: null
        };
        this.onDataChanged.emit(data);
      /*}*/
    } else {
     /* const workType = treeNode.officeType;
      if (workType === 2) {*/
        treeObj.checkNode(treeNode, true);
        this.officeName = treeNode.officeName;
        const data = {
          index: this.treeSeq,
          officeId: treeNode.id,
          officeName: treeNode.officeName
        };
        this.onDataChanged.emit(data);
     /* }*/
    }
  }

}
