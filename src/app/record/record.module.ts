import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecordComponent} from './record/record.component';
import {RecordRoutingModule} from './record-routing.module';
import {RecordSceneEditComponent} from './record-scene/record-scene-edit/record-scene-edit.component';
import {RecordSceneModule} from './record-scene/record-scene.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../core/core.module';
import {SimpleDataTableModule} from '../simple-data-table/simple-data-table.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    SimpleDataTableModule,
    RecordRoutingModule,
    RecordSceneModule
  ],
  entryComponents: [
    RecordSceneEditComponent

  ],
  declarations: [RecordComponent]
})
export class RecordModule { }
