import Vue from 'vue'
import Router from 'vue-router'
import advertisement from './modules/advertisement.js'
import conference from './modules/conference.js'
import homepage from './modules/homepage.js'
import login from './modules/login.js'
import main from './modules/main.js'
import order from './modules/order.js'
import personal from './modules/personal.js'
import share from './modules/share.js'
import store from './modules/store.js'
import teacherClub from './modules/teacher-club.js'
import yogaMessage from './modules/yoga-message.js'
// eslint-disable-next-line no-undef

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  mode: 'hash',
  routes: [
    ...advertisement,
    ...conference,
    ...homepage,
    ...login,
    ...main,
    ...order,
    ...personal,
    ...share,
    ...store,
    ...teacherClub,
    ...yogaMessage
  ]
})

router.beforeEach((to, from, next) => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
  window.scrollTo(0, 0)
  next()
})

export default router;