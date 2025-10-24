/**
 * @file 角色管理
 * @date 2025/09/01 16:57:25
 * @author lyqjob@yeah.net
 */

import React,{useEffect, useState} from 'react';
import { Table, Tag, Space, Button, Modal, Form, Input, Radio, Col, Row , message} from 'antd';
import { userApi } from "@/services/admin";
import AuthButton from '@/components/AuthButton';
import moment from 'moment';

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


const Rolelist = () => {
    const [selectionType, setSelectionType] = useState('checkbox');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ismenuModal, setIsMenu] = useState(false);
    const [data,setData] = useState([]);
    const [loading,setLoading] =useState(true)
    const [form] = Form.useForm();
    const [formValues, setFormValues] = useState();
    const [open, setOpen] = useState(false);
    const [roleid,setRoleid] = useState()

    

    const columns = [
    { title: '角色编码', dataIndex: 'code', key: '' },
    {
        title: '角色名称',
        dataIndex: 'name',
        key: '',
    },
    // { title: '权限字符', dataIndex: 'auth', key: '' },
    {
        title: '状态', dataIndex: 'status', key: '',
        render: (tag) => {
            return (
                <Tag color={tag==0?'green':'red'} key={tag}>
                    {tag==0?'正常':'停用'}
                </Tag>
            )
        }
    },
    { title: '创建时间', dataIndex: 'created_at', key: '',
        render:(text) => moment(text).format('YYYY-MM-DD HH:mm:ss')
    },
    {
        title: '操作',
        dataIndex: '',
        key: 'options',
        render: (item) => (
            <Space >

                {
                    item.is_protected ==0? 
                <AuthButton authority="role:delete">
                    <a onClick={clickTip}>删除</a>
                </AuthButton>
                :null}

                {/* {
                    item.is_protected ==1? <a onClick={()=>{getRoleMenuTree(item)}}>菜单管理</a>:null
                } */}
                
                {
                    item.is_protected ==0?
                    <AuthButton authority="role:menu">
                        <a onClick={()=>{
                            getRoleMenuTree(item.id)
                        }}>分配菜单</a>
                    </AuthButton>
                     :null
                }
                
                {/* {
                    item.is_protected ==0? <a onClick={()=>{    setIsModalOpen(true);}}>分配用户</a>:null
                } */}
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

    const [targetKeys, setTargetKeys] = useState([]); // 已绑定数据
    const [dataSource, setDatasource] = useState([]);// 来源数据

    
    // 权限改变
    const onChange = (keys) => {
        console.log(keys,"传入")
        setTargetKeys(keys);
    };

    useEffect(()=>{
        getList()
        getTreeMenus()
    },[])


    const getList = async ()=>{
        
        const [err,result] = await userApi.getAllrole();
        if(err){

        }
        if(result){
            setLoading(false)
            console.log(result,"result")
            setData(result.data)
            
            window.process.done();
        }

    }

    // 根据角色获取对应菜单
    const getRoleMenuTree=async(id)=>{
        setRoleid(id)
        
        const [err,result] = await userApi.getBindmenus(id);
        if(err){

        }
        if(result){

            let filterIds= result.data.map((item)=>item.id);
            setTargetKeys(filterIds)
            setIsMenu(true)
        }
        
    }



    // 获取全部menus
    const getTreeMenus= async ()=>{
        const [err,result] = await userApi.getAllmenu();
        if(err){

        }
        if(result){
            setDatasource(result.data)          
        }
    }

    

    const onCreate = async values => {
        console.log('Received values of form: ', values);
        setFormValues(values);
        
        const [err, res] = await userApi.createRole(values)
        if (err) {

        }
        if (res) {
            message.success('添加成功')
            setOpen(false)
            getList()
            console.log(res)
        }
        
    };

    const handleOk= async ()=>{
        
        const [err,result] = await userApi.bindMenus({roleId:roleid, menuIds:targetKeys});
        if(err){

        }
        if(result){
            message.success('绑定成功')
            console.log(result,"result")
            setIsMenu(false)
            getRoleMenuTree(roleid)
        }
    }

     // 统一提示
    const clickTip=()=>{
        message.warning('开发中，暂不可操作')
    }

    return (
        <>
            <Space>
                <AuthButton authority="role:add">
                    <Button onClick={()=>{setOpen(true)}} type="primary" style={{ marginBottom: 16 }}>
                        添加
                    </Button>
                </AuthButton>
                <AuthButton authority="role:delete">
                    <Button danger onClick={clickTip} type="primary" style={{ marginBottom: 16 }}>
                        删除
                    </Button>
                </AuthButton>
                
            </Space>
            <Table
                loading={loading}
                rowKey={'id'}
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
                okText="确定"
                cancelText="取消"
                width={1200}
                open={ismenuModal}
                onOk={handleOk}
                onCancel={()=>{setIsMenu(false)}}
                destroyOnHidden
            >
                <Transfer dataSource={dataSource} targetKeys={targetKeys} onChange={onChange}/>
            </Modal>

            <Modal
                open={open}
                title="添加角色"
                okText="确定"
                cancelText="取消"
                width={600}
                okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
                onCancel={() => setOpen(false)}
                destroyOnHidden
                modalRender={dom => (
                    <Form
                        // labelCol={{ span: 8 }}
                        // wrapperCol={{ span: 16 }}
                        layout="horizontal"
                        form={form}
                        name="form_in_modal"
                        initialValues={{password:'123456' }}
                        clearOnDestroy
                        onFinish={values => onCreate(values)}
                        style={{ maxWidth: 600 }}

                    >
                        {dom}
                    </Form>
                )}
            >
                <Row>
                    <Col span={8} >
                        <Form.Item
                            name="code"
                            label="角色编码"
                            rules={[{ required: true, message: '请添加角色编码' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} >
                        <Form.Item
                            name="name"
                            label="角色名称"
                            rules={[{ required: true, message: '请添加角色名称' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    {/* <Col span={8} >
                        <Form.Item
                            name="mobile"
                            label="手机号"
                            rules={[{ required:true, message: '请添加手机号' }]}
                        >
                            <Input  type='number'/>
                        </Form.Item>
                    </Col> */}
                </Row>
                <Form.Item name="description" label="描述">
                    <Input type="textarea" />
                </Form.Item>
            </Modal>
        </>
    )
}


export default Rolelist;
