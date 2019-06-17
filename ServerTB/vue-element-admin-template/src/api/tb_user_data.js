import request from '@/utils/request'

export function getLogList(params) {
  console.debug('getLogList')
  return request({
    url: '/user_data/log_list',
    method: 'get',
    params
  })
}

export function getUserData(params) {
  console.debug('getUserData')
  return request({
    url: '/user_data/get_user',
    method: 'get',
    params
  })
}

