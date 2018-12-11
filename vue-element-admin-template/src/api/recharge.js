import request from '@/utils/request'

// 收入 -- 获取收入明细表
export function actionGetRechargeList(query) {
  return request({
    url: '/recharge/list',
    method: 'get',
    params: query
  })
}

// // 收入 -- 获取收入明细表
// export function actionGetRechargeCollectList(query) {
//   return request({
//     url: '/recharge/list',
//     method: 'get',
//     params: query
//   })
// }
