import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SysComponent } from './sys.component';
import { UserManageComponent } from './user-manage/user-manage.component';
import { RoleManageComponent } from './role-manage/role-manage.component';
import { MenuManageComponent } from './menu-manage/menu-manage.component';

/**
 * 系统管理路由
 */
const sysRoutes: Routes = [
  {
    path: '',
    component: SysComponent,
    children: [
      {path: 'userManage', component: UserManageComponent},
      {path: 'roleManage', component: RoleManageComponent},
      {path: 'menuManage', component: MenuManageComponent}

    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(sysRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SysRoutingModule {}
