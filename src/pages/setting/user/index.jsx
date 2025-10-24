/**
 * @file 用户管理
 * @date 2025/09/01 16:36:17
 * @author lyqjob@yeah.net
 */

import React, { useState ,useEffect} from 'react';
import { Table, Tag, Space, Button, Modal, Form, Input, Radio, Col, Row , message} from 'antd';
import Rolelist from './components/Rolelist';
import AuthButton from '@/components/AuthButton';
import { userApi } from "@/services/admin";
import moment from 'moment';



const Userlist = () => {
    const [selectionType, setSelectionType] = useState('checkbox');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalUserOpen,setIsModalUserOpen] = useState(false)
    const [data,setData] = useState([]);
    const [loading,setLoading] =useState(true)
    const [form] = Form.useForm();
    const [formValues, setFormValues] = useState();
    const [open, setOpen] = useState(false);
    const [row,setRow] = useState({});

    const columns = [
        { title: '用户编号', dataIndex: 'code', key: '' },
        { title: '用户名', dataIndex: 'username', key: '' },
        
        {
            title: '姓名',
            dataIndex: 'name',
            key: '',
        },
        { title: '手机号', dataIndex: 'mobile', key: '' },
        // { title: '部门', dataIndex: 'dept', key: '' },
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
            render: (item) => {
                return(
                    <Space >
                    {
                        item.is_protected == 0?
                        <AuthButton authority="user:delete">
                            <a onClick={clickTip}>删除</a>
                        </AuthButton> :null
                    }
                    
                    {
                        item.is_protected == 0? 
                        <AuthButton authority="user:role">
                            <a onClick={() => {
                                    setRow(item)
                                    setIsModalOpen(true);
                                
                            }}>分配角色</a>
                        </AuthButton>
                        :null
                    }
                    
                    {/* {
                        item.is_protected ==0? <a>重置密码</a>:null
                    } */}
                </Space>
                )
            }

        },
    ];
    

    useEffect(()=>{
        getList()
    },[])



    const getList = async ()=>{
        
        const [err,result] = await userApi.getAlluser();
        if(err){

        }
        if(result){
            setLoading(false)
            console.log(result,"result")
            setData(result.data)
            
            window.process.done();
        }

    }


    const onCreate = async values => {
        console.log('Received values of form: ', values);
        setFormValues(values);
        
        const [err, res] = await userApi.createUser(values)
        if (err) {
            message.warning('添加失败')
            setOpen(false)
        }
        if (res) {
            debugger
            message.success('添加成功')
            setOpen(false)
            getList()
            console.log(res)
        }
        
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

    // 统一提示
    const clickTip=()=>{
        message.warning('开发中，暂不可操作')
    }
    
    return (
        <>
            <Space>
                <AuthButton authority="user:add">
                    <Button onClick={() => {setOpen(true) }} type="primary" style={{ marginBottom: 16 }}>
                        添加
                    </Button>
                </AuthButton>
                <AuthButton authority="user:delete">
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
                title="角色分配"
                width={'100%'}
                open={isModalOpen}
                okText="确定"
                cancelText="取消"
                onOk={handleOk}
                onCancel={handleCancel}
                destroyOnHidden
            >
                <Rolelist rowId={row.id} />
            </Modal>

             <Modal
                open={open}
                title="添加用户"
                okText="确定"
                cancelText="取消"
                width={800}
                okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
                onCancel={() => setOpen(false)}
                destroyOnHidden
                modalRender={dom => (
                    <Form
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        layout="horizontal"
                        form={form}
                        name="form_in_modal"
                        initialValues={{password:'123456' }}
                        clearOnDestroy
                        onFinish={values => onCreate(values)}
                        style={{ maxWidth: 800 }}

                    >
                        {dom}
                    </Form>
                )}
            >
                <Row>
                    <Col span={8} >
                        <Form.Item
                            name="username"
                            label="用户名"
                            rules={[{ required: true, message: '请添加用户名' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} >
                        <Form.Item
                            name="name"
                            label="姓名"
                            rules={[{ required: true, message: '请添加姓名' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} >
                        <Form.Item
                            name="mobile"
                            label="手机号"
                            rules={[{ required:true, message: '请添加手机号' }]}
                        >
                            <Input  type='number'/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8} >
                        <Form.Item
                            name="code"
                            label="用户编号"
                            rules={[{ required:  true , message: '请添加用户编号' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} >
                        <Form.Item
                            name="password"
                            label="密码"
                            rules={[{ required:  true , message: '请添加密码' }]}
                        >
                            <Input disabled/>
                        </Form.Item>
                    </Col>
                    <Col span={8} >

                    </Col>
                </Row>
            </Modal>
        </>
    )
}


export default Userlist;
