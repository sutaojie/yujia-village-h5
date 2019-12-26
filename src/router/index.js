import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout.vue'
// eslint-disable-next-line no-undef
const Home = resolve => require(['@/pages/home'], resolve) //首页

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  mode: 'hash',
  // scrollBehavior(to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     if (from.meta.keepAlive) {
  //       from.meta.savedPosition = document.body.scrollTop;
  //     }
  //     return {
  //       x: 0,
  //       y: to.meta.savedPosition || 0
  //     }
  //   }
  // },
  routes: [{
      path: '/',
      redirect: '/main'
    },
    {
      path: '/main',
      name: 'Main',
      component: Home,
      children: [{
        path: '/main',
        meta: {
          header_name: 'home',
          keepAlive: false
        },
        component: () => import('@/pages/main')
      }]
    },
    // 微信支付页面
    {
      path: '/payforwx',
      name: 'payforwx',
      component: () => import('@/components/payForwx'),
    },
    // 自定义广告页
    {
      path: '/advertisement',
      name: 'advertisement',
      component: () => import('@/components/advertisement')
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: Home,
      children: [{
        path: '/yogaknowledge',
        component: () => import('@/pages/homepage/yogaknowledge')
      },
      {
        path: '/yagainformation',
        name: 'yagainformation',
        component: () => import('@/pages/homepage/yogaInForMation'),
      },
      {
        path: '/aboutUs',
        component: () => import('@/pages/homepage/aboutUs')
      },
      {
        path: '/explain',
        component: () => import('@/pages/homepage/explain')
      }]
    },
    // 首页
    {
      path: '/home',
      component: Home,
      redirect: '/main'
    },
    // 个人中心
    {
      path: '/personal',
      name: 'personal',
      component: Home,
      children: [{
        path: '/personal',
        meta: {
          header_name: 'personal',
          keepAlive: false
        },
        component: () => import('@/pages/personal')
      }]
    },
    {
      // 个人资料编辑
      path: '/personaldata',
      component: () => import('@/pages/personalCenter/personaldata')
    },
    {
      // 我的订单
      path: '/myorder',
      component: () => import('@/pages/personalCenter/myorder')
    },
    {
      // 现金券
      path: '/cashvoucher',
      component: () => import('@/pages/personalCenter/cashvoucher')
    },
    {
      // 优惠券
      path: '/coupon',
      component: () => import('@/pages/personalCenter/coupon')
    },
    {
      // 消息中心
      path: '/messagecenter',
      component: () => import('@/pages/personalCenter/messagecenter')
    },
    {
      // 消息中心详情
      path: '/messagedetails',
      component: () => import('@/pages/personalCenter/messagedetails')
    },
    {
      // 购物袋
      path: '/shoppingbag',
      component: () => import('@/pages/personalCenter/shoppingbag')
    },
    {
      // 地址管理
      path: '/address',
      component: () => import('@/pages/personalCenter/address')
    },
    {
      // 地址编辑
      path: '/addresscompile',
      name: 'addresscompile',
      component: () => import('@/pages/personalCenter/addresscompile')
    },
    {
      // 我的收藏
      path: '/collect',
      component: () => import('@/pages/personalCenter/collect')
    },
    {
      // 点赞的老师
      path: '/thumbteacher',
      component: () => import('@/pages/personalCenter/thumbteacher')
    },
    {
      // 购买的课程
      path: '/buycourse',
      component: () => import('@/pages/personalCenter/buycourse')
    },
    {
      // 认证中心
      path: '/authenticationcenter',
      component: () => import('@/pages/personalCenter/authenticationcenter')
    },
    {
      // 认证表单
      path: 'authenticationForm',
      name: 'authenticationForm',
      component: () => import('@/pages/personalCenter/authenticationForm')
    },
    {
      // 更改手机
      path: '/changephone',
      component: () => import('@/pages/personalCenter/changephone')
    },
    {
      // 设置联系方式
      path: '/contactway',
      component: () => import('@/pages/personalCenter/contactWay')
    },
    {
      // 邀请
      path: '/invitation',
      component: () => import('@/pages/personalCenter/invitation')
    },
    {
      // 积分中心
      path: '/integral',
      component: () => import('@/pages/personalCenter/integralcenter')
    },
    {
      // 积分规则
      path: '/integralrules',
      component: () => import('@/pages/personalCenter/integralrules')
    },
    // 登录
    {
      path: '/index',
      name: 'index',
      component: () => import('@/pages/index')
    },
    {
      path: '/share',
      name: 'share',
      component: () => import('@/pages/share')
    },
    // 商场
    {
      path: '/store',
      name: 'store',
      component: Home,
      redirect: {
        name: 'category'
      },
      children: [{
        path: 'category',
        name: 'category',
        meta: {
          header_name: 'store',
          keepAlive: true
        },
        component: () => import('@/pages/market/category')
      }]
    },
    // 商品搜索
    {
      path: '/searchgoods',
      name: 'searchgoods',
      component: () => import('@/pages/market/search')    
    },
    // 商品
    {
      path: '/goods',
      name: 'goods',
      component: Layout,
      redirect: {
        name: 'detail'
      },
      children: [{
        path: 'detail/:goods_id',
        name: 'detail',
        meta: {
          header_name: 'goods',
          keepAlive: true
        },
        component: () => import('@/pages/market/goods/detail')
      }]
    },
    // 订单
    {
      path: '/order',
      name: 'order',
      component: Layout,
      redirect: {
        name: 'success'
      },
      children: [{
        path: 'success',
        name: 'success',
        meta: {
          header_name: 'order',
          keepAlive: false
        },
        component: () => import('@/pages/market/order/success')
      },
      { // 订单详情
        path: 'detail/:orderId/:oid',
        name: 'detail',
        component: () => import('@/pages/market/order/orderdetail')
      },
      { // 物流
        path: 'wuliu/:oid',
        name: 'wuliu',
        component: () => import('@/pages/market/order/wuliu')
      }]
    },
    {
      path: '/shareation',
      name: 'shareation',
      component: () => import('@/pages/shareation')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login')
    },
    {
      //名师机构
      path: '/teacherClub',
      name: 'teacherClub',
      component: Home,
      redirect: {
        name: 'teacherClub list'
      },
      children: [{
        path: 'list',
        name: 'teacherClub list',
        meta: {
          header_name: 'teacherClub',
          keepAlive: true
        },
        component: () => import('@/pages/teacherClub/teacherClub')
      }]
    },
    {
      path: '/teacherClub/teacherDetails',
      name: 'teacherDetails',
      component: () => import('@/pages/teacherClub/teacherDetails'),
    },
    {
      path: '/teacherClub/clubhouseDetails',
      name: 'clubhouseDetails',
      component: () => import('@/pages/teacherClub/clubhouseDetails')
    },
    {
      path: '/informationdetail/:id',
      name: 'informationdetail',
      component: () => import('@/pages/homepage/inForMationDetail.vue')
    },
    {
      path: "/knowledgedetail/:id",
      name: "knowledgedetail",
      component: () => import('@/pages/homepage/knowledgeDetail')
    },
    {
      path: '/yogamessage',
      component: Home,
      redirect: {
        name: 'yogamessage list'
      },
      children: [{
        path: 'list',
        name: 'yogamessage list',
        meta: {
          header_name: 'yogamessage',
          keepAlive: true 
        },
        component: () => import('@/pages/informationpage/yogaMessage.vue')
      }]
    },
    {
      path: '/messagedetail/:id',
      name: 'messagedetail',
      component: () => import('@/pages/informationpage/messageDetail.vue')
    },
    {
      // 课程订单页面
      path: '/payorder',
      name: 'payorder',
      component: () => import('@/pages/informationpage/payorder')
    },
    {
      path: '/fillorder',
      name: 'fillorder',
      component: () => import('@/pages/market/fillOrder.vue')
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('@/pages/demo/index.vue')
    },
  ]
})

// router.beforeEach((to, from, next) => {
//   // 进入是详情，且从首页过来的，才缓存
//   console.log(from.path.match('list'));
//   if (from.path.match('list') || (to.path.match('detail') && from.path.match('store/category'))||(to.path.match('teacherDetails') && from.path.match('teacherClub/list'))){
//     from.meta.keepAlive = true
//   } else {
//     from.meta.keepAlive = false
//   }
//   next()
// })
router.beforeEach((to, from, next) => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
  window.scrollTo(0, 0)
  next()
})

export default router;