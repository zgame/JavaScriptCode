import request from '@/utils/request'

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

export function getInfo(token, username) {
  console.debug('api getInfo')
  return request({
    url: '/user/info',
    method: 'get',
    params: {
      token,
      username
    }
  })
}

export function logout() {
  console.debug('api logout')
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
