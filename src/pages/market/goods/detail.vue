<template>
  <div class="warp" style>
    <van-nav-bar title="商品" left-arrow @click-left="back" fixed>
      <share-ing slot="right"
        type="good"
        @listenToShow="getChildShow"
      ></share-ing>
    </van-nav-bar>
    <van-skeleton v-if="goods_copy.picture === ''" avatar avatar-shape="square" avatar-size="100" />
    <van-skeleton v-if="goods_copy.describe === ''" title title-width="100" :row="6" />
    <!-- 商品 -->
    <!-- 商品轮播图 -->
    <div class="goods-pic" >
      <img :src="goods.picture" alt />
    </div>
    <div class="goods">
      <!-- 商品基本信息 -->
      <div class="goods_base">
        <div class="goods_tags" v-if="goods_copy.is_new_good">
          <div class="goods_tag">新品</div>
        </div>
        <div class="goods_price">
          <span class="new_price">￥{{(goods_copy.sell_price - goods_copy.discount).toFixed(2)}}</span>
          <span class="old_price" v-if="goods_copy.discount > 0">￥{{goods_copy.sell_price}}</span>
        </div>
        <span class="goods_name">{{goods_copy.describe}}</span>
      </div>
      <!-- 积分抵扣 -->
      <div class="integral" v-if="goods_copy.good_discount.积分.length!==0">
        <div class="box">
          <div v-for="(item,index) in goods_copy.good_discount.积分" :key="index">
            花费
            <span>{{item.consume}}</span> 积分，价格减免：
            <span>{{item.deduction}}</span> 元
          </div>
        </div>
      </div>
      <div class="goods_select">
        <!-- 选择规格 -->
        <div class="select_item" @click.stop="goodsShow = true;openWay = 'choose';status=false">
          <span class="select_tips">{{selectedGoods}}</span>
          <div class="arrow">
            <i class="iconfont icon-pull_right"></i>
          </div>
        </div>

        <!-- 选择地址 -->
        <div class="select_item" v-show="false" @click.stop="area.isOpen = true">
          <span class="select_tips">{{selectedArea}}</span>
          <div class="arrow">
            <i class="iconfont icon-pull_right"></i>
          </div>
        </div>
      </div>
      
      <div class="goods_detail">
        <!-- 产品参数 -->
        <div class="detail_item">
          <div class="detail_item_title">
            <i></i>
            <span class="zh_title">产品参数</span>
            <span class="en_title">Product parameters</span>
          </div>
          <div class="detail_item_content">
            <i></i>
            <div class="detail_item_content_item">
              <span class="content_item_title">材质</span>
              <span class="content_item_exp">{{goods_copy.material}}</span>
            </div>
            <div class="detail_item_content_item">
              <span class="content_item_title">使用人群</span>
              <span class="content_item_exp">{{goods_copy.painter}}</span>
            </div>
            <div class="detail_item_content_item">
              <span class="content_item_title">使用季节</span>
              <span class="content_item_exp">{{goods_copy.season}}</span>
            </div>
            <div class="detail_item_content_item">
              <span class="content_item_title">商品尺寸</span>
              <span class="content_item_exp">
                <span v-for="(item,index) in goods_copy.size" :key="index">{{item.name}}&nbsp;&nbsp;</span>
              </span>
            </div>
          </div>
        </div>
        <!-- 细节展示图 -->
        <div class="detail_item" v-if="goods_copy.detail_img.length > 0">
          <div class="detail_item_title">
            <i></i>
            <span class="zh_title">细节展示图</span>
            <span class="en_title">Detail display</span>
          </div>
          <div class="detail_item_content imgs">
            <div class="imgs_item" v-for="(item, index) in goods_copy.detail_img" :key="index">
              <img :src="item" alt />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- SKU 商品规格弹出框-->
    <van-sku
      v-if="this.sku.list.length > 0"
      v-model="goodsShow"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsId"
      :close-on-click-overlay="true"
      :hide-stock="sku.hide_stock"
      @buy-clicked="onBuyClicked"
    >
      <template slot="sku-actions" slot-scope="props">
        <div v-if="openWay==='choose'" class="bottom-btn">
          <div @click="props.skuEventBus.$emit('sku:buy')">加入购物车</div>
          <div @click="buy(props)">立即购买</div>
        </div>
        <div v-else class="van-sku-actions" @click="props.skuEventBus.$emit('sku:buy')">
          <div class="buy_button">确定</div>
        </div>
      </template>
    </van-sku>
    <!-- 加入购物车，立即购买 -->
    <footer class="car" v-show="!childShow">
      <div class="car_lf">
        <div class="good_barige" @click="handleViewGoods">
          <img class="icon" src="../../../assets/img/shopping.png" />
          <div class="numbers" v-if="shoppingBagNumber > 0">
            <span>{{shoppingBagNumber}}</span>
          </div>
        </div>
      </div>
      <div class="car_rh">
        <div class="car_rh_item" @click="addCartAndBuy('addCart')">加入购物车</div>
        <div
          class="car_rh_item"
          @click="addCartAndBuy('buy')"
        >立即购买</div>
      </div>
    </footer>
  </div>
