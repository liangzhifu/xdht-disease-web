import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecordComponent} from './record.component';
import {RecordRoutingModule} from './record-routing.module';
import {RecordSceneEditComponent} from './record-scene-edit/record-scene-edit.component';
import {RecordSceneModule} from './record-scene/record-scene.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../core/core.module';
import {SimpleDataTableModule} from '../simple-data-table/simple-data-table.module';
import { RecordPostPersonelComponent } from './record-post-personel/record-post-personel.component';
import { RecordSceneDetailComponent } from './record-scene-detail/record-scene-detail.component';

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
    RecordSceneEditComponent,
    RecordPostPersonelComponent
  ],
  declarations: [RecordComponent, RecordPostPersonelComponent, RecordSceneDetailComponent]
})
export class RecordModule { }
