/**
 * @file 角色绑定菜单穿梭框
 * @date 2025/10/24 12:44:27
 * @author lyqjob@yeah.net
 */


import { Transfer, Tree } from 'antd';
import React, { useState } from 'react';
// Customize Table Transfer
const isChecked = (selectedKeys, eventKey) => selectedKeys.includes(eventKey);

const generateTree = (treeNodes = [], checkedKeys = []) =>
    treeNodes.map(({ children, ...props }) => ({
        ...props,
        disabled: checkedKeys.includes(props.key),
        children: generateTree(children, checkedKeys),
    }));
const TreeTransfer = ({ dataSource, targetKeys, ...restProps }) => {
    // const [selectedKeys]
    const transferDataSource = [];

    function flatten(list = []) {
        list.forEach((item) => {
            console.log()
            item.key=item.id;            
            transferDataSource.push(item);
            flatten(item.children);
        });
    }

    flatten(dataSource);

    console.log(transferDataSource,"transferDataSource")


    return (
        <Transfer
            {...restProps}
            titles={['未绑定', '已绑定']}
            targetKeys={targetKeys}// 右侧集合
            dataSource={transferDataSource}// 左侧来源
            className="tree-transfer"
            render={(item) => item.name}
            showSelectAll={false}
        >
            {({ direction, onItemSelect,onItemSelectAll, selectedKeys }) => {

                if (direction === 'left') {
                    const checkedKeys = [...selectedKeys, ...targetKeys];

                    return (
                        <Tree
                            blockNode
                            checkable
                            fieldNames={{
                                title:'name',
                                key:'key',
                                children:'children'
                            }}
                            showLine
                            // checkStrictly
                            defaultExpandAll
                            checkedKeys={checkedKeys}
                            selectedKeys={[]}
                            treeData={generateTree(dataSource, targetKeys)}
                            // onCheck={(checkedKeysValue,{checked,node}) => {
                            //     console.log(checkedKeysValue,"checkedKeysValue")
                            //     console.log(checked,"checked")
                            //     let filterlist=checkedKeys.filter(item=>!checkedKeysValue.includes(item));
                            //     checked?onItemSelectAll(checkedKeysValue,checked):
                            //     onItemSelectAll(filterlist,checked)
                            // }}
                            // onSelect={(checkedKeysValue) => {
                            //     console.log(checkedKeys,"checkedKeys")
                            //     console.log(checkedKeysValue,'onCheck')
                            //     // onItemSelect(checkedKeysValue[0], !isChecked(checkedKeys, checkedKeysValue[0]));
                            // }}
                            onCheck={(checkedKeysValue, {checked,checkedNodes,event,halfCheckedKeys, node: { key }, }) => {
               
                                let filterlist=checkedKeys.filter(item=>!checkedKeysValue.includes(item));
                                checked?onItemSelectAll(checkedKeysValue,checked):onItemSelectAll(filterlist,checked)
                                
                            }}
                            
                            
                        />
                    );
                }
            }}
        </Transfer>
    );
};
export default TreeTransfer;