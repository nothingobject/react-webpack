
import React, { useState } from 'react';
// import { connect } from 'umi';
import Avatar from './AvatarDropdown';
import Breadcrumb from './Breadcrumb';
import { Space } from 'antd';


import styles from './index.less';

const GlobalHeader = (props) => {

    const [count,setCount] =useState(0)
  
  return (
    <div className={styles.container} >
        <Breadcrumb/>
        <Space></Space>
        <Avatar />
    </div>
  );
};

export default GlobalHeader;
