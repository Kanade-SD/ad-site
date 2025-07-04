export interface MenuItem {
  name: string; // 路由名称
  path: string; // 路由路径
  title: string; // 菜单标题
  icon?: string; // 菜单图标
  component?: string; // 路由组件
  auth?: boolean; // 是否需要权限
  roles?: number[]; // 角色权限
}
