
// 取消请求
export default function CancelToken(execute) {
  let cancel;
  this.promise = new Promise(resolve => {
    cancel = resolve
  })
  execute(() => {
    cancel()
  })
}