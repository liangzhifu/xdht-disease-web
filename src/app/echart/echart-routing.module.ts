import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {EchartComponent} from './echart.component';
import {DemoComponent} from './demo/demo.component';

const echartRoutes: Routes = [
  {
    path: '',
    component: EchartComponent,
    children: [
      {path: 'demo', component: DemoComponent}
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
