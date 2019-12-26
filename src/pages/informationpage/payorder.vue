<template>
  <div>
    <van-nav-bar title="课程订单" left-arrow @click-left="goback"></van-nav-bar>
    <div class="course">
      <div>
        <img
          v-if="courseParams.coursePic.length !== 0"
          class="course-img"
          :src="courseParams.coursePic[0].path"
          alt
        />
      </div>
      <div class="course-name">
        <img
          class="course-name-jifen"
          src="../../assets/img/jifen.png"
          v-if="courseParams.train_discount.积分.length!==0"
        />
        {{courseParams.courseName}}
      </div>
      <div class="course-price">￥{{courseParams.price}}</div>
    </div>
    <div class="jifen" v-if="courseParams.train_discount.积分.length!==0">
      <div class="jifen-total">可用积分：{{fraction}}</div>
      <div class="jifen-item">
        <van-radio-group v-model="radio">
          <van-radio name="no" checked-color="#8FCD71" @click="noUse">不使用积分</van-radio>
          <van-radio
            :name="index"
            checked-color="#8FCD71"
            :disabled="fraction>=item.consume? false: true"
            v-for="(item,index) in courseParams.train_discount.积分"
            :key="index"
            @click="getId(index, item)"
          >花费{{item.consume}}积分，价格减免：{{item.deduction}}</van-radio>
        </van-radio-group>
      </div>
    </div>
    <div class="pay-way">
      <div class="pay-way-text">支付方式</div>
      <van-radio-group v-model="payway">
        <van-radio name="支付宝" checked-color="#8FCD71">
          <img class="pay-way-img" src="../../assets/img/zfb.png" alt />
        </van-radio>
        <van-radio name="微信" checked-color="#8FCD71">
          <img class="pay-way-img" src="../../assets/img/wx.png" alt />
        </van-radio>
      </van-radio-group>
    </div>
    <div class="footer">
      <div class="price">
        <div>
          实际支付：
          <span>￥{{discountPrice == '' ? courseParams.price.toFixed(2): discountPrice}}</span>
        </div>
        <div v-if="name !== ''">积分已抵扣</div>
      </div>
      <div class="pay" @click="creatOrder">去付款</div>
    </div>
    <div v-html="form"></div>
  </div>
</template>
<script>
import { Toast } from "vant";

