import React, { createContext, useContext, useState, useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'  // 这个nprogress样式必须引入
 
const NProgressContext = createContext();
 
export const useNProgress = () => useContext(NProgressContext);

export const NProgressProvider = ({ children }) => {
 
    useEffect(()=>{
        NProgress.configure({ 
            parent: '#root',
            easing: 'ease', 
            speed: 500 ,
            showSpinner: false,// 右侧loading图标
            minimum: 0.1 ,
            trickleSpeed: 200,//递增速度
            trickle: true,//自动递增
        });
    },[])
 
  return (
    <NProgressContext.Provider value={{ progress:NProgress }}>
      {children}
    </NProgressContext.Provider>
  );
};