import request from '@/utils/request'

// ------------------------------------------------------
// 游戏公告
// ------------------------------------------------------
export function getNotice(params) {
  return request({
    url: '/game_manager/get_notice',
    method: 'get',
    params
  })
}
export function setNotice(params) {
  return request({
    url: '/game_manager/set_notice',
    method: 'get',
    params
  })
}
// ------------------------------------------------------
// 游戏跑马灯
// ------------------------------------------------------
export function getTip(params) {
  return request({
    url: '/game_manager/get_tip',
    method: 'get',
    params
  })
}
export function setTip(params) {
  return request({
    url: '/game_manager/set_tip',
    method: 'get',
    params
  })
}
export function addTip(params) {
  return request({
    url: '/game_manager/add_tip',
    method: 'get',
    params
  })
}
export function delTip(params) {
  return request({
    url: '/game_manager/del_tip',
    method: 'get',
    params
  })
}
// ------------------------------------------------------
// 封号名单
// ------------------------------------------------------
export function getConfineList(params) {
  return request({
    url: '/game_manager/get_confine_list',
    method: 'get',
    params
  })
}
export function getConfine(params) {
  return request({
    url: '/game_manager/get_confine',
    method: 'get',
    params
  })
}

export function setConfine(params) {
  return request({
    url: '/game_manager/set_confine',
    method: 'get',
    params
  })
}

export function delConfine(params) {
  return request({
    url: '/game_manager/del_confine',
    method: 'get',
    params
  })
}

// ------------------------------------------------------
// 邮件
// ------------------------------------------------------
export function getMail(params) {
  return request({
    url: '/game_manager/get_mail',
    method: 'get',
    params
  })
}
export function setMail(params) {
  return request({
    url: '/game_manager/set_mail',
    method: 'get',
    params
  })
}
export function addMail(params) {
  return request({
    url: '/game_manager/add_mail',
    method: 'get',
    params
  })
}
export function delMail(params) {
  return request({
    url: '/game_manager/del_mail',
    method: 'get',
    params
  })
}

// ------------------------------------------------------
// 白名单
// ------------------------------------------------------
export function getIp(params) {
  return request({
    url: '/game_manager/get_ip',
    method: 'get',
    params
  })
}
// export function setIp(params) {
//   return request({
//     url: '/game_manager/set_ip',
//     method: 'get',
//     params
//   })
// }
export function addIp(params) {
  return request({
    url: '/game_manager/add_ip',
    method: 'get',
    params
  })
}
export function delIp(params) {
  return request({
    url: '/game_manager/del_ip',
    method: 'get',
    params
  })
}
