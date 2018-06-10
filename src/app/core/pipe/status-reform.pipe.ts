import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusReform'
})
export class StatusReformPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let status;
    switch (value) {
      case '0':
        status = '正常';
        break;
      case '1':
        status = '删除';
        break;
      case '2':
        status = '停用';
        break;
      default:
        status = '未知状态';
        break;

    }
    return status;
  }

}
