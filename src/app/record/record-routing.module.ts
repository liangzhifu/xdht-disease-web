import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RecordComponent } from './record.component';
import { SceneManageComponent } from './scene-manage/scene-manage.component';
import { SceneDetailComponent } from './scene-detail/scene-detail.component';

/**
 * 调查表管理路由
 */
const recordRoutes: Routes = [
  {
    path: '',
    component: RecordComponent,
    children: [
      {path: 'recordSceneManage', component: SceneManageComponent},
      {path: 'recordSceneDetail', component: SceneDetailComponent}
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
