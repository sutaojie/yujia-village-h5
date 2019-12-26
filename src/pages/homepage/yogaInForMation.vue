<template>
<div class="mymation">
  <van-nav-bar title="瑜伽资讯" left-arrow @click-left="onClickLeft">
  </van-nav-bar>
  <div class="information">
    <div class="information-banner">
      <img :src="classifyLists.banner" v-if="!swiper"/>
      <img :src="swiper? swiper.path: ''" v-else  @click="goAdvertising(swiper.mold, swiper.relation_id)">
    </div>
    <div class="information-nav">
      <ul class="information-nav-list">
        <li 
          v-for="(list, index) in classifyLists.classify" 
          :key="list.id"
          @click="changestyle(list.id, index)"
          :class="{'active':spanIndex == index}"
        >
          <img :src="list.img"><p>{{ list.classify }}</p>
        </li>
      </ul>
    </div>
    <main class="information-main">
      <div class="watefullbox" ref="box" >
        <div class="information-main-count" v-for="(list, index) in informationLists" :key="index" @click="viewdetail(list.id)" ref="boxchildren">
          <div class="information-main-count-img"><img :src="list.icon_url"></div>
          <div class="information-main-count-text">
            <p>{{ list.headline }}</p>
            <div>
              <span>{{ list.type }}</span>
              <span class="eyebox"><img src="../../../static/img/eye.png" class="eyeimg"><span>{{ list.views }}</span></span>
            </div>
          </div>
        </div>
      </div>
      <div class="morebtn" @click="loadmore">
        {{ current_page >= last_page? informationLists.length > 0? "": "没有这个哦！" : ""}}
      </div>
    </main>
  </div>
</div>

</template>
<script>
import Vue from 'vue';
import { Button, Toast } from 'vant';
import { goAdvertingApi } from '@/services/api/main'

