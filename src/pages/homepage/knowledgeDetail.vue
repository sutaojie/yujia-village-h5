<template>
  <div class="infordetail">
    <header><van-nav-bar
      title="瑜伽知识"
      left-arrow
      @click-left="onClickLeft"
    >
      <share-ing slot="right"
          type="knowledge"
          @listenToShow="getChildShow"
      ></share-ing>
    </van-nav-bar></header>
    <section>
      <div class="infordetail-count">
        <div class="infordetail-count-title">
          <p class="titlep">{{ detailLists.headline }}</p>
          <div class="infordetail-count-title-remarks"><span><img src="../../../static/img/eye.png"> {{detailLists.views}}</span> <span>{{ createddate }}</span></div>
        </div>
      </div>
      <main class="infordetail-main">
        <div v-html="detailLists.main_body"></div>
      </main>
    </section>

    <Footer v-show="!childShow"></Footer>
  </div>
</template>
<script>
import Vue from 'vue';
import Footer from '../../components/footer'
import { NavBar, Toast } from 'vant';
Vue.use(NavBar).use(Toast);
import shareIng from '../../components/shareing'
export default {
  data() {
    return {
      detailLists: [],
      createddate: '',
      childShow: false
    }
  },
  components: {
    Footer,
    shareIng
  },
  created() {
    this.yujiamation()
  },
  watch: {
    immediate: true,
    getChildShow () {}
  },
  methods: {
    getChildShow (data) {
      this.childShow = data
    },
    onClickLeft() {
      // this.$router.back()
      this.$router.replace('/yoga-knowledge')

    },
    yujiamation () {
      const id = this.$route.params.id
      this.$request.get('knowledgeInfo/' + id).then((res) => {
        this.detailLists = res
        this.createddate = res.created_at.substr(0, 10)
      })
    },
  }
}
</script>
<style lang="scss" scope>
  header {
    height: 44px;
  }
  // 调整分享图片样式
  .van-popup--center img {
    height: 420px;
  }
  .sharepopup .bgc {
    margin-top: 0;
  }
  .sharepopup .sharetext {
    margin-top: 0;
  }
  section {
    width: 100%;
    height: 86%;
    overflow: hidden;
    overflow: auto;
  }
  .share-component {
    margin: 30px auto;
  }
  .infordetail {
    width: 100%;
    height: 100%;
    background: white;
  &-count {
    margin-top: 20px;
    &-title {
      width: 303px;
      height: auto;
      margin: 0 auto;
      text-align: center;
      .titlep {
        width: 215px;
        margin: 0 auto;
        font-size: 16px;
        color: #000000;
        font-weight: 600;
      }
      &-subhead {
        margin-top: 18px;
        font-size: 7px;
      }
      &-remarks {
        display: flex;
        justify-content: space-between;
        font-size: 10px;
        margin-top: 30px;
        img {
          width: 15px;
          height: 11px;
        }
      }
    }
    
  }
  &-main {
    width: 100%;
    padding: 0 16px;
    margin-bottom: 55px;
    p {
      font-size: 14px;
      span {
        font-size: 12px;
        margin-top: 7px;
      }
    }
    img {
      width: 100%;
    }
  }
  }
</style>