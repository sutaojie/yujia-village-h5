<template>
  <div id="app">
    <div class="loding_wrap" v-show="loading" >
      <van-loading color="#638C0B" ref="appLoading"  />
    </div>
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive&&pageRelode"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive&&pageRelode"></router-view> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import { Loading } from "vant";
Vue.use(Loading);
export default {
  name: "app",
  provide () {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      callShow: false,
      pageRelode: true
    }
  },
  computed: {
    loading() {
      setTimeout(() => {
        this.$store.commit("loadStatus", false);
      }, 3000);
      return this.$store.state.loading
    }
  },
  methods: {
    reload() { // 实现无痕刷新页面
      this.pageRelode = false;
      this.$nextTick(() => {
        this.pageRelode = true;
      })
    }
  }
};
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch; /* 解决 ios 滑动不流畅问题 */
  background-color: #eee;
}

.loding_wrap {
  position: absolute;
  top: 0;
  // left: 0;
  right: 0;
  // bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  // background: rgba(0, 0, 0, 0.3);
}
.van-nav-bar {
    // 不要全局 配置定位
    // position: fixed;
    // top: 0;
    width: 100%;
    background-color: #fff!important;
    font-size: 16px;
    .van-icon {
        font-size: 20px;
        color: #2c2c2c;
    }
    .van-ellipsis {
      width: 100%;
      height: 1.17333rem;
      line-height: 1.17333rem;
      font-size: 0.42667rem;
      font-weight: 700;
      color: #000;
      text-align: center;
    }
}
.empty {
    
    width: 100%;
    height: 193px;
    margin-top: 90px;
    background: url('~@/assets/img/empty_img.png');
    background-size: cover;
    position: relative;
    .empty_tips{
      position: absolute;
      top:40%;
      right:20%;
      transform: translateY(-100%);
      font-size: 13px;
      color:#999;
    } 
}

</style>
