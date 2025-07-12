/**
 * 检查用户是否有访问某个路由的权限
 * @param {string} path 路由路径
 * @param {array} menus 用户菜单权限
 * @returns {boolean}
 */
export const checkPermission = (path, menus) => {
  // 递归检查权限
  const check = (path, menus) => {
    for (const menu of menus) {
      if (menu.path === path) {
        return true;
      }
      if (menu.children) {
        const hasPermission = check(path, menu.children);
        if (hasPermission) return true;
      }
    }
    return false;
  };
  return check(path, menus);
};