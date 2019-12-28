<template>
  <div id="pay">
    <van-nav-bar title="订单支付" left-arrow @click-left="goback" fixed>
    </van-nav-bar>
    <div v-show="false">
      <div class="payback">
        <div class="payback-count">
          支付成功
        </div>
      </div>
    </div>

    <div class="payon" v-show="true">
      <div class="img">
      </div>
      <p>商品: {{body}}</p>
      <p>订单编号: {{id}}</p>
      <van-button type="primary" size="large" :url="hes" >立即支付</van-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hes: '',
      body: '',
      id: "" 
    }
  },
  created () {
    this.body = this.$route.query.body || ''
    this.hes = this.$route.query.htmls;
    this.id = this.$route.query.id || ''
  },
  methods: {
    goback () {
      this.$router.push('fill-order?type=1')
    },
    shopback () {
      this.$router.push('/store/category')
    },

  },
}
</script>
<style lang="scss" scoped>
.app {
  background: white;
}
.pay {
  width: 100%;
  height: 100%;
  background: white;
}
.payback {
  width: 250px;
  height: 100px;
  border: 5px solid #72e972;
  margin: 0 auto;
  text-align: center;
  line-height: 100px;
  font-size: 18px;
  margin-bottom: 30px;
}
  .payon {
    background: white;
    font-size: 14px;
    .img {
      height: 120px;
      background: url('../../static/img/timg.jpg') no-repeat center / cover;
    }
    p {
      padding: 10px 16px;

    }
  }
  .payfinish {
    width: 80%;
    margin: 10px auto;
    text-align: center;
    border: 1px solid #b8d1b8;
    // line-height: 
    font-size: 14px;
    div {
      border-bottom: 1px solid #72e972;
    }
  }
</style>