import request from '@/utils/request';

/* 购物车提交订单 */
export function postUserOrder(args = {}) {
  let params = {
    id: "", // 商品副列表 编号
    num: "",
  }
  params = Object.assign({}, params, args)
  return request.post(`/userCart/submitOrder`, params)
}
/*
  删除购物车
 * @param id 商品主列表 编号
 */
export function deleteUserCartDelCart(args) {
  let params = {
    id: ""
  }
  params = Object.assign({}, params, args)
  return request.post(`/userCart/delCart`, params)
}
