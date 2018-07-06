import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'marriageReform'
})
export class MarriageReformPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let marriageStatus;
    switch (value) {
      case '0':
        marriageStatus = '未婚';
        break;
      case '1':
        marriageStatus = '已婚';
        break;
      default:
        marriageStatus = '';
        break;

    }
    return marriageStatus;
  }

}
