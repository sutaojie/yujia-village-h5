import request from '@/utils/request';

/* 商品详细分类-筛选条件 */
export function getGoodsFilter() {
  return request('/goods')
}
/* 商品推荐页面数据 */
export function getGoodRecomment() {
  return request('/goods/goodRecomment')
}
/* 商品按条件查询  */
export function postShowGoodList(args = {}) {
  let params = {
    type: "",
    sort: "",
    color: "",
    season: "",
    price: "",
    person: "",
    material: ""
  }
  params = Object.assign({}, params, args)
  return request.post('/goods/showGoodListMobile', params)
}
/* 查询指定商品,未登录状态 */
export function getGoodsById(id) {
  return request(`/goods/${id}`)
}
/* 查询指定商品，登录状态 */
export function getLoginGoodsById(id) {
  return request(`/goods/by/login/${id}`)
}
/* 添加购物车 */
export function postUserCart(args = {}) {
  let params = {
    id: "",
    num: "",
    size: "",
    color: ""
  }
  params = Object.assign({}, params, args)
  return request.post(`/userCart`, params)
}