import { Get, Post ,Delete} from "@/utils/api/request.js";

// 登录
export function login(param) { 
    return Post('/api/auth/login',param);
}

// 获取全部用户
export function getAlluser(param) { 
    return Get('/api/admin/user');
}
// 获取全部角色
export function getAllrole(param) { 
    return Get('/api/admin/role');
}
// 获取全部菜单
export function getAllmenu(param) { 
    return Get('/api/admin/menu');
}

// 获取已绑定角色
export function getBindroles(id) { 
    return Get('/api/admin/role/bind/'+id);
}

// 获取可绑定角色
export function getCanbindroles(id) { 
    return Get('/api/admin/role/canbindroles/'+id);
}

// 创建菜单
export function createMenu(param) { 
    return Post('/api/admin/menu/create',param);
}

// 创建用户
export function createUser(param) { 
    return Post('/api/admin/user/create',param);
}

// 创建角色
export function createRole(param) { 
    return Post('/api/admin/role/create',param);
}

// 用户绑定角色
export function bindRoles(param) { 
    return Post('/api/admin/user/bindroles',param);
}

// 角色绑定菜单
export function bindMenus(param) { 
    return Post('/api/admin/role/bindmenus',param);
}

// 获取用户已绑定菜单
export function getBindmenus(id) { 
    return Get('/api/admin/menu/bind/'+id);
}

// 删除绑定角色
export function delBindRole(id) { 
    return Delete('/api/admin/user/delbindrole/'+id);
}

export const userApi = {
	login,
	getAlluser,
    getAllrole,
    getAllmenu,
    createMenu,
    createUser,
    createRole,
    getBindroles,
    getCanbindroles,
    bindRoles,
    delBindRole,
    getBindmenus,
    bindMenus
}