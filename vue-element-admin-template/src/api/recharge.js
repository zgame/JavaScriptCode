import request from '@/utils/request'

export function actionGetRechargeList(query) {
  return request({
    url: '/recharge/list',
    method: 'get',
    params: query
  })
}
