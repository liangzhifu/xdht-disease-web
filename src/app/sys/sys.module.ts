import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SysRoutingModule } from './sys-routing.module';
import { SysComponent } from './sys/sys.component';
import {UserModule} from './user/user.module';
import {RoleModule} from './role/role.module';
import {UserEditComponent} from './user/user-edit/user-edit.component';
import {RoleEditComponent} from './role/role-edit/role-edit.component';

@NgModule({
  imports: [
    CommonModule,
    SysRoutingModule,
    UserModule,
    RoleModule
  ],
  entryComponents: [
    UserEditComponent,
    RoleEditComponent,
  ],
  declarations: [SysComponent]
})
export class SysModule { }
