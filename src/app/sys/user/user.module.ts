import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManageComponent } from './user-manage/user-manage.component';
import { UserRoutingModule } from './user-routing.module';
import { SimpleDataTableModule } from '../../simple-data-table/simple-data-table.module';
import { UserEditComponent } from './user-edit/user-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import { UserComponent } from './user/user.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SimpleDataTableModule,
    UserRoutingModule
  ],
  declarations: [
    UserManageComponent,
    UserEditComponent,
    EditPasswordComponent,
    UserComponent
  ],
  entryComponents: [
    UserEditComponent
  ]
})
export class UserModule { }
