<template>
  <div>
    <!-- 引导注册登录 -->
    <van-overlay :show="registerBox.show && isUserNeedLogin">
      <div class="register-box">
        <div class="register">
          <div class="register_btn" @click="() => { this.$router.push('/login?q_type=register')}"></div>
        </div>
        <div class="register_close-wrap">
          <div class="register_close" @click="registerBox.show = false"></div>
        </div>
      </div>
    </van-overlay>
    <div class="main_wrap">
      <!-- 顶部 logo -->
      <h1><img class="img" src="../assets/img/yujia_logo.png" alt="瑜伽村"></h1>
      <div class="prompt">
        <h2>收藏网址</h2>
        <img src="../assets/img/sz3.gif" alt="">
        <van-icon name="question-o" color="#fff" @click="gotoPage('explain')"/>
      </div>
      <!-- 轮播图 -->
      <div class="bg_imgs-wrap" >
        <div class="bgc-color" style="background:#8FCD71; width:100%;"></div>
        <div class="imgs_box">
          <van-swipe :autoplay="5000" indicator-color="white">
            <div v-if="swiper[0]">
              <van-swipe-item  v-for="(item, index) in swiper" :key="index"><img :src="item.path" alt="商品"   @click="goAdvertising(item.mold, item.relation_id)"></van-swipe-item>
            </div>
            <div v-else>
              <van-swipe-item  v-for="(item, index) in main.banner" :key="index"  ><img :src="item" alt="商品" ></van-swipe-item>
            </div>
          </van-swipe>
        </div>
      </div>
      <!-- 消息滚动 -->
      <div class="msgscroll" >
        <div class="msgscrollbox" ref="box">
          <p class="span1" v-for="(list, index) in msgscrollList" :key="index">{{list}}</p>
        </div>
      </div>
      <!-- tab 导航 -->
      <div class="tab-wrap">
        <div class="tab-box">
          <div href="" @click="gotoPage('yagainformation')">
            <div class="tab_pic">
              <img :src="icon.zixun" alt="图标">
            </div>
            <div class="tab_tips">资讯</div>
          </div>
        </div>
        <div class="tab-box">
          <div href="" @click="gotoPage('yogaknowledge')">
            <div class="tab_pic">
              <img :src="icon.zishi" alt="图标">
            </div>
            <div class="tab_tips">知识</div>
          </div>
        </div>
        <div class="tab-box">
          <div href="" @click="gotoPage('goods')">
            <div class="tab_pic">
              <img :src="icon.jigou" alt="图标">
            </div>
            <div class="tab_tips">商城</div>
          </div>
        </div>
        <div class="tab-box">
          <div href="" @click="gotoPage('aboutUs')">
            <div class="tab_pic">
              <img :src="icon.mingshi" alt="图标">
            </div>
            <div class="tab_tips">关于我们</div>
          </div>
        </div>
      </div>
      <!-- 广告位2 -->
      <div class="advertising" v-if="advertis2">
        <div>
          <img :src="advertis2.path" @click="goAdvertising(advertis2.mold, advertis2.relation_id)">
        </div>
      </div>
      <!-- 培训信息 -->
      <div class="train-wrap" id="train">
        <div class="content_title">
          <div class="lf">
            <span class="zh">培训信息</span>
            <span class="en">Famous teacher</span>
          </div>
          <div class="rh" @click="gotoPage('train')">
            <span class="more">更多 ></span>
          </div>
        </div>
        <div class="content_box">
          <div class="train" @click="viewTrain(item)" v-for="(item, index) in main.hot" :key="index">
            <div class="pic">
              <img :src="item.teacher_img" alt="培训老师">
            </div>
            <div class="info">
              <div class="title"><span class="tag">{{item.type}}</span> <span class="des">{{item.theme}}</span></div>
              <div class="address_time">
                <div class="address">{{item.custom_address}}</div>
                <div class="time">{{item.startTime}} / {{item.endTime}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 名师信息 -->
      <div class="teacher-wrap" id="teacher">
        <div class="content_title">
          <div class="lf">
            <span class="zh">瑜伽名师</span>
            <span class="en">Famous teacher</span>
          </div>
          <div class="rh" @click="gotoPage('teacher')">
            <span class="more">更多 ></span>
          </div>
        </div>
        <div class="content_box">
          <div class="info" @click="viewTeacher(item)" v-for="(item, index) in main.teachers" :key="index">
            <div class="pic">
              <img :src="item.first_img" alt="名师">
            </div>
            <div class="name_en">{{item.name}}</div>
            <div class="name_zh" v-if="false">{{item.info}}</div>
          </div>
        </div>
      </div>
      <!-- 机构推荐 -->
      <div class="club-wrap" id="club">
        <div class="content_title">
          <div class="lf">
            <span class="zh">机构推荐</span>
            <span class="en">Training Information</span>
          </div>
          <div class="rh" @click="gotoPage('club')">
            <span class="more">更多 ></span>
          </div>
        </div>
        <div class="content_box">
          <div class="club" @click="viewClub(item)" v-for="(item, index) in main.clubs" :key="index">
            <div class="club_pic">
              <img :src="item.first_img" alt="机构">
            </div>
            <div class="name">{{item.club_name}}</div>
            <div class="address">{{item.custom_address}}</div>
          </div>
        </div>
      </div>
      <!-- 广告位3 -->
      <div class="advertising" v-if="advertis3">
        <div>
          <img :src="advertis3.path" @click="goAdvertising(advertis3.mold, advertis3.relation_id)">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { mapGetters } from "vuex";
import { getMainDetail, goAdvertingApi } from '@/api/main.js'
import { Swipe, SwipeItem, Overlay } from 'vant';
import { setInterval } from 'timers';
Vue.use(Swipe).use(SwipeItem).use(Overlay);
export default {
  data() {
    return {
      icon: {
        zixun: require('@/assets/img/zixun.png'),
        zishi: require('@/assets/img/zishi.png'),
        jigou: require('@/assets/img/jigou.png'),
        mingshi: require('@/assets/img/mingshi.png'),
      },
      registerBox: {
        show: true
      },
      main: {
        banner: [],
        hot: [],
        teachers: [],
        clubs: []
      },
      swiper: false, // 广告位1
      advertis2: false, // 广告位2
      advertis3: false,  // 广告位2
      msgscrollList: '', // 滚动数据
      timer2: null,
    }
  },
  computed: {
  ...mapGetters(["info", "isUserNeedLogin"]),
  },
  mounted() {
    this.getMsgscroll()
    this.messagefunction()
    getMainDetail().then(response => {
      this.main = response
    })
    this.getAdvertising()
  },
  beforeDestroy () {
    window.clearInterval(this.timer2)
  },
  methods: {
    goAdvertising (mold, relation_id) {
      goAdvertingApi(mold, relation_id)
    },
    getAdvertising () {
      return this.$request.get('/advertisement/data/' + 1).then((res) => {
      if (res[0]) {
        this.swiper = res.filter(((item) => item.position === 0))[0] ? res.filter(((item) => item.position === 0))[0].advertisement : []
        this.advertis2 = res.filter(((item) => item.position === 1))[0] ? res.filter(((item) => item.position === 1))[0].advertisement[0] : []
        this.advertis3 = res.filter(((item) => item.position === 2))[0] ? res.filter(((item) => item.position === 2))[0].advertisement[0] : []
      }
    })
    },
    gotoPage(type) {
      const path = {
        train: '/yogamessage/list',
        yagainformation: '/yagainformation',
        yogaknowledge: '/yogaknowledge',
        aboutUs: '/aboutUs',
        goods: '/store',
        explain: '/explain'
      }
      path[type] && this.$router.push(path[type])
    },
    viewClub(item) {
      this.$router.push(`/teacherClub/clubhouseDetails?id=${item.id}`)
    },
    viewTeacher(item) {
      this.$router.push(`/teacherClub/teacherDetails?id=${item.id}`)
    },
    viewTrain(item) {
      this.$router.push(`/messagedetail/${item.id}`)
    },
    // 气泡消息数据
    getMsgscroll () {
      this.$request.get('/message/overall_situation').then((res) => {
        this.msgscrollList = res
      })
    },
    messagefunction () {
      var box = this.$refs.box
      var top = 0
      this.timer2 = setInterval(() => {
        if(top < -2000) {
          window.clearInterval(this.timer2); 
        } else {
          top -= 40
          box.style.top = top + 'px'
        }
      }, 2500)
    this.$once('hook:beforeDestroy', () => {            
        window.clearInterval(this.timer2);                                    
    })
    }
  }

}
</script>

<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0;
  font-size: 14px;
  color: #2c2c2c;
}
img{
  width: 100%;
  height: 100%;
}
  .main_wrap {
    position: relative;
    background: #fff;
    // log 图标
    h1 {
      position: absolute;
      top: 10px;
      left: 16px;
      z-index: 10;
      .img {
        width: 70px;
        height: 25px;
      }
    }
    .prompt {
      position: absolute;
      top: 7px;
      right: 16px;
      z-index: 10;
      display: flex;
      align-items: center;
      h2 {
        margin-right: 5px;
        font-size: 14px;
        color: #fff;
      }
      img {
        width: 50px;
        height: 30px;
        margin-bottom: 2px;
      }
      .van-icon {
        font-size: 24px;
      }
    } 
    // 轮播图
    .bg_imgs-wrap{
      position: relative;
      height: 208px;
      .bgc-color {
        height: 92px;
        border-radius: 0 0 55% 55%;
      }
      .imgs_box{
        position: absolute;
        top: 46px;
        left: 0;
        padding: 0 16px;
        width: 100%;
        height: 162px;
        border-radius: 10px;
        overflow: hidden;
        .van-swipe {
          height: 100%;
          .van-swipe-item {
            width: 343px!important;
            
          }
        }
        img{
          border-radius: 10px;
          min-height: 142px;
        }
      }
    }
    .msgscroll {
      // width: 200px;
      height: 80px;
      position: absolute;
      // background: #638C0B;
      top: 110px;
      left: 16px;
      overflow: hidden;
      .msgscrollbox {
        position: relative;
        transition: 0.5s;
        .span1 {
          width: 180px;
          margin-top: 8px;
          color: white;
          font-size: 12px;
          padding-left: 8px;
          background: #2c2c2c;
          opacity: 0.3;
          border-radius: 10px;
          // height: 32px;
          text-align: center;
        }
      }

    }
    .tab-wrap{
      padding-top: 20px;
      margin: 0 auto;
      width: 343px;
      display: flex;
      justify-content: space-between;
      .tab-box{
        div{
          .tab_pic {
            width: 44px;
            height: 44px;
            margin: 0 auto;
          }
          .tab_tips{
            padding-top: 10px;
            text-align: center;
          }
        }
      }
    }
    .train-wrap, .teacher-wrap, .club-wrap{
      margin: 0 auto;
      padding-top: 30px;
      width: 340px;
      .content_title{
        display: flex;
        justify-content: space-between;
        .lf{
          .zh{
            position: relative;
            font-size: 16px;
            padding-left: 10px;
            &::before{
              content:'';
              display: block;
              position: absolute;
              left: 0px;
              top: 0;
              width: 5px;
              height: 100%;
              background: #72BC46;
            }
          }
          .en{
            margin-left: 15px;
            font-size: 10px;
          }
        }
        .rh{
          .more{
            display: flex;
            justify-content: center;
            color: #638C0B;
          }
        }
      }
    }
    .train-wrap{
      margin: 0 auto;
      padding-top: 30px;
      width: 343px;
      .content_box{
        margin-top: 18px;
        .train{
          height: 122px;
          padding: 12px 18px;
          // padding-left: 18px; 
          margin-bottom: 5px; 
          border-radius: 5px;
          display: flex;
          justify-content: space-between;
          box-shadow:2px 0px 6px 0px rgba(0, 0, 0, 0.15);
          .pic{
            flex-shrink: 0;
            width: 102px;
            height: 96px;
            border-radius: 10px;
            overflow: hidden;
          }
          .info{
            flex-grow: 1;
            padding-left: 25px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .title{
              padding-top: 6px;
              line-height: 20px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              .tag{
                background: #8FCD71;
                color:#fff;
                font-size: 10px;
                margin: 0 2px;
                margin-top: -2px;
                display: inline-block;
                padding: 0px 8px;
                border-radius: 10px;
              }
              .des{
                font-size: 13px;
                font-weight: 800;
              }
            }
            .address_time{
              margin-bottom: 2px;
              font-size: 10px;
              .address{
                color:#999;
                font-size: 10px;
                margin-bottom: 4px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
              }
              .time{
                color:#999;
                font-size: 10px;
              }
            }
          }
        }

      }
    }
    .teacher-wrap{
      .content_box{
        display: flex;
        flex-wrap: wrap;
        .info{
          padding-top: 16px;
          margin-right: 8px;
          width: 78px;
          &:nth-child(4n) {
            margin-right: 0;
          }
          .pic{
            width: 78px;
            height: 78px;
            border-radius: 50%;
            overflow: hidden;
            background: #e5e5e5;
          }
          .name_en{
            font-size: 10PX;
            padding-top: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .name_zh{
            padding-top: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
    .club-wrap{
      .content_box{
        display: flex;
        flex-wrap: wrap;
        .club{
          padding-top: 10px;
          padding-bottom: 10px;
          width: 166px;
          &:nth-child(even){
            margin-left: 6px;
          }
          .club_pic{
            width: 166px;
            height: 122px;
            // background: #e5e5e5;
            overflow: hidden;
            border-radius: 4px;
          }
          .name{
            padding-top: 14px;
            margin-bottom: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
          .address{
            color:#999;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
    .advertising {
      margin-top: 15px;
      width: 100%;
      padding: 4px 16px;
      img {
        width: 100%;
      }
    }
  }
</style>

<style lang="scss" scoped>
 // 注册引导
 .van-overlay {
   position: fixed;
    top: 0;
   z-index: 300 !important;
    transform: translateZ(200px);
 }
  .register-box{
    margin-top: 67px;
    .register{
      width: 325px;
      height: 325px;
      margin: 0 auto;
      // width: 100%;
      // height: 100%;
      position: relative;
      background-image: url('~@/assets/img/tips-box.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
      .register_btn{
        position: absolute;
        left: 50%;
        bottom: 50px;
        transform: translateX(-50%);
        width: 50%;
        height: 100px;
        // background-color: rgba(57, 119, 36, 0.509);
      }
    }
    .register_close-wrap{
      margin-top: 40px;
      display: flex;
      justify-content: center;
      .register_close{
        background-image: url('~@/assets/img/tips-close.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        width: 40px;
        height: 40px;
      }
      
    }
  }
</style>

