<template>
  <div class="messagedetail">
    <van-nav-bar title="大会详情" left-arrow @click-left="goback">
      <div slot="right" class="paralleling">
        <!-- <van-icon name="star-o" @click="study(detailData.id)"> </van-icon> -->
        <share-ing type="train" @listenToShow="getChildShow"></share-ing>
      </div>
    </van-nav-bar>
    <main class="messagedetail-main" style="-webkit-overflow-scrolling:touch">
      <div class="banner-train-img">
        <img
          :src="detail.path"
          alt=""
          @click="showPic('banner')"
        />
      </div>
      <!-- 课程详情 -->
      <ul class="messagedetail-main-title">
        <li class="li-title">
          {{ detail.theme }}
        </li>
        <li class="li1">
          <div class="li1-text">
            <span>观看: {{ detail.views }}</span>
          </div>
        </li>
        <li class="li3">
          <img src="../../../static/img/teacher.png" /> 联系人：
          <span>{{ detail.linkman }}</span>
        </li>
        <li class="li4">
          <img src="../../../static/img/time.png" /> 联系方式：
          <span>{{ detail.tel }}</span>
        </li>
        <li class="li4">
          <img src="../../../static/img/time.png" /> 大会时间：
          <span>{{ detail.startTime }} / {{ detail.endTime }}</span>
        </li>
        <li class="li5">
          <img src="../../../static/img/adress.png" />大会地址：
          <span>{{ detail.address }}</span>
        </li>
      </ul>
      
      
      <div class="outline" v-if="false">
        <div class="border-top"></div>
        <div class="border-left"></div>
        <div class="title"></div>
        <div class="kecheng">大会简介</div>
        <div class="outline-content" v-html="detail.content"></div>
      </div>

      <div class="suitable-crowd" v-if="false">
        <div class="header-title">
          <span>适合人群</span><span>SUITABLE CROWD</span>
        </div>
        <ul class="list">
          <li v-for="(item, index) in crowds" :key="index">
            <div class="dot"></div>
            <div>{{ item }}</div>
          </li>
        </ul>
      </div>
      <div class="past-train" v-if="false">
        <div class="header-title">
          <span>往期培训</span><span>PAST TARINING</span>
        </div>
        <div
          class="past-train-img"
          v-if="detailData.train_old_image.length !== 0"
        >
          <img
            :src="detailData.train_old_image[0].url"
            alt=""
            @click="showPic"
          />
          <div v-if="detailData.train_old_image.length > 1" class="totle">
            共{{ detailData.train_old_image.length }}张
          </div>
          <van-popup
            v-model="imgShow"
            :overlay-style="{ backgroundColor: '#000' }"
          >
            <van-swipe indicator-color="white">
              <van-swipe-item
                v-for="(item, index) in detailData.train_old_image"
                :key="index"
              >
                <img :src="item.url" alt="" />
              </van-swipe-item>
            </van-swipe>
          </van-popup>
        </div>
      </div>
      <div class="course-details">
        <div class="header-title">
          <span>大会简介</span><span>CONFERENCE DETAILS</span>
        </div>
        <div class="course-details-content" v-html="detail.content"></div>
      </div>
    </main>
    <footer class="footer" v-if="false">
      <div @click="buyCourse">立即购买</div>
    </footer>
  </div>
</template>

<script>
/* eslint-disable no-undef */

import shareIng from "@/components/shareing";
import { mapGetters } from "vuex";
import { Toast } from "vant";

