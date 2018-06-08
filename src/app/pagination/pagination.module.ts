import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { HttpPaginationComponent } from './http-pagination/http-pagination.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PaginationComponent,
    HttpPaginationComponent
  ],
  exports: [
    PaginationComponent,
    HttpPaginationComponent
  ]
})
export class PaginationModule { }
