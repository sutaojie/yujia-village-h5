<template>
  <div class="message">
    <main class="message-main">
      <div class="message-head">
        <div
          class="advertising"
          :style="`background-image:url(${banner})`"
          v-if="banner"
        ></div>
        <ul class="message-main-head">
          <li :class="{ changeweight: isActive == '0' }">找到以下结果</li>
          <li
            @click="changeFilter('courseTime')"
            :class="{ changeweight: courseTime.isActive }"
          >
            开课时间
            <van-icon name="arrow-up" v-show="courseTime.rise" />
            <van-icon name="arrow-down" v-show="!courseTime.rise" />
          </li>
          <li class="head-list" is-link @click="isShowFilter = true">筛选</li>
        </ul>
      </div>
      <div class="shade-layer" v-show="isShowFilter" @click="isShowFilter = false">
        <div class="right-box" @click.stop="">
          <div class="popup">
            <div class="popup-time">
              <p>开课时间</p>
              <div class="choose-time">
                <div
                  is-link
                  class="time-select"
                  @click="showPopup('startTime')"
                >
                  {{ selectTime.startTime || "请选择" }}
                </div>
                <span>-</span>
                <div is-link class="time-select" @click="showPopup('endTime')">
                  {{ selectTime.endTime || "请选择" }}
                </div>
              </div>
            </div>
            <div class="area">
              <p>地区选择</p>
              <div class="area-box" @click="showPopup('area')">
                <div is-link class="area-select">
                  {{ selectArea.province || "请选择" }}
                </div>
                <span>-</span>
                <div is-link class="area-select">
                  {{ selectArea.city || "请选择" }}
                </div>
                <span>-</span>
                <div is-link class="area-select">
                  {{ selectArea.area || "请选择" }}
                </div>
              </div>
            </div>
          </div>
          <div class="button">
            <div class="reset" @click="resetlist">重置</div>
            <div class="sure" @click="searchResult">确定</div>
          </div>
        </div>
      </div>
      <van-popup
        v-model="isShowPopup"
        position="bottom"
        :style="{ height: '40%' }"
      >
        <van-datetime-picker
          v-if="timeOpen"
          v-model="currentDate"
          type="date"
          :min-date="minDate"
          @confirm="selectDate"
          @cancel="isShowPopup = false"
        />
        <van-area
          v-if="areaisOpen"
          :area-list="areaList"
          @confirm="changeArea"
          @cancel="isShowPopup = false"
          :columns-placeholder="['请选择', '请选择', '请选择']"
        />
      </van-popup>
      <div
        class="message-main-container"
        id="scrollContent"
        :style="banner ? 'padding-top: 80px' : 'padding-top: 40px'"
        ref="sectionbox"
      >
        <div class="message-main-container-list" v-show="list.length > 0">
          <div
            class="message-main-container-list-count"
            v-for="(list, index) in list"
            :key="index"
            @click="viewDetail(list.id)"
          >
            <div
              class="message-main-container-list-count-img"
              :style="{
                'background-image': 'url(' + list.path + ')',
                'background-repeat': 'no-repeat',
                'background-size': 'cover'
              }"
            ></div>
            <div class="message-main-container-list-count-text">
              <h6 class="p1">{{ list.theme }}</h6>
              <p class="areap">{{ list.custom_address }}</p>
              <p class="p2">
                <!-- <span class="pprice">￥{{ list.price }}</span>
                <span class="pdiff">难度： {{ list.diff }}</span> -->
              </p>
              <p class="time">{{ list.startTime }}~{{ list.endTime }}</p>
              <div class="p4">
                <span class="p4-hand">观看 {{ list.views }}</span>
                <!-- <span class="p4-eye">想学 {{ list.follow }}</span> -->
              </div>
              <!-- <button class="wantbtn" @click.stop="study(list.id, index)">想学</button> -->
            </div>
          </div>
        </div>
        <div v-if="isListEnd" class="" style="text-align: center;color: #999999;font-size:16px;">
          <span>--我也是有底线的--</span>
        </div>
        <div v-show="list.length === 0" class="defaultpage">
          <img src="../../../static/img/defaultpage.png" />
          <span>没有发现哦(╯▽╰)</span>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Vue from "vue";
