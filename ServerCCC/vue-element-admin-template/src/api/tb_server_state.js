import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/server_state/list',
    method: 'get',
    params
  })
}

