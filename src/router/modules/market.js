const Layout = resolve => require(["@/components/layout"], resolve); //

const market = [
  // 商品
  {
    path: "/goods",
    name: "goods",
    component: Layout,
    redirect: {
      name: "detail"
    },
    children: [
      {
        path: "detail/:goods_id",
        name: "detail",
        meta: {
          header_name: "goods",
          keepAlive: true
        },
        component: () => import("@/pages/market/goods/detail")
      }
    ]
  }
];
export default market;
