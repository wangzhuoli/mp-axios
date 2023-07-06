### mp-axios
基于小程序wx.request封装类似axios的HTTP网络请求库，实现拦截器功能，支持取消请求功能。

### 安装
```
npm install @wangzhuoli/mp-axios
```

### 使用
config配置信息和[wx.request](https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html)一致

**axios(config)**
```javascript
import { createInstance } from '@wangzhuoli/mp-axios'

const axios = createInstance({ baseUrl: 'http://localhost:3000' })

axios({
  method: 'get',
  url: '/posts',
  data: { 
    page: 1 
  }
})
  .then(res => {
    console.log(res)
  })
  .catch(error => {
    console.log(error)
  })
```
**axios(url[, config])**
```javascript
// 发起一个 GET 请求 (默认请求方式)
axios('/posts')
  .then(res => {
    console.log(res)
  })
  .catch(error => {
    console.log(error)
  })
```
**请求方式别名**

为了方便起见，已经为所有支持的请求方法提供了别名。

axios.request(config)

axios.get(url[, config])

axios.delete(url[, config])

axios.head(url[, config])

axios.options(url[, config])

axios.post(url[, config]])

axios.put(url[, config]])

axios.trace(url[, config]])

axios.connect(url[, config]])

### 拦截器
````javascript
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });
````

### 取消请求
```javascript
import CancelToken from '@wangzhuoli/mp-axios/cancel/CancelToken'

const axios = createInstance({ baseUrl: 'http://localhost:3000' })

let cancel;
const cancelToken = new CancelToken(function(_cancel) {
  cancel = _cancel
})

axios({
  url: '/posts', data: { id: 2 }, method: 'get', cancelToken
})
  .then(result => {
    console.log(result)
  })
  .catch(error => {
    console.log(error)
  })

// 取消请求
cancel()
```
