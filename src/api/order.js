import request from '@/utils/request';
// 直接下单
export function postDirectGoodOrder(args = {}) {
  const params = {
    id: '', //	*商品主列表 编号
    size: '', //	*商品尺寸,只能由汉字、字母、数字和下划线及小括号组成
    color: '', //	*商品颜色,只能是汉字
    num: '', //	*添加数量
    addressId: '', //	已存在的地址的表 id
    cashId: '', //	现金券编号
    cashMoney: '', //	现金券使用金额
    couponId: '', //	优惠券编号
    fraction: '', //	使用积分
  }
  return request.post(`/goods/order/mobile`, Object.assign({}, params, args))
}

/* 新增订单 */
export function postGoodOrder(args = {}) {
  let params = {
    id: "", // 购物车列表编号
    lid: "", // 商品副列表 编号
    num: "",
    userName: "",
    userTel: "",
    province: "",
    area: "",
    city: "",
    userAddress: "",
    userMessage: "",
    status: "", // 0不是新增地址 1是新增地址
    addressId: "",
    cashId: "", //现金券编号
    cashMoney: "", //现金券使用金额
    couponId: "", //优惠券编号
    fraction: "", //使用积分
  }
  params = Object.assign({}, params, args)
  return request.post(`/goodOrder`, params)
}

/* 支付宝支付 */
export function postGetAlipayCode(args = {}) {
  let params = {
    out_trade_no: "", // 统一订单编号
    body: "", // 订单商品名称
    total_fee: "", // 总价格
  }
  params = Object.assign({}, params, args)
  return request.post(`/alipay/wappay`, params)
}
