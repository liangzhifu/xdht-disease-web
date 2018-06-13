import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sysReform'
})
export class SysReformPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let sysStatus;
    switch (value) {
      case '0':
        sysStatus = '否';
        break;
      case '1':
        sysStatus = '是';
        break;
      default:
        sysStatus = '未知状态';
        break;

    }
    return sysStatus;
  }

}
