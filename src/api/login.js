import * as API from './'

export default {
  // 获取登录
  apiLogin: params => {
    return API.POST('boss/v1.0/users/login', params)
  }
}