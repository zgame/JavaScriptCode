import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/game_state/list',
    method: 'get',
    params
  })
}

