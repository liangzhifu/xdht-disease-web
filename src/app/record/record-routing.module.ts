import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RecordComponent } from './record.component';
import { SceneManageComponent } from './scene-manage/scene-manage.component';

/**
 * 调查表管理路由
 */
const recordRoutes: Routes = [
  {
    path: '',
    component: RecordComponent,
    children: [
      {path: 'recordSceneManage', component: SceneManageComponent}
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
