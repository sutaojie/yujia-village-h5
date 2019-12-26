<template>
  <div class="message">
    <main class="message-main">
      <div class="message-head">
        <div class="advertising" v-if="swiper">
          <img :src="swiper.path" @click="goAdvertising(swiper.mold, swiper.relation_id)">
        </div>
        <ul class="message-main-head">
          <li :class="{'changeweight': isActive == '0' }"> 找到以下结果</li>
          <li @click="defaultRank('default')" :class="{'changeweight': isActive == '1' }"> 默认排序</li>
          <li @click="hostRank('host')" :class="{'changeweight': isActive == '2' }">热度</li>
          <li @click="priceRank('price')" :class="{'changeweight': isActive == '3' }">价格 
            <!-- <span> -->
              <van-icon name='arrow-up' v-show="priceFlag "/>
              <van-icon name='arrow-down' v-show="!priceFlag"/>
            <!-- </span> -->
          </li>
          <li class="head-list" is-link @click="isShow = true">筛选</li>
          <!-- <li>价格 ∨</li> -->
        </ul>
      </div>
      <div class="shade-layer" v-show="isShow" @click="isShow = false">
        <div class="right-box" @click.stop="" >
          <div class="popup">
            <p>理想价格</p>
            <div class="popup-price"> 
              <input type="number" v-model="minprice" placeholder="0"> — 
              <input type="number" v-model="maxprice" placeholder="50000">
            </div>
            <div class="popup-time">
              <p>开课时间</p>
              <div class="choose-time"> 
                <div is-link class="time-select" @click="showPopup('startTime')">{{ selectTime.startTime || '请选择'}}</div>
                <span>-</span> 
                <div is-link class="time-select" @click="showPopup('endTime')">{{ selectTime.endTime || '请选择'}}</div>
              </div>     
            </div>
            <div class="popup-diff"> 
              <p>难度</p>
              <div style="width = 100%">
                <!-- <van-rate v-model='stardiff' color='#58B708' void-icon="star" void-color="#eee" :count="5" touchable/> -->
                <ul class="diff">
                  <li :class="{'diffbg': stardiff == 1 }" @click="changediff('1')">1级</li>
                  <li :class="{'diffbg': stardiff == 2 }" @click="changediff('2')">2级</li>
                  <li :class="{'diffbg': stardiff == 3 }" @click="changediff('3')">3级</li>
                  <li :class="{'diffbg': stardiff == 4 }" @click="changediff('4')">4级</li>
                  <li :class="{'diffbg': stardiff == 5 }" @click="changediff('5')">5级</li>
                </ul>
              </div>
            </div>
            <div class="area">
              <p>地区选择</p>
              <div class="area-box" @click="showPopup('area')">
                <div is-link  class="area-select">{{ selectArea.province || '请选择'}}</div>
                <span>-</span>
                <div is-link  class="area-select">{{ selectArea.city || '请选择'}}</div>
                <span>-</span>
                <div is-link  class="area-select">{{ selectArea.area || '请选择'}}</div>
              </div>
            </div>
            <div class="types">
              <p>适用类别</p>
              <ul class="types-container">
                <li
                  v-for="(list, index) in classfly" 
                  :key="list.id" 
                  @click="selected2(list ,index)"
                  :class="{'bgcolor':spanIndex2.indexOf(index)>-1}"
                >{{ list.name }}</li>
              </ul>
            </div>
          </div>
          <div class="button">
              <div class="reset" @click="resetlist">重置</div>
              <div class="sure" @click="searchResult('confirm')">确定</div>
          </div>
        </div>
      </div>  
      <van-popup v-model="isShowPopup" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker v-if="timeOpen"
          v-model="currentDate"
          type="date"
          :min-date="minDate"
          @confirm="selectDate"
          @cancel="isShowPopup = false"
        />
        <van-area v-if="areaisOpen"
          :area-list="areaList"
          @confirm="changeArea" 
          @cancel="isShowPopup = false"
          :columns-placeholder="['请选择', '请选择', '请选择']"
        />
      </van-popup>
      <div class="message-main-container" :style="swiper? 'padding-top: 80px': 'padding-top: 40px'" ref="sectionbox" >
          <div class="message-main-container-list" v-show="messageLists.length > 0" >
            <div class="message-main-container-list-count" v-for="(list, index) in messageLists" :key="list.id" @click="viewdetail(list.id)">
              <div class="message-main-container-list-count-img" :style="{ 'background-image': 'url(' + list.teacher_img + ')','background-repeat':'no-repeat','background-size':'cover' }">
                <!-- <img :src="list.teacher_img"> -->
              </div>
              <div class="message-main-container-list-count-text">
                <h6 class="p1">{{ list.theme }}</h6>
                <p class="areap">{{ list.custom_address }}</p>
                <p class="p2">
                  <span class="pprice">￥{{ list.price }}</span>
                  <span class="pdiff">难度： {{ list.diff }}</span> 
                </p>
                <p class="time">{{list.startTime}}~{{list.endTime}}</p>
                <div class="p4">
                  <span class="p4-hand">观看   {{ list.views  }}</span>
                  <span class="p4-eye">想学   {{ list.follow }}</span>
                </div>
                <button v-if="parseInt(list.is_prais) === 1" class="wantbtn" @click.stop="cancelStudy(list.id, index)">取消</button>
                <button v-else class="wantbtn" @click.stop="study(list.id, index)">想学</button>
              </div>
            </div>
          </div>
          <div v-show="messageLists.length === 0" class="defaultpage">
            <img src="../../../static/img/defaultpage.png">
            <span>没有发现哦(╯▽╰)</span>
          </div>
      </div>
    </main>
  </div>
