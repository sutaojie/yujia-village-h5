<template>
  <div class="shareing">
    <van-icon name="share" @click="shareMessage"></van-icon>
    <van-popup
      v-model="show"
      round
      :style="{ width: '100%', height: 'auto' }"
    >
      <div v-show="!shareimg" class="loading">
          <van-loading color="#7BBB62" size="24px" vertical>加载中...</van-loading>
      </div>
      <div class="sharepopup" v-show="shareimg">
        <img :src="shareimg" class="shareimg">
        <div class="sharetext">长按图片，保存或发送给朋友</div>
        <div class="bgc">
          <img src="../assets/img/fxwenan.png" alt="" @click="getWenan">
        </div>
      </div>
    </van-popup>
    <van-popup class="popup" v-model="wenanIsShow" round closeable position="bottom"
      :style="{ height: '80%' }">
        <div class="wenan-title">选择分享文案</div>
        <div class="wenan-box">
            <div class="wenan-box-item" v-for="(item,index) in wenanData" :key="index" 
            @click="selectItem(item.content)">{{item.content}}</div>
        </div>
        <button id="copy" v-clipboard:copy="copy_content" 
            v-clipboard:success="onCopy"  v-clipboard:error="onError">一键复制</button>
    </van-popup>
  </div>
</template>
<script>
import Vue from 'vue';
import { mapGetters } from "vuex";
import {  Toast, Popup } from 'vant';
Vue.use(Toast).use(Popup);
export default {
  name: 'shareing',
  props: ['type'],
  data () {
    return {
      shareimg: '',
      show: false,
      // 是否展示文案
      wenanIsShow: false,
      // 文案数据
      wenanData: [],
      // 复制的内容
      copy_content: '',
      code: ''
    }
  },
  computed: {
    ...mapGetters(["info", "isUserNeedLogin"]),
  },
  updated() {
      if (this.type === 'information' || 
          this.type === 'knowledge'   ||
          this.type === 'good'        ||
          this.type === 'train'
      ) {
        this.$emit('listenToShow', this.show)
      }
  },
  methods: {
    // 判断参数
    check() {
      if(this.type === 'club') {
        this.code = 3;
      } else if(this.type === 'teacher') {
        this.code = 4;
      } else if(this.type === 'train') {
        this.code = 2;
      } else if(this.type === 'knowledge') {
        this.code = 5;
      } else if(this.type === 'information') {
        this.code = 5;
      } else if(this.type === 'person') {
        this.code = 1;
      } else {
        this.code = 6;
      }
    },
    shareMessage () {
      this.check();
      if(!JSON.parse(sessionStorage.getItem("user")) &&
        (this.type == 'good'  || this.type === "train")
      ) {
        this.$router.push('/login')
        this.$toast('请登录')
        return;
      }
      this.show = true
      var params = {
          id: this.$route.query.id || this.$route.params.id || this.$route.params.goods_id,
          identity: this.type,
          userId:  sessionStorage.getItem('user')? JSON.parse(sessionStorage.getItem('user')).id : '',
          responseType: 'arraybuffer'
      }
      this.$request.post(`/show/share/photo`, params).then(res => {
        this.shareimg = res;
      })
    },
    // 获取文案
    getWenan() {
        this.wenanIsShow = true;
        this.$request.get('/personal/share/word/'+this.code).then(res => {
            this.wenanData = res;
        })
    },
     // 选中文案
      selectItem(copy_content) {
          this.copy_content = copy_content;
      },
      // 复制成功
      onCopy:function(e){
          Toast("复制成功！");
      },
      onError:function(e){
          Toast("复制失败！");
      },
  },
}
</script>
<style lang="scss" scoped>
.van-nav-bar .van-icon {
    vertical-align: middle;
}
.share_img{
  line-height: 0px;
  margin-top: -34px;
  .share{
      width: 22px;
      height: 22px;
  }
}
.sharepopup {
  .shareimg {
    // height: 485px;
    margin: 0 auto;
    // margin-left: 27px;
  }
  .sharetext {
    text-align: center;
    font-size: 12px;
  }
  .bgc {
    width: 100%;
    height: 58px;
    background-color: #fff;
    text-align: center;
    img {
    width: 79px;
    height: 58px;
    vertical-align: top;
    padding: 0;
    }
  }
}
.van-popup--center{
  width: 100%;
  border-radius: 15px;
  img {
    width: 100%;
  }
}
.textbase{
  width: 100%;
  height: 60px;
  background: #fff;
  font-size: 12px;
  color: #2c2c2c;
  text-align: center;
  line-height: 50px;
}
.loading {
  width: 60px;
  height: 30px;
  margin: 52% auto;
}
.popup {
/deep/ .van-icon {
  position: absolute;
  top: 12px;
  font-size: 18px;
  color: #2c2c2c;
}
.wenan-title {
  margin: 10px 0;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
}
.wenan-box {
  position: absolute;
  top: 56px;
  left: 16px;
  bottom: 64px;
  width: 343px;
  padding: 10px;
  background-color: #eee;
  overflow: scroll;
  &-item {
    width: 100%;
    padding: 8px 10px;
    margin-bottom: 13px;
    background-color: #ddd;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 600;
  }
  &-item:hover {
    box-sizing: border-box;
    background-color: #eefaed;
    border: 1px solid #7BBB62;
  }
}
#copy {
  position: absolute;
  left: 16px;
  bottom: 10px;
  width: 343px;
  height: 44px;
  line-height: 44px;
  background-color: #7BBB62;
  border-radius: 22px;
  border: none;
  text-align: center;
  font-size: 16px;
  color: #fff;
}
}
</style>