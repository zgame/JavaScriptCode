import request from '@/utils/request'

// 总统计表
export function actionGetAllList(query) {
  return request({
    url: '/all_statistic/list',
    method: 'get',
    params: query
  })
}