</template>
<script>
import logo from "@/assets/img/logo.png";
import shareIng from '@/components/shareing'
import { mapGetters } from "vuex";
import { Area, Popup, Sku, Skeleton, Toast } from "vant";
import area_list from "./area_list.js";
import { getGoodsById, getLoginGoodsById, postUserCart } from "@/api/category.js";
export default {
  components: {
    shareIng,
    [Area.name]: Area,
    [Popup.name]: Popup,
    [Sku.name]: Sku,
    [Skeleton.name]: Skeleton
  },
  data() {
    return {
      childShow: false,  // 显示隐藏购物车
      clock: false,
      shoppingBagNumber: 0,
      icon: {
        logo: logo
      },
      area: {
        list: area_list,
        isOpen: false,
        change: []
      },
      goods_img: "/assets/img/bg.png",
      changeGoods: {},
      goodsShow: false,
      // 确定弹出框
      openWay: '',
      goodsId: 10,
      goods: {
        // 商品标题
        title: "",
        // 默认商品 sku 缩略图
        picture: ""
      },
      goods_copy: {
        detail_img: []
      },
      sku: {
        // 所有 sku 规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: "颜色", // skuKeyName：规格类目名称
            v: [],
            k_s: "s1" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          },
          {
            k: "尺寸", // skuKeyName：规格类目名称
            v: [],
            k_s: "s2" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [],
        price: "0.00", // 默认价格（单位元）
        stock_num: 0, // 商品总库存
        hide_stock: false, // 是否隐藏剩余库存
      }
    };
  },
  watch: {
    immediate: true,
    getChildShow () {}
  },
  computed: {
    ...mapGetters(["info", "isUserNeedLogin"]),
    selectedArea() {
      if (this.area.change.length === 0) {
        return "请选择地址";
      }
      return `配送 至 ${this.area.change.map(item => item.name).join("")}`;
    },
    selectedGoods() {
      const { selectedNum, selectedSkuComb } = this.changeGoods;
      if (!selectedNum) {
        return "请选择规格和数量";
      }
      return `尺寸：${selectedSkuComb.s2} / 数量：${selectedNum}`;
    },
    isAllowBuy() {
      return this.changeGoods.selectedNum;
    }
  },
  mounted() {
    this.viewGoods();
  },
  beforeDestroy() {
    this.$nextTick(() => {
      this.sku.tree = [];
    });
  },
  methods: {
    getChildShow (data,id) {
      this.childShow = data
    },
    // 查看商品详情
    viewGoods() {
      const { goods_id } = this.$route.params;
      if (this.isUserNeedLogin) {
        getGoodsById(goods_id).then(res => {
          this.disposeGoodsParams(res);
        });
      } else {
        getLoginGoodsById(goods_id).then(res => {
          this.disposeGoodsParams(res);
        })
      }
    },
    // 处理获取的商品参数
    disposeGoodsParams(response) {
      const {
          cover,
          describe,
          sell_price,
          discount,
          color_size,
          size,
          is_new_good,
          good_discount,
          discount_sign,
          is_repeat_dis,
          path1,
          path2,
          path3,
          path4
      } = response;
      this.goods_copy = response;
      this.goods_copy.detail_img = [path1, path2, path3, path4].filter(
        item => item
      );
      this.sku.tree = [
          {
            k: "颜色", // skuKeyName：规格类目名称
            v: [
              ...color_size.map(item => {
                return {
                  id: item.id,
                  name: item.name,
                  imgUrl: item.cover,
                  previewImgUrl: item.cover
                };
              })
            ],
            k_s: "s1" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          },
          {
            k: "尺寸", // skuKeyName：规格类目名称
            v: [
              ...size.map(item => {
                return {
                  id: item.id,
                  name: item.name
                };
              })
            ],
            k_s: "s2" // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          }
      ];
      const RADIX_PRE = 100; //分进制
      color_size.map(item => {
          this.sku.list.push(
            ...item.data.map((sub_item, sub_index) => ({
              id: item.id,
              price: (sell_price - discount).toFixed(2) * RADIX_PRE + "",
              s1: item.id,
              s2: sub_item.size,
              s3: 0,
              stock_num: sub_item.num
            }))
          );
      });
      this.sku.stock_num = color_size.reduce((pre, next) => {
        return pre + next.data.reduce((pre, next) => pre + next.num, 0);
      }, 0);
      this.sku.price = (sell_price - discount).toFixed(2);
      this.goods = { title: describe, picture: cover };
    },
    // 点击加入购物车
    handleAddCart() {
      if (this.isUserNeedLogin) {
        this.$router.push("/login");
        return;
      }
      
      if (this.clock) {
        Toast("正在加入购物车");
        return;
      }
      if (this.getSelectParams() == "") return;
      postUserCart(this.getSelectParams())
        .then(() => {
          this.clock = false;
          this.shoppingBagNumber += 1;
          Toast("添加成功");
        })
        .catch(() => {
          this.clock = false;
        });
    },
    // 处理加入购物车的数据
    getSelectParams(params = {}) {
      const {selectedSkuComb, selectedNum} = this.changeGoods;
      this.clock = true;
      const { tree } = this.sku;

      const s1_spec = tree
        .map(item => {
          if (item.k === "颜色") {
            return item.v;
          }
        })
        .filter(item => item)[0]
        .filter(item => item.id == selectedSkuComb.s1);
      const { goods_id } = this.$route.params;

      if (s1_spec[0]) {
        params.color = s1_spec[0].name;
      }

      params.num = selectedNum;
      params.size = selectedSkuComb.s2;
      params.id = goods_id;
      var sizedata = this.goods_copy.color_size.filter(
        item => item.name === params.color
      )[0].data;
      var sizedata = sizedata.filter(
        item => item.size === selectedSkuComb.s2
      )[0];
      params.goodListId = sizedata.lid;
      return params;
    },
    // 查看列表
    handleViewGoods() {
      this.$router.push("/shoppingbag");
    },
    // 点击立即购买
    handleBuyGoods() {
      if (this.isUserNeedLogin) {
        this.$router.push("/login");
        return;
      }
      if (this.getSelectParams() == "") return;
      const {
        describe,
        discount,
        sell_price,
        cover,
        color_size,
        good_discount,
        discount_sign,
        is_repeat_dis
      } = this.goods_copy;
      const params = {
        ...this.getSelectParams(),
        describe,
        discount,
        sell_price,
        url: cover,
        price: ((sell_price - discount)*this.changeGoods.selectedNum).toFixed(2),
        good_discount,
        discount_sign,
        is_repeat_dis
      };
      sessionStorage.setItem("buy goods", JSON.stringify(params));
      this.$router.push(`/fillorder?type=1`);
    },
    // 商品规格框，确定加入购物车 
    onBuyClicked(val) {
      this.changeGoods = val; 
      if(this.status) {
        this.handleBuyGoods();
      } else {
        this.handleAddCart();
      }
      this.goodsShow = false;
    },
    // 判定是否登录
    addCartAndBuy(word) {
      if (this.isUserNeedLogin) {
        this.$router.push("/login");
        return;
      }
      this.goodsShow = true;
      this.openWay = '';
      if(word==='buy') {
        this.status = true;
      } else {
        this.status = false
      }
    },
    buy(val) {
      this.changeGoods = val; 
      if(val.selectedSkuComb) {
        this.handleBuyGoods();
      } else {
        Toast('请先选择商品规格');
      }
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="css" scoped>
.van-sku-container >>> .van-icon {
  display: none !important;
}
</style>
<style lang="scss" scoped>
* {
  font-size: 13px;
}
img {
  width: 100%;
  // height: 100%;
}
.van-popup--center {
  width: 87%;
  height: 85%;
}
.textbase {
  width: 100%;
  height: 30px;
  background: #fff;
  font-size: 12px;
  color: #2c2c2c;
  text-align: center;
  line-height: 20px;
}
.good_barige {
  position: relative;
  display: inline-block;
  img {
    display: block;
    width: 20px;
    height: 20px;
  }
  .numbers {
    position: absolute;
    top: -60%;
    right: -35%;
    display: block;
    span {
      background: red;
      color: #fff;
      margin-top: 5px;
      display: block;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
    }
  }
}
$main_color: #b4d565;
.warp {
  // position: absolute;
  // top: 0;
  // left: 0;
  width: 100%;
  padding-bottom: 40px;
  background-color: #fff;
  overflow-x: hidden;
  .van-nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }
  .goods-pic {
    width: 100%;
    height: 344px;
    margin-top: 46px;
    img {
      width: 100%;
      height: 344px;
    }
  }
}
.goods {
  user-select: none;
  margin: 0 16px;
  width: 343px;
  margin-top: 13px;
  background-color: #fff;
  // 商品信息
  .goods_base {
    position: relative;
    .goods_tags {
      position: absolute;
      top: 0;
      right: 0;
      .goods_tag {
        border: 1px solid #ff7072;
        color: #ff7072;
        width: 4em;
        text-align: center;
        border-radius: 10px;
      }
    }
    .goods_price {
      .new_price {
        color: #d50c0f;
        font-size: 16px;
      }
      .old_price {
        color: #969696;
        text-decoration: line-through;
      }
    }
    .goods_name {
      width: 16em;
      line-height: 1.5em;
      display: block;
    }
  }
  // 商品选项
  .goods_select {
    position: relative;
    margin-top: 10px;
    padding-top: 4px;
    margin-bottom: 10px;
    padding-bottom: 4px;
    &::before,
    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 100vw;
      height: 4px;
      background: #eee;
    }
    &::before {
      left: -15px;
      top: 0;
    }
    &::after {
      left: -15px;
      bottom: 0;
    }
    .select_item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 10px 0;
      .select_tips {
        color: #b1b1b1;
      }
    }
    
  }
  .integral {
      display: flex;
      justify-content: center;
      width: 343px;
      margin: 10px auto;
      padding-bottom: 6px;
      background-color: #effaea;
      border-radius: 12px;
      font-size: 12px;
      color: #999;
      .box {
        div {
          margin-top: 6px;
          span {
            color: #96c55b;
          }
        }
      }
    }
  // 商品详情
  .goods_detail {
    .detail_item {
      margin-bottom: 2em;
      .detail_item_title {
        position: relative;
        display: flex;
        height: 2.5em;
        justify-content: space-between;
        flex-direction: column;
        margin: 10px 0;
        padding-left: 10px;
        i {
          position: absolute;
          left: 0;
          top: 0;
          width: 4px;
          height: 100%;
          background: $main_color;
        }
        .en_title {
          color: #ddd;
          font-size: 10px;
        }
      }
      .detail_item_content {
        border: 1px solid #ddd;
        position: relative;
        i {
          position: absolute;
          top: 0;
          background: #ddd;
          height: 100%;
        }
        .detail_item_content_item {
          display: flex;
          .content_item_title {
            display: inline-block;
            width: 4em;
            flex-shrink: 0;
            height: 20px;
            line-height: 20px;
            margin: 0 10px;
            text-align: justify;
            text-align-last: justify;
            overflow: hidden;
            &::after {
              content: "";
              display: inline-block;
              width: 100%;
            }
          }
          .content_item_exp {
            padding: 0 10px;
            line-height: 20px;
            border-left: 1px solid #ddd;
          }
        }
        &.imgs {
          width: 100%;
          border: none;
          .imgs_item {
            width: 100%;
            height: 100%;
            img {
              vertical-align: top;
            }
          }
        }
      }
    }
  }
}
.van-sku-actions {
  background: $main_color;
  width: 343px;
  height: 40px;
  margin: 8px 0;
  margin-left: 16px;
  border-radius: 20px;
  .buy_button {
    width: 100%;
    line-height: 28px;
    text-align: center;
    font-size: 14px;
    color: #fff;
  }
}
.bottom-btn {
  height: 56px;
  width: 343px;
  display: flex;
  margin-left: 16px;
  div {
    margin: 8px 0;
    width: 50%;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  div:nth-of-type(1) {
    border-radius: 20px 0 0 20px;
    background: #effaea;
    color: $main_color;
    font-weight: 600;
  }
  div:nth-of-type(2) {
    border-radius: 0 20px 20px 0;
    color: #fff;
    background-color: $main_color;
  }
}
.car {
  position: fixed;
  z-index: 10;
  left: 0;
  bottom: 0;
  height: 40px;
  width: 100%;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 1px 2px 10px #eee;
  .car_lf {
    flex-shrink: 0;
    flex-basis: 50%;
    padding: 0 20px;
    height: 100%;
    display: flex;
    align-items: center;
    .car_lf_icon {
      display: inline-block;
      width: 20px;
      height: 20px;
      background: #ccc;
      margin-right: 30px;
    }
  }
  .car_rh {
    flex-shrink: 0;
    flex-basis: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    .car_rh_item {
      display: inline-block;
      padding: 0 10px;
      flex-grow: 1;
      height: 100%;
      line-height: 40px;
      text-align: center;
      color: #fff;
      &:nth-of-type(1) {
        background: #effaea;
        color: $main_color;
        font-weight: 600;
      }
      &:nth-of-type(2) {
        height: 100%;
        line-height: 40px;
        background-color:  $main_color;
      }
    }
  }
}
</style>