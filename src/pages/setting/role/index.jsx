/**
 * @file 角色管理
 * @date 2025/09/01 16:57:25
 * @author lyqjob@yeah.net
 */

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

import React,{useEffect, useState} from 'react';
import { Table, Tag, Space ,Button , Modal} from 'antd';

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
import Userlist from './components/Userlist';
import Transfer  from './components/Transfer';

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
        auth: 'super_admin',
        dept: '运维部',
        filepath: '',
        status: 'ok',
        creattime: '2025-09-01 10:00:00',
        
    },
    // {
    //     key: 2,
    //     code:'00000001',
    //     name: '管理员',
    //     auth: 'admin',
    //     dept: '运维部',
    //     filepath: '',
    //     status: 'ok',
    //     creattime: '2025-09-01 10:00:00',
        
    // },
];

const Rolelist = () => {
    const [selectionType, setSelectionType] = useState('checkbox');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ismenuModal, setIsMenu] = useState(false);
    

    const columns = [
    { title: '角色编号', dataIndex: 'code', key: '' },
    {
        title: '角色名称',
        dataIndex: 'name',
        key: '',
    },
    { title: '权限字符', dataIndex: 'auth', key: '' },
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
                <a onClick={()=>{setIsMenu(true)}}>分配菜单</a>
                <a onClick={()=>{    setIsModalOpen(true);
}}>分配用户</a>
            </Space>
        )
    },
];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };

    const [targetKeys, setTargetKeys] = useState([
    "setting",
    "user",
    "role",
    "menu",
    "notes"
]); // 已绑定数据
    const [dataSource, setDatasource] = useState([]);// 来源数据

    
    // 权限改变
    const onChange = (keys) => {
        console.log(keys,"传入")
        setTargetKeys(keys);
    };

    useEffect(()=>{
        let data=[
            {
                label:'系统管理',
                key:'setting',
                children:[
                    {
                        label:'用户管理',
                        key:'user',
                    },
                    {
                        label:'角色管理',
                        key:'role',
                    },
                    {
                        label:'菜单管理',
                        key:'menu',
                    }

                ]
            },
            {
                label:'求职简历',
                key:'notes'
            }
        ];
        setDatasource(data)
    },[])
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
                title="用户分配"
                width={1200}
                open={isModalOpen}
                onOk={()=>{setIsModalOpen(false);}}
                onCancel={()=>{setIsModalOpen(false);}}
            >
                <Userlist/>
            </Modal>
            <Modal
                title="菜单分配"
                width={1200}
                open={ismenuModal}
                onOk={()=>{setIsMenu(false)}}
                onCancel={()=>{setIsMenu(false)}}
            >
                <Transfer dataSource={dataSource} targetKeys={targetKeys} onChange={onChange}/>
            </Modal>
        </>
    )
}


export default Rolelist;
