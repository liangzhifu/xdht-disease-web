import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { TreeviewMenuComponent } from './treeview-menu/treeview-menu.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    NgbModule
  ],
  declarations: [
    MainComponent,
    SidebarMenuComponent,
    TreeviewMenuComponent
  ]
})
export class MainModule { }
