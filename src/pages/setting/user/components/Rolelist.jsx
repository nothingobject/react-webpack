/**
 * @file 用户绑定角色管理
 * @date 2025/09/01 16:03:53
 * @author lyqjob@yeah.net
 */

import React,{useState,useEffect} from 'react';
import { Table, Tag, Space ,Button , Modal, message} from 'antd';

import { userApi } from "@/services/admin";
import moment from 'moment';



const Rolelist = (props) => {
    const {rowId} = props;
    const [selectionType, setSelectionType] = useState('checkbox');
    const [data,setData] = useState([]);
    const [loading,setLoading] =useState(true)
    const [open, setOpen] = useState(false);
    const [roledata, setRoledata] = useState([]);
    const [selectedRowKeys, setSelectRowKeys] = useState([]);
    const [records, setRecords] = useState([]);
    

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
                        item.is_protected ==0? <a onClick={()=>removeBind(item.id)}>解绑</a>:null
                    }
                </Space>
            )
        },
    ];

    
    useEffect(()=>{
        getList()
        getRoleList()
    },[])


    const getList = async ()=>{
        console.log(props,"props")
        
        const [err,result] = await userApi.getBindroles(rowId);
        if(err){

        }
        if(result){
            setLoading(false)
            console.log(result,"result")
            setData(result.data)
            
            window.process.done();
        }

    }

    const handleOk = async () => {
        console.log(selectedRowKeys,"selectedRowKeys")
        if(selectedRowKeys.length<=0){
            setOpen(false);
            return
        }
        const [err,result] = await userApi.bindRoles({userId:rowId, roleIds:selectedRowKeys});
        if(err){

        }
        if(result){
            message.success('绑定成功')
            console.log(result,"result")
            getList()
        }
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    const removeBind= async (id)=>{
        const [err,result] = await userApi.delBindRole(id);
        if(err){

        }
        if(result){
            message.success('解绑成功')
            console.log(result,"result")
            getList()
            getRoleList()
        }
        
    }

    const getRoleList= async()=>{
        
        const [err,result] = await userApi.getCanbindroles(rowId);
        if(err){

        }
        if(result){
            console.log(result,"result")
            setRoledata(result.data)
        }
        
    }
    
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            setSelectRowKeys(selectedRowKeys);
            setRecords(selectedRows);
        },
        // getCheckboxProps: record => ({
        //     disabled: record.name === 'Disabled User', // Column configuration not to be checked
        //     name: record.name,
        // }),
    };
    return (
        <>
            <Space>
                <Button onClick={()=>{setOpen(true)}} type="primary" style={{ marginBottom: 16 }}>
                    绑定角色
                </Button>
            </Space>
            <Table
                loading={loading}
                rowKey={'id'}
                columns={columns}
                // rowSelection={{ type: selectionType, ...rowSelection }}
                dataSource={data}
            />

            <Modal
                title="添加角色"
                width={1000}
                open={open}
                okText="确定"
                cancelText="取消"
                onOk={handleOk}
                onCancel={handleCancel}
                destroyOnHidden
            >
               <Table
                    // loading={loading}
                    rowKey={'id'}
                    columns={[...columns].splice(0, columns.length - 1)}
                    rowSelection={{ type: selectionType, ...rowSelection }}
                    dataSource={roledata}
                />
            </Modal>
            
        </>
    )
}


export default Rolelist;