export default {
  data() {
    return {
      detail: {
        theme: "",
        province: "",
        city: "",
        area: "",
        address: "",
        startTime: "",
        endTime: "",
        linkman: "",
        tel: "",
        views: "",
        path: "",
        created_at: "",
        updated_at: "",
        content: "",
        status: "",
        reason: "",
        custom_address: ""
      },
      /******* */
      courseId: "",
      detailData: {
        train_image: [],
        train_old_image: []
      },
      train_discount: {
        积分: []
      },
      crowds: [],
      intro: "",
      outline: "",
      bannerShow: false,
      imgShow: false,
      childShow: false,
      time: "",
      shareimg: "",
      crowdimg: [
        require("../../../static/img/image71.png"),
        require("../../../static/img/image72.png"),
        require("../../../static/img/image73.png")
      ],
      // 是否展示文案
      wenanIsShow: false,
      // 文案数据
      wenanData: [],
      // 复制的内容
      copy_content: ""
    };
  },
  components: {
    shareIng
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === this.$route.path || to.path == "") {
      this.$router.replace("/yoga-message/list");
    }
    next();
  },
  created() {
    const { id } = this.$route.params;
    this.getConferenceDetail(id);
    /****** */
  },
  watch: {
    immediate: true,
  },
  computed: {
    ...mapGetters(["info", "isUserNeedLogin"])
  },
  methods: {
    getConferenceDetail(id) {
      this.$request(`/yoga/conference/${id}`).then(response => {
        this.detail = response;
      });
    },
    /******** */
    getChildShow(data) {
      this.childShow = data;
    },
    goback() {
      this.$router.go(-1);
      // this.$router.replace('/yoga-message/list')
    },
    getmessageDetail(id) {
      this.$request.get("trains/" + id).then(res => {
        this.detailData = res.train;
        this.train_discount = res.train_discount;
        // eslint-disable-next-line no-useless-escape
        this.time =
          this.detailData.startTime.replace(/\-/g, "\.") +
          "-" +
          this.detailData.startTime.replace(/\-/g, "\.");
        this.intro = this.detailData.intro.replace(/\r\n/g, "<br />");
        this.outline = this.detailData.outline.replace(/\r\n/g, "<br />");
        // 处理数据的分号，中英文区别
        const crowd = this.detailData.crowd.replace(/；/g, ";");
        this.crowds = crowd.split(";");
        this.crowds[this.crowds.length - 1] ? this.crowds : this.crowds.pop();
      });
    },
    //
    showPic(keyword) {
      if (keyword === "banner") {
        this.bannerShow = true;
        return;
      }
      if (this.detailData.train_old_image.length === 0) return;
      this.imgShow = true;
    },
    // 购买跳到支付页面
    buyCourse() {
      if (!window.sessionStorage.getItem("access")) {
        Toast("请登录");
        this.$router.push("/login");
        return;
      }
      let courseParams = {
        id: this.courseId,
        courseName: this.detailData.theme,
        price: this.detailData.price,
        coursePic: this.detailData.train_image,
        train_discount: this.train_discount
      };
      // 通过路由传参，讲对象转化json格式，防止接收数据的页面刷新白屏
      courseParams = JSON.stringify(courseParams);
      this.$router.push({
        name: "pay-order",
        query: {
          courseParams
        }
      });
    },
    // 我想学的操作
    study(id) {
      if (!JSON.parse(sessionStorage.getItem("user"))) {
        this.$router.push("/login");
        Toast("请登录");
        return;
      }
      this.wantStudy(id);
      return false;
    }
  }
};
</script>

