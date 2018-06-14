import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SysRoutingModule } from './sys-routing.module';
import { SysComponent } from './sys.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {RoleEditComponent} from './role-edit/role-edit.component';
import {MenuEditComponent} from './menu-edit/menu-edit.component';


@NgModule({
  imports: [
    CommonModule,
    SysRoutingModule
  ],
  entryComponents: [
    UserEditComponent,
    RoleEditComponent,
    MenuEditComponent
  ],
  declarations: [SysComponent]
})
export class SysModule { }
