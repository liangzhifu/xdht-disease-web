import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordPreEvaluationManageComponent } from './record-pre-evaluation-manage/record-pre-evaluation-manage.component';
import { RecordPreEvaluationComponent } from './record-pre-evaluation/record-pre-evaluation.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../../core/core.module';
import {RecordPreEvaluationRoutingModule} from './record-pre-evaluation-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    RecordPreEvaluationRoutingModule
  ],
  declarations: [RecordPreEvaluationManageComponent, RecordPreEvaluationComponent]
})
export class RecordPreEvaluationModule { }
