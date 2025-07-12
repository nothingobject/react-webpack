import React from "react";
import { Button, Result } from 'antd';
import { useNavigate } from "react-router-dom";

const NotfoundPage=()=>{
    const navigate = useNavigate();

    return (
        <Result
            status="403"
            title="403"
            subTitle="抱歉，您无权限访问该页面"
            extra={
                <Button
                    type="primary"
                    onClick={() => navigate('/')}
                >
                    返回首页
                </Button>
            }
        />
    )
}
export default NotfoundPage;