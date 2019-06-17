import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/server_list/list',
    method: 'get',
    params
  })
}

// 增加
export function actionAddList(name, server) {
  return request({
    url: '/server_list/add',
    method: 'get',
    params: { name, server }
  })
}
// 编辑
export function actionEditList(id, name, server, state) {
  return request({
    url: '/server_list/change',
    method: 'get',
    params: { id, name, server, state }
  })
}
// 删除
export function actionDelList(id) {
  return request({
    url: '/server_list/del',
    method: 'get',
    params: { id }
  })
}