<style lang="scss" scoped>
.messagedetail {
  width: 100%;
  height: 100%;
  position: relative;
  background: #fff;
  .van-nav-bar {
    position: fixed;
    top: 0;
    .paralleling {
      width: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  &-main {
    width: 100%;
    height: auto;
    background: white;
    overflow-y: auto;
    margin-top: 46px;
    padding-bottom: 50px;
    -webkit-overflow-scrolling: touch;
    .banner-train-img {
      position: relative;
      width: 100%;
      .totle {
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 2px 7px;
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.3);
        font-size: 10px;
        color: #fff;
      }
      .van-popup {
        width: 100%;
        background-color: #000;
      }
      img {
        width: 100%;
      }
    }
    &-title {
      width: 100%;
      padding: 8px 14px 18px 14px;
      font-size: 12px;
      background: white;
      li {
        margin-top: 15px;
        width: 100%;
        overflow: hidden;
        white-space: normal;
        text-overflow: ellipsis;
      }
      .li-title {
        color: #2c2c2c;
        font-size: 14px;
        font-weight: 600;
        .jifen {
          width: 21px;
          height: 21px;
          margin-right: 7px;
          vertical-align: top;
        }
      }
      .li1 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &-text {
          font-size: 14px;
          font-weight: 600;
          span {
            display: inline-block;
            background: #8fcd71;
            font-size: 10px;
            text-align: center;
            border-radius: 10px;
            margin-right: 6px;
            padding: 2px 10px;
            color: white;
          }
        }
        .li1-d2 {
          color: #da1111;
          font-size: 14px;
        }
      }
      .li2 {
        display: flex;
        justify-content: space-between;
        margin: 13px 0;
      }
      li img {
        width: 16px;
        height: 14px;
        margin-right: 10px;
      }
      .li3 {
        font-weight: 100;
        color: #999999;
        span {
          color: #22ac38;
        }
      }
      .li4 {
        color: #999999;
      }
      .li5 {
        color: #999999;
        img {
          margin-right: 13px;
        }
      }
    }
    .integral {
      display: flex;
      justify-content: center;
      width: 343px;
      margin: 0 auto;
      margin-bottom: 18px;
      padding-bottom: 6px;
      background-color: #effaea;
      border-radius: 12px;
      font-size: 12px;
      color: #999;
      .box {
        div {
          margin-top: 6px;
          span {
            color: #96c55b;
          }
        }
      }
    }
    .yoga-teacher {
      position: relative;
      height: 100px;
      padding: 0 16px;
      padding-top: 10px;
      margin-bottom: 190px;
      background-color: #eee;
      .text {
        height: 24px;
        background: url("../../assets/img/yoga-text.png") no-repeat;
        background-size: cover;
      }
      .flower {
        position: absolute;
        top: 2px;
        right: 25px;
        z-index: 5;
        width: 138px;
        height: 48px;
      }
      .teacher {
        position: absolute;
        top: 38px;
        left: 16px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 343px;
        height: 221px;
        box-shadow: 0px 3px 9px 1px rgba(4, 0, 0, 0.21);
        border-radius: 10px;
        background-color: #fff;
        .left-box {
          position: relative;
          width: 136px;
          height: 138px;
          .img {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
            width: 120px;
            height: 120px;
            box-shadow: 0px 3px 9px 1px rgba(4, 0, 0, 0.1);
          }
          .bgc {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 128px;
            height: 122px;
            background-color: #eee;
          }
        }
        .right-box {
          width: 150px;
          .name {
            margin-bottom: 8px;
            font-size: 14px;
            font-weight: 600;
            text-align: center;
            color: #999;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .intro {
            font-size: 10px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 10;
          }
        }
      }
    }
    .outline {
      position: relative;
      width: 343px;
      margin: 0 auto;
      margin-bottom: 22px;
      padding-right: 6px;
      padding-bottom: 45px;
      border-right: 4px solid #eee;
      border-bottom: 4px solid #eee;
      .border-top {
        position: absolute;
        top: 0;
        right: 0;
        width: 215px;
        height: 4px;
        background-color: #eee;
      }
      .border-left {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 4px;
        height: 30px;
        background-color: #eee;
      }
      .title {
        width: 120px;
        height: 14px;
        background: url("../../assets/img/Teaching-program.png") no-repeat;
        background-size: cover;
      }
      .kecheng {
        margin-top: 6px;
        margin-bottom: 19px;
        font-size: 14px;
        font-weight: 600;
      }
      .outline-content {
        font-size: 11px;
      }
    }
    .suitable-crowd {
      padding: 18px 16px;
      background-color: #eee;
      .list {
        margin-top: 26px;
      }
      .list li {
        display: flex;
        line-height: 20px;
        font-size: 11px;
        .dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          margin-top: 7px;
          margin-right: 5px;
          border-radius: 3px;
          background-color: #7bbb62;
        }
      }
    }
    // 头部样式
    .header-title {
      padding-left: 5px;
      font-size: 14px;
      border-left: 5px solid #a6c481;
      span:nth-child(1) {
        font-weight: 600;
      }
      span:nth-child(2) {
        margin-left: 8px;
        color: #999;
        font-size: 10px;
      }
    }
    .past-train {
      width: 343px;
      margin: 25px auto;
      &-img {
        position: relative;
        margin-top: 14px;
        width: 100%;
        .totle {
          position: absolute;
          top: 10px;
          right: 10px;
          padding: 2px 7px;
          border-radius: 10px;
          background-color: rgba(0, 0, 0, 0.3);
          font-size: 10px;
          color: #fff;
        }
        .van-popup {
          width: 100%;
          background-color: #000;
        }
        img {
          width: 100%;
        }
      }
    }
    .course-details {
      width: 343px;
      margin: 0 auto;
      &-content {
        margin-top: 16px;
        font-size: 11px;
      }
    }
  }
  .footer {
    display: flex;
    width: 100%;
    height: 49px;
    position: fixed;
    bottom: 0;
    z-index: 10;
    line-height: 49px;
    background: #7bbb62;
    text-align: center;
    font-size: 14px;
    font-weight: 600;
    color: white;
    div {
      flex: 1;
      height: 100%;
    }
  }
}
</style>
