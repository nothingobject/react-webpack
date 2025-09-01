/**
 * @file 菜单管理
 * @date 2025/09/01 16:03:53
 * @author lyqjob@yeah.net
 */

import React from 'react';
import { Table, Tag, Space ,Button} from 'antd';

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

// Icon的对应表
const IconMap = {
    HomeOutlined: <HomeOutlined />,
    UploadOutlined: <UploadOutlined />,
    UserOutlined: <UserOutlined />,
    VideoCameraOutlined: <VideoCameraOutlined />,
    SettingOutlined: <SettingOutlined />,
    UsergroupAddOutlined: <UsergroupAddOutlined />,
    ClusterOutlined: <ClusterOutlined />,
    BookOutlined: <BookOutlined />
};

const columns = [
    { title: '菜单名称', dataIndex: 'label', key: '' },
    {
        title: '图标',
        dataIndex: 'icon',
        key: '',
        render: (icon) => {
            return (
                IconMap[icon]
            )
        }
    },
    { title: '排序', dataIndex: 'sort', key: '' },
    { title: '组件路径', dataIndex: 'filepath', key: '' },
    {
        title: '状态', dataIndex: 'status', key: '',
        render: (tag) => {
            return (
                <Tag color={'green'} key={tag}>
                    {tag}
                </Tag>
            )
        }
    },
    { title: '创建时间', dataIndex: 'creattime', key: '' },
    {
        title: '操作',
        dataIndex: '',
        key: 'options',
        render: (item) => (
            <Space >
                {item.level==1?<a>增加</a>:null}
                <a>删除</a>
            </Space>
        )
    },
];
const data = [
    {
        key: 1,
        level:1,
        label: '系统管理',
        icon: 'SettingOutlined',
        sort: 1,
        filepath: '',
        status: 'ok',
        creattime: '2025-09-01 10:00:00',
        children: [
            {
                level:2,
                key: 11,
                label: '角色管理',
                icon: 'UsergroupAddOutlined',
                sort: 1,
                filepath: 'setting/role',
                status: 'ok',
                creattime: '2025-09-01 10:00:00',
            },
            {
                level:2,
                key: 12,
                label: '用户管理',
                icon: 'UserOutlined',
                sort: 2,
                filepath: 'setting/user',
                status: 'ok',
                creattime: '2025-09-01 10:00:00',
            },
            {
                level:2,
                key: 13,
                label: '菜单管理',
                icon: 'ClusterOutlined',
                sort: 3,
                filepath: 'setting/menu',
                status: 'ok',
                creattime: '2025-09-01 10:00:00',
            },
        ]
    },
    {
        level:1,
        key: 2,
        label: '求职简历',
        icon: 'BookOutlined',
        sort: 2,
        filepath: '',
        status: 'ok',
        creattime: '2025-09-01 10:00:00',
    }
];
const Menulist = () => (
    <>
        <Button onClick={()=>{}} type="primary" style={{ marginBottom: 16 }}>
            添加菜单
        </Button>
        <Table
            columns={columns}
            // expandable={{
            //   expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
            //   rowExpandable: record => record.name !== 'Not Expandable',
            // }}
            dataSource={data}
        />
    </>

);
export default Menulist;
