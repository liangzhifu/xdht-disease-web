import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {RecordPreEvaluationModule} from './record-pre-evaluation.module';
import {RecordPreEvaluationManageComponent} from './record-pre-evaluation-manage/record-pre-evaluation-manage.component';

/**
 * 管理路由
 */
const recordPreEvaRoutes: Routes = [{
  path: '',
  component: RecordPreEvaluationModule,
  children: [
    {path: 'recordPreEvaManage', component: RecordPreEvaluationManageComponent}
  ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(recordPreEvaRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RecordPreEvaluationRoutingModule {}
