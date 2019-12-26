<template>
  <div class="order">
    <!-- <header>填写订单</header> -->
    <van-nav-bar title="填写订单" left-arrow @click-left="back" />
    <main class="order-main">
      <div class="add-address" @click="changeAddress" v-if="!selectAddress.name">
        <van-icon name="plus" />
        <span>添加地址</span>
      </div>
      <div class="order-main-editdefalut" v-show="selectAddress.name">
        <div class="order-main-editdefalut-p1" v-if="selectAddress.is_default == 1">默认地址</div>
        <div class="order-main-editdefalut-name">
          {{selectAddress.name}}
        </div>
        <div class="order-main-editdefalut-adress">
          <div>{{selectAddress.tel}}</div>
          <div>{{selectAddress.userAddress}}</div>
        </div>
        <span class="order-main-editdefalut-icon">
          <van-icon @click="changeAddress" name="arrow" />
        </span>
      </div>
      <div v-for="(item, index) in goods" :key="index" class="order-main-shop">
        <div class="order-main-shop-img">
          <img :src="item.url" />
        </div>
        <div class="order-main-shop-message">
          <div class="order-main-shop-message-num">
            <span class="num-span1">{{item.describe}}</span>
            <span>x {{item.num}}</span> 
          </div>
          <div class="color">
            <span>{{item.color}}</span>
            <span class="color-span2">{{item.size}}</span>
          </div>
          <div class="price">
            <span>￥ {{(item.sell_price-item.discount).toFixed(2)}}</span>
            <span
              v-if="item.discount > 0"
              style="margin-left:10px;text-decoration:line-through;"
            >￥ {{item.sell_price}}</span> 
          </div>
        </div>
        <div class="jifen-use">
          <div class="title">积分使用</div>
          <div class="jifen-use-rules" v-if="item.good_discount.积分.length!==0&&item.discount_sign==1" 
          @click="showJifen(index)">
              <span v-if="!jf_id[index]&&!single_jfid">不使用积分</span>
              <span v-else>
                {{info[index]}}
              </span>
            <van-icon name="arrow" />
          </div>
          <div v-else-if="item.discount_sign==0">您已购买过该商品，不能再次享受积分减免</div>
          <div v-else>非积分可优惠商品，积分不参与减免</div>
        </div>
        <div class="subtotal">
          <span class="one">共<span class="num">{{item.num}}</span>件</span>
          <span>小计：
            <span class="price">
              ￥{{!jf_id[index]&&!single_jfid?item.price:subtotal[index]}}
            </span>
          </span>
        </div>
      </div>
      <div class="order-main-discounts">
        <van-cell title="支付方式：" is-link @click="showPopup('payway')" :value="payway.value">
        </van-cell>
      </div>
    </main>
    <footer class="order-foot">
      <div class="order-foot-message">
        <p class="order-foot-message-p1">共 {{totalNum}} 件</p>
        <span>免减总额：¥{{deductionTotal}}</span>
      </div>
      <div class="order-foot-pay">实际支付：￥{{countPrice}}</div>
      <div class="order-foot-buybtn" @click="pay" >去付款</div>
    </footer>
    <!-- 支付方式 -->
    <van-popup v-model="payway.show" position="bottom">
      <van-picker
        :columns="payway.columns"
        show-toolbar
        @cancel="payway.show = false"
        @confirm="onChangePayway"
      />
    </van-popup>
    <van-popup class="jifen-integral"
      v-model="show"
      round
      position="bottom"
      :style="{ height: '60%' }"
    >
      <div class="jifen-integral-use">积分使用</div>
      <van-radio-group v-model="radio">
        <van-cell-group :border="false">
          <van-cell :title="item.consume+'积分,减免'+item.deduction +'元'+integralUse" :border="false" 
          clickable @click="checkIntegral(item.id,item.user_limit)"
          v-for="(item,index) in goods_integral.integral[goods_id]" :key="index">
            <van-radio slot="right-icon" :name="item.id" checked-color="#B3D465"
            :disabled="item.user_limit==0?true:false"/>
          </van-cell>
          <van-cell title="不使用积分" :border="false" clickable @click="radio = 0">
            <van-radio slot="right-icon" :name="0" checked-color="#B3D465"/>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
      <div class="button" @click="comfirm">确定</div>
    </van-popup>
    <div v-html="form"></div>
  </div>
</template>

