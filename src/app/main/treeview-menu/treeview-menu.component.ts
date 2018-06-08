import { Component, Input, OnInit } from '@angular/core';
import { MenuData } from '../menu-data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-treeview-menu',
  templateUrl: './treeview-menu.component.html',
  styleUrls: ['./treeview-menu.component.scss']
})
export class TreeviewMenuComponent implements OnInit {

  /**
   * 菜单数据
   */
  @Input() data: MenuData;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  /**
   * 是否有子节点
   * @param item
   */
  isLeaf(item: MenuData) {
    return !item.children || !item.children.length;
  }
  /**
   * 点击
   * @param item
   */
  itemClicked(item: MenuData) {
    if (!this.isLeaf(item)) {
      item.isExpend = !item.isExpend;
    } else {
      this.router.navigate([item.url]);
    }
  }
}
