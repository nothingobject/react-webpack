import axios from 'axios'
import { message } from 'antd'

import {
    handleChangeRequestHeader,
    handleConfigureAuth,
    handleAuthError,
    handleGeneralError,
    handleNetworkError
} from './tools'

// 配置基础
axios.create({
    timeout: 1000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
    },
})


// 请求拦截
axios.interceptors.request.use((config) => {
    config = handleChangeRequestHeader(config)
    config = handleConfigureAuth(config)
    return config
})


// 响应拦截
axios.interceptors.response.use(
    (response) => {
        if (response.status !== 200) return Promise.reject(response.data)
        // handleAuthError(response.data.errno)
        // handleGeneralError(response.data.errno, response.data.errmsg)
        return response
    },
    async (err) => {
        let { data , config} = err.response;
        if(data.status === 401 ){
            handleTokenRefresh()
            return
        }
        handleNetworkError(err.response.status)
        Promise.reject(err.response)
    }
)

// 封装Get
export const Get = (url, params = {}, clearFn) =>
    new Promise((resolve) => {
        axios
            .get(url, { params })
            .then((result) => {
                let res
                if (clearFn !== undefined) {
                    res = clearFn(result.data)
                } else {
                    res = result.data
                }
                resolve([null, res])
            })
            .catch((err) => {
                resolve([err, undefined])
            })
    })

// 封装Post
export const Post = (url, data, params = {}) => {
    return new Promise((resolve) => {
        axios
            .post(url, data, { params })
            .then((result) => {
                resolve([null, result.data])
            })
            .catch((err) => {
                resolve([err, undefined])
            })
    })
}


/**
 * 下载文件
 * @param response
 * @returns
 */
export const downloadFile = (response) => {
    console.log("response.data.type:", response.data.type);
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = function () {
            try {
                console.log("result:", this.result);
                const jsonData = JSON.parse(this.result); // 成功 说明是普通对象数据
                if (jsonData?.code !== 200) {
                    message.error(jsonData?.message ?? "请求失败");
                    reject(jsonData);
                }
            } catch (err) {
                // 解析成对象失败，说明是正常的文件流
                const blob = new Blob([response.data]);
                // 本地保存文件
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                const filename = response?.headers?.["content-disposition"]
                    ?.split("filename*=")?.[1]
                    ?.substr(7);
                link.setAttribute("download", decodeURI(filename));
                document.body.appendChild(link);
                link.click();
                resolve(response.data);
            }
        };
        fileReader.readAsText(response.data);
    });
};