Vue.use(Button).use(Toast);
export default {
  data() {
    return {
      classifyLists: [],
      typeid: 0,
      informationLists: [],
      spanIndex: 0,
      current_page: 1,
      current_to: 0,
      last_page: 2,
      showLoading: false,
      classifyImg: [
        {
          img: require('../../../static/img/mationclassfiy/recommend.png')
        },
        {
          img: require('../../../static/img/mationclassfiy/all.png')
        },
        {
          img: require('../../../static/img/mationclassfiy/mation.png')
        },
        {
          img: require('../../../static/img/mationclassfiy/news.png')
        },
        {
          img: require('../../../static/img/mationclassfiy/star.png')
        },
        {
          img: require('../../../static/img/mationclassfiy/hot.png')
        },
      ],
      swiper: {},
      advertis2: {}, // 广告位2
    }
  },
  mounted () {
    this.PullUpReload()
    this.mationdata()
  },
  created() {
    this.InformationClassify()
    this.getAdvertising()
  },
  methods: {
    // 广告位
    goAdvertising (mold, relation_id) {
      goAdvertingApi(mold, relation_id)
    },
    getAdvertising () {
      return this.$request.get('/advertisement/data/' + 4).then((res) => {
      var reswiper = res.filter(((item) => item.position === 0))[0]
      this.swiper = reswiper? reswiper.advertisement[0] :''
    })
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    viewdetail (id) {
      this.$router.push('/information-detail/' + id)
    },
    // li选中变色
    changestyle (id, index) {
      this.spanIndex = index
      this.typeid = id
      this.current_page = 1
      this.informationLists = []
      this.mationdata()
    },
    InformationClassify () {
      this.$request.get('InformationClassify').then((res) => {
        this.classifyLists = res
        // 将本地图片加入到data数组中
        this.classifyLists.classify.map((list, index) => {
          return list.img = this.classifyImg[index].img
        })
      })
    },
    
    // 上拉加载
    PullUpReload () {
      var _this = this
      var isScroll = false  // 函数截流
      document.querySelector('.information').onscroll = function() {
      if (isScroll) {
        setTimeout(() => {
          isScroll = false
        },50)
      } else {
        let innerHeight = document.querySelector('.information').clientHeight // 容器高度
        let outerHeight = document.querySelector('.information').scrollHeight // 容器高+滚动高
        let scrollTop = document.querySelector('.information').scrollTop  // 滚动高
        _this.waterFall(_this.$refs.box)
        if (innerHeight + scrollTop >= outerHeight) {
          _this.current_page > _this.last_page? '': _this.current_page++
          _this.mationdata()
          isScroll = true
        }
      }
      }
    },
    // 加载更多
  loadmore () {
    this.current_page > this.last_page? '': this.current_page++
    this.mationdata()
  },
  mationdata(){
  let _this = this;
  this.$request(`/informationList/${_this.typeid}?page=${_this.current_page}`).then(res => {
    res.data.map((item) => {
      _this.informationLists.push(item)
    })
    _this.current_page = res.current_page
    _this.last_page = res.last_page
    if(_this.current_page > _this.last_page) {
      _this.current_page = res.last_page
      Toast('没有更多了哦')
    }
  }).then(() => {
    this.$nextTick(() => {
      setTimeout(() => {
        this.waterFall(this.$refs.box)
      }, 150)
    })
  })
  },
    waterFall(parent) { // 瀑布流
        var items = parent.children;
        var gap = 10; // 定义每一列之间的间隙 为10像素
        var pad = 10;
        if (items[0]) {
          var pageWidth = parent.offsetWidth;
          var itemWidth = items[0].offsetWidth;
          var columns = parseInt(pageWidth / (itemWidth + gap));
          var arr = [];
          for (var i = 0; i < items.length; i++) {
            if (i < columns) {
              items[i].style.top = 0;
              items[i].style.left = (itemWidth + gap) * i + 'px';
              arr.push(items[i].offsetHeight);
            } else {
              var minHeight = arr[0];
              var index = 0;
              for (var j = 0; j < arr.length; j++) {
                if (minHeight > arr[j]) {
                  minHeight = arr[j];
                  index = j;
                }
              }
              // 4- 设置下一行的第一个盒子位置
              // top值就是最小列的高度 + gap
              items[i].style.top = arr[index] + gap + 'px';
              // left值就是最小列距离左边的距离
              items[i].style.left = items[index].offsetLeft + 'px';
              // 5- 修改最小列的高度 
              // 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度
              arr[index] = arr[index] + items[i].offsetHeight + gap;
          }
        }

        
        }
    }
  }
}
</script>
<style lang="scss" scoped>
.van-nav-bar {
  position: fixed;
  top: 0;
  // height: 44px;
}
.active {
  color: #7BBB62;
}
.mymation {
  height: 100%;
  display: flex;
  background: white;
}
.information {
  flex: 1;
  width: 100%;
  margin-top: 45px;
  overflow: auto;
  &-banner {
    width: 100%;
    height: 170px;
    border: none;
    img {
      width: 100%;
      height: 100%;
    }
  }
  &-nav {
    width: 100%;
    height: 49px;
    &-list::-webkit-scrollbar{
    display: none;
    }
    &-list {
      width: auto;
      height: 49px;
      overflow-x: auto;
      display: flex;
      li {
        width: 60px;
        height: 100%;
        white-space: nowrap;
        height: 42px;
        text-align: center;
        font-size: 12px;
        margin-right: 26px;
        img {
          width: 22px;
          height: 22px;
          margin-top: 5px;
        }
        p {
          width: 60px;
        }
      }
    }
  }
  &-main {
    width: 100%;
    height: auto;
    .watefullbox {
      // -moz-column-count:2; /* Firefox */
      // -webkit-column-count:2; /* Safari 和 Chrome */
      // column-count:2;
      // -moz-column-gap: 12px;
      // -webkit-column-gap: 12px;
      // column-gap: 12px;
      width: 97%;
      margin-left: 11px;
      height: auto;
      position: relative;
      margin-top: 5px;
      .information-main-count {
        width: 170px;
        position: absolute;
        // -moz-page-break-inside: avoid;
        // -webkit-column-break-inside: avoid;
        // break-inside: avoid;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0px 1px 4px rgba(0,0,0,0.3),
                0px 0px 20px rgba(0,0,0,0.1) inset;
        &-img {
          width: 100%;
          background: white;
        }
        &-text {
          height: 62px;
          padding: 0 8px;
          background: white;
          p {
            font-size: 16px;
            width: 70%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          div {
            margin-top: 12px;
            display: flex;
            justify-content: space-between;
            span {
              font-size: 12px;
              color: #999999;
              float: left;
            }
            .eyebox {
              height: 16px;
              line-height: 16px;
              .eyeimg {
                display: block;
                width: 15px;
                height: 12px;
                margin-top: 2px;
                margin-right: 4px;
                float: left;
              }
            }

          }
        }
      }
    }
    .morebtn {
      width: 100%;
      height: 25px;
      text-align: center;
      font-size: 12px;
      color: #999999;
      line-height: 25px;
    //   .van-button {
    //     height: 44px;
    //   }
    }
  }
}
</style>