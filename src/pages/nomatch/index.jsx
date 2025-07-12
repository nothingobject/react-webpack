import React, { useEffect } from "react";
import { useNavigate ,useLocation} from "react-router-dom";
import { Button, Result , message} from 'antd';
export default function NoMatch() {
    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        const previousPath = location.state?.from || sessionStorage.getItem("lastValidPath") || '/'; // 需要确保在导航时传递了 stat
        navigate(previousPath, { replace: true }); // 或者其他默认行为
        
    }, [location,navigate]);

    return null
}