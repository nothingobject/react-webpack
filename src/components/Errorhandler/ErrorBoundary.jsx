import React, { Component } from 'react';
import { Button, Result } from 'antd';
import { useNavigate, useLocation } from "react-router-dom";
import  { handleError }  from '@/utils/errormonitor/errorMonitor.js';
import { determineErrorType } from '@/utils/utils';


// 包装高阶组件
function withRouter(ComponentClass) {
    return function (props) {
        const navigate = useNavigate();
        const location = useLocation();
        return <ComponentClass {...props} navigate={navigate} location={location} />;
    };
}



class ErrorBoundary extends Component {
    constructor(props) {
        
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {

        // 已全局监听兜底，这里仅对UI进行降级处理
        // 错误类型判断
        // let errorType = 'unknown'; // 默认未知错误

        // errorType = determineErrorType(error);

        // // 转换为字符串
        // const errorMsg = error instanceof Error ? error.message : String(error);
        // const stack = errorInfo && errorInfo.componentStack ? errorInfo.componentStack : '';

        // console.log(errorMsg,"errorMsg")
        // console.log(stack,"stack")

    }

    componentDidUpdate(prevProps) {
        // 如果当前有错误且路由发生变化，重置错误状态
        if (
            this.state.hasError &&
            this.props.location.pathname !== prevProps.location.pathname
        ) {
            this.setState({ hasError: false });
        }

    }


    render() {
        if (this.state.hasError) {
            return (
                <Result
                    status="404"
                    title="404"
                    subTitle="抱歉，您访问的页面不存在。"
                    extra={
                        <Button
                            type="primary"
                            onClick={() => this.props.navigate('/')}
                        >
                            返回首页
                        </Button>
                    }
                />
            );
        }
        return this.props.children;
    }
}

export default withRouter(ErrorBoundary);