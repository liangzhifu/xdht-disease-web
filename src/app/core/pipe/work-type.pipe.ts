import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'workType'
})
export class WorkTypePipe implements PipeTransform {

  transform(value: string, workTypeArray: Array<any>): string {
    let name = '';
    for (let i = 0; i < workTypeArray.length; i ++ ) {
      if (workTypeArray[i].id === value) {
        name = workTypeArray[i].dictionaryName;
      }
    }
    return name;
  }

}
