import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SysComponent } from './sys/sys.component';

/**
 * 系统管理路由
 */
const sysRoutes: Routes = [
  {
    path: '',
    component: SysComponent,
    children: [
      {path: 'user', loadChildren: './user/user.module#UserModule'},
      {path: 'role', loadChildren: './role/role.module#RoleModule'}
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
