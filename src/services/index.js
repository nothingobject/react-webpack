import { Get, post } from "@/utils/api/request.js";

// 模拟获取菜单
export const getAdminMenus = () => {
    return new Promise((resolve) => {
        window.setTimeout(() => {
            resolve([
                {
                    key: "/",
                    path: "/",
                    icon: 'UserOutlined',
                    label: "首页",
                    filepath: "home",
                },
                {
                    key: "/admin",
                    path: "",
                    icon: 'VideoCameraOutlined',
                    label: "管理员",
                    filepath: "",
                    children: [
                        {
                            key: "/admin/list",
                            path: "/admin/list",
                            icon: 'VideoCameraOutlined',
                            label: "列表",
                            filepath: "admin/list",
                        },
                        {
                            key: "/admin/detail",
                            path: "/admin/detail",
                            icon: 'VideoCameraOutlined',
                            label: "详情",
                            filepath: "admin/detail",
                        }
                    ]
                },
                {
                    key: "/backend",
                    path: "/backend",
                    icon: 'UploadOutlined',
                    label: "非管理员",
                    filepath: "backend",
                },
                {
                    key: "/demo",
                    path: "/demo",
                    icon: 'UploadOutlined',
                    label: "测试页",
                    filepath: "demo",
                },
            ]);
        }, 1000);
    });
};