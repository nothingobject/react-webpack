
import React, { useState } from 'react';
import Avatar from './AvatarDropdown';
import Breadcrumb from './Breadcrumb';
import github from '@/static/images/github-fill.png';


import styles from './index.less';

const GlobalHeader = (props) => {

    const gotoSourceCode = ()=>{
        window.open('https://github.com/nothingobject/react-webpack')
    }
  
  return (
    <div className={styles.container} >
        <div className={styles.leftbox}>
            <Breadcrumb/>
        </div>
        <div className={styles.rightbox}>
            <img src={github} alt="github_url" className={styles.sourcecode} onClick={gotoSourceCode}/>
            <Avatar />
        </div>
        
    </div>
  );
};

export default GlobalHeader;
