import { Get, post } from "@/utils/api/request.js";

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
                },
                {
                    key: "/setting",
                    path: "",
                    icon: 'SettingOutlined',
                    label: "系统管理",
                    filepath: "",
                    children: [
                        {
                            key: "/setting/user",
                            path: "/setting/user",
                            icon: 'UserOutlined',
                            label: "用户管理",
                            filepath: "setting/user",
                        },
                        {
                            key: "/setting/role",
                            path: "/setting/role",
                            icon: 'UsergroupAddOutlined',
                            label: "角色管理",
                            filepath: "setting/role",
                        },
                        

                        {
                            key: "/setting/menu",
                            path: "/setting/menu",
                            icon: 'ClusterOutlined',
                            label: "菜单管理",
                            filepath: "setting/menu",
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
                }
            ]);
        }, 1000);
    });
};