import areaList from "@/pages/market/goods/area_list";
import { mapGetters } from "vuex";
import { goAdvertingApi } from "@/services/api/main";
import { PullRefresh, Toast } from "vant";
Vue.use(PullRefresh);
let isScroll = false;

export default {
  data() {
    return {
      banner: "",
      list: [],
      isListEnd: false,
      meta: {
        page: 1,
        pagesize: 6
      },
      // 排序关键字
      kindsOfIdentity: "",
      courseTime: {
        isActive: false,
        rise: false
      },
      selectArea: {
        province: "",
        city: "",
        area: ""
      },
      selectTime: {
        startTime: "",
        endTime: ""
      },
      // 确定选择的时间选择框
      word: "",
      // 时间弹框的初始化时间
      currentDate: new Date(),
      minDate: new Date(),
      // 弹出层的显示与否
      isShowPopup: false,
      timeOpen: false,
      areaisOpen: false,
      areaList,
      isActive: "1",
      // 筛选确定的状态字符
      isShowFilter: false
    };
  },
  computed: {
    ...mapGetters(["info", "isUserNeedLogin"])
  },
  activated() {
    this.$refs.sectionbox.scrollTop = sessionStorage.getItem("scrollTop");
  },
  beforeRouteLeave(to, from, next) {
    const changeKeepAlive = (parentName, name, keepAlive) => {
      this.$router.options.routes.map(item => {
        if (item && item.children) {
          item.children.map(sub_item => {
            if (sub_item.name === parentName || sub_item.name === name) {
              sub_item.meta.keepAlive = keepAlive;
            }
          });
        }
      });
    };
    if (to.name === "conference detail") {
      changeKeepAlive("", "conference list", true);
    } else {
      changeKeepAlive("", "conference list", false);
      sessionStorage.setItem("scrollTop", 0);
    }
    next();
  },
  mounted() {
    this.getConference();
    this.PullUpReload();
  },
  methods: {
    getConference(page = 1) {
      return this.$request(
        `/yoga/conference?${this.$qs.stringify({ page })}`
      ).then(response => {
        const { all: item, banner } = response;
        this.list = [...this.list, ...item.data];
        this.meta.page = item.current_page;
        this.banner = banner;
        return item.data;
      });
    },
    changeFilter(name) {
      if (this[name].isActive) {
        this[name].rise = !this[name].rise
      }
      isScroll = false
      this[name].isActive = true
      this.postFilterQuery(this.getFilterQueryParams())
    },
    /***** */

    // 地址遮罩层
    showPopup(word) {
      this.isShowPopup = true;
      if (word === "area") {
        this.areaisOpen = true;
        this.timeOpen = false;
      } else {
        this.timeOpen = true;
        this.areaisOpen = false;
        this.word = word;
      }
    },

    // 重置按钮功能
    resetlist() {
      this.isShowFilter = false
      this.courseTime.isActive = false
      this.selectArea.province = "";
      this.selectArea.city = "";
      this.selectArea.area = "";
      this.selectTime.startTime = "";
      this.selectTime.endTime = "";
      isScroll = false
      this.list = []
      this.getConference();
    },
    selectDate(value) {
      const date = this.changDate(value);
      if (this.word === "startTime") {
        this.selectTime.startTime = date;
      } else {
        this.selectTime.endTime = date;
      }
      this.isShowPopup = false;
    },
    // 将日期格式 转化为 日期标准字符串
    changDate(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
    },
    // 地址选择
    changeArea(value) {
      this.selectArea = {
        province: value[0].name,
        city: value[1] ? value[1].name : "",
        area: value[2] ? value[2].name : ""
      };
      this.isShowPopup = false;
    },
    // 点击li跳转到详情页
    viewDetail(id) {
      let sectionboxScrollTop = this.$refs.sectionbox.scrollTop;
      sessionStorage.setItem("scrollTop", sectionboxScrollTop);

      this.$router.push(`/conference/${id}`);
    },

    // 下拉刷新
    // 上拉加载更多
    PullUpReload() {
      isScroll = false; // 函数截流

      document.querySelector("#scrollContent").onscroll = () => {
        if (isScroll) return;

        let innerHeight = document.querySelector("#scrollContent").clientHeight; // 容器高度
        let outerHeight = document.querySelector("#scrollContent").scrollHeight; // 容器高+滚动高
        let scrollTop = document.querySelector("#scrollContent").scrollTop; // 滚动高

        if (900 + scrollTop >= outerHeight) {
          isScroll = true;
          let isSearch = false
          for (const item of Object.values(this.getFilterQueryParams())) {
            if(item !== '') {
              isSearch = true
            }
          }
          if (isSearch) {
            this.postFilterQuery({ ...this.getFilterQueryParams(), page: this.meta.page + 1 })
              .then(item => {
                if (item.length > 0) {
                  setTimeout(() => {
                    isScroll = false;
                  }, 300);
                } else {
                  this.isListEnd = true;
                  Toast("只有这么多了");
                }
              });
            return;
          }
          this.getConference(this.meta.page + 1)
            .then(item => {
              if (item.length > 0) {
                setTimeout(() => {
                  isScroll = false;
                }, 300);
              } else {
                this.isListEnd = true;
                Toast("只有这么多了");
              }
            });
        }
      };
    },
    // 条件筛选功能
    searchResult() {
      this.meta.page = 1;
      this.list = [];
      this.isListEnd = false;
      isScroll = false
      this.postFilterQuery(this.getFilterQueryParams())
    },
    getFilterQueryParams() {
      if (this.courseTime.isActive) {
        return {...this.selectArea, ...this.selectTime, time: this.courseTime.rise}
      } 
      return {...this.selectArea, ...this.selectTime}
    },
    postFilterQuery(params) {
      return this.$request.post(`/yoga/conference`, params)
              .then(response => {
                const item = response
                this.list = [...this.list, ...item.data];
                this.meta.page = item.current_page;
                return item.data
              })
    }
  }
};
</script>

