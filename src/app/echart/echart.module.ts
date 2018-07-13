import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxEchartsModule} from 'ngx-echarts';
import {EchartComponent} from './echart.component';
import {DemoComponent} from './demo/demo.component';
import {EchartRoutingModule} from './echart-routing.module';
import { EmployeeEcharsInfoComponent } from './employee-echars-info/employee-echars-info.component';
import { WorkplaceNoiseEchartsComponent } from './workplace-noise-echarts/workplace-noise-echarts.component';
import { IndividualNoiseEchartsComponent } from './individual-noise-echarts/individual-noise-echarts.component';
import { CompanySummaryEchartsComponent } from './company-summary-echarts/company-summary-echarts.component';

@NgModule({
  imports: [
    CommonModule,
    EchartRoutingModule,
    NgxEchartsModule
  ],
  declarations: [EchartComponent, DemoComponent,  EmployeeEcharsInfoComponent,  WorkplaceNoiseEchartsComponent, IndividualNoiseEchartsComponent, CompanySummaryEchartsComponent]
})
export class EchartModule { }
