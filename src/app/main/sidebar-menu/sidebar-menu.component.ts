import {Component, Input, OnInit} from '@angular/core';
import {MenuData} from '../menu-data';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {

  // 输入数据
  @Input() data: Array<MenuData>;

  // 所有数据
  private  allData: Array<MenuData>;

  constructor() { }

  ngOnInit() {
    this.allData = this.data;
  }
  /**
   * 点击
   * @param item
   */
  itemClicked(item: MenuData) {
    if (!this.isLeaf(item)) {
      for (const obj of this.data) {
        if (obj.id !== item.id) {
          obj.isExpend = false;
        }
      }
      item.isExpend = !item.isExpend;
    }
  }
  /**
   * 是否有子节点
   * @param item
   */
  isLeaf(item: MenuData) {
    return !item.children || !item.children.length;
  }
}
