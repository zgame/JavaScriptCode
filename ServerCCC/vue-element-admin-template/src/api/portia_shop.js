import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/portia_shop/list',
    method: 'get',
    params
  })
}

// 增加
export function actionAddList(id, sellingway, recommend, recommendactivity, price, discountprice, starttime, endtime) {
  return request({
    url: '/portia_shop/add',
    method: 'get',
    params: { id, sellingway, recommend, recommendactivity, price, discountprice, starttime, endtime }
  })
}

// 编辑
export function actionEditList(id, sellingway, recommend, recommendactivity, price, discountprice, starttime, endtime) {
  return request({
    url: '/portia_shop/change',
    method: 'get',
    params: { id, sellingway, recommend, recommendactivity, price, discountprice, starttime, endtime }
  })
}

// 删除
export function actionDelList(id) {
  return request({
    url: '/portia_shop/del',
    method: 'get',
    params: { id }
  })
}
