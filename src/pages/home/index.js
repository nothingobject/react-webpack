import React, {  useState , useEffect} from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useNavigate ,Outlet , useLocation,} from "react-router-dom";



const { Header, Sider, Content } = Layout;
const Home = (props) => {

    const location = useLocation();
    const navigate = useNavigate();
 
    const [collapsed, setCollapsed] = useState(false);

    const {token: { colorBgContainer, borderRadiusLG },} = theme.useToken();

    useEffect(() => {
        console.log("useEffect Home");
        checkSelectedKey(location.pathname);
    }, [location.pathname]);

    const checkSelectedKey = (pathname) => {
        if (pathname === "/") {
            return "1";
        } else if (pathname === "/admin") {
            return "2";
        } else if (pathname === "/backend") {
            return "3";
        }
        return "1"; // 默认选中首页
    }

    const onClick = ({key}) => {
        if (key === "1") {
            navigate("/");
        }
        if (key === "2") {
            navigate("/admin");
        }
        if (key === "3") {
            navigate("/backend");
        }

    };

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[checkSelectedKey(location.pathname)]}
                    onClick={onClick}
                    items={[
                        {
                            key: "1",
                            icon: <UserOutlined />,
                            label: "首页",
                            path: "/home",
                        },
                        {
                            key: "2",
                            icon: <VideoCameraOutlined />,
                            label: "管理员",
                            path: "/admin",
                        },
                        {
                            key: "3",
                            icon: <UploadOutlined />,
                            label: "非管理员",
                            path: "/backend",
                        },

                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
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
                </Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
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
export default Home;
