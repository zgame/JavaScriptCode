import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/portia_control/list',
    method: 'get',
    params
  })
}

// 增加
export function actionAddList(id, name, value) {
  return request({
    url: '/portia_control/add',
    method: 'get',
    params: { id, name, value }
  })
}

// 编辑
export function actionEditList(id, name, value) {
  return request({
    url: '/portia_control/change',
    method: 'get',
    params: { id, name, value }
  })
}

// 删除
export function actionDelList(id) {
  return request({
    url: '/portia_control/del',
    method: 'get',
    params: { id }
  })
}
