import axios from 'axios'
import { MessageBox } from 'element-ui'
import { getToken } from './auth'
import qs from 'qs'

// 创建axios实例
const JavaService = axios.create({
    validateStatus(status) {
        return status >= 200 && status < 504 // 设置默认的合法的状态
    },
    baseURL: "http://47.101.149.84:5020", // api 的 base_url
    timeout: 150000, // 请求超时时间,
})

JavaService.defaults.retry = 3 // 请求重试次数
JavaService.defaults.retryDelay = 1000 // 请求重试时间间隔
JavaService.defaults.shouldRetry = true // 是否重试

// request拦截器
JavaService.interceptors.request.use(
    config => {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        config.headers['Accept-Language'] = 'zh-CN'
        if (getToken()) {
            config.headers['token'] = getToken()  // 可以全局设置接口请求header中带token
        }
        if (config.method === 'post') {
            if (!config.data) { // 没有参数时，config.data为null，需要转下类型
                config.data = {}
            }
            config.data = qs.stringify(config.data) // qs序列化参数
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
)

// response 拦截器
JavaService.interceptors.response.use(
    response => {
        if (response.data.message === '依赖服务访问异常') {
            response.data.message = '网络访问异常，请重试～'
        }
        if (response.status !== 200) {
            return Promise.reject(response.data)
        } else {
            return response.data
        }
    },
    err => {
        var config = err.config
        MessageBox.confirm('程序开小差啦，请点击重试按钮更新信息~', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            // 重试次数自增
            config.__retryCount += 1
            // 延时处理
            var backoff = new Promise(function(resolve) {
                resolve()
            })
            // 重新发起axios请求
            return backoff.then(function() {
                return JavaService(config)
            })
        }).catch(() => {
            return Promise.reject(err)
        })
    }
)

export default JavaService

