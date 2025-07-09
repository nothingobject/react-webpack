import React, { createContext, useState, useEffect ,useCallback} from "react";
import { determineErrorType } from '@/utils/utils';

// 错误对象结构
// type: 'render' | 'async' | 'resource' | 'network' | 'auth' | 'business' | 'env'
// message: '错误信息'
// stack: '堆栈信息'
// extra: {} // 其他上下文信息


export const ErrorContext = createContext({
    error: null,
    setError: () => {},
    handleError: () => {},
});

const parseError = (input) => {
    // 默认结构
    let errorObj = {
        type: 'unknown',
        message: '',
        stack: '',
        extra: {}
    };

    // 事件类型映射处理
    const eventHandlers = {
        error: (event) => ({
            type: event.error ? determineErrorType(event.error) : 'resource',
            message: event.error?.message || event.message || '资源加载失败',
            stack: event.error?.stack || '',
            extra: {
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno
            }
        }),
        unhandledrejection: (event) => ({
            
            type: 'async',
            message: event.reason instanceof Error
                ? event.reason.message
                : typeof event.reason === 'string'
                    ? event.reason
                    : JSON.stringify(event.reason),
            stack: event.reason instanceof Error ? event.reason.stack : '',
            extra: {}
        })
    };

    // 事件对象处理
    if (input && input.type && eventHandlers[input.type]) {
        return { ...errorObj, ...eventHandlers[input.type](input) };
    }
    // Error 实例处理
    if (input instanceof Error) {
        return { 
            ...errorObj, 
            type: determineErrorType(input), 
            message: input.message, 
            stack: input.stack 
        };
    }
    // 普通对象处理-errorboundary
    if (typeof input === 'object' && input !== null) {
        return { ...errorObj, ...input };
    }
    // 其他类型
    return { ...errorObj, message: String(input) };
};

export const ErrorProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [errorMap] = useState(new Map()); // 用于存储已处理的错误


    const handleError = useCallback((eventOrError) => {

        const errorObj = parseError(eventOrError);

        // 生成错误唯一标识
        const errorKey = `${errorObj.type}-${errorObj.message}-${Date.now()}`;

        
        // 检查是否是重复错误且在短时间内发生
        const now = Date.now();
        const lastErrorTime = errorMap.get(errorKey);

        if (lastErrorTime && (now - lastErrorTime) < 1000) { // 2秒内的重复错误将被忽略
            return;
        }

        // 更新错误时间戳
        errorMap.set(errorKey, now);

        setError(errorObj);

    }, [errorMap]);


    useEffect(() => {

        const handleWindowError = (event) => {
            // event.preventDefault(); // 阻止错误继续冒泡
            handleError(event);
        };

        window.addEventListener("error", handleWindowError, true);
        window.addEventListener("unhandledrejection", handleWindowError);
        
        return () => {
            window.removeEventListener("error", handleWindowError, true);
            window.removeEventListener("unhandledrejection", handleWindowError);
        };

    }, []);

    useEffect(() => {
        if (error) {
            console.log("捕获到错误");
            // 可扩展：如上报服务器
        }
    }, [error]);

    return (
        <ErrorContext.Provider value={{ error, setError, handleError }}>
            {children}
        </ErrorContext.Provider>
    );
};
