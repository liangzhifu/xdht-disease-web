import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecordComponent} from './record.component';
import {RecordRoutingModule} from './record-routing.module';
import {SceneEditComponent} from './scene-edit/scene-edit.component';
import {RecordSceneModule} from './record-scene/record-scene.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../core/core.module';
import {SimpleDataTableModule} from '../simple-data-table/simple-data-table.module';
import { PostPersonelComponent } from './post-personel/post-personel.component';
import { SceneDetailComponent } from './scene-detail/scene-detail.component';

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
    SceneEditComponent,
    PostPersonelComponent
  ],
  declarations: [RecordComponent, PostPersonelComponent, SceneDetailComponent]
})
export class RecordModule { }
