import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpPaginationComponent } from '../../pagination/http-pagination/http-pagination.component';
import { SimpleDataTableDirective } from '../simple-data-table.directive';

@Component({
  selector: 'app-simple-data-http-page',
  templateUrl: './simple-data-http-page.component.html',
  styleUrls: ['./simple-data-http-page.component.scss']
})
export class SimpleDataHttpPageComponent implements OnInit {
  @Input() url: string;

  @Input() method = 'post';

  @Input() param: any = null;

  @ViewChild('hp', undefined) hp: HttpPaginationComponent;

  pageList?: Array<number> = [10, 20, 50, 100];
  constructor(
    private simpleDataTable: SimpleDataTableDirective
  ) { }
  ngOnInit(): void {
  }
  public search(): void {
    this.hp.search();
  }
  onDataChanged(dataList): void {
    this.simpleDataTable.setData(dataList);
  }
}
