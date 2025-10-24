import { message } from "antd";

let isRefreshing = false // 是否正在刷新token
const queueTask = [] // 刷新token期间的请求队列


export const handleChangeRequestHeader = (config) => {
//   config["authorization"] = "xxx";
  return config;
};

export const handleConfigureAuth = (config) => {
    const accessToken = localStorage.getItem('access_token');
    
    if(accessToken){
        config.headers["authorization"] = "Bearer " +  accessToken;
    }
  
    return config;
};


// 清除身份信息
const clearAuth = (error) => {
    console.log('身份过期，请重新登录')
    localStorage.clear();
    return Promise.reject(error);
}

// 处理刷新token
export const handleTokenRefresh = async (axiosInstance,err) => {
    let { config } = err;

    // 判断是否login失败且状态码401
    if (config.url?.includes('login')) {
        message.error(err?.data?.message)
        return Promise.reject(err);
    }
    
    // 判断是否有refresh_token
    const refreshToken = localStorage.getItem('refresh_token');

    if(!refreshToken){
        return clearAuth(err)
    }

    

    // 判断是否refresh失败且状态码401，再次进入错误拦截器
    if (config.url?.includes('refresh')) {
        return clearAuth(err);
    }

    // 判断是否刷新中
    if(!isRefreshing) {
        isRefreshing = true;
        const result = await axiosInstance.patch('/api/auth/refresh',{refreshToken});
        if(result?.data){
            // 重新设置token
            localStorage.setItem('access_token', result.data.accessToken);
            localStorage.setItem('refresh_token', result.data.refreshToken);

            queueTask.forEach(({config, resolve}) => {
                resolve(axiosInstance(config))
            })
            queueTask.length = 0;
            // message.warning('新的token获取成功')
            return axiosInstance(config);
        }

    }

    return new Promise((resolve) => {
        queueTask.push({
            config,
            resolve
        });
    });

}


export const handleNetworkError = (errStatus) => {
  const networkErrMap = {
    "400": "错误的请求", // token 失效
    "401": "未授权，请重新登录",
    "403": "拒绝访问",
    "404": "请求错误，未找到该资源",
    "405": "请求方法未允许",
    "408": "请求超时",
    "500": "服务器端出错",
    "501": "网络未实现",
    "502": "网络错误",
    "503": "服务不可用",
    "504": "网络超时",
    "505": "http版本不支持该请求",
  };
  if (errStatus) {
    message.error(networkErrMap[errStatus] ?? `其他连接错误 --${errStatus}`);
    return;
  }

  message.error("无法连接到服务器！");
};

export const handleAuthError = (errno) => {
  const authErrMap = {
    "10031": "登录失效，需要重新登录", // token 失效
    "10032": "您太久没登录，请重新登录~", // token 过期
    "10033": "账户未绑定角色，请联系管理员绑定角色",
    "10034": "该用户未注册，请联系管理员注册用户",
    "10035": "code 无法获取对应第三方平台用户",
    "10036": "该账户未关联员工，请联系管理员做关联",
    "10037": "账号已无效",
    "10038": "账号未找到",
  };

  if (authErrMap.hasOwnProperty(errno)) {
    message.error(authErrMap[errno]);
    // 授权错误，登出账户
    // logout();
    return false;
  }

  return true;
};

export const handleGeneralError = (errno, errmsg) => {
  if (errno !== "0") {
    message.error(errmsg);
    return false;
  }

  return true;
};