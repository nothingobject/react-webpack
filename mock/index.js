// 模拟获取菜单
export const getAdminMenus = () => {
    return new Promise((resolve) => {
        window.setTimeout(() => {
            resolve([
                {
                    key: "/",
                    path: "/",
                    icon: 'HomeOutlined',
                    label: "首页",
                    filepath: "home",
                    menuCode:'home',
                    node_type:2
                },
                {
                    key: "/setting",
                    path: "",
                    icon: 'SettingOutlined',
                    label: "系统管理",
                    filepath: "",
                    menuCode:'setting',
                    node_type:1,
                    children: [
                        {
                            key: "/setting/user",
                            path: "/setting/user",
                            icon: 'UserOutlined',
                            label: "用户管理",
                            filepath: "setting/user",
                            menuCode:'user',
                            node_type:2,
                            children:[
                                {
                                    name:'用户管理-添加',
                                    menuCode:'user:add',
                                    node_type:3
                                },
                                {
                                    name:'用户管理-删除',
                                    menuCode:'user:delete',
                                    node_type:3
                                },
                                {
                                    name:'用户管理-列表删除',
                                    menuCode:'user:list_delete',
                                    node_type:3
                                },
                                {
                                    name:'用户管理-列表角色管理',
                                    menuCode:'user:list_role',
                                    node_type:3
                                },
                                {
                                    name:'用户管理-列表重置密码',
                                    menuCode:'user:list_reset',
                                    node_type:3
                                }
                            ]
                        },
                        {
                            key: "/setting/role",
                            path: "/setting/role",
                            icon: 'UsergroupAddOutlined',
                            label: "角色管理",
                            filepath: "setting/role",
                            menuCode:'role',
                            node_type:2,
                            children:[
                                {
                                    name:'角色管理-添加',
                                    menuCode:'role:add',
                                    node_type:3
                                },
                                {
                                    name:'角色管理-删除',
                                    menuCode:'role:delete',
                                    node_type:3
                                },
                                {
                                    name:'角色管理-列表删除',
                                    menuCode:'role:list_delete',
                                    node_type:3
                                },
                                {
                                    name:'角色管理-列表分配菜单',
                                    menuCode:'role:list_menu',
                                    node_type:3
                                },
                                {
                                    name:'角色管理-列表分配用户',
                                    menuCode:'user:list_user',
                                    node_type:3
                                }
                            ]
                        },
                        

                        {
                            key: "/setting/menu",
                            path: "/setting/menu",
                            icon: 'ClusterOutlined',
                            label: "菜单管理",
                            filepath: "setting/menu",
                            menuCode:'menu',
                            node_type:2
                        },

                    ]
                },
                // {
                //     key: "/backend",
                //     path: "/backend",
                //     icon: 'UploadOutlined',
                //     label: "页面",
                //     filepath: "backend",
                // },
                // {
                //     key: "/demo",
                //     path: "/demo",
                //     icon: 'UploadOutlined',
                //     label: "测试页",
                //     filepath: "demo",
                // },
                {
                    key: "/notes",
                    path: "/notes",
                    icon: 'BookOutlined',
                    label: "求职简历",
                    filepath: "notes",
                    menuCode:'note',
                    node_type:2,
                }
            ]);
        }, 1000);
    });
};