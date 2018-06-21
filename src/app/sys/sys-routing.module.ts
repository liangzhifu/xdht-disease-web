import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SysComponent } from './sys.component';
import { UserManageComponent } from './user-manage/user-manage.component';
import { RoleManageComponent } from './role-manage/role-manage.component';
import { MenuManageComponent } from './menu-manage/menu-manage.component';
import { CompanyManageComponent } from './company-manage/company-manage.component';
import { CompanyOfficeManageComponent } from './company-office-manage/company-office-manage.component';
import { EmployeeManageComponent } from './employee-manage/employee-manage.component';
import { DictionaryManageComponent } from './dictionary-manage/dictionary-manage.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';

/**
 * 系统管理路由
 */
const sysRoutes: Routes = [
  {
    path: '',
    component: SysComponent,
    children: [
      {path: 'companyManage', component: CompanyManageComponent},
      {path: 'companyOfficeManage', component: CompanyOfficeManageComponent},
      {path: 'editPassword', component: EditPasswordComponent},
      {path: 'employeeManage', component: EmployeeManageComponent},
      {path: 'dictionaryManage', component: DictionaryManageComponent},
      {path: 'menuManage', component: MenuManageComponent},
      {path: 'roleManage', component: RoleManageComponent},
      {path: 'userManage', component: UserManageComponent}
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
