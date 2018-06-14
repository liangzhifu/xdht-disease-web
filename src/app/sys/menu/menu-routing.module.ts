import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {MenuComponent} from './menu/menu.component';
import {MenuManageComponent} from './menu-manage/menu-manage.component';
import {EditPasswordComponent} from '../user/edit-password/edit-password.component';
import {UserManageComponent} from '../user/user-manage/user-manage.component';

/**
 * 菜单管理路由
 */
const menuRoutes: Routes = [{
  path: '',
  component: MenuComponent,
  children: [
    {path: 'menuManage', component: MenuManageComponent}
  ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(menuRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MenuRoutingModule {}
