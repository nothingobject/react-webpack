// import { parse } from 'querystring';
// import pathRegexp from 'path-to-regexp';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = path => reg.test(path);
export const isAntDesignPro = () => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }

  return window.location.hostname === 'preview.pro.ant.design';
}; // 给官方演示站点用，用于关闭真实开发环境不需要使用的特性

export const isAntDesignProOrDev = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') {
    return true;
  }

  return isAntDesignPro();
};
export const getPageQuery = () => parse(window.location.href.split('?')[1]);
/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */

export const getAuthorityFromRouter = (router = [], pathname) => {
  const authority = router.find(
    ({ routes, path = '/' }) =>
      (path && pathRegexp(path).exec(pathname)) ||
      (routes && getAuthorityFromRouter(routes, pathname)),
  );
  if (authority) return authority;
  return undefined;
};
export const getRouteAuthority = (path, routeData) => {
  let authorities;
  routeData.forEach(route => {
    // match prefix
    if (pathRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
      if (route.authority) {
        authorities = route.authority;
      } // exact match

      if (route.path === path) {
        authorities = route.authority || authorities;
      } // get children authority recursively

      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

// 判断loacalStorage中是否有对应key且有值
export const isDataInLocalStorageAndNotEmpty=(key)=> {
    return localStorage.hasOwnProperty(key) && localStorage.getItem(key) !== 'null' && localStorage.getItem(key) !== 'undefined';
}


/**
 * 树形结构扁平化
 * @param {Array} items - 要扁平化的树形数组
 * @param {String} filepath - 文件路径
 * @param {String} path - 路由路径
 * @returns {Array} - 扁平化后的数组
 */
export const flattenMenus = (items) => {
    return items.reduce((pre, item) => {
        
        // 创建当前项的扁平对象
        const flatItem = {
            children:item.children,
            path:item.path,
            filepath:item.filepath
        };

        // 删除children属性，避免重复
        delete flatItem.children;
        
        if(!item.children){
            // 将当前项添加到结果数组
            pre.push(flatItem);
        }
        
        // 如果有子项，递归处理
        if (item.children && item.children.length > 0) {
            
            pre.push(...flattenMenus(item.children));
        }

        return pre;
    }, []);
};


export function generateUuid(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		let r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});

}


// 错误类型判断
export const determineErrorType = (error) => {
    // render: '渲染错误',
    // type: '类型错误',
    // reference: '引用错误',
    // syntax: '语法错误', 
    // range: '范围错误',
    // chunk_load: '代码加载错误',
    // async: '异步错误',
    // eval: 'eval错误',
    // uri: 'uri错误',
    // resource: '资源加载错误',
    // network: '网络错误',
    // business: '业务错误',
    // validation: '数据验证错误',
    // auth: '权限认证错误',
    // config: '配置错误',
    // timeout: '超时错误',
    // memory: '内存溢出',
    // unknown: '未知错误'

   // 网络错误
    if(error instanceof TypeError && error.message.includes('network')) {
        return 'network';
    }
    
    // 资源加载错误
    if(error instanceof Error && error.message.includes('loading')) {
        return 'resource'; 
    }
    // 权限错误
    if(error instanceof Error && error.message.includes('permission')) {
        return 'auth';
    }
    // 业务错误
    if(error instanceof Error && error.message.includes('business')) {
        return 'business';
    }
    // 标准错误类型判断
    if (error instanceof TypeError) return 'type';
    if (error instanceof ReferenceError) return 'reference';
    if (error instanceof SyntaxError) return 'syntax';
    if (error instanceof RangeError) return 'range';
    if (error instanceof EvalError) return 'eval';
    if (error instanceof URIError) return 'uri';
    
    // 特殊错误类型
    if (error?.name === 'ChunkLoadError') return 'chunk_load';
    if (error?.code === 'MODULE_NOT_FOUND') return 'module_not_found';
    
    return 'unknown';
};