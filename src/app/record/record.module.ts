import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordComponent} from './record.component';
import { RecordRoutingModule } from './record-routing.module';
import { SceneEditComponent } from './scene-edit/scene-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { SimpleDataTableModule } from '../simple-data-table/simple-data-table.module';
import { PostPersonelComponent } from './post-personel/post-personel.component';
import { SceneDetailComponent } from './scene-detail/scene-detail.component';
import { SceneManageComponent } from './scene-manage/scene-manage.component';
import { PreEvaluationManageComponent } from './pre-evaluation-manage/pre-evaluation-manage.component';
import { PreEvaluationEditComponent } from './pre-evaluation-edit/pre-evaluation-edit.component';
import { ControlEffectManageComponent } from './control-effect-manage/control-effect-manage.component';
import { ControlEffectEditComponent } from './control-effect-edit/control-effect-edit.component';
import { PresentSituationManageComponent } from './present-situation-manage/present-situation-manage.component';
import { WorkLogManageComponent } from './work-log-manage/work-log-manage.component';
import { ProductManageComponent } from './product-manage/product-manage.component';
import { EquipmentManageComponent } from './equipment-manage/equipment-manage.component';
import { EquipmentLayoutManageComponent } from './equipment-layout-manage/equipment-layout-manage.component';
import { HazardFactorsManageComponent } from './hazard-factors-manage/hazard-factors-manage.component';
import { HazardFactorsEditComponent } from './hazard-factors-edit/hazard-factors-edit.component';
import { AntiNoiseManageComponent } from './anti-noise-manage/anti-noise-manage.component';
import { AntiNoiseEditComponent } from './anti-noise-edit/anti-noise-edit.component';
import { TemperatureProtectionManageComponent } from './temperature-protection-manage/temperature-protection-manage.component';
import { TemperatureProtectionEditComponent } from './temperature-protection-edit/temperature-protection-edit.component';
import { OtherProtectiveManageComponent } from './other-protective-manage/other-protective-manage.component';
import { OtherProtectiveEditComponent } from './other-protective-edit/other-protective-edit.component';
import { IndividualProtectiveManageComponent } from './individual-protective-manage/individual-protective-manage.component';
import { IndividualProtectiveEditComponent } from './individual-protective-edit/individual-protective-edit.component';
import { EmergencyFacilitiesManageComponent } from './emergency-facilities-manage/emergency-facilities-manage.component';
import { EmergencyFacilitiesEditComponent } from './emergency-facilities-edit/emergency-facilities-edit.component';
import { InformingFacilitiesManageComponent } from './informing-facilities-manage/informing-facilities-manage.component';
import { InformingFacilitiesEditComponent } from './informing-facilities-edit/informing-facilities-edit.component';
import { HealthManagementManageComponent } from './health-management-manage/health-management-manage.component';
import { HealthManagementEditComponent } from './health-management-edit/health-management-edit.component';
import {EquipmentLayoutEditComponent} from './equipment-layout-edit/equipment-layout-edit.component';
import {EquipmentEditComponent} from './equipment-edit/equipment-edit.component';
import {ProductEditComponent} from './product-edit/product-edit.component';
import {WorkLogEditComponent} from './work-log-edit/work-log-edit.component';
import {PresentSituationEditComponent} from './present-situation-edit/present-situation-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {VddEquipmentEditComponent} from './vdd-equipment-edit/vdd-equipment-edit.component';
import {VddEquipmentManageComponent} from './vdd-equipment-manage/vdd-equipment-manage.component';
import { SelectEmployeeComponent } from './select-employee/select-employee.component';
import { CompanySummaryManageComponent } from './company-summary-manage/company-summary-manage.component';
import { CompanySummaryEditComponent } from './company-summary-edit/company-summary-edit.component';
import { EmployeeSummaryManageComponent } from './employee-summary-manage/employee-summary-manage.component';
import { EmployeeSummaryEditComponent } from './employee-summary-edit/employee-summary-edit.component';
import { PostPersonnelManageComponent } from './post-personnel-manage/post-personnel-manage.component';
import { PostPersonnelEditComponent } from './post-personnel-edit/post-personnel-edit.component';
import { BuildingBaseManageComponent } from './building-base-manage/building-base-manage.component';
import { BuildingBaseEditComponent } from './building-base-edit/building-base-edit.component';
import { BuildingAerationManageComponent } from './building-aeration-manage/building-aeration-manage.component';
import { BuildingAerationEditComponent } from './building-aeration-edit/building-aeration-edit.component';
import { AuxiliaryHealthEditComponent } from './auxiliary-health-edit/auxiliary-health-edit.component';
import { RecordFundsEditComponent } from './record-funds-edit/record-funds-edit.component';
import { HealthCareEditComponent } from './health-care-edit/health-care-edit.component';
import {SysModule} from '../sys/sys.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    RecordRoutingModule,
    SimpleDataTableModule,
    SysModule
  ],
  entryComponents: [
    AntiNoiseEditComponent,
    ControlEffectEditComponent,
    CompanySummaryEditComponent,
    EmergencyFacilitiesEditComponent,
    EquipmentEditComponent,
    EquipmentLayoutEditComponent,
    HazardFactorsEditComponent,
    HealthManagementEditComponent,
    IndividualProtectiveEditComponent,
    InformingFacilitiesEditComponent,
    OtherProtectiveEditComponent,
    PostPersonelComponent,
    PostPersonnelEditComponent,
    PostPersonnelManageComponent,
    PreEvaluationEditComponent,
    PresentSituationEditComponent,
    ProductEditComponent,
    SceneEditComponent,
    SelectEmployeeComponent,
    TemperatureProtectionEditComponent,
    VddEquipmentEditComponent,
    WorkLogEditComponent,
    BuildingBaseEditComponent,
    BuildingAerationEditComponent,
    AuxiliaryHealthEditComponent,
    RecordFundsEditComponent,
    HealthCareEditComponent
  ],
  declarations: [
    AntiNoiseEditComponent,
    AntiNoiseManageComponent,
    CompanySummaryEditComponent,
    CompanySummaryManageComponent,
    ControlEffectEditComponent,
    ControlEffectManageComponent,
    EmergencyFacilitiesEditComponent,
    EmergencyFacilitiesManageComponent,
    EmployeeSummaryEditComponent,
    EmployeeSummaryManageComponent,
    EquipmentLayoutEditComponent,
    EquipmentLayoutManageComponent,
    EquipmentEditComponent,
    EquipmentManageComponent,
    HazardFactorsEditComponent,
    HazardFactorsManageComponent,
    HealthManagementEditComponent,
    HealthManagementManageComponent,
    IndividualProtectiveEditComponent,
    IndividualProtectiveManageComponent,
    InformingFacilitiesEditComponent,
    InformingFacilitiesManageComponent,
    OtherProtectiveEditComponent,
    OtherProtectiveManageComponent,
    PostPersonelComponent,
    PostPersonnelEditComponent,
    PostPersonnelManageComponent,
    PreEvaluationEditComponent,
    PreEvaluationManageComponent,
    PresentSituationEditComponent,
    PresentSituationManageComponent,
    ProductEditComponent,
    ProductManageComponent,
    RecordComponent,
    SceneDetailComponent,
    SceneEditComponent,
    SceneManageComponent,
    SelectEmployeeComponent,
    TemperatureProtectionEditComponent,
    TemperatureProtectionManageComponent,
    VddEquipmentEditComponent,
    VddEquipmentManageComponent,
    WorkLogEditComponent,
    WorkLogManageComponent,
    BuildingBaseManageComponent,
    BuildingBaseEditComponent,
    BuildingAerationManageComponent,
    BuildingAerationEditComponent,
    AuxiliaryHealthEditComponent,
    RecordFundsEditComponent,
    HealthCareEditComponent,
  ]
})
export class RecordModule { }
