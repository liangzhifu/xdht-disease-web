import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RecordComponent } from './record.component';
import { SceneManageComponent } from './scene-manage/scene-manage.component';
import { SceneDetailComponent } from './scene-detail/scene-detail.component';
import {PreEvaluationManageComponent} from './pre-evaluation-manage/pre-evaluation-manage.component';
import {ControlEffectManageComponent} from './control-effect-manage/control-effect-manage.component';
import {PresentSituationManageComponent} from './present-situation-manage/present-situation-manage.component';
import {WorkLogManageComponent} from './work-log-manage/work-log-manage.component';
import {ProductManageComponent} from './product-manage/product-manage.component';
import {EquipmentManageComponent} from './equipment-manage/equipment-manage.component';
import {EquipmentLayoutManageComponent} from './equipment-layout-manage/equipment-layout-manage.component';
import {HazardFactorsEditComponent} from './hazard-factors-edit/hazard-factors-edit.component';
import {HazardFactorsManageComponent} from './hazard-factors-manage/hazard-factors-manage.component';

/**
 * 调查表管理路由
 */
const recordRoutes: Routes = [
  {
    path: '',
    component: RecordComponent,
    children: [
      {path: 'recordSceneManage', component: SceneManageComponent},
      {path: 'recordPreEvaManage', component: PreEvaluationManageComponent},
      {path: 'recordPresentSituation', component: PresentSituationManageComponent},
      {path: 'recordControlEffect', component: ControlEffectManageComponent},
      {path: 'recordWorkLog', component: WorkLogManageComponent},
      {path: 'recordProduct', component: ProductManageComponent},
      {path: 'recordEquipment', component: EquipmentManageComponent},
      {path: 'recordEquipmentLayout', component: EquipmentLayoutManageComponent},
      {path: 'recordSceneDetail', component: SceneDetailComponent},
      {path: 'recordHazardFactors', component: HazardFactorsManageComponent}
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
