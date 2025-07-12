import React, { useState, useEffect, useMemo } from "react";
import { Button, Layout, Menu, theme, Spin, message } from "antd";
import { useNavigate, Outlet, useLocation, Navigate, useOutlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from "@/store/reducers/global";
import GlobalHeader from "@/components/GlobalHeader";

// 导入对应的Icon
import {
    UserOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';

import styles from './index.less'

const { Header, Sider, Content } = Layout;

// Icon的对应表
const IconMap = {
    UploadOutlined: <UploadOutlined />,
    UserOutlined: <UserOutlined />,
    VideoCameraOutlined: <VideoCameraOutlined />
};

const BasicLayout = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);
    const currentUser = useSelector((state) => state.global.userInfo);
    const isLogin = (localStorage.getItem("token") && location.pathname !== "/login") || false;
    const menulist = useSelector((state) => state.global.menus)
    const [menus, setMenus] = useState([])
    const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();

    // 使用useEffect处理认证逻辑-缓存历史有效路径
    useEffect(() => {
        if (!currentUser || !isLogin) {
            message.warning("登录已失效，请重新登录");
            navigate("/login", { replace: true });
            return
        }

        // 只记录有效页面（如不为 404 页）
        if (location.pathname !== "/login" && location.pathname !== "*" ) {
            sessionStorage.setItem("lastValidPath", location.pathname);
        }

    }, [currentUser, isLogin, navigate,location.pathname]);
   

    /** 选中的菜单项 */
    const selectMenukey = useMemo(() => {
        let path = location.pathname;
        return [path];
    }, [location.pathname]);
    
    
    useEffect(() => {
        // 加载menus，处理icon
        const loopMenuItem = (menus) => menus.map(({ icon, children, ...item }) => ({
            ...item,
            icon: icon && IconMap[icon],
            children: children ? loopMenuItem(children) : null,
        }));
        if (menulist?.length > 0) {
            setMenus(loopMenuItem(menulist));
        }
    }, [menulist]);

    return (
      <Layout>
        <Sider theme={"dark"} trigger={null} collapsible collapsed={collapsed}>
          <div className={styles.logobox} />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["/"]}
            selectedKeys={selectMenukey}
            onClick={({ key }) => {
              console.log(key);
              navigate(key);
            }}
            items={menus}
          />
        </Sider>
        <Layout>
          <Header
            className={styles.headerbox}
            style={{
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <GlobalHeader currentUser={currentUser} />
          </Header>
          <Content
            className={styles.contentbox}
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    );
};
export default BasicLayout;
