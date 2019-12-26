<template>
  <div class="wrap">
    <van-nav-bar title="支付结果" left-arrow @click-left="back"></van-nav-bar>
    <div class="order_body">
      <div class="pay_success">
        <div class="title">
          <span class="title-msg">{{ msg }}</span>
        </div>
        <span class="tips">{{ ordermsg }}</span>
        <div class="actions">
          <span class="see_order" @click="viewOrder">查看订单</span>
          <span class="go_on"  @click="goOn">继续逛</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { log } from 'util';
export default {
  data() {
    return {
      msg: '支付成功',
      ordermsg: '感谢您的光顾，宝贝一定准时送到府上！',
    };
  },
  // 展示价格为 0 时，支付成功的状态
  beforeRouteEnter: (to, from, next) => {
    if(from.path === '/fillorder')
    next(() => {
      this.msg = '支付成功'
    })
    next()
  },
  created() {
      var params = this.$route.query;
      if(params.out_trade_no) {
        this.getOrderStatus(params.out_trade_no);
      } else {
        this.msg = '您已取消支付，请尽快到订单页面支付哟~~~';
      }
  },
  methods: {
    back() {
      this.$router.push('/store/category');
    },
    viewOrder() {
      this.$router.push('/myorder')
    },
    goOn() {
      this.$router.push('/store/category')
    },
    getOrderStatus(orderId) {
      this.$request.post('/getOrderStatus', { out_trade_no: orderId }).then(res => {
        console.log(res);
        this.msg = res.msg
        if( res.msg == '支付成功' ) this.ordermsg = '感谢您的光顾，宝贝一定准时送到府上！';
        else if (res.msg == '支付失败') this.ordermsg = '失败了！请重新购买';
        else if (res.msg == '暂未支付') this.ordermsg = '请尽快完成订单哦~~~';
      })
    }
  }
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  border: 0;
  box-sizing: border-box;
  font-size: 13px;
  color: #2c2c2c;
  max-width: 100%;
}
.wrap {
  background: #fff;
  .order_body {
    padding: 40px 0;
    .pay_success {
      .title {
        width: 290px;
        height: 85px;
        margin: 0 auto;
        border: 3px solid #B3D465;
        padding: 20px 0;
        text-align: center;
        .title-msg {
          width: 100%;
          margin-top: 10px;
          font-size: 14px;
          color: #2C2C2C;
          font-weight: bolder;
          display: inline-block;
        }
        &-integral {
          margin-top: 10px;
          .span1 {
            color: #B3D465;
            font-size: 16px;
          }
        }
      }
      .tips {
        padding-top: 10px;
        display: inline-block;
        width: 100%;
        font-size: 12px;
        color: #999999;
        text-align: center;
      }
      .actions {
        padding-top: 10px;
        width: 290px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        .see_order, .go_on {
          display: inline-block;
          border:1px solid #EEEEEE;
          border-radius: 5px;
          padding: 8px 26px;
        }
        .go_on {
        }
      }
    }
  }
}
</style>