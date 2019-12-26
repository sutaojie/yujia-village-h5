<template>
  <div>
    <!-- <div class="head-top">
      <form action="/">
        <van-search
          placeholder="商品名称/关键词搜索"
          shape="round"
          clearable
          @focus="goSearch"
        />
      </form>
      <img class="search" src="../../assets/img/search.png" alt="">
      <img class="shopping-bag" src="../../assets/img/shopping.png" alt="">
    </div> -->
    <van-nav-bar title="商城" left-arrow @click-left="back" >
      <img class="img" slot="right" src="../../assets/img/shopping.png" @click="goShopBag"/>
    </van-nav-bar>
    <div class="content">
      <div class="goods">
        <div class="goods-classify">
          <div class='goods-classify-item' :class="{'current': active == index}"  v-for="(item,index) in goodsClassify" :key="index"
          @click="selected(item.id)">
            {{item.name}}
          </div>
        </div>
        <div class="goods-content">
          <div class="recommend" v-if="isRecommend">
            <div class="floor-good">
              <div class="title">
                <img src="../../assets/img/title_icon.png" alt=""><span>好物推荐</span>
              </div>
              <div class="good" v-if="recommendData.good.length>0">
                <div class="good-item" v-for="(item,index) in recommendData.good" :key="item.id" 
                :v-if="index<=1" @click="goGoodsDetail(item.id)">
                  <div class="img">
                    <img :src="item.cover_url" alt="">
                  </div>
                  <div class="goods-name">{{item.describe}}</div>
                </div>
              </div>
              <div v-else class="default-page"></div>
            </div>
            <div class="floor-fashion">
              <div class="title">
                <img src="../../assets/img/title_icon.png" alt=""><span>时尚精品</span>
              </div>
              <div class="good">
                <div class="good-item" v-for="(item,index) in recommendData.fashion" :key="item.id" 
                :v-if="index<=2" @click="goGoodsDetail(item.id)">
                  <div class="img">
                    <img :src="item.cover_url" alt="">
                  </div>
                  <div class="goods-name">{{item.describe}}</div>
                </div>
              </div>
            </div>
            <div class="floor-comment">
              <div class="title">
                <img src="../../assets/img/title_icon.png" alt=""><span>常用推荐</span>
              </div>
              <div class="good">
                <div class="good-item" v-for="(item,index) in recommendData.comment" :key="item.id" 
                :v-if="index<=2" @click="goGoodsDetail(item.id)">
                  <div class="img">
                    <img :src="item.cover_url" alt="">
                  </div>
                  <div class="goods-name">{{item.describe}}</div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="fenlei" >
              <div class="paixu">
                <div :class="rank_key==='price'?'price-rank':'price'" @click="priceRank('price')">
                  <span>价格</span>
                  <div class="isIcon" v-if="isIcon">
                    <van-icon name="arrow-up" />
                    <van-icon class="down" name="arrow-down" />
                  </div>
                  <div class="price-rank" v-else>
                    <van-icon v-if="!isAdd" name="arrow-up" />
                    <van-icon v-else name="arrow-down" />
                  </div>
                </div>
                <div :class="{'select-status': rank_key==='sales'}" @click="salesRank('sales')">销量</div>
                <div class="shaixuan" @click="show=true">筛选<img class="img" src="../../assets/img/shaixuan.png" alt=""></div>
              </div>
              <div class="type" v-if="active!==7&&active!==8&&active!==9">
                <div class="type-box" :class="{'select-status': isNew}" @click="newGoods">新品</div>
                <div class="select" :class="{'select-item': isSizeIcon}">
                  <div :class="['type-box',isSizeName?'select-status':'']" @click="showOverlay('size')">
                    <div class="item-name">{{isSizeName?selectCondition.sizeName:'尺寸'}}</div>
                    <van-icon name="arrow-up" v-if="isSizeIcon"/>
                    <van-icon name="arrow-down" v-else/>
                  </div>
                </div>
                <div class="select" :class="{'select-item': isBrandIcon}">
                  <div :class="['type-box',isBrandName?'select-status':'']" @click="showOverlay('brand')">
                    <div class="item-name">{{isBrandName?selectCondition.brandName:'品牌'}}</div>
                    <van-icon name="arrow-up" v-if="isBrandIcon"/>
                    <van-icon name="arrow-down" v-else/>
                  </div>
                </div>
              </div>
              <transition name='fade'>
                <div class="overlay-box" v-if="isShowOverlay" @click="closeOverlay">
                  <div :class="isShowOverlay?'show':'close'">
                    <div class="size-brand" v-if="keyword==='size'" @click.stop>
                      <div class="size-brand-item" :class="{'select-status': params.size===parseInt(item.id)}" 
                      v-for="(item,index) in type.size.data" 
                      :key="index" @click.stop="pitchOn(item.id,item.name)">
                        {{item.name}}
                      </div>
                    </div>
                    <div class="size-brand" v-else @click.stop>
                      <div class="size-brand-item" :class="{'select-status': params.brand===parseInt(item.id)}" 
                      v-for="(item,index) in type.brand" 
                      :key="index" @click.stop="pitchOn(item.id,item.name)">
                        {{item.name}}
                      </div>
                    </div>
                    <div class="button">
                      <div @click.stop="reset('local')">重置</div>
                      <div @click.stop="demand('fast')">选定</div>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
            <van-loading v-if="isLoading" size="24px" type="spinner" vertical>玩儿命加载中...</van-loading>
            <div class="commodity" v-if="goodsData.length>0&&!isLoading">
              <div class="goods-card" v-for="item in goodsData" :key="item.id" @click="goGoodsDetail(item.id)">
                <div class="img">
                  <img :src="item.cover_url" alt="">
                </div>
                <div class="goods-name">{{item.describe}}</div>
                <div class="goods-price">￥{{(item.sell_price-item.discount).toFixed(2) }}</div>
              </div>
            </div>
            <div v-if="goodsData.length===0&&!isLoading" class="default-page"></div>
            <van-popup class="popup-sx" v-model="show" position="right" :style="{ width: '90%',height: '100%' }" 
            :get-container="getContainer" @touchmove.prevent>
              <div class="type-content">
                <div class="type-content-price">
                    <div>理想价格</div>
                    <div class="input">
                      <input v-model="params.minPrice" class="input-price item" type="number" placeholder="0">
                      <span class="partition">-</span>
                      <input v-model="params.maxPrice" class="input-price item" type="number" placeholder="10000">
                    </div>
                </div>
                <div class="type-content-people" v-if="type.person">
                    <div>适用人群</div>
                    <div class="people">
                      <div class="people-item item" v-for="(item,index) in type.person" :key="index"
                      @click="choose(item.id,item.name,'people')" :class="{'select': params.person==item.id}">
                        {{item.name}}
                      </div>
                    </div>
                </div>
                <div class="type-content-size" v-if="type.size">
                    <div>{{type.size.des}}</div>
                    <div class="size">
                      <div class="size-item item" v-for="(item,index) in type.size.data" :key="index"
                      @click="choose(item.id,item.name,'size')" :class="{'select': params.size===''?false:params.size==item.id}">
                        {{item.name}}
                      </div>
                    </div>
                </div>
                <!-- 颜色 -->
                <div class="type-content-color" v-if="type.color">
                    <div>颜色</div>
                    <div class="color">
                      <div class="color-item item" v-for="(item,index) in type.color" :key="index"
                      @click="choose(item.id,item.name,'color')" :class="{'select': params.color==item.id}">
                        {{item.name}}
                      </div>
                    </div>
                </div>
                <!-- 品牌 -->
                <div class="type-content-brand" v-if="type.brand">
                    <div>品牌</div>
                    <div class="brand">
                      <div class="brand-item item" v-for="(item,index) in type.brand" :key="index"
                      @click="choose(item.id,item.name,'brand')" :class="{'select': params.brand==item.id}">
                        {{item.name}}
                      </div>
                    </div>
                </div>
                <div class="type-content-season" v-if="type.season">
                    <div>适用季节</div>
                    <div class="season">
                      <div class="season-item item" v-for="(item,index) in type.season" :key="index"
                      @click="choose(item.id,item.name,'season')" :class="{'select': params.season==item.id}">
                        {{item.name}}
                      </div>
                    </div>
                </div>
                <div class="type-content-thickness" v-if="type.thickness">
                    <div>厚度</div>
                    <div class="thickness">
                      <div class="thickness-item item" v-for="(item,index) in type.thickness" :key="index"
                      @click="choose(item.id,item.name,'thickness')" :class="{'select': params.thickness==item.id}">
                        {{item.name}}
                      </div>
                    </div>
                </div>
              </div>
              <div class="inquire-button">
                <div @click="reset('both')">重置</div>
                <div @click="demand('precise')">确定</div>
              </div>
            </van-popup>
            
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLoading: false,
      type: '',
      goodsClassify: [],
      recommendData: [],
      active: 0,
      isRecommend: true,
      goodsData: [],
      // 排序关键词
      rank_key: '',
      isIcon: true,
      // 是否升序
      isAdd: true,
      // 是否是新品
      isNew: false,
      // 是否弹出筛选条件框
      show: false,
      // 尺码图标状态
      isSizeIcon: false,
      isBrandIcon: false,
      isShowOverlay: false,
      // 当前点击的筛选条件关键字
      keyword: '',
      pitch_on_size: '',
      pitch_on_brand: '',
      // 是否展示选中的条件
      isSizeName: false,
      isBrandName: false,
      // 选中的条件
      selectCondition: {
        sizeName: '',
        brandName: '',
      },
      sizeName: '',
      brandName: '',
      // 筛选条件
      params: {
        sort: '',
        minPrice: '',
        maxPrice: '',
        person: '',
        size: '',
        color: '',
        brand: '',
        season: '',
        thickness: ''
      },
      
    }
  },
  created() {
    this.getGoodsClassify();
    this.getRecommendData();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    goShopBag() {
      this.$router.push('/shoppingbag');
    },
    goSearch() {
      this.$router.push('/searchgoods');
    },
    // 获取商品分类
    getGoodsClassify() {
      this.$request.get('/goods').then(res => {
        this.goodsClassify = res.sort;
      })
    },
    // 筛选条件的请求
    byConditionGetGoods(params) {
      return this.$request.post('/goods/showGoodListMobile',params);
    },
    // 获取推荐商品数据
    getRecommendData() {
      this.byConditionGetGoods({sort: 0}).then(res => {
        this.recommendData = res;
      })
    },
    // 获取分类筛选
    selected(id) {
      this.isLoading = true;
      this.isShowOverlay = false;
      this.isSizeIcon = false;
      this.isBrandIcon = false;
      this.active = id;
      this.params.sort = id;
      this.isIcon = true;
      this.rank_key = '';
      this.isNew = false;
      this.params.isPrice = '';
      this.params.isSales = '';
      this.params.new = '';
      if(id === 0) {
        return this.isRecommend = true;
      } else {
        this.isRecommend = false;
      }
      this.byConditionGetGoods({sort: id}).then(res => {
        this.goodsData = res.data;
        this.isLoading = false;
      });
      // 根据商品种类，获取筛选条件
      this.$request.get('/goods/select/moblie/'+id).then(res => {
        this.type = res;
      })
      this.reset();
    },
    // 跳转到商品详情
    goGoodsDetail(id) {
      this.$router.push("/goods/detail/"+id);
    },
    // 价格排序
    priceRank(key) {
      this.rank_key = key;
      this.params = Object.assign({}, this.params, { isPrice: this.isAdd,isSales:''});
      this.getGoods(this.params);
      this.isAdd = !this.isAdd;
      this.isIcon = false;
    },
    // 销量排序
    salesRank(key) {
      this.rank_key = key;
      this.params = Object.assign({}, this.params, { isSales: false,isPrice: '' });
      this.getGoods(this.params);
      this.isIcon = true;
      this.isAdd = true;
    },
    // 新品
    newGoods() {
      this.isNew = !this.isNew;
      if(this.isNew) {
        this.params = Object.assign({}, this.params, { new: 1 });
      } else {
        this.params = Object.assign({}, this.params, { new: '' });
      }
      this.getGoods(this.params);
    },
    // 编辑筛选，选中项 
    pitchOn(id,name) {
      if(this.keyword === 'size') {
        this.params.size = parseInt(id);
        this.sizeName = name;
      } else {
        this.params.brand = parseInt(id);
        this.brandName = name;
      }
    },
    // 重置
    reset(word) {
      if(word==='local') {
        if(this.keyword === 'size') {
          this.params.size = '';
          this.sizeName = '';
          this.isSizeName = false;
        } else {
          this.params.brand = '';
          this.brandName = '';
          this.isBrandName = false;
        } 
        this.closeOverlay();
      } else {
        let params = {
          minPrice: '',
          maxPrice: '',
          person: '',
          size: '',
          color: '',
          brand: '',
          season: '',
          thickness: ''
        }
        this.params = Object.assign({}, this.params, params);
        this.sizeName = '';
        this.brandName = '';
        this.isSizeName = false;
        this.isBrandName = false;
      }
      this.getGoods(this.params);
    },
    // 选定筛选条件，筛选商品 
    demand(value) {
      if(this.sizeName) {
        this.selectCondition.sizeName = this.sizeName;
        // 展示选中的筛选条件
        this.isSizeName = true;
      }
      if(this.brandName) {
        this.selectCondition.brandName = this.brandName;
        this.isBrandName = true;
      }
      this.getGoods(this.params);
      if(value === 'fast') {
        this.closeOverlay();
      } else {
        this.show = false;
      }
      
    },
    // 根据筛选条件获取商品数据（筛选商品）
    getGoods(params) {
      this.byConditionGetGoods(params).then(res => {
        this.goodsData = res.data;
        if(res.data.length == 0) {
          this.$toast('暂无该商品')
        }
      });
    },
    // 选择筛选条件
    choose(id,name,value) {
      if(value=='people') {
        this.params.person = id;
      } else if(value=='size') {
        this.params.size = id;
        this.sizeName = name;
      } else if(value=='color') {
        this.params.color = id;
      } else if(value=='brand') {
        this.params.brand = parseInt(id);
        this.brandName = name;
      } else if(value=='season') {
        this.params.season = id;
      } else if(value=='thickness') {
        this.params.thickness = id;
      }
    },
    // 显示遮罩层
    showOverlay(word) {
      this.keyword = word;
      if(word==='size') {
        this.isSizeIcon = !this.isSizeIcon;
        if(this.isBrandIcon) return this.isBrandIcon = !this.isBrandIcon;
      } else {
        this.isBrandIcon = !this.isBrandIcon;
        if(this.isSizeIcon) return this.isSizeIcon = !this.isSizeIcon;
      }
      this.isShowOverlay = !this.isShowOverlay;
    },
    // 关闭遮罩层
    closeOverlay() {
      this.isShowOverlay = false;
      if(this.keyword==='size') {
        this.isSizeIcon = !this.isSizeIcon;
      } else {
        this.isBrandIcon = !this.isBrandIcon;
      }
    },
    // 将其挂载到 main_content节点下
    getContainer() {
      return document.querySelector('.main_content');
    }
  }
};
</script>
<style lang="scss" scoped>
.van-nav-bar {
  .van-nav-bar__right {
    display: flex;
    align-items: center;
    height: 44px;
    bottom: 2px;
  }
  .img {
    width: 22px;
    height: 22px;
  }
}
.head-top {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 44px;
  padding: 0 16px;
  background-color: #fff;
  .van-search {
    padding: 0;
    .van-search__content {
      padding-left: 46px;
      width: 295px;
      height: 30px;
      .van-cell {
        padding-top: 3px;
        padding-bottom: 0;
        font-size: 12px;
        /deep/ .van-field__left-icon {
          display: none;
        }
      }
    }
    .van-search__action {
      padding: 0;
    }
  }
  .search {
    position: absolute;
    top: 14px;
    left: 34px;
    width: 15px;
    height: 16px;
  }
  .shopping-bag {
    width: 22px;
    height: 22px;
  }
}
.content {
  .goods {
    position: fixed;
    top: 47px;
    bottom: 50px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    &-classify {
      width: 83px;
      background-color: #fff;
      overflow: scroll;
      &-item {
        height: 50px;
        line-height: 50px;
        font-size: 12px;
        text-align: center;
      }
      .current {
        border-left: 5px solid #89B264;
        background-color: #eee;
        color: #89B264;
        font-size: 14px;
      }
    }
    &-content {
      width: 288px;
      padding: 0 15px;
      background-color: #fff;
      overflow: scroll;
      .default-page {
        width: 191px;
        height: 85px;
        margin: 30px 33px;
        background: url('../../assets/img/none_goods.png') no-repeat;
        background-size: cover;
      }
      .recommend {
        .title {
          display: flex;
          align-items: center;
          margin: 10px 0;
          img {
            width: 10px;
            height: 15px;
            margin-right: 5px;
          }
          span {
            font-size: 14px;
            font-weight: 600;
          }
        }
        .good {
          width: 268px;
          height: 148px;
          margin-bottom: 18px;
          overflow: hidden;
          &-item {
            float: left;
            width: 124px;
            margin-right: 10px;
            .img {
              height: 124px;
              img {
                width: 100%;
                height: 124px;
              }
            }
            .goods-name {
              margin-top: 8px;
              font-size: 11px;
              overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
            }
          }
        }
        
        .floor-fashion,
        .floor-comment {
          .good {
            height: 123px;
          }
          .good-item {
            width: 83px;
            margin-right: 6px;
            .img {
              height: 83px;
              img {
                width: 100%;
                height: 83px;
              }
            }
          }
        }
        
      }
      .fenlei {
        margin-top: 15px;
        .select-status {
          color: #7BBB62;
        }
        .paixu {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 20px;
          margin-bottom: 16px;
          font-size: 12px;
          font-weight: 600;
          .price {
            display: flex;
            align-items: center;
            .isIcon {
              display: flex;
              flex-direction: column;
              justify-content: center;
              height: 16px;
              margin-left: 2px;
              .down {
                margin-top: -6px;
              }
            }
          }
          .price-rank {
            display: flex;
            align-items: center;
            color: #7BBB62;
            .van-icon {
              margin-left: 2px;
            }
          }
          .shaixuan {
            display: flex;
            align-items: center;
            .img {
              width: 11px;
              height: 11px;
              margin-top: 2px;
            }
          }
        }
        .type {
          display: flex;
          justify-content: space-between;
          .select {
            height: 29px;
          }
          .select-item {
            background-color: #eee;
            border-radius: 10px 10px 0 0;
          }
          &-box {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 56px;
            height: 20px;
            padding: 0 5px;
            background-color: #eee;
            border-radius: 10px;
            font-size: 12px;
            .item-name {
              overflow: hidden;
              white-space: nowrap; 
              text-overflow:ellipsis;
            }
          }
        }
        .overlay-box {
          position: absolute;
          top: 79px;
          bottom: 0;
          left: 87px;
          width: 288px;
          background-color: rgba(0,0,0,.3);
          .show {
            position: relative;
            height: 240px;
            animation: showed 0.4s;
            background-color: #EEEEEE;
            border-radius: 0 0 10px 10px;
            overflow: hidden;
          }
          .close {
            height: 0;
            animation: closed 0.5s;
          }
          .size-brand {
            height: 196px;
            overflow-y: scroll;
            &-item {
              float: left;
              padding-left: 15px;
              width: 50%;
              height: 40px;
              line-height: 40px;
              font-size: 11px;
            }
          }
          .button {
            display: flex;
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 44px;
            div {
              flex: 1;
              line-height: 44px;
              font-size: 12px;
              text-align: center;
            }
            div:nth-child(1) {
              background-color: #fff;
            }
            div:nth-child(2) {
              background-color: #7BBB62;
              color: #fff;
            }
          }
        }
        // vue 动画过度
        .fade-enter-active,.fade-leave-active {
          transition: opacity 0.5s;
        }
        .fade-enter, .fade-leave-to{
          opacity: 0;
        }
        @keyframes showed {
          from {height: 0;}
          to {height: 240px;}
        }
        @keyframes closed {
          from {height: 240px;}
          to {height: 0px;}
        }
      }
      .van-loading {
        margin-top: 70px;
      }
      .commodity {
        width: 264px;
        margin-top: 5px;
        overflow: hidden;
        .goods-card {
          float: left;
          width: 127px;
          margin-bottom: 10px;
          margin-right: 5px;
          .img {
            height: 127px;
            img {
                width: 100%;
                height: 127px;
              }
          }
          .goods-name {
            margin-top: 5px;
            font-size: 12px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
          .goods-price {
            font-size: 10px;
            color: #D30606;
            font-weight: 700;
          }
        }
      }
    }
  }
}
.popup-sx {
  border-radius: 10px 0 0 10px;
  .type-content {
    position: absolute;
    top: 0;
    bottom: 49px;
    width: 100%;
    overflow: scroll;
    margin-left: 20px;
    .item {
      width: 89px;
      height: 29px;
      line-height: 29px;
      padding: 0 15px;
      margin-bottom: 10px;
      border: 1px solid #eee !important;
      border-radius: 15px;
      font-size: 11px;
    }
    &-price,&-people,
    &-size,&-color,&-brand,
    &-season,&-thickness {
      margin-top: 11px;
      font-size: 14px;
      overflow: hidden;
    }
    .input {
      display: flex;
      align-items: center;
      margin-top: 10px;
      margin-bottom: 10px;
      .item {
        margin-bottom: 0;
        border: none;
      }
      .partition {
        margin: 0 10px;
      }
    }
    .people,.size,.color,
    .brand,.season,.thickness {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
      width: 318px;
      &-item {
        margin-right: 17px; 
        text-align: center;
      }
      .brand-item {
        overflow: hidden;
        white-space: nowrap; 
        text-overflow:ellipsis;
      }
      .select {
        background-color: #B3D465;
        color: #fff;
        border: none;
      }
    }

  }
}
.inquire-button {
    display: flex;
    position: absolute;
    right: 0;
    bottom: 0;
    height: 49px;
    width: 100%;
    box-shadow: 2px 0px 3px 0px rgba(0, 0, 0, 0.15);
    div {
      flex: 1;
      line-height: 49px;
      text-align: center;
      font-size: 14px;
    }
    div:nth-child(1) {
      background-color: #fff;
      color: #999;
    }
    div:nth-child(2) {
      background-color: #B3D465;
      color: #fff;
    }
  }
</style>