import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'companyName'
})
export class CompanyNamePipe implements PipeTransform {

  transform(value: string, companyArray: Array<any>): string {
    let name = '';
    for (let i = 0; i < companyArray.length; i ++ ) {
      if (companyArray[i].id === value) {
        name = companyArray[i].companyName;
      }
    }
    return name;
  }

}
