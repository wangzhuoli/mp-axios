import CancelToken from './cancel/CancelToken'
import Axios from './core/Axios'

export function createInstance(config) {
  // 创建实例
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context)

  // 遍历Axios原型上的所有方法，挂载到实例
  Object.keys(Axios.prototype).forEach((key) => {
    instance[key] = Axios.prototype[key]
  })

  // 遍历Axios所有属性，挂载到实例
  Object.keys(context).forEach((key) => {
    instance[key] = context[key]
  })

  return instance
}

module.exports = {
  CancelToken,
  createInstance
}