</template>

<script>
import Vue from 'vue';
import areaList from '../market/goods/area_list'
import { mapGetters } from "vuex"
import { goAdvertingApi } from '@/api/main'
import { PullRefresh, Toast } from 'vant';
// import { mapGetters } from "vuex";
Vue.use(PullRefresh)

import {
  getFollowTrain
} from "../../../api/personal";
export default {
  data() {
    return {
      areaList,
      messageLists: [],
      classfly: [],
      isActive: '1',
      selectArea: {
        province: "",
        city: "",
        area: ""
      },
      selectTime: {
        startTime: '',
        endTime: ''
      },
      // 确定选择的时间选择框
      word: '',
      // 时间弹框的初始化时间
      currentDate: new Date(),
      minDate: new Date(),
      // 弹出层的显示与否
      isShowPopup: false,
      timeOpen: false,
      areaisOpen: false,
      // 筛选确定的状态字符
      confirm: '',
      minprice: '',
      maxprice: '',
      selectTags: [],
      selectTtype: [],
      spanIndex2: [],
      page: 1,
      pages: 1,
      stardiff: '',
      isLoading: false,
      isShow: false,
      fruit: {
        data: []
      },
      fruitclasslist: [],
      newList: [],
      // 排序关键字
      keyWord: '',
      // 控制价格排序的 flag
      priceFlag: 1,
      categoryIndex: -1,
      swiper: false, // 广告位1
      advertis2: {}, // 广告位2
      advertis3: {} // // 广告位2
    }
  },
  computed: {
    ...mapGetters(["info", "isUserNeedLogin"]),
  },
  created() {
    this.messagetypeList()
    this.getAdvertising()
  },
  activated () {
    this.$refs.sectionbox.scrollTop = sessionStorage.getItem('scrollTop')
  },
  beforeRouteLeave (to, from, next) {
    const changeKeepAlive = (parentName, name, keepAlive) => {
      this.$router.options.routes.map((item) => {
        // console.log(item);
        if(item && item.children) {
          item.children.map(sub_item => {
            if (sub_item.name === parentName || sub_item.name === name) {
              sub_item.meta.keepAlive = keepAlive
            }
          })
        }
      })
    }
    if (to.name === 'messagedetail') {
      changeKeepAlive('', 'yogamessage list', true)
    } else {
      changeKeepAlive('', 'yogamessage list', false)
      sessionStorage.setItem('scrollTop', 0)
    }
    next()
  },
  mounted () {
    setTimeout(() => {
      if(this.isUserNeedLogin) {
        this.messageList()
      } else {
        this.loginMessageList()
      }
    }, 200)
    this.PullUpReload()
  },
  methods: {
    // 广告位
    goAdvertising (mold, relation_id) {
      goAdvertingApi(mold, relation_id)
    },
    getAdvertising () {
      return this.$request.get('/advertisement/data/' + 2).then((res) => {
      if (res[0]) {
        this.swiper = res[0].advertisement[0]
      }
    })
    },
    // 地址遮罩层
    showPopup (word) {
      this.isShowPopup = true
      if(word === 'area') {
        this.areaisOpen = true;
        this.timeOpen = false;
      } else {
        this.timeOpen = true;
        this.areaisOpen = false;
        this.word = word;
      }
    },
    // 选择难度
    changediff (num) {
      this.stardiff = num
    },
    messagetypeList () {
      this.$request.get('trains/type').then((res) => {
        this.classfly = res.course_types
      })
    },
    // 重置按钮功能
    resetlist () {
        this.selectArea.province = "";
        this.selectArea.city = "";
        this.selectArea.area = "";
        this.stardiff = ''; // 难度,整数,小于10
        this.selectTtype = [];
        this.spanIndex2 = [];
        this.minprice = '';
        this.maxprice = '';
        this.selectTime.startTime = '',
        this.selectTime.endTime = ''
    },
    selectDate(value) {
      const date = this.changDate(value);
      if(this.word === 'startTime') {
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
      m = m < 10 ? '0' + m : m;  
      var d = date.getDate();  
      d = d < 10 ? ('0' + d) : d;  
      return y + '-' + m + '-' + d; 
    },
    // 地址选择
    changeArea (value) {
      this.selectArea = {
        province:  value[0].name,
        city: value[1]?value[1].name: '',
        area: value[2]?value[2].name: ''
      }
      const tag = {
        val: {
        province:  value[0].name,
        city: value[1]?value[1].name: '',
        area: value[2]?value[2].name: ''
        },
        type: 'area',
        isArray: false,
        name: `${this.selectArea.province} ${this.selectArea.city} ${this.selectArea.area}`
      };
      this.isShowPopup = false
      tag.val.length > 1 && this.selectedarea(tag);
    },
    selectedarea (item) {
      if (item.isArray) {
        this.selectTags.push(item.val);
        return;
      }
    },
    // 点击li跳转到详情页
    viewdetail (id) {
      let sectionboxScrollTop = this.$refs.sectionbox.scrollTop
      sessionStorage.setItem('scrollTop', sectionboxScrollTop)

      this.$router.push('/messagedetail/'+id)
      return false;
    },
    // 获取列表
    messageList (page = 1) {
       if(this.$route.query.id) {
          this.classfly.map((item, index) =>{if(item.id == this.$route.query.id){ this.spanIndex2.push(index)} })
          this.selectTtype.push(Number(this.$route.query.id))
          this.searchResult('confirm')
      } else {
        this.$request.post('trains?page=' + page,{time: false}).then((res) => {
          this.fenye(this.pages, res);
        })
      }
    },
    //登陆成功之后 获取列表
    loginMessageList (page = 1) {
       if(this.$route.query.id) {
          this.classfly.map((item, index) =>{if(item.id == this.$route.query.id){ this.spanIndex2.push(index)} })
          this.selectTtype.push(Number(this.$route.query.id))
          this.searchResult('confirm')
      } else {
        this.$request.get('/trains/index/login?page=' + page,{time: false}).then((res) => {
          this.fenye(this.pages, res);
        })
      }
    },
    fenye(page, res) {
      if (page <= res.last_page ) {
          res.data.map((item) => {
            item.startTime = item.startTime.replace(/-/g,'.');
            item.endTime = item.endTime.replace(/-/g,'.');
            this.messageLists.push(item);
          })
          window.sessionStorage.setItem('message',JSON.stringify(this.messageLists));
        } else {
          Toast('只有这么多了');
        }
    },
    cancelStudy(id, index) {

      this.wantStudy(id)
        .then(() => {
          this.$set(this.messageLists, index, {...this.messageLists[index], is_prais: 0})
        })
    },
    // 我想学的操作
    study(id, index) {
      if (!JSON.parse(sessionStorage.getItem("user"))) {
        this.$router.push('/login')
        Toast('请登录')
        return;
      }
      this.wantStudy(id)
        .then(() => {
          this.$set(this.messageLists, index, {...this.messageLists[index], is_prais: 1})
        })
      return false;
    },
    wantStudy(id) {
      // 调用我想学接口
      return getFollowTrain(id)
        .then(data => {
          const {status} = data
          if(parseInt(status) === 1) {
            Toast('已添加至我的收藏');
          }
          if(parseInt(status) === 0) {
            Toast('取消成功');
          }
        })
    },
    // 下拉刷新
    // 上拉加载更多
    PullUpReload () {
      var _this = this
      var isScroll = false  // 函数截流
      document.querySelector('.message-main-container').onscroll = function() {
        if (isScroll) {
          setTimeout(() => {
            isScroll = false
          }, 50)
        } else {
          let innerHeight = document.querySelector('.message-main-container').clientHeight // 容器高度
          let outerHeight = document.querySelector('.message-main-container').scrollHeight // 容器高+滚动高
          let scrollTop = document.querySelector('.message-main-container').scrollTop  // 滚动高
          if (innerHeight + scrollTop >= outerHeight ) {
            _this.pages++
            if(_this.keyWord !== '') {
              // 排序
              _this.getRank(_this.pages,_this.getFiltersParams(_this.keyWord));
            } else if(_this.confirm === 'confirm') {
              // 条件筛选
              _this.getConditiondata(_this.pages, _this.getFiltersParams())
            } else {
              if(_this.isUserNeedLogin) {
                _this.messageList(_this.pages);
              } else {
                _this.loginMessageList(_this.pages)
              }
            }
            isScroll = true
          }
        }
      }
    },
    
    // 选择功能
    selected2 (item, index) {
      let selectTag = this.selectTtype.indexOf(item.id)
      if (this.selectTtype.indexOf(item.id) > -1) {
        this.selectTtype.splice(selectTag, 1)
      } else {
        this.selectTtype.push(item.id)
      }

      let arrIndex2 = this.spanIndex2.indexOf(index);
      if (this.spanIndex2.indexOf(index) > -1) {
        this.spanIndex2.splice(arrIndex2,1)
      } else {
        this.spanIndex2.push(index)
      }
    },
    // 条件筛选功能
    searchResult(confirm, page = 1) {
      this.confirm = confirm;
      this.pages = 1;
      this.messageLists = [];
      var word = this.keyWord;
      this.keyWord = '';
      this.getConditiondata(page, this.getRankParams(word));
    },
    // 获取条件筛选的数据
    getConditiondata(page =1, params) {
       if(this.isUserNeedLogin) {
        this.conditionQuery(page, params);
      } else {
        this.loginConditionQuery(page, params)
      }
    },
    getFiltersParams (params = {}) {
      params = {
        startTime: this.selectTime.startTime,
        endTime: this.selectTime.endTime,
        minPrice: parseInt(this.minprice),
        maxPrice: parseInt(this.maxprice),
        province: this.selectArea.province || "",
        city: this.selectArea.city || "",
        area: this.selectArea.area || "",
        diff: this.stardiff, // 难度,整数,小于10
        course_type_id: this.selectTtype || [],
      }
      return params;
    },
    // 排序请求
    getRank (page, params) {
      if(this.isUserNeedLogin) {
        this.conditionQuery(page, params);
      } else {
        this.loginConditionQuery(page, params)
      }
    },
    // 课程筛选
    conditionQuery(page, params) {
      this.$request.post('/trains?page=' + page, params).then(res => {
        if(res) {
          this.fenye(page, res);
          this.isShow = false;
          if(this.keyWord === '') {
            this.isActive = '0';
          }
        } 
      }).catch(error => {
        if(error.code == 422 && error.msg === 'max price 字段是必须的当 min price 是存在的') {
          Toast('请输入最大价格');
        } else if(error.code == 422 && error.msg === 'min price 字段是必须的当 max price 是存在的') {
          Toast('请输入最低价格');
        } else if(error.code == 422 && error.msg === 'end time 字段是必须的当 start time 是存在的') {
          Toast('请输入截止时间');
        } else if(error.code == 422 && error.msg === 'start time 字段是必须的当 end time 是存在的') {
          Toast('请输入起始时间');
        } else if(error.code == 422 && error.msg === 'end time 必须是 start time 之后的一个日期') {
          Toast('时间选择有误，请重新选择');
        }
        // 处理筛选失败时，数据为空的情况
        this.messageLists = JSON.parse(window.sessionStorage.getItem('message'));
      }) 
    },
    // 课程筛选
    loginConditionQuery(page, params) {
      this.$request.post('/trains/store/login?page=' + page, params).then(res => {
        if(res) {
          this.fenye(page, res);
          this.isShow = false;
          if(this.keyWord === '') {
            this.isActive = '0';
          }
        } 
      }).catch(error => {
        if(error.code == 422 && error.msg === 'max price 字段是必须的当 min price 是存在的') {
          Toast('请输入最大价格');
        } else if(error.code == 422 && error.msg === 'min price 字段是必须的当 max price 是存在的') {
          Toast('请输入最低价格');
        } else if(error.code == 422 && error.msg === 'end time 字段是必须的当 start time 是存在的') {
          Toast('请输入截止时间');
        } else if(error.code == 422 && error.msg === 'start time 字段是必须的当 end time 是存在的') {
          Toast('请输入起始时间');
        } else if(error.code == 422 && error.msg === 'end time 必须是 start time 之后的一个日期') {
          Toast('时间选择有误，请重新选择');
        }
        // 处理筛选失败时，数据为空的情况
        this.messageLists = JSON.parse(window.sessionStorage.getItem('message'));
      }) 
    },
    // 排序传递的参数
    getRankParams (keyWord, params = {}) {
      params = this.getFiltersParams()
      if (keyWord === 'host') {
        params =Object.assign({}, params, {follow: false})
      } else if (keyWord === 'default') { 
        params = Object.assign({}, params, {time: false})
      } else if(keyWord === 'price') {
        if(this.priceFlag) {
          params = Object.assign({}, params, {money: true})
        } else {
          params = Object.assign({}, params, {money: false})
        }
      } else {
        return params
      }
      return params
    },
    // 价格排序
    priceRank (keyWord, page = 1) {
      this.isActive = '3'
      this.keyWord = keyWord;
      this.pages = 1;
      this.messageLists = [];
      if(this.priceFlag === 1) {
        this.priceFlag = true;
      } else {
        this.priceFlag = !this.priceFlag
      }
      this.getRank(page, this.getRankParams(keyWord))
    },
    // 默认排序
    defaultRank (keyWord, page = 1) {
      this.isActive = '1'
      this.keyWord = keyWord;
      this.pages = 1;
      this.messageLists = [];
      this.getRank(page, this.getRankParams(keyWord))
    },
    // 热度排序
    hostRank (keyWord, page = 1) {
      this.isActive = '2'
      this.keyWord = keyWord;
      this.pages = 1;
      this.messageLists = [];
      this.getRank(page, this.getRankParams(keyWord))
    },
  }
}
</script>

<style lang="scss" scope>
// 切换的样式
.bgcolor {
  background: #7BBB62;
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
          left: 25px;
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
      background-color: rgba(0,0,0,.7);
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
              border: 1px solid #E5E5E5;
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
                border: 1px solid #E5E5E5;
                border-radius: 15px;
                text-align: center;
                line-height: 29px;
              }
            }
            
          }
          .popup-diff {
            margin-top:10px;
            p {
              padding-bottom: 10px; 
            }
            .diff {
              height: 20px;
              display: flex;
              font-size: 12px;
              .diffbg {
                color: #7BBB62;
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
              border: 1px solid #E5E5E5;
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
                margin-top:10px;
                margin-right: 15px;
                border: 1px solid #E5E5E5;
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
            background: #FFFFFF;
            color: #999999;
            border-radius: 0px 0px 0px 20px;
          }
          .sure {
            background: #B3D465;
            color: white;
          }
        }
      }
    }
    
    &-container {
      flex: 1;
      height: 100%;
      padding-top: 40px;
      // overflow: auto;
      overflow-x: hidden;
      overflow-y: scroll;
      &-list {
        width: 100%;
        background: #EEEEEE;
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
              overflow:hidden;
              text-overflow:ellipsis;
              white-space:nowrap;
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
                color: #D71010;
                font-size: 14px;
                font-weight: 700;
              }
              .pdiff {
                color: #BC866F;
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
              background: #7BBB62;
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