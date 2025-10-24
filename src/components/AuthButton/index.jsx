/**
 * @file 按钮权限控制
 * @date 2025/10/21 10:14:08
 * @author lyqjob@yeah.net
 */
import React from 'react';
import { useSelector } from 'react-redux';

const AuthButton = ({
    children,
    authority,
}) => {

    const checkPermissions = (authority, target) => {
        const permission = useSelector((state) => state.global.permission);

        if (typeof authority === 'string') {
            if (permission.includes(authority)) {
                return target;
            }
            return null
        }

        return null;
    };
    const childrenRender = typeof children === 'undefined' ? null : children;
    const dom = checkPermissions(authority, childrenRender);
    return <>{dom}</>;
};

export default AuthButton;