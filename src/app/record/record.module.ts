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
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    SimpleDataTableModule,
    RecordRoutingModule
  ],
  entryComponents: [
    SceneEditComponent,
    PostPersonelComponent,
    PreEvaluationEditComponent,
    ControlEffectEditComponent
  ],
  declarations: [
    EquipmentManageComponent,
    EquipmentLayoutManageComponent,
    HazardFactorsManageComponent,
    PostPersonelComponent,
    RecordComponent,
    SceneEditComponent,
    SceneManageComponent,
    SceneDetailComponent,
    PreEvaluationManageComponent,
    PreEvaluationEditComponent,
    PresentSituationManageComponent,
    ProductManageComponent,
    ControlEffectManageComponent,
    ControlEffectEditComponent,
    WorkLogManageComponent
  ]
})
export class RecordModule { }
