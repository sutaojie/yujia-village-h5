<template>
  <div>
    <van-nav-bar title="订单详情" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <main class="main">
        <!-- 地址 -->
      <div class="address">
        <div class="address-name">
          <div class="address-name-div1">
            <van-icon name="location-o" />
            <span>{{goodsOrderData.name}}</span>
            <span>{{goodsOrderData.tel}}</span>
          </div>
          <!-- <div class="xiugai" v-if="goodsOrderData.status==='待付款'" @click="alterAddress">
            <span>修改</span>
            <van-icon name="arrow" />
          </div> -->
        </div>
        <p class="address-detail">地址：{{goodsOrderData.zone+goodsOrderData.address}}</p>
      </div>
      <!-- 商品展示 -->
      <div class="order-main-shop" v-for="(item, index) in goodsOrderData.data" :key="index" @click="goGoodsDetail(item.id)">
        <div class="order-main-shop-img">
          <img :src="item.url" />
        </div>
        <div class="order-main-shop-message">
          <div class="order-main-shop-message-num">
            <span class="num-span1">{{item.name}}</span>
            <span>x {{item.num}}</span>
          </div>
          <div class="color">
            <span>{{item.color}}</span>
            <span class="color-span2">{{item.size}}</span>
          </div>
          <div class="price">
            <!-- <span>￥{{(item.sellPrice-item.discount).toFixed(2)}}</span> -->
            <span>￥{{item.price.toFixed(2)}}</span>
            <span v-if="item.discount_msg">{{item.discount_msg+explain[index]}}</span>
          </div>
        </div>
      </div>
      <!-- 订单信息 -->
      <div class="order-info">
          <div class="item"><span>订单编号：</span> {{goodsOrderData.out_trade_no}}</div>
          <div class="item"><span>下单时间：</span> {{goodsOrderData.createTime}}</div>
          <div class="item"><span>支付方式：</span> {{goodsOrderData.payment}}</div>
      </div>
      <!-- 减免 -->
      <div class="order-discounts">
          <div class="item"><span>商品运费</span><span>免运费</span></div>
          <div class="item"><span>实付总额（含运费）</span><span class="total-price">￥{{goodsOrderData.totalPrice}}</span></div>
      </div>
    </main>
    <footer class="footer">
      <!-- <div class="delete" @click="delOrder">删除订单</div> -->
      <div class="hint" v-if="goodsOrderData.status==='待付款'">温馨提示：倒计时结束将自动取消订单</div>
      <div class="payment" v-if="goodsOrderData.status==='待付款'" @click="pay(orderId,goodsOrderData.payment)">
        <span>付款</span><van-count-down :time="time" format="mm:ss" @finish="timeEnd"/>
      </div>
      <div class="hint2" v-if="goodsOrderData.status==='已取消'">
        <div>温馨提示：该交易已取消</div>
      </div>
      <div class="hint2" v-if="goodsOrderData.status==='待发货'">
        <div>商家正在努力打包中，请耐心等待哦~~~</div>
      </div>
      <div class="hint2" v-if="goodsOrderData.status==='待收货'">
        <span @click="look">查看物流</span>
        <span @click="confirmReceipt">确认收货</span>
      </div>
      <div class="hint2" v-if="goodsOrderData.status==='已收货'">
        <div>温馨提示：该交易已完成</div>
      </div>
    </footer>
    <div v-html="form"></div>
  </div>
