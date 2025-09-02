import React,{useEffect,useState} from 'react';
import Icon, { UserOutlined , LogoutOutlined} from '@ant-design/icons';
import { Dropdown, Space , Avatar} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate ,Outlet , useLocation,} from "react-router-dom";
import { login ,logout} from "@/store/reducers/global";
import styles from './index.less';


const AvatarDropdown = (props) => {
    const currentUser = useSelector((state) => state.global.userInfo);

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const items = [
    {
        label: "退出登录",
        key: "logout",
        icon: <LogoutOutlined />,
        onClick: () => {
            navigate("/login", { replace: true });
            dispatch(logout())
        },
    },
    ];

    useEffect(() => {

    }, [])  

    return (
        <Dropdown  menu={{ items }} trigger={['click']}>
            <div className={styles.avatarbox}>
                <Avatar size={30} icon={<UserOutlined />} src={currentUser?.avatar||null} />
                <div className={styles.name}>{currentUser?.username||''}</div>
            </div>
        </Dropdown>
    )
}
export default AvatarDropdown;