import {Directive, Input, OnChanges, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appSimpleDataTable]',
  exportAs: 'simpleDataTable'
})
export class SimpleDataTableDirective implements OnChanges {

  @Input()
  public refData: any[] = [];

  public data: any[];
  ngOnChanges(changes: SimpleChanges): void {
  }

  constructor() { }

  public setData(data) {
    this.refData = data;
    this.data = this.refData;
  }
}
