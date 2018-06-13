import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { MenuManageComponent } from './menu-manage/menu-manage.component';
import { MenuEditComponent } from './menu-edit/menu-edit.component';
import {UserRoutingModule} from '../user/user-routing.module';
import {SimpleDataTableModule} from '../../simple-data-table/simple-data-table.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuRoutingModule} from './menu-routing.module';
import {CoreModule} from '../../core/core.module';

@NgModule({
  imports: [
      CommonModule,
      CoreModule,
      FormsModule,
      ReactiveFormsModule,
      SimpleDataTableModule,
      MenuRoutingModule
  ],
  declarations: [MenuComponent, MenuManageComponent, MenuEditComponent]
})
export class MenuModule { }
