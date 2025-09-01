/**
 * @file 错误监听处理上报
 * @date 2025/09/01 09:32:56
 * @author lyqjob@yeah.net
 */


import { determineErrorType } from '../utils';
import sendTracker from './sendTracker';

// 顶层定义全局变量
let lastUserEvent = null;

// 只注册一次监听器
['click', 'touchstart', 'mousedown', 'keydown', 'mouseover'].forEach(eventType => {
    document.addEventListener(eventType, function (e) {
        lastUserEvent = e;
    }, {
        capture: true,
        passive: true,
    });
});


const errorMap = new Map(); // 用于存储错误及其时间戳

export function injectError() {
    window.addEventListener("error", handleError, true);
    window.addEventListener("unhandledrejection", handleError);
}



/**
 * 处理错误
 * @date 2025/09/01 09:41:16
 * @author lyqjob@yeah.net
 *
 * @param {*} event 
 */
export function handleError(event){

    console.log("22222")
    const errorObj = parseError(event);
    
    // 生成错误唯一标识
    const errorKey = `${errorObj.type}-${errorObj.message}-${Date.now()}`;

    // 检查是否是重复错误且在短时间内发生
    const now = Date.now();
    const lastErrorTime = errorMap.get(errorKey);

    if (lastErrorTime && (now - lastErrorTime) < 1000) { // 1秒内的重复错误将被忽略
        return;
    }

    // 更新错误时间戳
    errorMap.set(errorKey, now);

    // 降级UI
    fallbackUi()

    console.log(errorObj,"errorObj")

    // 错误上报
    sendTracker.send(errorObj);

    
}


/**
 * 错误格式化
 * @date 2025/09/01 09:42:20
 * @author lyqjob@yeah.net
 *
 * @param {*} input 
 * @returns {*} 
 */
function parseError (input)  {

    // 默认结构
    let errorObj = {
        type: 'unknown',
        message: '',  // 错误提示
        filename: '', // 错误所在的文件
        position: '', // 错误所在的行和列的位置
        stack: '' , // 堆栈
    };


    // 获取触发错误最后一步的事件
    if (lastUserEvent) {
        const path = [];
        let el = lastUserEvent.target;

        while (el) {
            path.push(el);
            el = el.parentElement;
        }
       
        errorObj.timeStamp = lastUserEvent.timeStamp,
        errorObj.domPath = path.reverse().map(node => node.tagName.toLowerCase() + (node.id ? `#${node.id}` : '')).join(' > ')
 
    }

    
    // 事件类型映射处理
    const eventHandlers = {
         error: (event) => {
            const stackInfo = event.error?.stack ? parseStack(event.error.stack) : {};
            return {
                type: event.error ? determineErrorType(event.error) : 'resource',
                message: event.error?.message || event.message || '资源加载失败',
                stack: getLines(event.error?.stack)||'',
                filename: stackInfo.filename || event.filename || '',
                position: stackInfo.position || (event.lineno && event.colno ? `${event.lineno}:${event.colno}` : '')
            };
        },
        unhandledrejection: (event) => {
            let stackInfo = {};
            
            if (event.reason instanceof Error && event.reason.stack) {
                stackInfo = parseStack(event.reason.stack);
            }
            return {
                type: 'async',
                message: event.reason instanceof Error
                    ? event.reason.message
                    : typeof event.reason === 'string'
                        ? event.reason
                        : JSON.stringify(event.reason),
                stack: event.reason instanceof Error ? getLines(event.reason.stack) : '',
                filename: stackInfo.filename || '',
                position: stackInfo.position || ''
            };
        }
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
            stack: getLines(input.stack )
        };
    }

    // 资源加载错误
    if (input instanceof Event && input.target && (input.target.src || input.target.href)) {
        errorObj.filename = input.target.src || input.target.href;
        errorObj.position = '';
    }

    // 其他类型
    return { ...errorObj, message: String(input) };


};



/**
 * 解析 stack 获取文件名和位置
 * @date 2025/09/01 13:57:55
 * @author lyqjob@yeah.net
 *
 * @param {*} stack 
 * @returns {{ filename: any; position: string; }} 
 */
function parseStack(stack) {
    if (!stack) return { filename: '', position: '' };
    // 常见 stack 格式：at xxx (http://localhost:3000/src/App.js:10:15)
    // 支持 http(s)、file、webpack-internal 等格式
    const match = stack.match(/((?:https?:\/\/|file:\/\/|webpack-internal:\/\/\/).*?):(\d+):(\d+)/);
    if (match) {
        return {
            filename: match[1],
            position: `${match[2]}:${match[3]}`
        };
    }
    return { filename: '', position: '' };
}



/**
 * 降级UI
 * @date 2025/09/01 11:00:01
 * @author lyqjob@yeah.net
 */
function fallbackUi(){
    let rootdom = document.getElementById('root');
    // 判断是否有子元素
    if(rootdom.childNodes.length<=0){
        // document.getElementById('root').style.display = 'none';
        document.getElementById('fallback').style.display = 'block';
    }
    
}


/**
 * 函数说明
 * @date 2025/09/01 14:11:17
 * @author lyqjob@yeah.net
 *
 * @param {*} stack 
 * @returns {*} 
 */
function getLines(stack) {
    if (!stack) return '';
    // 兼容本地和线上环境，保留每一行的关键信息
    return stack
        .split('\n')
        .map(item => item.replace(/^\s*at\s+/g, '').trim())
        .filter(item => item && !item.includes('/node_modules/react-dom'))
        .join('^');
}




