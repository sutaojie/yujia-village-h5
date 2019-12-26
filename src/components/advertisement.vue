<template>
  <div>
    <header>
      <van-nav-bar title="为您推荐" left-arrow @click-left="goback" fixed>
      </van-nav-bar>
    </header>
    <div>
    <div class="advertmian" v-if="imgs.length !== 0">
      <img v-for="(img, index) in imgs" :key="index" :src="img">
    </div>
    <div v-else class="advertmiantext">
      敬请期待!
    </div>
    </div>
    <footer class="footer">
      <div @click="goAdvertising(mold, relation_id)">查看详情 </div>
    </footer>
  </div>
</template>
<script>
import { goAdvertingApi } from '@/api/main.js'
export default {
  data() {
    return {
      imgs: [],
      mold: '',
      relation_id: '',
    }
  },  
  mounted() {
    this.getadvertisementimg()
  },
  methods: {
    goback(){
        this.$router.go(-1)
    },
    // 广告位跳转
    goAdvertising (mold, relation_id) {
      goAdvertingApi(mold, relation_id)
    },
    getadvertisementimg() {
      this.$request.get(`advertisement/customize/${this.$route.query.id}`).then((res) => {
        this.imgs = res.images
        this.mold = res.mold || ''
        this.relation_id = res.relation_id || ''
      })
    },
  }
}
</script>

<style lang="scss" scope>
body {
  border: 1px solid white;
}
header {
  .van-nav-bar .van-icon {
      vertical-align: middle;
  }
  .van-nav-bar .van-ellipsis {
    height: 40px;
  }
  .van-nav-bar--fixed{
      height: 40px;
      position: fixed!important;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 99 !important;
  }
}
.advertmiantext {
  width: 100%;
  font-size: 14px;
  padding-top: 100px;
  text-align: center;
}
  .advertmian {
    display: inline-block;
    margin-top: 44px;
    width: 100%;
    margin-bottom: 49px;
    img {
      display: block;
      width: 100%;
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
    background: white;
    text-align: center;
    font-size: 16px;
    color: #7BBB62;
    div {
      flex: 1;
      height: 100%;
      font-weight: 900;
    }
  }
</style>