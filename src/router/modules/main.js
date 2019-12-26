const PageLayout = resolve => require(["@/pages/layout"], resolve); //首页

const main = [
  {
    path: "/",
    redirect: "/main"
  },
  // 首页
  {
    path: '/home',
    component: PageLayout,
    redirect: '/main'
  },
  {
    path: "/main",
    name: "Main",
    component: PageLayout,
    children: [
      {
        path: "/main",
        meta: {
          header_name: "PageLayout",
          keepAlive: false
        },
        component: () => import("@/pages/main")
      }
    ]
  }
];
export default main;
