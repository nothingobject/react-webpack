/**
 * @file 登录页
 * @date 2025/10/24 12:46:49
 * @author lyqjob@yeah.net
 */

import React, { use, useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate ,Outlet , useLocation,} from "react-router-dom";
import { login ,setmenus,setbuttons,setasyncfiles} from "@/store/reducers/global";
import { flattenData , extractMenusAndButtons} from "@/utils/utils";
import { userApi } from "@/services/admin";

import styles from "./index.less";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading,setLoading]=useState(false)
    const onFinish = async (values) => {
        setLoading(true)
        const [err,res] =await userApi.login(values)
        if(err){
           setLoading(false) 
        }
        if(res){
            dispatch(
                login({
                    userinfo: res.userinfo,
                    accessToken: res.accessToken,
                    refreshToken: res.refreshToken,
                })
            );
            const { treeMenus, buttonList , flatFiles } = extractMenusAndButtons(res.menus);

            dispatch(setmenus(treeMenus));
            dispatch(setbuttons(buttonList));
            dispatch(setasyncfiles(flatFiles));
            
            message.success("登录成功",1, () => {
                setLoading(false)
                navigate("/", { replace: true });
            });
        }
    
    };
    return (
        <div className={styles.container}>
            <Form
                name="login"
                initialValues={{ remember: false ,username:'rootadmin',password:'rootadmin'}}
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
