import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SystemConstant} from '../../core/class/system-constant';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';
import {ToastService} from '../../toast/toast.service';
import {HttpService} from '../../core/http/http.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import 'ztree';
import 'jquery';
declare var $: any;

@Component({
  selector: 'app-knowledge-catalog-tree',
  templateUrl: './knowledge-catalog-tree.component.html',
  styleUrls: ['./knowledge-catalog-tree.component.scss']
})
export class KnowledgeCatalogTreeComponent implements OnInit {
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
    callback: {
      onClick: this.zTreeOnClick.bind(this)
    }
  };
  zNodes = [];
  SurplusHeight: any;
  // 输出
  @Output() onChangeCatalog: EventEmitter<any> = new EventEmitter();
  constructor(
    private ngbModal: NgbModal,
    private httpService: HttpService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
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
    this.bodyHeight();
  }

  bodyHeight() {
    const bodyHeight = document.documentElement.clientHeight;
    this.SurplusHeight = (bodyHeight - 90) + 'px';
  }

  /**
   * 节点点击事件
   * @param event
   * @param treeId
   * @param treeNode
   */
  zTreeOnClick(event, treeId, treeNode) {
    this.onChangeCatalog.emit(treeNode.id);
  }

}
