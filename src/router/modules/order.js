const order = [
  // 微信支付页面
  {
    path: "/pay-for-wx",
    name: "pay-for-wx",
    component: () => import("@/components/payForwx")
  },
  {
    // 课程订单页面
    path: "/pay-order",
    name: "pay-order",
    component: () => import("@/pages/informationpage/payorder")
  },
  {
    path: "/fill-order",
    name: "fill-order",
    component: () => import("@/pages/market/fillOrder.vue")
  }
];
export default order;
