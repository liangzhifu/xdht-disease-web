import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserManageComponent } from './user-manage/user-manage.component';
import { UserComponent } from './user/user.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';

/**
 * 用户管理路由
 */
const userRoutes: Routes = [{
  path: '',
  component: UserComponent,
  children: [
    {path: 'editPassword', component: EditPasswordComponent},
    {path: 'userManage', component: UserManageComponent}
  ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(userRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule {}
