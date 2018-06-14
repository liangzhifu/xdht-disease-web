import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SysRoutingModule } from './sys-routing.module';
import { SysComponent } from './sys.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { RoleEditComponent } from './role-edit/role-edit.component';
import { MenuEditComponent } from './menu-edit/menu-edit.component';
import { UserManageComponent } from './user-manage/user-manage.component';
import { RoleManageComponent } from './role-manage/role-manage.component';
import { MenuManageComponent } from './menu-manage/menu-manage.component';


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
  declarations: [
    MenuManageComponent,
    MenuEditComponent,
    RoleManageComponent,
    RoleEditComponent,
    SysComponent,
    UserEditComponent,
    UserManageComponent
  ]
})
export class SysModule { }
