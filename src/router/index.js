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
      path: '/pay-for-wx',
      name: 'pay-for-wx',
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
        path: '/yoga-knowledge',
        component: () => import('@/pages/homepage/yogaknowledge')
      },
      {
        path: '/yaga-information',
        name: 'yaga-information',
        component: () => import('@/pages/homepage/yogaInForMation'),
      },
      {
        path: '/about-us',
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
      path: '/personal-data',
      component: () => import('@/pages/personalCenter/personaldata')
    },
    {
      // 我的订单
      path: '/myorder',
      component: () => import('@/pages/personalCenter/myorder')
    },
    {
      // 现金券
      path: '/cash-voucher',
      component: () => import('@/pages/personalCenter/cashvoucher')
    },
    {
      // 优惠券
      path: '/coupon',
      component: () => import('@/pages/personalCenter/coupon')
    },
    {
      // 消息中心
      path: '/message-center',
      component: () => import('@/pages/personalCenter/messagecenter')
    },
    {
      // 消息中心详情
      path: '/message-details',
      component: () => import('@/pages/personalCenter/messagedetails')
    },
    {
      // 购物袋
      path: '/shopping-bag',
      component: () => import('@/pages/personalCenter/shoppingbag')
    },
    {
      // 地址管理
      path: '/address',
      component: () => import('@/pages/personalCenter/address')
    },
    {
      // 地址编辑
      path: '/address-compile',
      name: 'address-compile',
      component: () => import('@/pages/personalCenter/addresscompile')
    },
    {
      // 我的收藏
      path: '/collect',
      component: () => import('@/pages/personalCenter/collect')
    },
    {
      // 点赞的老师
      path: '/thumb-teacher',
      component: () => import('@/pages/personalCenter/thumbteacher')
    },
    {
      // 购买的课程
      path: '/buy-course',
      component: () => import('@/pages/personalCenter/buycourse')
    },
    {
      // 认证中心
      path: '/authentication-center',
      component: () => import('@/pages/personalCenter/authenticationcenter')
    },
    {
      // 认证表单
      path: 'authentication-form',
      name: 'authentication-form',
      component: () => import('@/pages/personalCenter/authenticationForm')
    },
    {
      // 更改手机
      path: '/change-phone',
      component: () => import('@/pages/personalCenter/changephone')
    },
    {
      // 设置联系方式
      path: '/contact-way',
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
      path: '/integral-rules',
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
      path: '/search-goods',
      name: 'search-goods',
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
      path: '/teacher-club',
      name: 'teacher-club',
      component: Home,
      redirect: {
        name: 'teacher-club list'
      },
      children: [{
        path: 'list',
        name: 'teacher-club list',
        meta: {
          header_name: 'teacher-club',
          keepAlive: true
        },
        component: () => import('@/pages/teacherClub/teacherClub')
      }]
    },
    {
      path: '/teacher-club/teacher-details',
      name: 'teacher-details',
      component: () => import('@/pages/teacherClub/teacherDetails'),
    },
    {
      path: '/teacher-club/club-house-details',
      name: 'club-house-details',
      component: () => import('@/pages/teacherClub/clubhouseDetails')
    },
    {
      path: '/information-detail/:id',
      name: 'information-detail',
      component: () => import('@/pages/homepage/inForMationDetail.vue')
    },
    {
      path: "/knowledge-detail/:id",
      name: "knowledge-detail",
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
        component: () => import('@/pages/informationPage/yogaMessage.vue')
      }]
    },
    {
      path: '/message-detail/:id',
      name: 'message-detail',
      component: () => import('@/pages/informationPage/messageDetail.vue')
    },
    {
      // 课程订单页面
      path: '/pay-order',
      name: 'pay-order',
      component: () => import('@/pages/informationPage/payorder')
    },
    {
      path: '/fill-order',
      name: 'fill-order',
      component: () => import('@/pages/market/fillOrder.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
  window.scrollTo(0, 0)
  next()
})

export default router;