import request from '@/utils/request'

// 管理权限 -- 获取用户列表
export function actionGetUserList(query) {
  return request({
    url: '/admin',
    method: 'get',
    params: query
  })
}
// 管理权限 -- 增加用户
export function actionAddUser(username, pwd, dashboard, statis, edit) {
  return request({
    url: '/admin/add',
    method: 'get',
    params: { username, pwd, dashboard, statis, edit }
  })
}
// 管理权限 -- 编辑用户信息
export function actionEditUser(id, username, pwd, dashboard, statis, edit) {
  return request({
    url: '/admin/change',
    method: 'get',
    params: { id, username, pwd, dashboard, statis, edit }
  })
}
// 管理权限 -- 删除用户
export function actionDelUser(id) {
  return request({
    url: '/admin/del',
    method: 'get',
    params: { id }
  })
}
