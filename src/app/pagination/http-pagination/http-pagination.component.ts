import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Utils} from '../../core/class/utils';
import {HttpPaginationMethod} from '../http-pagination-method.enum';
import {HttpService} from '../../core/http/http.service';
import {ToastConfig} from '../../toast/toast-config';
import {ToastType} from '../../toast/toast-type.enum';
import {ToastService} from '../../toast/toast.service';
import {PaginationType} from '../pagination-type.enum';
import {PaginationComponent} from '../pagination/pagination.component';

@Component({
  selector: 'app-http-pagination',
  templateUrl: './http-pagination.component.html',
  styleUrls: ['./http-pagination.component.scss']
})
export class HttpPaginationComponent implements OnInit {

  @ViewChild('pag', undefined) pag: PaginationComponent;

  @Input() pageList: Array<number> = [10, 20, 50, 100];
  @Input() url: string;
  @Input() method = 'post';
  @Input() param: any = new Object();
  // 输出
  @Output() onDataChanged: EventEmitter<any> = new EventEmitter();
  total = 0;
  pageSize = this.pageList[0];
  pageNumber = 1;
  constructor(
    private httpService: HttpService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
  }

  /**
   * 查询方法
   */
  search() {
    this.getServerData();
  }
  /**
   * 获得服务器数据
   */
  private getServerData() {
    const that = this;
    let serviceData: any = {};
    if (Utils.isArray(this.param)) {
      serviceData.pageNumber = this.pageNumber;
      serviceData.pageSize = this.pageSize;
      serviceData.list = this.param;
    } else if (Utils.isObject(this.param)) {
      this.param.pageNumber = this.pageNumber;
      this.param.pageSize = this.pageSize;
      serviceData = this.param;
    } else {
      serviceData.pageNumber = this.pageNumber;
      serviceData.pageSize = this.pageSize;
    }

    if (this.method === HttpPaginationMethod.GET && Utils.isNotEmpty(this.url)) {
      this.httpService.get(this.url).subscribe({
        next: (res) => {
          that.serverDataProcess(res);
          },
        error: (err) => {
          const toastCfg = new ToastConfig(ToastType.ERROR, '', '数据请求失败！', 3000);
          that.toastService.toast(toastCfg);
        }
      });
    } else if (Utils.isNotEmpty(this.url)) {
      this.httpService.post(this.url, serviceData).subscribe({
        next: (res) => {
          that.serverDataProcess(res);
        },
        error: (err) => {
          const toastCfg = new ToastConfig(ToastType.ERROR, '', '数据请求失败！', 3000);
          that.toastService.toast(toastCfg);
        }
      });
    } else {
      console.error('组件请求时，url参数为空！');
    }
  }


  /**
   * 服务器端数据处理
   * @param data 数据
   */
  private serverDataProcess(data: any) {
    if (data && (data.total !== undefined) && (data.total !== null) && data.dataList) {
      this.total = data.total;
      this.onDataChanged.emit(data.dataList);
    } else {
      console.error('返回的数据格式不正确！');
    }
  }

  /**
  * 分页改变事件
  * @param event
  */
  onPageChanged($event) {
    if ($event.type !== PaginationType.PAGE_INIT) {
      this.pageSize = $event.pageSize;
      this.pageNumber = $event.pageNumber;
      this.getServerData();
    }
  }
}
