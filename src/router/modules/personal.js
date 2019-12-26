const PageLayout = resolve => require(["@/pages/layout"], resolve); //首页

const personal = [
  // 个人中心
  {
    path: "/personal",
    name: "personal",
    component: PageLayout,
    children: [
      {
        path: "/personal",
        meta: {
          header_name: "personal",
          keepAlive: false
        },
        component: () => import("@/pages/personal")
      }
    ]
  },

  {
    // 个人资料编辑
    path: "/personal-data",
    component: () => import("@/pages/personalCenter/personaldata")
  },
  {
    // 我的订单
    path: "/myorder",
    component: () => import("@/pages/personalCenter/myorder")
  },
  {
    // 现金券
    path: "/cash-voucher",
    component: () => import("@/pages/personalCenter/cashvoucher")
  },
  {
    // 优惠券
    path: "/coupon",
    component: () => import("@/pages/personalCenter/coupon")
  },
  {
    // 消息中心
    path: "/message-center",
    component: () => import("@/pages/personalCenter/messagecenter")
  },
  {
    // 消息中心详情
    path: "/message-details",
    component: () => import("@/pages/personalCenter/messagedetails")
  },
  {
    // 购物袋
    path: "/shopping-bag",
    component: () => import("@/pages/personalCenter/shoppingbag")
  },
  {
    // 地址管理
    path: "/address",
    component: () => import("@/pages/personalCenter/address")
  },
  {
    // 地址编辑
    path: "/address-compile",
    name: "address-compile",
    component: () => import("@/pages/personalCenter/addresscompile")
  },
  {
    // 我的收藏
    path: "/collect",
    component: () => import("@/pages/personalCenter/collect")
  },
  {
    // 点赞的老师
    path: "/thumb-teacher",
    component: () => import("@/pages/personalCenter/thumbteacher")
  },
  {
    // 购买的课程
    path: "/buy-course",
    component: () => import("@/pages/personalCenter/buycourse")
  },
  {
    // 认证中心
    path: "/authentication-center",
    component: () => import("@/pages/personalCenter/authenticationcenter")
  },
  {
    // 认证表单
    path: "authentication-form",
    name: "authentication-form",
    component: () => import("@/pages/personalCenter/authenticationForm")
  },
  {
    // 更改手机
    path: "/change-phone",
    component: () => import("@/pages/personalCenter/changephone")
  },
  {
    // 设置联系方式
    path: "/contact-way",
    component: () => import("@/pages/personalCenter/contactWay")
  },
  {
    // 邀请
    path: "/invitation",
    component: () => import("@/pages/personalCenter/invitation")
  },
  {
    // 积分中心
    path: "/integral",
    component: () => import("@/pages/personalCenter/integralcenter")
  },
  {
    // 积分规则
    path: "/integral-rules",
    component: () => import("@/pages/personalCenter/integralrules")
  }
];
export default personal;
