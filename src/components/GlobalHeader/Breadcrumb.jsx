import React, { useMemo ,useState ,useEffect ,memo } from 'react';
import { Breadcrumb } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

import { useSelector } from 'react-redux';
const BreadcrumbList = memo(() => {
    console.log("BreadcrumbList render")
    const location = useLocation();
    const menus = useSelector((state) => state.global.menus);

     // 递归查找菜单项
    const findMenuByPath = (path, menuList) => {
        for (const menu of menuList) {
            if (menu.path === path) {
                return menu;
            }
            if (menu.children) {
                const found = findMenuByPath(path, menu.children);
                if (found) return found;
            }
        }
        return null;
    };

    

    const breadcrumbItems = useMemo(() => {
        console.log("重复计算")
        const pathSnippets = location.pathname.split('/').filter(i => i);
        
        
        const items = [];
        let url = '';
        // 添加首页
        items.push({
            title: <Link to="/"><HomeOutlined /></Link>,
        });

        // 根据当前路径生成面包屑
        pathSnippets.forEach((snippet, index) => {
            url += `/${snippet}`;
            const menu = findMenuByPath(url, menus);
            if (menu) {
                items.push({
                    title: index === pathSnippets.length - 1 ? 
                        menu.label : 
                        <Link to={url}>{menu.label}</Link>,
                });
            }
        });
        return items;

    }, [location.pathname, menus]);

    const calculateBreadcrumbItems=()=>{
        console.log("重新计算")
        const pathSnippets = location.pathname.split('/').filter(i => i);
        
        const items = [];
        let url = '';
        // 添加首页
        items.push({
            title: <Link to="/"><HomeOutlined /></Link>,
        });

        // 根据当前路径生成面包屑
        pathSnippets.forEach((snippet, index) => {
            url += `/${snippet}`;
            const menu = findMenuByPath(url, menus);
            if (menu) {
                items.push({
                    title: index === pathSnippets.length - 1 ? 
                        menu.label : 
                        <Link to={url}>{menu.label}</Link>,
                });
            }
        });
        return items;
    }

    // 使用 useEffect 的写法
    // const [breadcrumbItems, setBreadcrumbItems] = useState([]);

    // useEffect(() => {
    //     const items = calculateBreadcrumbItems();
    //     setBreadcrumbItems(items);
    // }, []);

   

    return (
        <Breadcrumb items={breadcrumbItems} />
    );
});
export default BreadcrumbList;