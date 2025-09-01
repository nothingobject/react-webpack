/**
 * @file 用户管理
 * @date 2025/09/01 16:36:17
 * @author lyqjob@yeah.net
 */

/**
 * @file 菜单管理
 * @date 2025/09/01 16:03:53
 * @author lyqjob@yeah.net
 */

import React,{useState} from 'react';
import { Table, Tag, Space ,Button , Modal} from 'antd';
import Rolelist from  './components/Rolelist';

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



const data = [
    {
        key: 1,
        code:'00000000',
        name: '超级管理员',
        phone: '0000000000',
        dept: '运维部',
        filepath: '',
        status: 'ok',
        creattime: '2025-09-01 10:00:00',
        
    },
];

const Userlist = () => {
    const [selectionType, setSelectionType] = useState('checkbox');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const columns = [
    { title: '用户编号', dataIndex: 'code', key: '' },
    {
        title: '用户名称',
        dataIndex: 'name',
        key: '',
    },
    { title: '手机号', dataIndex: 'phone', key: '' },
    { title: '部门', dataIndex: 'dept', key: '' },
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
                <a>删除</a>
                <a onClick={()=>{    setIsModalOpen(true);
}}>分配角色</a>
<a>重置密码</a>
            </Space>
        )
    },
];

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };
    return (
        <>
            <Space>
                <Button onClick={()=>{}} type="primary" style={{ marginBottom: 16 }}>
                    添加
                </Button>
                <Button danger onClick={()=>{}} type="primary" style={{ marginBottom: 16 }}>
                    删除
                </Button>
            </Space>
            <Table
                columns={columns}
                rowSelection={{ type: selectionType, ...rowSelection }}
                dataSource={data}
            />
            <Modal
                title="角色分配"
                width={1200}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Rolelist/>
            </Modal>
        </>
    )
}


export default Userlist;
