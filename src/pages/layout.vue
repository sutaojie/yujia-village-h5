<template>
    <div style="width:100%;height:100%;">
      <!-- 客服图标-注册图标 -->
      <div class="management" ref="iconbox">
        <div v-show="isUserNeedLogin" class="register_fixed" @click="() => { this.$router.push('/login?q_type=register')}" ref="registerimg"></div>
        <div class="kefu_fixed" @click="callShow = true" ref="kefuimg"></div>
      </div>
      <van-popup class="call-center" v-model="callShow">
        <div class="hint">客服微信：ChinaYogaVillage</div>
        <div class="phone-img"></div>
        <a href="tel:400-100-7191">
          <div class="hot-line">点击拨打 400-100-7191</div>
        </a>
      </van-popup>
      <div class="main_content">
        <router-view  @touchmove.prevent></router-view>
      </div>
      <Footer></Footer>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import Footer from "@/components/footer";
import Main from "./main";
export default {
    name: 'home',
    components: {
        Main,
        Footer
    },
    data() {
      return {
        callShow: false,
      }
    },
    computed: {
      isUserNeedLogin() {
        const isUserLogin = !window.sessionStorage.getItem('access');
        return isUserLogin;
      }
    },
    mounted () {
      this.dargimg()
    },
    methods: {
      dargimg () {
        var iconbox = this.$refs.iconbox
        this.darg(iconbox)
      },
      darg (div1) {
        var maxW = document.body.clientWidth - div1.offsetWidth;
        var maxH = document.body.clientHeight - div1.offsetHeight;
        var oL;
        var oT
        div1.addEventListener('touchstart', function(e) {
        var ev = e || window.event;
        var touch = ev.targetTouches[0];
        oL = touch.clientX - div1.offsetLeft;
        oT = touch.clientY - div1.offsetTop;
        return false
        });
        div1.addEventListener('touchmove', function(e) {
           var ev = e || window.event;
           var touch = ev.targetTouches[0];
           var oLeft = touch.clientX - oL;
           var oTop = touch.clientY - oT;
           if(oLeft < 0) {
           oLeft = 0;
           } else if(oLeft >= maxW) {
           oLeft = maxW;
           }
           if(oTop < 0) {
           oTop = 0;
           } else if(oTop >= maxH) {
           oTop = maxH;
           }
           div1.style.left = oLeft + 'px';
           div1.style.top = oTop + 'px';
          return false
        });
        //触摸结束时的处理
        div1.addEventListener('touchend', function() {
          document.removeEventListener("touchmove", defaultEvent);
        });
        //阻止默认事件
        function defaultEvent() {
          return false
          // e.preventDefault();
        }
      }
    },
}
</script>
<style lang="scss">
.main_content{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow: hidden;
}
.main_content > div {
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
</style>
<style lang="scss" scoped>
    #app {
      // position: relative;

      .management {
          position: absolute;
          z-index: 299;
          top: 450px;
          left: 309px;
        .kefu_fixed{
          background-image: url('~@/assets/img/kefu1.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;
          width: 50px;
          height: 50px;
        }
      }
      .register_fixed{
        // position: fixed;
        // left: 309px;
        // top: 457px;
        // z-index: 200;
        background-image: url('~@/assets/img/zhuce1.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: 50px;
        height: 50px;
        margin-bottom: 10px;
      }
      }

  .call-center {
    width: 285px;
    height: 132px;
    background-image: url('~@/assets/img/yuan.png');
    background-repeat: no-repeat;
    background-size: cover;
    font-size: 14px;
    text-align: center;
    .hint {
        margin-top: 22px;
    }
    .phone-img {
        position: absolute;
        top: 66px;
        left: 50px;
        width: 23px;
        height: 27px;
        background-image: url('~@/assets/img/phone.png');
        background-repeat: no-repeat;
        background-size: cover;
    }
    .hot-line {
        margin-top: 28px;
        margin-left: 40px;
    }
  }
</style>