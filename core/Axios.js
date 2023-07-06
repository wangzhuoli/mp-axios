import InterceptorManager from './InterceptorManager'
import { dispatchRequest } from '../utils'
import defaults from '../default/index'

function Axios(config) {
  // 合并默认配置和实例配置
  this.defaults = { ...defaults, ...config }
  
  // 拦截器
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  }
}

Axios.prototype.request = function(configOrUrl, config){
  if (typeof configOrUrl === 'string') {
    config = config || {}
    config.url = configOrUrl
  } else {
    config = configOrUrl || {}
  }
  // 合并配置信息
  config = { ...this.defaults, ...config }
  const chains = [ dispatchRequest, undefined ]
  let promise = Promise.resolve(config)

  // 遍历请求拦截器，使用unshift添加到chains数组前面
  this.interceptors.request.handles.forEach(handle => {
    chains.unshift(handle.fulfilled, handle.reject)
  })

  // 遍历响应拦截器，使用push追加到chains数组
  this.interceptors.response.handles.forEach(handle => {
    chains.push(handle.fulfilled, handle.reject)
  })

  while(chains.length) {
    promise = promise.then(chains.shift(), chains.shift())
  }

  return promise
}

// 请求方式
const methods = ['OPTIONS', 'GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'TRACE', 'CONNECT']

// 遍历请求方式追加到Axios原型上
methods.forEach(method => {
  Axios.prototype[method.toLowerCase()] = function(config) {
    return this.request({ ...config, method: method.toLowerCase() })
  }
})

export default Axios