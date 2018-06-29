import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inspectReform'
})
export class InspectReformPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let inspect;
    switch (value) {
      case '0':
        inspect = '初检';
        break;
      case '1':
        inspect = '复检';
        break;
      default:
        inspect = '';
        break;

    }
    return inspect;
  }

}