<script>
import Vue from "vue";
import store from '@/store'
import { Cell, CellGroup, Icon, Tag, Picker, Toast } from "vant";
import back from "@/assets/img/back.png";

Vue.use(Cell)
  .use(CellGroup)
  .use(Icon)
  .use(Tag)
  .use(Picker);
import {
  postGoodOrder,
  postGetAlipayCode,
  postDirectGoodOrder
} from "@/services/api/order.js";
export default {
  data() {
    return {
      payway: {
        show: false,
        columns: ["支付宝", '微信'],
        value: "微信"
      },
      type: '',
      userAddress: [],
      selectAddress: {},
      userMessage: "",
      goods: [],
      url: "",
      newWin: null, // 新窗口的引用
      form: '' ,  // 支付宝提交的表单数据
      show: false,
      radio: 0,
      goods_id: '',
      goods_integral: {
        is_repeat_dis: [],
        integral: []
      },
      // 多件商品折扣 id
      jf_id: [],
      // 单间折扣
      single_jfid: 0,
      info: [],
      // 商品小计价格
      subtotal: [],
      // 减免总额
      deductionTotal: 0,
      deduction: [],
      // 总价
      totalPrice: [],
      total_price: 0

    };
  },
  watch: {
    url(newVal, oldVal) {
      if (newVal && this.newWin) {
        this.newWin.location.href = newVal;
        // 重定向后把 url 和 newWin 重置
        this.url = "";
        this.newWin = null;
      }
    },
    
  },
  computed: {
    // 实际支付价格
    countPrice() {
      var s =0;
      this.goods.forEach(item => {
        s += parseFloat(item.price);
      })
      return (s - this.deductionTotal).toFixed(2);
    },
    // 商品总件数
    totalNum() {
      var num = 0;
      this.goods.forEach(item => {
        num += item.num;
      })
      return num;
    },
    isAllowPay() {
      if(!this.selectAddress.name) {
        return '请填写收货地址';
      }
      if(!this.payway.value) {
        return '请选择支付方式';
      }
      return 0;
    },
    // 商品积分优惠使用说明
    integralUse() {
      var isRepeat = this.goods_integral.is_repeat_dis[this.goods_id];
      if(isRepeat) {
        return ' (每件商品)'
      } else {
        return ' (限一件商品)'
      }
    }

  },
  created() {
    const address = sessionStorage.getItem("select address");
    if (address) {
      this.selectAddress = JSON.parse(address);
      if(sessionStorage.getItem("roder good")) {
        this.goods = JSON.parse(sessionStorage.getItem("roder good"));
      }
      store.commit('loadStatus', false)
    } else {
      this.getAddress();
    }
    // 获取单件商品的数据
    const buyGoods = sessionStorage.getItem("buy goods");
    const { type } = this.$route.query;
    this.type = type;
    if (type == 1 && buyGoods ) {
      this.goods = [JSON.parse(buyGoods)];
      let that = this;
      this.goods.forEach(item => {
        that.goods_integral.integral.push(item.good_discount.积分);
        that.goods_integral.is_repeat_dis.push(item.is_repeat_dis);
      })
    }
  },
  mounted() {
    
  },
  beforeDestroy() {
    sessionStorage.removeItem("select address");
  },
  methods: {
    // 展示积分选择 
    showJifen(index) {
      this.show = true;
      if(this.goods_id!==index) {
        this.radio = 0;
      }
      this.goods_id = index;
    },
    // 切换积分减免
    checkIntegral(id,user_limit) {
      if(user_limit == 0) {
        return
      }
      this.radio = id;
    },
    // 展示所选折扣
    consume() {
      var that = this;
      var price = 0;
      this.goods.forEach((good_item,index) => {
        if(this.goods_id===index) {
          good_item.good_discount.积分.forEach(item => {
            if(item.id===that.radio) {
              if(good_item.is_repeat_dis) {
                that.info[this.goods_id] = item.consume+'积分 减免'+item.deduction+'元'+' (每件商品)';
              } else {
                that.info[this.goods_id] = item.consume+'积分 减免'+item.deduction+'元'+' (限一件商品)';
              }
              if(good_item.is_repeat_dis == 1) {
                price = good_item.price - item.deduction*good_item.num;
              } else {
                price = good_item.price - item.deduction;
              }
              that.subtotal[this.goods_id] = price<=0?0:price.toFixed(2);
              that.deduction[this.goods_id] = good_item.price - that.subtotal[this.goods_id];
            } 
            if(that.radio==0) {
              that.deduction[this.goods_id] = 0;
            }
          })
        }
      })
    },
    // 减免总额 
    totalDeduction() {
      var s = 0;
      this.deduction.forEach( item => {
        s += item;
      })
      this.deductionTotal = s.toFixed(2);
    },
    // 确定
    comfirm() {
      this.show = false;
      if(!this.type) {
        this.jf_id[this.goods_id] = this.radio;
      } else {
        this.single_jfid = this.radio;
      }
      this.consume();
      this.totalDeduction();
    },
    // 选择支付方式
    onChangePayway(value) {
      this.payway.value = value;
      this.payway.show = false;
    },
    // 选择弹出层
    showPopup(type) {
      this[type].show = true;
    },
    // 支付
    pay() {
      if (this.isAllowPay) return Toast(this.isAllowPay)
      const buyGoods = JSON.parse(sessionStorage.getItem("buy goods"));
      const ids = this.goods.map(item => item.id);
      const goodsIds = this.goods.map(item => item.goodListId) ;
      const nums = this.goods.map(item => item.num);
      const { tel, address, area, city, province, name } = this.selectAddress;
      let params = {
        id: ids,
        lid: goodsIds,
        num: nums,
        discountId: this.jf_id,
        status: 0, 
        userName: name,
        userTel: tel,
        province,
        area,
        city,
        address,
        addressId: this.selectAddress.id,
        payment: 2
      };
      if (buyGoods && this.type == 1) {
        var m_params = {
          id: buyGoods.id,
          num: buyGoods.num,
          size: buyGoods.size,
          color:buyGoods.color,
          status: 0,
          userName: name,
          userTel: tel,
          province,
          area,
          city,
          address,
          addressId: this.selectAddress.id,
          discountId: this.single_jfid,
          payment: 2
        };
      } 
      
      if(this.type) {
        if (this.payway.value === "微信") {
          m_params.payment = 3;
        }
        this.singlePay(m_params);
      } else {
        if (this.payway.value === "微信") {
          params.payment = 3;
        }
        this.manyPay(params);
      }
    },
    // 单件支付，创建订单
    singlePay(params) {
      this.$request.post('/goods/order/mobile', params).then(res => {
        this.payFunction(res);
      }).catch(error => {
        if(error.code === 430) {
          Toast("订单生成失败，您的积分不足");
        } else {
          Toast("抱歉，订单生成失败");
        }
      })
    },
    // 多件支付，创建订单
    manyPay(params) {
      this.$request.post('/goodOrder', params).then(res => {
        this.payFunction(res);
      }).catch(error => {
        if(error.code === 430) {
          Toast("订单生成失败，您的积分不足");
        } else {
          Toast("抱歉，订单生成失败");
        }
      })
    },
    // 支付功能
    payFunction(res) {
      if(res.code === 200) {
       Toast("恭喜您，课程购买成功");
        setTimeout(() => {
           this.$router.push('/order');
         }, 2000);
     } else if(res.msg === 'OK'&&res.code===201) {
       if(this.payway.value === "微信") {
         if(this.isWeiXin()) this.payForWexin(res.out_trade_no);
         else this.payForWexinOut(res.out_trade_no);
       } else {
         if(this.isWeiXin()) Toast('微信内不能使用支付宝支付！');
         else this.payMoney(res.out_trade_no);
       }
     }
    },
    // 判断是否在微信内
    isWeiXin () {
      var ua = window.navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){
          return true;
      }else{
          return false;
      }
    },
    // 获取支付宝接口
    payMoney(orderId) {
        this.$request.get('/alipay/wappay/get?out_trade_no=' + orderId).then(res => {
          this.form = res;
          this.$nextTick(() => {
              document.forms['alipaysubmit'].submit() //渲染支付宝支付页面
          })
        })
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
    // 返回
    back() {
      this.$router.go(-1);
      sessionStorage.removeItem("roder good");
    },
    // 修改地址
    changeAddress() {
      this.$router.push("/address?type=1");
    },
    // 获取收货地址 和 多件商品的数据
    getAddress() {
      this.$request.get("/goodOrder/create").then(data => {
        const { type } = this.$route.query;
        // 多件商品时的数据
        if(!type) {
          this.goods = data.goods;
          // 处理未支付，跳到订单页面
          if(this.goods.length===0) {
            this.$router.push('/myorder?order=1');
            return
          }
          sessionStorage.setItem("roder good", JSON.stringify(data.goods));
          // 处理积分规则数据
          let that = this;
          this.goods.forEach(item => {
            that.goods_integral.integral.push(item.good_discount.积分);
            that.goods_integral.is_repeat_dis.push(item.is_repeat_dis);
            that.jf_id.push(0);
          })
        } 

        // 进入页面，将已有的地址展示到页面
        if (data.address.length === 0) {
          return;
        }
        const default_address = data.address.filter(
          item => item.is_default == 1
        )[0];
        this.selectAddress = default_address;
        if (!default_address) {
          this.selectAddress = data.address[0];
        }
      });
    }
  }
};
</script>
<style lang="css" scoped>
.order >>> .van-cell__title {
  color: #2c2c2c;
  max-width: 100%;
}
</style>
<style lang="scss" scoped>
.van-nav-bar {
  position: fixed;
  top: 0;
}
.add-address {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 49px;
    background-color: #fff;
    color: #A3C554;
    font-size: 13px;
    .van-icon {
        color: #A3C554;
        margin-right: 5px;
    }
    span{
      color: #A3C554;
    }
}
.order {
  width: 100%;
  &-main {
    width: 100%;
    background: #eeeeee;
    font-size: 12px;
    margin-top: 47px;
    margin-bottom: 50px;
    overflow: hidden;
    overflow-y: scroll;
    &-editdefalut {
      width: 100%;
      height: 106px;
      padding-top: 30px;
      background-color: #fff;
      position: relative;
      overflow: hidden;
      display: flex;
      &-p1 {
        position: absolute;
        left: 0;
        top: 0;
        width: 81px;
        height: 17px;
        background: #b3d465;
        margin-top: 4px;
        text-align: center;
        font-size: 11px;
        color: white;
      }
      &-name {
        margin-left: 20px;
        width: 62px;
      }
      &-adress {
        div:nth-child(1) {
          margin-bottom: 17px;
        }
        div:nth-child(2) {
          width: 256px;
        }
      }
      &-icon {
        position: absolute;
        top: 38%;
        right: 3%;
        display: inline-block;
        .van-icon {
          font-size: 24px;
        }
      }
    }
    &-shop {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      background: white;
      margin-top: 3px;
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
          margin-top: 12px;
        }
      }
      &-leave {
        width: 343px;
        height: 29px;
        background: #eeeeee;
        margin: 0 0 13px 16px;
        padding: 12px;
      }
      .jifen-use {
        display: flex;
        align-items: center;
        width: 100%;
        height: 20px;
        padding: 0 16px;
        margin-bottom: 40px;
        font-size: 13px;
        .title {
          width: 78px;
          margin-right: 18px;
          text-align: right;
        }
        &-rules {
          flex: 1;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 20px;
          color: #E02121;
          .van-icon {
            font-size: 15px;
          }
        }
      }
      .subtotal {
        width: 100%;
        padding-right: 28px;
        margin-bottom: 19px;
        text-align: right;
        font-size: 10px;
        .one {
          margin-right: 9px;
          color: #999;
        }
        .num {
          color: #E02121;
        }
        .price {
          color: #96BB3F;
        }
      }
    }
    &-discounts {
      margin-top: 3px;
    }
  }
  .order-foot {
    position: fixed;
    bottom: 0;
    font-size: 11px;
    width: 100%;
    height: 49px;
    display: flex;
    justify-content: space-between;
    color: #999;
    background: white;
    &-message {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 9px 0;
      padding-left: 16px;
      &-p1 {
        font-size: 13px;
      }
    }
    &-pay {
      display: flex;
      align-items: flex-end;
      padding-bottom: 9px;
      font-size: 13px;
      color: #A3C554;
    }
    &-buybtn {
      width: 104px;
      height: 100%;
      text-align: center;
      line-height: 49px;
      font-size: 14px;
      color: white;
      background: #b3d465;
    }
  }
}
.jifen-integral {
  &-use {
    margin-top: 26px;
    margin-bottom: 50px;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
  }
  .button {
    position: absolute;
    left: 16px;
    bottom: 9px;
    width: 343px;
    height: 44px;
    line-height: 44px;
    background-color: #B3D465;
    border-radius: 10px;
    font-size: 14px;
    color: #fff;
    text-align: center;
  }
}
</style>