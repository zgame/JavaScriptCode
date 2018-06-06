import request from '@/utils/request'

export function actionGetUserList(query) {
  return request({
    url: '/admin',
    method: 'get',
    params: query
  })
}

export function actionAddUser(username, pwd, dashboard, statis, edit) {
  return request({
    url: '/admin/add',
    method: 'get',
    params: { username, pwd, dashboard, statis, edit }
  })
}

export function actionEditUser(id, username, pwd, dashboard, statis, edit) {
  return request({
    url: '/admin/change',
    method: 'get',
    params: { id, username, pwd, dashboard, statis, edit }
  })
}

export function actionDelUser(id) {
  return request({
    url: '/admin/del',
    method: 'get',
    params: { id }
  })
}
