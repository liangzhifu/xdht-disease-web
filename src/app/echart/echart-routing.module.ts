import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {EchartComponent} from './echart.component';
import {DemoComponent} from './demo/demo.component';
import {EmployeeEcharsInfoComponent} from './employee-echars-info/employee-echars-info.component';

const echartRoutes: Routes = [
  {
    path: '',
    component: EchartComponent,
    children: [
      {path: 'demo', component: DemoComponent},
      {path: 'employeeEcharsInfo', component: EmployeeEcharsInfoComponent}
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
