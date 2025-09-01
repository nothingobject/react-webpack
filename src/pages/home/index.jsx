import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { decrement, increment } from "@/store/reducers/global";
import styles from './index.less'
import { Card, Col, Row } from 'antd';
// import { CSSTransition, TransitionGroup } from 'react-transition-group'
// import { useNProgress } from '@tanem/react-nprogress'



const Home = () => {
    const count = useSelector((state) => state.global.value);
    const dispatch = useDispatch()

   

    return (
        <div className={styles.container}>
            <Row gutter={16}>
                <Col span={8}>
                    <Card type="inner" title="框架" >
                        采用目前市面主流的React 18 来作为基础开发框架
                    </Card>
                </Col>
                <Col span={8}>
                    <Card type="inner" title="UI库" >
                        采用Ant Design 5来构建视图UI
                    </Card>
                </Col>
                <Col span={8}>
                    <Card  type="inner" title="路由" >
                        采用React-router V6来实现跳转
                    </Card>
                </Col>
                
            </Row>

            <Row gutter={16} style={{ marginTop: 16 }}>
                <Col span={8}>
                    <Card type="inner" title="编译工具" >
                        采用Webpack 5来编译整个项目，配置优化
                    </Card>
                </Col>
                <Col span={8}>
                    <Card  type="inner" title="DevOps" >
                        采用gitLab + Jenkind 构建 CI/CD 工程
                    </Card>
                </Col>
                <Col span={8}>
                    <Card type="inner" title="状态管理" >
                        采用Redux Tookit 来管理状态
                    </Card>
                </Col>
            </Row>

            <Row gutter={16} style={{ marginTop: 16 }}>
                <Col span={12}>
                    <Card type="inner" title="全局错误捕获" >
                        采用 ErrorBoundary 来降级显示UI，减少页面白屏出现 + 监听 unhandledrejection 及 error 来兜底大部分错误捕获
                    </Card>
                </Col>
                <Col span={12}>
                    <Card  type="inner" title="动态权限路由菜单" >
                        采用RBAC权限控制模型 用户 -&gt; 角色 -&gt; 权限，通过后台获取动态菜单，然后动态加载对应页面文件，权限外不加载，保证角色页面权限的正常展现
                    </Card>
                </Col>
                
            </Row>
                
            {/* <h2>该项目采用 React 18  +  React-router V6  +  Redux Tookit  +  Webpack 5  +  Ant Design 5  搭建 </h2>
      <h2>集成了全局错误捕获处理  +  动态权限控制路由功能，是一套插拔可用的React中后台项目模版</h2> */}
        </div>
    )
}

export default Home;