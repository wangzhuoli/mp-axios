// 发送的适配器请求
export function adapter(config) {
  const { baseUrl, cancelToken, url, ...rest } = config
  let request;
  if (typeof uni !== 'undefined' && typeof uni.request !== 'undefined') {
    request = uni.request
  } else if (typeof wx !== 'undefined' && typeof wx.request !== 'undefined') {
    request = wx.request
  }
  
  return new Promise((resolve, reject) => {
    const requestTask = request({
      ...rest,
      url: baseUrl ? baseUrl + url : url,
      success(response) {
        if (response.statusCode >= 200 && response.statusCode < 300) {
          // 请求成功， 状态码2xx
          resolve({ ...config, ...response})
        } else {
          // 请求成功，非2xx的htt状态码
          reject({ ...config, ...response})
        }
      },
      fail(error) {
        // 请求发送失败，断网|取消请求|请求超时了
        reject({ ...config, ...error})
      }
    })
    if (cancelToken) {
      cancelToken.promise.then(function() {
        requestTask.abort()
      })
    }
  })
}

// 使用配置的适配器将请求分派到服务器。
export function dispatchRequest(config) {
  return adapter(config).then((response) => {
    return response
  }).catch((error) => {
    return Promise.reject(error)
  })
}
