import * as API from './'

export default {
  // 获取登录
  apiLogin: params => {
    return API.POST('boss/v1.0/users/login', params)
  },
  apiGetVerCode:params => {
    return API.GET('boss/v1.0/users/login/verCode', params)
  }
}