<style lang="scss" scope>
// 切换的样式
.bgcolor {
  background: #7bbb62;
}
// 点击字体加粗
.changeweight {
  font-weight: 900;
}
// 缺省页
.defaultpage {
  width: 100%;
  height: 160px;
  margin-top: 160px;
  img {
    width: 100%;
    height: 100%;
  }
  span {
    position: relative;
    left: 36%;
    top: -105%;
    font-size: 16px;
    color: #999999;
  }
}
.message {
  // 广告位
  .message-head {
    width: 100%;
    position: fixed;
    top: 0;
    opacity: 1;
    z-index: 10;
  }
  .advertising {
    width: 100%;
    opacity: 1;
    z-index: 20;
    top: 0;
    height: 39.38px;
    background-size: 100%;
    img {
      width: 100%;
    }
  }
  width: 100%;
  &-main {
    width: 100%;
    height: 100%;
    &-head {
      width: 100%;
      height: 44px;
      font-size: 12px;
      background: white;
      li {
        position: relative;
        margin-left: 18px;
        float: left;
        height: 44px;
        line-height: 44px;
        .van-icon {
          position: absolute;
          top: 12px;
          right: -25px;
          font-size: 20px;
        }
      }
      .head-list {
        float: right;
        margin-right: 16px;
      }
    }
    .shade-layer {
      position: fixed;
      top: 0;
      left: 0;
      bottom: 50px;
      z-index: 1024;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      .right-box {
        width: 335px;
        height: 100%;
        margin-left: 40px;
        border-radius: 20px 0px 0px 20px;
        background-color: #fff;
        overflow: hidden;
        .popup {
          position: absolute;
          top: 0;
          bottom: 0;
          z-index: 1025;
          width: 335px;
          overflow-x: hidden;
          overflow-y: scroll;
          font-size: 14px;
          margin: 32px 10px 60px 24px;
          &-price {
            margin-top: 10px;
            input {
              width: 88px;
              height: 29px;
              border: 1px solid #e5e5e5;
              border-radius: 15px;
              text-align: center;
              font-size: 12px;
            }
          }
          &-time {
            margin-top: 10px;
            .choose-time {
              display: flex;
              align-items: center;
              margin-top: 10px;
              span {
                padding: 0 5px;
              }
              .time-select {
                width: 89px;
                height: 29px;
                border: 1px solid #e5e5e5;
                border-radius: 15px;
                text-align: center;
                line-height: 29px;
              }
            }
          }
          .popup-diff {
            margin-top: 10px;
            p {
              padding-bottom: 10px;
            }
            .diff {
              height: 20px;
              display: flex;
              font-size: 12px;
              .diffbg {
                color: #7bbb62;
              }
              li {
                margin-right: 20px;
              }
            }
          }
          .area {
            margin-top: 10px;
            font-size: 14px;
            .area-box {
              display: flex;
              align-items: center;
              margin-top: 10px;
            }
            span {
              padding: 0 5px;
            }
            .area-select {
              width: 89px;
              height: 29px;
              border: 1px solid #e5e5e5;
              border-radius: 15px;
              text-align: center;
              line-height: 29px;
            }
          }
          .types {
            margin-top: 10px;
            .types-container {
              width: 321px;
              display: flex;
              flex-wrap: wrap;
              li {
                width: 89px;
                height: 29px;
                margin-top: 10px;
                margin-right: 15px;
                border: 1px solid #e5e5e5;
                border-radius: 15px;
                text-align: center;
                line-height: 29px;
                font-size: 11px;
              }
            }
          }
        }
        .button {
          width: 100%;
          display: flex;
          position: absolute;
          bottom: 0;
          z-index: 2000;
          div {
            width: 167.5px;
            height: 49px;
            text-align: center;
            line-height: 49px;
            font-size: 14px;
          }
          .reset {
            background: #ffffff;
            color: #999999;
            border-radius: 0px 0px 0px 20px;
          }
          .sure {
            background: #b3d465;
            color: white;
          }
        }
      }
    }

    &-container {
      flex: 1;
      height: calc(100vh);
      padding-top: 40px;
      // overflow: auto;
      overflow-x: hidden;
      overflow-y: scroll;
      &-list {
        width: 100%;
        background: #eeeeee;
        &-count {
          width: 100%;
          height: 155px;
          margin: 10px auto;
          background: white;
          display: flex;
          align-items: center;
          &-img {
            width: 136px;
            height: 136px;
            margin-left: 17px;
            margin-top: 9;
            background: white;
            border-radius: 10px;
            // img {
            //   width: 100%;
            //   height: 100%;
            //   border-radius: 10px;
            // }
          }
          &-text {
            width: 190px;
            height: 127px;
            font-size: 12px;
            position: relative;
            margin-left: 18px;
            .p1 {
              margin-top: 5px;
              font-size: 14px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .areap {
              color: #999999;
              font-size: 12px;
              margin-top: 5px;
            }
            .p2 {
              margin-top: 10px;
              display: flex;
              justify-content: space-between;
              .pprice {
                color: #d71010;
                font-size: 14px;
                font-weight: 700;
              }
              .pdiff {
                color: #bc866f;
                font-size: 12px;
              }
            }
            .time {
              margin-top: 7px;
              color: #999;
            }
            .p4 {
              margin-top: 15px;
              font-size: 10px;
              color: #999;
              .p4-eye {
                margin-left: 10px;
              }
            }
            .wantbtn {
              width: 51px;
              height: 29px;
              border-radius: 4px;
              text-align: center;
              line-height: 20px;
              color: white;
              border: none;
              background: #7bbb62;
              position: absolute;
              top: 78%;
              right: 0;
              font-size: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