export default {
  data() {
    return {
      id: "",
      radio: "no",
      pay: "1",
      // 课程数据
      courseParams: "",
      // 积分
      fraction: "",
      // 选中的积分抵扣项
      discountPrice: "",
      // 抵扣的积分
      consume: "",
      // 选中折扣的编号
      name: "",
      // 支付宝提交的表单数据
      form: "",
      // 支付方式
      payway: "支付宝"
    };
  },
  created() {
    let courseParams = this.$route.query.courseParams;
    this.courseParams = JSON.parse(courseParams);
    this.fraction = JSON.parse(window.sessionStorage.getItem("user")).fraction;
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    // 选择积分抵扣，折扣价格
    getId(index, item) {
      if (this.fraction >= item.consume) {
        this.name = item.id;
        const train_discount = this.courseParams.train_discount.积分;
        this.discountPrice = (
          this.courseParams.price - train_discount[index].deduction
        ).toFixed(2);
        this.consume = train_discount[index].consume;
      } else {
        Toast("您的积分不足，快去分享赚积分吧！");
      }
    },
    // 不使用积分的价格
    noUse() {
      this.name = "";
      this.discountPrice = this.courseParams.price.toFixed(2);
    },
    // 参数处理
    paramsDeal(params) {
      params = {
        id: this.courseParams.id,
        fraction: this.consume,
        discountId: this.name
      };
      return params;
      // }
    },
    // 创建订单
    creatOrder() {
      const orderParams = this.paramsDeal();
      this.$request.post("/trains/new/order", orderParams).then(res => {
        if (res.msg === "OK") {
          if (this.fraction === 0 || res.code === 200) {
            Toast("恭喜您，课程购买成功");
            setTimeout(() => {
              this.$router.go(-1);
            }, 2000);
          } else {
            if (this.payway === "支付宝") {
              this.payMoney(res.out_trade_no);
            } else if (this.payway === "微信") {
              if (this.isWeiXin()) {
                this.payForWexin(res.out_trade_no);
              } else {
                this.payForWexinw(res.out_trade_no);
              }
            }
          }
        } else {
          this.$toast({
            message: res.msg
          });
          setTimeout(() => {
            this.$router.go(-1);
          }, 2000);
        }
      })
      .catch((error) => {
          this.$toast({
            message: error.msg
          });
      })
    },
    // 获取支付宝接口
    payMoney(orderId) {
      this.$request
        .get("/alipay/wappay/get?out_trade_no=" + orderId)
        .then(res => {
          this.form = res;
          this.$nextTick(() => {
            document.forms["alipaysubmit"].submit(); //渲染支付宝支付页面
          });
        });
    },
    // 判断是否是微信浏览器
    isWeiXin() {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    },
    // 获取微信浏览器接口
    payForWexin(orderId) {
      this.$request.get("/alipay/wechat/jsapi/openid").then(res => {
        // window.location.href = res.openid
        var createCallbackName = function() {
          return `callback${(Math.random() * 1000000).toFixed(0)}`;
        };
        var insertScript = function(url) {
          let script = document.createElement("script");
          script.type = "text/javascript";
          // script.src = res.openid
          // script.onload = script.onerror = function () {
          //     document.body.removeChild(script)
          // }
          script.setAttribute("src", url);
          document.body.appendChild(script);
        };
        var jsonp = function(url, config = {}) {
          let data = config.data || {};
          let timeout = config.timeout || 5000;
          let timer;
          let funcName = createCallbackName();
          data.callback = funcName;
          return new Promise((resolve, reject) => {
            window[funcName] = function(res) {
              delete window[funcName];
              resolve(res);
            };
            insertScript(url);
          });
        };
        jsonp(res.openid).then(res => {
        });
      });
      return;
    },
    // 外部浏览器微信支付
    payForWexinw(orderId) {
      this.$request
        .get("/alipay/wechat/h/test?out_trade_no=" + orderId)
        .then(res => {
          let routeData = this.$router.resolve({
            path: "payforwx",
            query: { htmls: res.mweb_url, body: res.body, id: res.out_trade_no }
          });
          window.open(routeData.href, "_blank");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.course {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 4px 0;
  padding: 0 16px;
  height: 98px;
  background-color: #fff;
  &-img {
    width: 68px;
    height: 68px;
  }
  &-name {
    display: flex;
    align-items: center;
    width: 170px;
    font-size: 12px;
    &-jifen {
      width: 18px;
      height: 18px;
      margin-right: 7px;
    }
  }
  &-price {
    font-size: 14px;
    color: #d91a1a;
  }
}
.jifen {
  padding: 14px 16px;
  background-color: #fff;
  &-total {
    font-size: 14px;
  }
  &-item {
    font-size: 12px;
    .van-radio {
      margin-top: 10px;
    }
    /deep/ .van-radio__icon {
      font-size: 14px;
      margin-right: 4px;
    }
    /deep/ .van-radio__label {
      color: #999;
    }
  }
}
.pay-way {
  margin-top: 4px;
  margin-bottom: 50px;
  padding: 20px 16px;
  // height: 195px;
  background-color: #fff;
  &-text {
    padding-bottom: 2px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
  }
  .van-radio {
    margin-top: 30px;
  }
  /deep/ .van-radio__icon {
    font-size: 14px;
    margin-right: 4px;
  }
  &-img {
    width: 90px;
    height: 30px;
  }
}
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 49px;
  background-color: #fff;
  .price {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 16px;
    div:nth-child(1) {
      font-size: 14px;
      color: #a3c554;
      font-weight: 600;
      span {
        color: #d91a1a;
        font-weight: 600;
      }
    }
    div:nth-child(2) {
      font-size: 12px;
      color: #999;
    }
  }
  .pay {
    width: 104px;
    line-height: 49px;
    background-color: #b3d465;
    text-align: center;
    font-size: 14px;
    color: #fff;
  }
}
.form {
  height: 900px;
}
</style>