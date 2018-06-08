import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RoleManageComponent } from './role-manage/role-manage.component';
import { RoleComponent } from './role/role.component';

/**
 * 用户管理路由
 */
const roleRoutes: Routes = [{
  path: '',
  component: RoleComponent,
  children: [
  {path: 'roleManage', component: RoleManageComponent}
  ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(roleRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoleRoutingModule {}