</template>
<script>
import { Dialog, Toast, CountDown } from 'vant';
export default {
  data() {
    return {
      orderId: '',
      oid: '',
      goodsOrderData: {},
      // 积分的具体说明
      explain: [],
      time: 30*60*1000,
      form: ''
    };
  },
  created() {
    const { orderId,oid } = this.$route.params;
    this.orderId = orderId;
    this.oid = oid;
    this.getOrderDetail(orderId);
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    goGoodsDetail(id) {
      this.$router.push('/goods/detail/'+id);
    },
    // 获取商品的订单详情
    getOrderDetail(orderId) {
      this.$request.get("/order/good/" + orderId)
        .then(res => {
          this.goodsOrderData = res;
          res.data.forEach((item,index) => {
            if(item.is_repeat_dis) {
              this.explain[index] = ' (每件商品)';
            } else {
              this.explain[index] = ' (一件商品)';
            }
          })
          var update_time = res.updateTime.replace(/-/g,'/');
          update_time = new Date(update_time).getTime();
          var second = (update_time-Date.parse(new Date()));
          this.time = second;
        })
        .catch(err => {});
    },
    // 删除订单 
    delOrder() {
      Dialog.confirm({
        message: '是否删除该订单？',
        confirmButtonText: '是',
        cancelButtonText: '否',
      }).then(() => {
        this.$request.delete('/del/good/order/'+this.orderId).then(res => {
          if(res.code==200) {
            Toast('删除成功');
            this.$router.push('/myorder');
          } else {
            Toast('删除失败！');
          }
        })
      }).catch(() => {
      });
      
    },
    // 倒计时结束 
    timeEnd() {
      this.$router.go(-1);
    },
    // 支付宝支付
    pay(orderId,payment) {
      if(payment === '支付宝') {
          this.payAlipay(orderId);
      } else {
          if(this.isWeiXin()) this.payForWexin(orderId);
          else this.payForWexinOut(orderId);
      }
    },
    // 支付宝支付 
    payAlipay(orderId) {
        this.$request.get('/alipay/wappay/get?out_trade_no=' + orderId).then(res => {
            this.form = res;
            this.$nextTick(() => {
                document.forms['alipaysubmit'].submit() //渲染支付宝支付页面 
            })
        })
    },
    // 判断是否在微信内
    isWeiXin () {
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        } else{
            return false;
        }
    },
    // 微信外部浏览器支付
    payForWexinOut (orderId) {
        this.$request.get('/alipay/wechat/h/test?out_trade_no=' + orderId ).then((res) => {
            window.location.replace(res.mweb_url);
        })
    },
    // 微信内置浏览器支付
    payForWexin (orderId) {
        var userid = sessionStorage.getItem('user')? JSON.parse(sessionStorage.getItem('user')).id: '';
        this.$request.get('/alipay/wechat/jsapi/url?out_trade_no=' + orderId + '&id=' + userid ).then((res) => {
            window.location.replace(res.url);
        })
    },

    look() {
      this.$router.push('/order/wuliu/'+this.oid);
    },
    confirmReceipt() {
      this.$request.post('/confirmOrder',{id: this.oid}).then(res => {
            if(res.mag == 'ok') {
                Toast('收货成功');
            }
        })
        .catch(err => {
            Toast('收货失败');
        })
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  font-size: 12px;
}
.van-nav-bar {
  position: fixed;
  top: 0;
}
.main {
  margin-top: 46px;
  margin-bottom: 53px;
  .address {
    padding: 10px 16px;
    background-color: #fff;
    box-shadow:1px 1px 4px 1px rgba(22,27,27,0.2);
    &-name {
      display: flex;
      justify-content: space-between;
      height: 25px;
      &-div1,
      .xiugai {
        display: flex;
        align-items: center;
        .van-icon {
          margin-right: 6px;
          font-weight: 600;
        }
        span {
          margin-right: 10px;
          font-weight: 600;
        }
      }
      .xiugai {
        span {
          margin-right: 2px;
        }
        .van-icon {
          margin-top: 3px;
        }
      }
    }
    &-detail {
      width: 300px;
      margin-top: 5px;
      margin-left: 17px;
      line-height: 18px;
      color: #999;
    }
  }
  .order-main-shop {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    background: white;
    margin-top: 3px;
    box-shadow:1px 1px 4px 1px rgba(22,27,27,0.2);
    &-img {
      width: 78px;
      height: 79px;
      margin: 11px 18px 15px 16px;
      img {
        height: 79px;
      }
    }
    &-message {
      width: 245px;
      height: 79px;
      margin-top: 11px;
      &-num {
        display: flex;
        justify-content: space-between;
        .num-span1 {
          width: 162px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .color {
        span {
          height: 30px;
          border: 1px solid #e5e5e5;
          text-align: center;
          line-height: 30px;
          padding: 0 8px;
          color: #999999;
          font-size: 10px;
        }
        &-span2 {
          margin-left: 9px;
        }
      }
      .price {
        display: flex;
        margin-top: 12px;
        span:nth-child(2) {
          margin-left: 20px;
          color: #E02121;
        }
      }
    }
  }
  .order-info,
  .order-discounts {
    margin-top: 3px;
    background-color: #fff;
    box-shadow:1px 1px 4px 1px rgba(22,27,27,0.2);
    .item {
        padding: 0 16px;
        height: 46px;
        line-height: 46px;
        border-bottom: 1px solid #eee;
        span {
            color: #999;
        }
    }
  }
  .order-discounts {
    .item {
        display: flex;
        justify-content: space-between;
        span {
            color: #2c2c2c;
        }
        .total-price {
            color: #9ABB4B;
        }
    }
  }
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 49px;
  display: flex;
  box-shadow:1px -1px 3px 0px rgba(0, 0, 0, 0.15);
  div {
    line-height: 49px;
    background-color: #fff;
    text-align: center;
  }
  .hint {
    width: 253px;
    color: #999;
  }
  .payment {
    flex: 1;
    display: flex;
    justify-content: center;
    background-color: #B3D465;
    color: #fff;
    .van-count-down {
      margin-left: 5px;
      background-color: #B3D465;
      color: #fff;
    }
  }
  .hint2 {
    width: 100%;
    color: #999;
    display: flex;
    div {
      width: 100%;
    }
    span {
      display: block;
      width: 50%;
      height: 49px;
      line-height: 49px;
      background-color: #fff;
      color: #B3D465;
      font-size: 14px;
    }
    span:nth-child(2) {
      background-color: #B3D465;
      color: #fff;
    }
  }
}
</style>