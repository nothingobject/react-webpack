import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Result, Button ,message} from "antd";

export default function NoFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    message.warning('404 页面，自动跳转到上次访问的有效路径',2,()=>{
        
    })
    console.warn("");
    // 获取上一个有效路径
    const lastPath = sessionStorage.getItem("lastValidPath") || "/";
    // 自动跳转
    navigate(lastPath, { replace: true });
    
  }, [navigate]);

  return (
    <Result
        status="404"
        title="404"
        subTitle="抱歉，页面出错了。"
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