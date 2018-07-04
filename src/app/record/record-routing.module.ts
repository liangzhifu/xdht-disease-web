import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {RecordComponent} from './record.component';
import {SceneManageComponent} from './scene-manage/scene-manage.component';
import {SceneDetailComponent} from './scene-detail/scene-detail.component';
import {PreEvaluationManageComponent} from './pre-evaluation-manage/pre-evaluation-manage.component';
import {ControlEffectManageComponent} from './control-effect-manage/control-effect-manage.component';
import {PresentSituationManageComponent} from './present-situation-manage/present-situation-manage.component';
import {WorkLogManageComponent} from './work-log-manage/work-log-manage.component';
import {ProductManageComponent} from './product-manage/product-manage.component';
import {EquipmentManageComponent} from './equipment-manage/equipment-manage.component';
import {EquipmentLayoutManageComponent} from './equipment-layout-manage/equipment-layout-manage.component';
import {HazardFactorsManageComponent} from './hazard-factors-manage/hazard-factors-manage.component';
import {AntiNoiseManageComponent} from './anti-noise-manage/anti-noise-manage.component';
import {TemperatureProtectionManageComponent} from './temperature-protection-manage/temperature-protection-manage.component';
import {OtherProtectiveManageComponent} from './other-protective-manage/other-protective-manage.component';
import {IndividualProtectiveManageComponent} from './individual-protective-manage/individual-protective-manage.component';
import {EmergencyFacilitiesManageComponent} from './emergency-facilities-manage/emergency-facilities-manage.component';
import {InformingFacilitiesManageComponent} from './informing-facilities-manage/informing-facilities-manage.component';
import {HealthManagementManageComponent} from './health-management-manage/health-management-manage.component';
import {VddEquipmentManageComponent} from './vdd-equipment-manage/vdd-equipment-manage.component';
import {CompanySummaryManageComponent} from './company-summary-manage/company-summary-manage.component';
import {EmployeeSummaryManageComponent} from './employee-summary-manage/employee-summary-manage.component';
import {PostPersonnelManageComponent} from './post-personnel-manage/post-personnel-manage.component';
import {BuildingBaseManageComponent} from './building-base-manage/building-base-manage.component';
import {BuildingAerationManageComponent} from './building-aeration-manage/building-aeration-manage.component';
import {EmployeeSummaryEditComponent} from './employee-summary-edit/employee-summary-edit.component';

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
      {path: 'recordPostPersonnel', component: PostPersonnelManageComponent},
      {path: 'recordEquipment', component: EquipmentManageComponent},
      {path: 'recordEquipmentLayout', component: EquipmentLayoutManageComponent},
      {path: 'recordSceneDetail', component: SceneDetailComponent},
      {path: 'recordHazardFactors', component: HazardFactorsManageComponent},
      {path: 'recordAntiNoise', component: AntiNoiseManageComponent},
      {path: 'recordTemperature', component: TemperatureProtectionManageComponent},
      {path: 'recordOtherProtective', component: OtherProtectiveManageComponent},
      {path: 'recordIndividualProtective', component: IndividualProtectiveManageComponent},
      {path: 'recordEmergencyFacilities', component: EmergencyFacilitiesManageComponent},
      {path: 'recordInformingFacilities', component: InformingFacilitiesManageComponent},
      {path: 'recordHealthManagement', component: HealthManagementManageComponent},
      {path: 'recordVddEquipment', component: VddEquipmentManageComponent},
      {path: 'employeeSummaryManage', component: EmployeeSummaryManageComponent},
      {path: 'employeeSummaryEdit', component: EmployeeSummaryEditComponent},
      {path: 'companySummaryManage', component: CompanySummaryManageComponent},
      {path: 'buildingAerationManage', component: BuildingAerationManageComponent},
      {path: 'buildingBaseManage', component: BuildingBaseManageComponent}
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
