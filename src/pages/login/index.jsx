import React, { use, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate ,Outlet , useLocation,} from "react-router-dom";
import { login ,setmenus} from "@/store/reducers/global";
import { getAdminMenus } from "@/services/index";

import styles from "./index.less";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading,setLoading]=useState(false)
    const onFinish = (values) => {
        console.log("1111")
        setLoading(true)
      let res = {
        token: "000000000000000",
        userinfo: {
          username: "超级管理员",
          avatar:
            "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
        },
        permissions: {
          role: [],
          routers: [],
        },
      };

      dispatch(
        login({
          userinfo: res.userinfo,
          token: res.token,
        })
      );

      // 获取菜单
      
      getAdminMenus().then((list) => {

        dispatch(setmenus(list));
        
        message.success("登录成功",1, () => {
            setLoading(false)
          navigate("/", { replace: true });
        });
    }).catch(()=>{
        setLoading(false)
    })
    

    };
    return (
        <div className={styles.container}>
            <Form
                name="login"
                initialValues={{ remember: false ,username:'admin',password:'password'}}
                style={{ maxWidth: 800 }}
                onFinish={onFinish}
                className={styles.formbox}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: "请输入账号!" }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    defaultValue="password"
                    rules={[{ required: true, message: "请输入密码!" }]}
                >
                    <Input
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                {/* <Form.Item>
                    <Flex justify="space-between" align="center">
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <a href="">Forgot password</a>
                    </Flex>
                </Form.Item> */}

                <Form.Item>
                    <Button block type="primary" htmlType="submit"  loading={loading}>
                        登录
                    </Button>
                    {/* or <a href="">Register now!</a> */}
                </Form.Item>
            </Form>
        </div>
    );
};
export default Login;
