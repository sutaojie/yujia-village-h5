const PageLayout = resolve => require(["@/pages/layout"], resolve); //首页

const yogaMessage = [
  {
    path: "/yoga-message",
    component: PageLayout,
    redirect: {
      name: "yoga-message list"
    },
    children: [
      {
        path: "list",
        name: "yoga-message list",
        meta: {
          header_name: "yoga-message",
          keepAlive: true
        },
        component: () => import("@/pages/informationpage/yogaMessage.vue")
      }
    ]
  },
  {
    path: "/message-detail/:id",
    name: "message-detail",
    component: () => import("@/pages/informationpage/messageDetail.vue")
  }
];
export default yogaMessage;
