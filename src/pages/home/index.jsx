/**
 * @file 首页
 * @date 2025/10/24 12:46:27
 * @author lyqjob@yeah.net
 */


import React, { useEffect } from 'react'
import styles from './index.less'
import { Card, Col, Row } from 'antd';


const Home = () => {
   
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
            <Row gutter={16} style={{ marginTop: 16 }}>
                <Col span={12}>
                    <Card type="inner" title="NodeJS + Express + MySQL" >
                        采用 NodeJS + Express + MySQL实现后端服务，整合JWT认证
                    </Card>
                </Col>
                <Col span={12}>
                    <Card  type="inner" title="无感刷新Token" >
                        采用accessToken + refreshToken 的双Token方案，实现持久登录，无感刷新Token
                    </Card>
                </Col>
                
            </Row>
        </div>
    )
}

export default Home;