import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'officeType'
})
export class OfficeTypePipe implements PipeTransform {

  transform(value: string, officeTypeArray: Array<any>): string {
    let name = '';
    for (let i = 0; i < officeTypeArray.length; i ++ ) {
      if (officeTypeArray[i].id === value) {
        name = officeTypeArray[i].officeName;
      }
    }
    return name;
  }

}
