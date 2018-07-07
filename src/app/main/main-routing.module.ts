import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { TokenPermissionService } from '../core/token/token-permission.service';

/**
 * main 路由
 */
const mainRoutes: Routes = [
  { path: '',
    component: MainComponent,
    children: [
      {path: 'sys', loadChildren: './../sys/sys.module#SysModule'},
      {path: 'record', loadChildren: './../record/record.module#RecordModule'},
      {path: 'echart', loadChildren: './../echart/echart.module#EchartModule'}
    ],
    canActivate: [TokenPermissionService]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(mainRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MainRoutingModule {}
