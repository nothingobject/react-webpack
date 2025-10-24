/**
 * @file 菜单管理
 * @date 2025/09/01 16:03:53
 * @author lyqjob@yeah.net
 */

import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, Button, Modal, Form, Input, Radio, Col, Row, message } from 'antd';

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
import { userApi } from "@/services/admin";
import AuthButton from '@/components/AuthButton';
import moment from 'moment';

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

const Menulist = () => {
    const [form] = Form.useForm();
    const [formValues, setFormValues] = useState();
    const [open, setOpen] = useState(false);
    const [parent, setParent] = useState({});
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)
    const [nodetype, setNodeType] = useState('1');

    // 统一提示
    const clickTip=()=>{
        message.warning('开发中，暂不可操作')
    }

    const columns = [
        { title: '菜单名称', dataIndex: 'name', key: '' },
        {
            title: '类型', dataIndex: 'node_type', key: '',
            render: (tag) => {
                return (
                    <Tag color={tag == 1 ? 'gold' : tag == 2 ? 'green' : 'red'} key={tag}>
                        {tag == 1 ? '目录' : tag == 2 ? '菜单' : '按钮'}
                    </Tag>
                )
            }
        },
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
        { title: '节点编码', dataIndex: 'menu_code', key: '' },
        { title: '路由', dataIndex: 'route_path', key: '' },
        { title: '组件路径', dataIndex: 'component_path', key: '' },

        {
            title: '创建时间', dataIndex: 'created_at', key: '',
            render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss')
        },
        {
            title: '操作',
            dataIndex: '',
            key: 'options',
            render: (item) => {

                return (
                    <Space >
                        {item.node_type !== 3 ?
                            <AuthButton authority="menu:add">
                                <a
                                    onClick={() => {
                                        // 文件夹添加文件夹或页面
                                        if (item.node_type === 1) {
                                            setParent(item)
                                            setNodeType('2')
                                            setOpen(true)
                                        }
                                        // 页面增加按钮
                                        if (item.node_type === 2) {
                                            setParent(item)
                                            setNodeType('3')
                                            setOpen(true)
                                        }
                                        console.log(item)
                                    }}>增加</a>
                            </AuthButton>
                            : null}
                        <AuthButton authority="menu:delete">
                            <a onClick={clickTip}>删除</a>
                        </AuthButton>
                    </Space>
                )
            }

        },
    ];

    
        

    const onCreate = async values => {
        console.log('Received values of form: ', values);
        setFormValues(values);

        const [err, res] = await userApi.createMenu(values)
        if (err) {

        }
        if (res) {
            message.success('添加成功')
            setOpen(false)
            getList()
        }

    };

    useEffect(() => {
        getList()
    }, [])

    const getList = async () => {

        const [err, result] = await userApi.getAllmenu();
        if (err) {

        }
        if (result) {
            setLoading(false)
            setData(result.data)

            window.process.done();
        }

    }


    const changeRadio = (eve) => {
        let value = eve.target.value;
        setNodeType(value)
    }




    return (
        <>
            <AuthButton authority="menu:add">
                <Button onClick={() => { setOpen(true) }} type="primary" style={{ marginBottom: 16 }}>
                    添加菜单
                </Button>
            </AuthButton>

            <Table
                columns={columns}
                loading={loading}
                rowKey={'id'}
                // expandable={{
                //   expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
                //   rowExpandable: record => record.name !== 'Not Expandable',
                // }}
                dataSource={data}
            />
            <Modal
                open={open}
                title="添加菜单"
                okText="确定"
                cancelText="取消"
                width={800}
                okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
                onCancel={() => setOpen(false)}
                destroyOnHidden
                afterOpenChange={() => {
                    console.log(form.getFieldsValue(['node_type']))
                    console.log(form.getFieldsValue([['node_type']]))
                }}
                modalRender={dom => (
                    <Form
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        layout="horizontal"
                        form={form}
                        name="form_in_modal"
                        initialValues={{ node_type: nodetype, parent_name: parent?.name, parent_id: parent?.id }}
                        clearOnDestroy
                        onFinish={values => onCreate(values)}
                        style={{ maxWidth: 1200 }}

                    >
                        {dom}
                    </Form>
                )}
            >
                <Row>
                    <Col span={8} >
                        <Form.Item
                            name="parent_id"
                            label="父节点id"
                            hidden={true}
                        >
                            <Input disabled={true} />
                        </Form.Item>
                        <Form.Item
                            name="parent_name"
                            label="父节点"
                        >
                            <Input disabled={true} />
                        </Form.Item>
                    </Col>

                    <Col span={12} >
                        <Form.Item
                            name="node_type"
                            label="节点类型"
                            rules={[{ required: true, message: '请选择节点类型' }]}>
                            <Radio.Group onChange={changeRadio} disabled={parent.id && nodetype == 3 ? true : false}>
                                <Radio value="1">目录</Radio>
                                <Radio value="2">页面</Radio>
                                {
                                    parent?.id && parent?.node_type == 1 ? null :
                                        <Radio value="3">按钮</Radio>
                                }
                            </Radio.Group>
                        </Form.Item>
                    </Col>


                </Row>
                <Row>
                    <Col span={8} >
                        <Form.Item
                            name="name"
                            label="名称"
                            rules={[{ required: true, message: '请添加节点名称' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} >
                        <Form.Item
                            name="menu_code"
                            label="编码"
                            rules={[{ required: true, message: '请添加节点编码' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={8} >
                        <Form.Item
                            name="icon"
                            label="图标"
                            rules={[{ required: nodetype != 3 ? true : false, message: '请添加节点图标' }]}
                        >
                            <Input disabled={nodetype != 3 ? false : true} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={8} >
                        <Form.Item
                            name="route_path"
                            label="路由"
                            rules={[{ required: nodetype == 2 ? true : false, message: '请添加节点路由' }]}
                        >
                            <Input disabled={nodetype == 2 ? false : true} />
                        </Form.Item>
                    </Col>
                    <Col span={8} >
                        <Form.Item
                            name="component_path"
                            label="组件路径"
                            rules={[{ required: nodetype == 2 ? true : false, message: '请添加组件路径' }]}
                        >
                            <Input disabled={nodetype == 2 ? false : true} />
                        </Form.Item>
                    </Col>
                    <Col span={8} >

                    </Col>
                </Row>
            </Modal>
        </>

    )
}

export default Menulist;