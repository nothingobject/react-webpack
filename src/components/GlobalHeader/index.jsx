
import React, { useState } from 'react';
// import { connect } from 'umi';
import Avatar from './AvatarDropdown';
import Breadcrumb from './Breadcrumb';
import { Space } from 'antd';
import github from '@/static/images/github-fill.png';


import styles from './index.less';

const GlobalHeader = (props) => {

    const [count,setCount] =useState(0)
  
  return (
    <div className={styles.container} >
        <div className={styles.leftbox}>
            <Breadcrumb/>
        </div>
        <div className={styles.rightbox}>
            <a href="https://github.com/nothingobject/react-webpack" style={{height:44}}>
                <img src={github} alt="" className={styles.sourcecode}/>
            </a>
            <Avatar />
        </div>
        
    </div>
  );
};

export default GlobalHeader;
