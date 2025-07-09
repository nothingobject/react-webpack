import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NoFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    console.warn("404 页面，自动跳转到上次访问的有效路径");
    // 获取上一个有效路径
    const lastPath = sessionStorage.getItem("lastValidPath") || "/";
    // 自动跳转
    navigate(lastPath, { replace: true });
  }, [navigate]);

  return null; // 或显示“正在跳转...”
}