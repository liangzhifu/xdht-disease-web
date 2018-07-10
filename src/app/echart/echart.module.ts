import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxEchartsModule} from 'ngx-echarts';
import {EchartComponent} from './echart.component';
import {DemoComponent} from './demo/demo.component';
import {EchartRoutingModule} from './echart-routing.module';
import { EmployeeEcharsInfoComponent } from './employee-echars-info/employee-echars-info.component';

@NgModule({
  imports: [
    CommonModule,
    EchartRoutingModule,
    NgxEchartsModule
  ],
  declarations: [EchartComponent, DemoComponent,  EmployeeEcharsInfoComponent]
})
export class EchartModule { }
