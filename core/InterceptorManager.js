class InterceptorManager {
  constructor() {
    this.handles = []
  }
  use(fulfilled, reject) {
    this.handles.push({ fulfilled, reject })
  }
}

export default InterceptorManager