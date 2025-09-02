import React, { useState, useEffect, useMemo } from "react";
import { Button, Layout, Menu, theme, Spin, message } from "antd";
import { useNavigate, Outlet, useLocation, Navigate, useOutlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { login, logout ,changeLoading} from "@/store/reducers/global";
import GlobalHeader from "@/components/GlobalHeader";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'  // 这个nprogress样式必须引入


// 导入对应的Icon
import {
    UserOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    VideoCameraOutlined,
    HomeOutlined,
    SettingOutlined,
    UsergroupAddOutlined,
    ClusterOutlined,
    BookOutlined

} from '@ant-design/icons';

import styles from './index.less'

const { Header, Sider, Content ,Footer } = Layout;

// 配置基础参数
NProgress.configure({ 
    parent: '#root',
    easing: 'ease', 
    speed: 500 ,
    showSpinner: false,// 右侧loading图标
    minimum: 0.1 ,
    trickleSpeed: 200,//递增速度
    trickle: true,//自动递增
});

// Icon的对应表
const IconMap = {
    HomeOutlined: <HomeOutlined />,
    UploadOutlined: <UploadOutlined />,
    UserOutlined: <UserOutlined />,
    VideoCameraOutlined: <VideoCameraOutlined />,
    SettingOutlined: <SettingOutlined/>,
    UsergroupAddOutlined: <UsergroupAddOutlined/>,
    ClusterOutlined: <ClusterOutlined />,
    BookOutlined: <BookOutlined />
};

const BasicLayout = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [collapsed, setCollapsed] = useState(false);
    const currentUser = useSelector((state) => state.global.userInfo);
    const isLoading = useSelector((state) => state.global.isLoading);

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

        
        NProgress.start()

        NProgress.inc();

        // 默认3秒加载自动结束
        setTimeout(() => {
            dispatch(changeLoading(false));
        }, 1000);

        // 只记录有效页面（如不为 404 页）
        if (location.pathname !== "/login" && location.pathname !== "*") {
            sessionStorage.setItem("lastValidPath", location.pathname);
        }

    }, [currentUser, isLogin, navigate, location.pathname]);


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

    // 判断是否加载完毕
    useEffect(()=>{
        if(!isLoading){
            NProgress.done();
            dispatch(changeLoading(true));
        }
    },[isLoading])

    return (
        <Layout className={styles.layoutbox}>
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
                <Footer style={{ textAlign: 'center',paddingTop:0 }}>
                    React + Redux + React-router + Ant Design © 2025   
                </Footer>
            </Layout>
        </Layout>
    );
};
export default BasicLayout;
