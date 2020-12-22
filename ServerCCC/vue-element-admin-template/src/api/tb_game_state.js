import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/game_state/list',
    method: 'get',
    params
  })
}

export function getRecordList(params) {
  return request({
    url: '/game_state/record',
    method: 'get',
    params
  })
}

export function getPointsList(params) {
  return request({
    url: '/game_state/points',
    method: 'get',
    params
  })
}
export function getJackpotList(params) {
  return request({
    url: '/game_state/jackpot',
    method: 'get',
    params
  })
}

export function getTigerList(params) {
  return request({
    url: '/game_state/tiger',
    method: 'get',
    params
  })
}

export function getCardList(params) {
  return request({
    url: '/game_state/card',
    method: 'get',
    params
  })
}

export function getBloodList(params) {
  return request({
    url: '/game_state/blood',
    method: 'get',
    params
  })
}

export function getWheelList(params) {
  return request({
    url: '/game_state/wheel',
    method: 'get',
    params
  })
}

export function getMailList(params) {
  return request({
    url: '/game_state/mail',
    method: 'get',
    params
  })
}

export function getSignInList(params) {
  return request({
    url: '/game_state/sign_in',
    method: 'get',
    params
  })
}
export function getClockGoldList(params) {
  return request({
    url: '/game_state/clock_gold',
    method: 'get',
    params
  })
}
export function getVipDoleList(params) {
  return request({
    url: '/game_state/vip_dole',
    method: 'get',
    params
  })
}
export function getLuckyWheelList(params) {
  return request({
    url: '/game_state/lucky_wheel',
    method: 'get',
    params
  })
}

