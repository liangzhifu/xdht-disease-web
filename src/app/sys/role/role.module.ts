import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleManageComponent } from './role-manage/role-manage.component';
import { RoleRoutingModule } from './role-routing.module';
import { SimpleDataTableModule } from '../../simple-data-table/simple-data-table.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleComponent } from './role/role.component';
import { RoleEditComponent } from './role-edit/role-edit.component';
import {CoreModule} from '../../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    RoleRoutingModule,
    SimpleDataTableModule,
  ],
  entryComponents: [
    RoleEditComponent
  ],
  declarations: [
    RoleManageComponent,
    RoleComponent,
    RoleEditComponent
  ]
})
export class RoleModule { }
