<template>
  <div>
    <div class="card-wrap" :style="`background-image:url('${goods_copy.cover}')`">
      <div class="card">
        <div class="teach">
          <div class="teacher_img">
            <img :src="goods_copy.cover" />
          </div>
          <div class="teacher_info">
            <div class="teacher_name">
              <span class="name">{{goods_copy.describe}}</span>
            </div>
            <!-- <div class="teacher_name_img">
              <img :src="goods_copy.cover" />
            </div> -->
            <div class="items">
              <div class="title">材&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;质：</div>
              <div class="value">{{goods_copy.material}}</div>
            </div>
            <div class="items">
              <div class="title">使用人群：</div>
              <div class="value">{{goods_copy.painter}}</div>
            </div>
            <div class="items">
              <div class="title">地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址：</div>
              <div class="value">成都市锦江区泰合国际财富中心7栋302</div>
            </div>
          </div>
        </div>
        <div class="tips">
          <div class="border-left"></div>
          <span class="tips_name">Sharing itself is a beautiful performance</span>
          <div class="border-right"></div>
        </div>
        <div class="marker"></div>
        <div class="teach_code">
          <div class="teach_code_left">
            <img src="../assets/img/img10.png" class="teach_code_left_img" />
            <div class="teach_code_title">
              <div class="teach_code_title1">Ivan</div>
              <div class="teach_code_title1">长按扫码了解更多精彩内容</div>
            </div>
          </div>
          <div class="teach_code_right">
            <img src="../assets/img/img5.png" class="teach_code_right_img" />
          </div>
        </div>
      </div>
      <div class="card-name" v-longTouch="handleLongTouch">长按图片，保存或发送给朋友</div>
    </div>
  </div>
</template>
<script>
import { getGoodsById } from "@/api/category.js";
import longTouch from '@/utils/longTouch'
export default {
  name: "share",
  directives: { longTouch },
  data() {
    return {
      goods_copy: {
        cover: ''
      }
    };
  },
  created() {
    const { type } = this.$route.query;
    if ( type == 'goods' ){
      this.getGoodsInfo()
    }
  },
  methods: {
    // 长按
    handleLongTouch(el) {
      console.log(el)
    },
    getGoodsInfo() {
      const { goodsId } = this.$route.query;
      getGoodsById(goodsId).then(response => {
        // const {
        //   cover,
        //   describe,
        //   sell_price,
        //   discount,
        //   color_size,
        //   path1,
        //   path2,
        //   path3,
        //   path4
        // } = response;
        this.goods_copy = response;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.card-wrap {
  width: 100%;
  height: 100%;
  display: inline-block;
  background-image: url("../assets/img/img1.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .card {
    width: 353px;
    height: auto;
    background-color: #d5d5d3;
    opacity: 0.8;
    margin: 0 auto;
    margin-top: 20px;
    border-radius: 5px;
    overflow: hidden;
    .teach {
      width: 93%;
      height: auto;
      margin: 0 auto;
      margin-top: 15%;
      margin-bottom: 10%;
      display: flex;
      .teacher_img {
        width: 149px;
        height: 164px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .teacher_info {
        width: 54%;
        background-image: url("../assets/img/img3.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        .teacher_name {
          text-indent: 10px;
          padding-top: 10%;
          .name {
            font-size: 14px;
            color: #2c2c2c;
            font-family: PingFang SC;
            font-weight: bold;
            display: -webkit-box!important;
            -webkit-box-orient: vertical!important;
            -webkit-line-clamp: 2!important;
            overflow: hidden!important;
          }
        }
        .teacher_name_img {
          width: 70%;
          height: 5px;
          padding-left: 10px;
          margin-bottom: 8%;
          img {
            width: 100%;
            height: 100%;
            display: block;
          }
        }
        .items {
          display: flex;
          line-height: 20px;
          .title {
            font-size: 10px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #2c2c2c;
            text-indent: 10px;
          }
          .value {
            font-size: 10px;
            font-family: PingFang SC;
            font-weight: 500;
            color: #2c2c2c;
          }
        }
      }
    }
    .tips {
      width: 93%;
      margin: 0 auto;
      text-align: center;
      position: relative;
      margin-bottom: 10%;
      .tips_name {
        font-size: 10px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999;
      }
      .border-left {
        width: 18%;
        position: absolute;
        top: 22px;
        background-color: #999;
        height: 1px;
        left: 0;
      }
      .border-right {
        width: 18%;
        position: absolute;
        top: 22px;
        background-color: #999;
        height: 1px;
        right: 0;
      }
    }
    .teach_code {
      width: 93%;
      height: auto;
      margin: 0 auto;
      display: flex;
      margin-bottom: 10%;
      .teach_code_left {
        display: flex;
        margin: 15px;
        .teach_code_left_img {
          width: 30px;
          height: 30px;
          display: block;
        }
        .teach_code_title {
          padding-left: 10px;
          .teach_code_title1 {
            font-family: PingFang SC;
            font-weight: 500;
            font-size: 12px;
            color: #2c2c2c;
          }
        }
      }
      .teach_code_right {
        width: 74px;
        height: 74px;
        margin: 15px;
        .teach_code_right_img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
    }
    .marker {
      opacity: 0.6;
      border-bottom: 10px dotted #483e34;
      margin: 0px -5px 30px -5px;
    }
  }
  .card-name {
    width: 100%;
    font-family: PingFang SC;
    font-weight: 500;
    font-size: 12px;
    color: #fff;
    text-align: center;
    margin: 15% 0px 18% 0px;
  }
}
</style>