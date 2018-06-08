export class MenuData {
  // ID
  id: string;

  // 父ID
  parentId: string;

  // 名称
  name: string;

  // 关键字
  keyWord: string;

  // 图标
  icon: string;

  // 是否展开
  isExpend?: boolean;

  // URL
  url?: string;

  // 子节点
  children?: Array<MenuData>;
}
