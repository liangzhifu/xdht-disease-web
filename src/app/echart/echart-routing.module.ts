import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {EchartComponent} from './echart.component';
import {DemoComponent} from './demo/demo.component';
import {EmployeeEcharsInfoComponent} from './employee-echars-info/employee-echars-info.component';
import {IndividualNoiseEchartsComponent} from './individual-noise-echarts/individual-noise-echarts.component';
import {WorkplaceNoiseEchartsComponent} from './workplace-noise-echarts/workplace-noise-echarts.component';
import {CompanySummaryEchartsComponent} from './company-summary-echarts/company-summary-echarts.component';
import {CompanySummaryEchartsBarComponent} from './company-summary-echarts-bar/company-summary-echarts-bar.component';

const echartRoutes: Routes = [
  {
    path: '',
    component: EchartComponent,
    children: [
      {path: 'demo', component: DemoComponent},
      {path: 'employeeEcharsInfo', component: EmployeeEcharsInfoComponent},
      {path: 'individualNoiseEcharsInfo', component: IndividualNoiseEchartsComponent},
      {path: 'workplaceNoiseEcharsInfo', component: WorkplaceNoiseEchartsComponent},
      {path: 'companySummaryEcharsInfo', component: CompanySummaryEchartsComponent},
      {path: 'companySummaryEcharsBarInfo', component: CompanySummaryEchartsBarComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(echartRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class EchartRoutingModule {}
