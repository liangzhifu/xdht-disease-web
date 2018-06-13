import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {RecordComponent} from './record/record.component';

/**
 * 调查表管理路由
 */
const recordRoutes: Routes = [
  {
    path: '',
    component: RecordComponent,
    children: [
      {path: 'recordScene', loadChildren: './record-scene/record-scene.module#RecordSceneModule'}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(recordRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RecordRoutingModule {
}
