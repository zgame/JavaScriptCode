import request from '@/utils/request'

// 登录 -- 登录
export function login(username, password) {
  console.debug('api login')
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
// 登录 -- 获取信息
export function getInfo(token) {
  console.debug('api getInfo')
  return request({
    url: '/user/info',
    method: 'get',
    params: {
      token
    }
  })
}
// 登录 -- 登出
export function logout() {
  console.debug('api logout')
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
