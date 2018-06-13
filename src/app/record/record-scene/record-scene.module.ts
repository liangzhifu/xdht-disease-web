import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordSceneComponent } from './record-scene/record-scene.component';
import { RecordSceneEditComponent } from './record-scene-edit/record-scene-edit.component';
import { RecordSceneManageComponent } from './record-scene-manage/record-scene-manage.component';
import { RecordSceneRoutingModule } from './record-scene-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    RecordSceneRoutingModule
  ],
  declarations: [RecordSceneComponent, RecordSceneEditComponent, RecordSceneManageComponent]
})
export class RecordSceneModule { }
