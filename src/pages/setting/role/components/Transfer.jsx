import { Transfer, Tree } from 'antd';
import React, { useState } from 'react';
// Customize Table Transfer
// const isChecked = (selectedKeys, eventKey) => selectedKeys.includes(eventKey);

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
            item.key=item.key;
            transferDataSource.push(item);
            flatten(item.children);
        });
    }

    flatten(dataSource);


    return (
        <Transfer
            {...restProps}
            titles={['未绑定', '已绑定']}
            targetKeys={targetKeys}// 右侧集合
            dataSource={transferDataSource}// 左侧来源
            className="tree-transfer"
            render={(item) => item.label}
            showSelectAll={true}
        >
            {({ direction, onItemSelect,onItemSelectAll, selectedKeys }) => {

                if (direction === 'left') {
                    const checkedKeys = [...selectedKeys, ...targetKeys];

                    return (
                        <Tree
                            blockNode
                            checkable
                            fieldNames={{
                                title:'label',
                                key:'key',
                                children:'children'
                            }}
                            // showLine
                            // checkStrictly
                            defaultExpandAll
                            checkedKeys={checkedKeys}
                            selectedKeys={[]}
                            showSelectAll={false}
                            treeData={generateTree(dataSource, targetKeys)}
                            onCheck={(checkedKeysValue,{checked,node}) => {
                                let filterlist=checkedKeys.filter(item=>!checkedKeysValue.includes(item));
                                checked?onItemSelectAll(checkedKeysValue,checked):
                                onItemSelectAll(filterlist,checked)
                            }}
                            // onSelect={(checkedKeysValue) => {
                            //     console.log(checkedKeys,"checkedKeys")
                            //     console.log(checkedKeysValue,'onCheck')
                            //     // onItemSelect(checkedKeysValue[0], !isChecked(checkedKeys, checkedKeysValue[0]));
                            // }}
                            // onCheck={(_, { node: { key } }) => {
                            //     console.log(key,'onCheck')
                            //     onItemSelect(key, !isChecked(checkedKeys, key));
                            // }}
                            // onSelect={(_, { node: { key } }) => {
                            //     console.log(key,'onSelect')
                            //     onItemSelect(key, !isChecked(checkedKeys, key));
                            // }}
                        />
                    );
                }
            }}
        </Transfer>
    );
};
export default TreeTransfer;