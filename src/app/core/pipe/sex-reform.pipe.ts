import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sexReform'
})
export class SexReformPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let chineseSex;
    switch (value) {
      case '0':
        chineseSex = '男';
        break;
      case '1':
        chineseSex = '女';
        break;
      default:
        chineseSex = '未知性别';
        break;

    }
    return chineseSex;
  }

}
