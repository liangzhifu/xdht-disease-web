import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData } from '../core/class/user-data';
import { MenuData } from './menu-data';
import { TitleService } from '../core/title/title.service';
import { ConfirmConfig } from '../modal/confirm/confirm-config';
import { ModalService } from '../modal/modal.service';
import { SessionStorageService } from '../core/storage/session-storage.service';
import {EquipmentLayoutManageComponent} from '../record/equipment-layout-manage/equipment-layout-manage.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  // 切换导航
  toggleDescTip = '点击关闭导航菜单';

  // 切换导航标识
  navClose = false;

  title = '首页';

  /**
   * 用户数据
   */
  userData: UserData;

  /**
   * 菜单数据
   * @type {any[]}
   */
  menuData: Array<MenuData> = [{
    'id': '101',
    'parentId': '0',
    'name': '系统管理',
    'keyWord': 'demo',
    'icon': 'fa-wrench',
    'isExpend': false,
    'children': [{
      'id': '102',
      'parentId': '101',
      'name': '用户管理',
      'keyWord': 'mtk',
      'icon': 'fa-columns',
      'url': '/main/sys/userManage'
    }, {
      'id': '103',
      'parentId': '101',
      'name': '角色管理',
      'keyWord': 'modal',
      'icon': 'fa-columns',
      'url': '/main/sys/roleManage'
    }, {
      'id': '104',
      'parentId': '101',
      'name': '菜单管理',
      'keyWord': 'modal',
      'icon': 'fa-columns',
      'url': '/main/sys/menuManage'
    }, {
      'id': '105',
      'parentId': '101',
      'name': '企业基本信息管理',
      'keyWord': 'modal',
      'icon': 'fa-columns',
      'url': '/main/sys/companyManage'
    }, {
      'id': '106',
      'parentId': '101',
      'name': '职工档案信息管理',
      'keyWord': 'modal',
      'icon': 'fa-columns',
      'url': '/main/sys/menuManage'
    }
    ]
  }, {
    'id': '1',
    'parentId': '0',
    'name': '组件示例',
    'keyWord': 'demo',
    'icon': 'fa-wrench',
    'isExpend': false,
    'children': [{
      'id': '2',
      'parentId': '1',
      'name': '消息框',
      'keyWord': 'mtk',
      'icon': 'fa-columns',
      'url': '/app/demo/toastDemo'
    }, {
      'id': '3',
      'parentId': '1',
      'name': '模态框',
      'keyWord': 'modal',
      'icon': 'fa-columns',
      'url': '/app/demo/modalDemo'
    }]
  },
    {
    'id': '24',
    'parentId': '20',
    'name': '角色管理',
    'keyWord': 'jsgl',
    'icon': 'fa-users',
    'children': [{
      'id': '25',
      'parentId': '24',
      'name': '角色添加',
      'keyWord': 'jstj',
      'icon': 'fa-plus-circle',
      'url': '/app/role/roleAdd'
    }, {
      'id': '26',
      'parentId': '24',
      'name': '角色查询',
      'keyWord': 'jscx',
      'icon': 'fa-search',
      'url': '/app/role/roleList'
    }, {
      'id': '27',
      'parentId': '24',
      'name': '角色分配',
      'keyWord': 'jsfp',
      'icon': 'fa-cogs',
      'url': '/app/role/roleDistribute'
    }]
  }, {
      'id': '301',
      'parentId': '0',
      'name': '调查表管理',
      'keyWord': 'jsgl',
      'icon': 'fa-users',
      'children': [{
        'id': '31',
        'parentId': '301',
        'name': '现场调查记录管理',
        'keyWord': 'jstj',
        'icon': 'fa-plus-circle',
        'url': '/main/record/recordSceneManage'
      }, {
        'id': '32',
        'parentId': '301',
        'name': '建设项目概况调查表（预评价）',
        'keyWord': 'jscx',
        'icon': 'fa-search',
        'url': '/main/record/recordPreEvaManage'
      }, {
        'id': '33',
        'parentId': '301',
        'name': '建设项目概况调查表（控制效果评价）',
        'keyWord': 'jsfp',
        'icon': 'fa-cogs',
        'url': '/main/record/recordControlEffect'
      }, {
        'id': '34',
        'parentId': '301',
        'name': '用人单位概况调查表（现状评价）',
        'keyWord': 'jsfp',
        'icon': 'fa-cogs',
        'url': '/main/record/recordPresentSituation'
      }, {
        'id': '35',
        'parentId': '301',
        'name': '工作日写实记录表',
        'keyWord': 'jsfp',
        'icon': 'fa-cogs',
        'url': '/main/record/recordWorkLog'
      }, {
        'id': '36',
        'parentId': '301',
        'name': '物料及产品调查表',
        'keyWord': 'jsfp',
        'icon': 'fa-cogs',
        'url': '/main/record/recordProduct'
      }, {
        'id': '37',
        'parentId': '301',
        'name': '设备设施调查表',
        'keyWord': 'jsfp',
        'icon': 'fa-cogs',
        'url': '/main/record/recordEquipment'
      }, {
        'id': '38',
        'parentId': '301',
        'name': '设备设施布局调查表',
        'keyWord': 'jsfp',
        'icon': 'fa-cogs',
        'url': '/main/record/recordEquipmentLayout'
      }, {
        'id': '39',
        'parentId': '301',
        'name': '职业病危害因素调查表',
        'keyWord': 'jsfp',
        'icon': 'fa-cogs',
        'url': '/main/record/recordHazardFactors'
      }
      ]
    }


];

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private titleService: TitleService,
    private modalService: ModalService,
    private sessionStorageService: SessionStorageService
  ) {
    this.titleService.titleEventEmitter.subscribe((value: string) => {
      if (value) {
        this.title = value;
      }
    });
  }

  ngOnInit() {
    this.userData = this.sessionStorageService.getObject('user');
  }
  /**
   * 切换导航
   */
  toggleNav() {
    this.navClose = !this.navClose;
    if (this.navClose) {
      this.toggleDescTip = '点击展开导航菜单';
    } else {
      this.toggleDescTip = '点击关闭导航菜单';
    }
  }

  /**
  * 跳转首页
  */
  toHome() {
    this.title = '首页';
    this.router.navigate(['/home']).then();
  }

  /**
   * 个人资料
   */
  userInfo() {
    this.router.navigate(['/main/sys/user/userInfo']).then();
  }

  /**
   * 修改密码
   */
  passwordEdit() {
    this.router.navigate(['/main/sys/user/editPassword']).then();
  }

  /**
   * 退出系统
   */
  exitSys() {
    const exitSysCfg = new ConfirmConfig('您确定退出系统吗？');
    this.modalService.confirm(exitSysCfg).then((result) => {
      if (result.status === 'approved') {
        this.sessionStorageService.remove('token');
        this.router.navigate(['/login']).then();
      }
    }, (reason) => {
      console.log(reason);
    });
  }
}
