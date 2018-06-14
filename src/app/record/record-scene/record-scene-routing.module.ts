import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {RecordSceneComponent} from './record-scene/record-scene.component';
import {RecordSceneManageComponent} from '../record-scene-manage/record-scene-manage.component';

/**
 * 现场调查表管理路由
 */
const recordSceneRoutes: Routes = [{
  path: '',
  component: RecordSceneComponent,
  children: [
    {path: 'recordSceneManage', component: RecordSceneManageComponent}
  ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(recordSceneRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RecordSceneRoutingModule {}
