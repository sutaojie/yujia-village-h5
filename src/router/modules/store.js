const PageLayout = resolve => require(["@/pages/layout"], resolve); //首页
const Layout = resolve => require(["@/components/layout"], resolve); //

const store = [
  // 商场
  {
    path: "/store",
    name: "store",
    component: PageLayout,
    redirect: {
      name: "category"
    },
    children: [
      {
        path: "category",
        name: "category",
        meta: {
          header_name: "store",
          keepAlive: true
        },
        component: () => import("@/pages/market/category")
      }
    ]
  },
  // 商品搜索
  {
    path: "/search-goods",
    name: "search-goods",
    component: () => import("@/pages/market/search")
  },

  // 订单
  {
    path: "/order",
    name: "order",
    component: Layout,
    redirect: {
      name: "success"
    },
    children: [
      {
        path: "success",
        name: "success",
        meta: {
          header_name: "order",
          keepAlive: false
        },
        component: () => import("@/pages/market/order/success")
      },
      {
        // 订单详情
        path: "detail/:orderId/:oid",
        name: "detail",
        component: () => import("@/pages/market/order/orderdetail")
      },
      {
        // 物流
        path: "wuliu/:oid",
        name: "wuliu",
        component: () => import("@/pages/market/order/wuliu")
      }
    ]
  }
];
export default store;
