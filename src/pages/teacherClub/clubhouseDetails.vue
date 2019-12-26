<template>
  <div>
    <div class="clubhouse_main">
      <van-nav-bar title="机构详情" left-arrow @click-left="goback" fixed>
        <share-ing slot="right" type="club"></share-ing>
      </van-nav-bar>
      <div class="list_clubhouse">
        <div class="list_clubhouse_page">
          <img src="../../assets/teacherclub/yujia.png" />
          <span class="tips">机构课程</span>
        </div>
        <div class="list_clubhouse_staff">Sometimes beauty is so simple</div>
      </div>
      <div class="club_items" v-if="clubItems.length > 0">
        <div class="news-swiper">
          <div class="swiper-container swiper1">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item,index) in clubItems" :key="index">
                <div class="club_items_img" @click="clubdetail(item.id)">
                  <img :src="item.teacher_img" :alt="item.theme" />
                </div>
                <div class="club_items_title">
                  <h3 class="van-ellipsis">{{item.theme}}</h3>
                  <!-- <van-rate v-model="item.diff" readonly size="10px" color="#58B708" void-color="#58B708"/> -->
                  <div class="diff">难度：{{ item.diff }}</div>
                  <div class="club_items_title_its">
                    <div class="club_price">￥{{item.price}}</div>
                    <div class="club_prict" @click="study(item.id)">
                      <img src="../../assets/teacherclub/enlist.png" />
                      想学
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="Default-page3" v-else>
        <span class="page-span3">我寻寻觅觅却找不到您的踪迹~</span>
      </div>
      <div class="border"></div>
      <div :class="[isThumb?'heartThumb':'',praise==1?'thumb-status':'thumb']" @click="thumb"></div>
      <div class="club_ambient">
        <div class="club_ambient_page">
          <img src="../../assets/teacherclub/yujia.png" />
          <span class="tips">机构环境</span>
        </div>
        <div class="club_ambient_staff">Sometimes beauty simple</div>
        <img src="../../assets/teacherclub/clubimg.png" class="club_ambient_img" />
      </div>
      <div class="club_picture">
        <div class="hot-swiper">
          <div class="swiper-container swiper2">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(item,index) in vanswipeItem" :key="index">
                <div class="club_items_img">
                  <img :src="item" class="list_foot_img" alt="机构图片" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="club_picture_present">
        <p class="present_text" v-html="club.content">{{club.content}}</p>
      </div>
      <div class="club_tel">
        <img src="../../assets/teacherclub/tel.png" class="img_tel" />
        {{club.club_tel}}
      </div>
      <div class="club_address">
        <img src="../../assets/teacherclub/address.png" class="img_address" />
        {{club.club_address}}
      </div>
      <div class="border2"></div>
      <div class="house_personnel">
        <div class="house_personnel_page">
          <img src="../../assets/teacherclub/yujia.png" />
          <span class="tips">馆内人员简介</span>
        </div>
        <div class="house_personnel_staff">Guild staff profile</div>
      </div>
      <div class="house_personnel_lists" v-if="personnelItem.length > 0">
        <div class="club-swiper">
          <div class="swiper-container swiper3">
            <div class="swiper-wrapper">
              <div
                class="swiper-slide"
                v-for="(item,index) in personnelItem"
                :key="index"
                @click="exhibition(item)"
              >
                <div class="club_items_img">
                  <img :src="item.first_img" class="list_foot_img" :alt="item.name" />
                </div>
                <div class="personnel_lists_name van-ellipsis">{{item.name}}</div>
                <div class="personnel_lists_name2 van-ellipsis">{{item.good_at}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="Default-page2" v-else>
        <span class="page-span2">我寻寻觅觅却找不到您的踪迹~</span>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import Bus from '../../utils/Bus'
import shareIng from '../../components/shareing'
import { mapGetters } from "vuex";
import Swiper from 'swiper';
import { Notify, Toast } from "vant";
Vue.use(Notify);
export default {
  data() {
    return {
        praise: '',
        club:{},
        vanswipeItem:[],
        clubItems:[],
        personnelItem:[],
        base64img:"",
        isThumb: false
    };
  },
  components: {
      shareIng
  },
  beforeRouteLeave  (to, from, next) {
    if(to.path === this.$route.path || to.path == '') {
        this.$router.replace('/teacherClub/list');
    }
    next()
  },
  created(){
    if (this.isUserNeedLogin) {
        this.joindatalist();
    } else {
        this.joindatalistLogin();
    }
  },
  computed: {
    ...mapGetters(["info","isUserNeedLogin"]),
  },
  methods:{
      swiperInit() {
            new Swiper('.swiper1', {
                slidesPerView: 'auto',
                freeMode: true,
                observer: true,
            });
            new Swiper('.swiper2', {
                slidesPerView: 'auto',
                freeMode: true,
                observer: true,
            });
            new Swiper('.swiper3', {
                slidesPerView: 'auto',
                freeMode: true,
                observer: true,
            });
      },
      // 登录前
      joindatalist(){
        this.$request.get(`/clubs/${this.$route.query.id}`).then(res => {
            let { club } = res;
            this.club = club;
            this.vanswipeItem = club.club_img;
            this.personnelItem = res.teacher;
            this.clubItems= res.trains;
            this.$nextTick(function() {
                this.swiperInit();
            })
        })
        .catch(error => {
            Toast('暂无数据！');
        });
      },
      // 登录后
      joindatalistLogin() {
        this.$request.get(`/clubs/show/login/${this.$route.query.id}`).then(res => {
            this.praise = res.praise;
            let { club } = res;
            this.club = club;
            this.vanswipeItem = club.club_img;
            this.personnelItem = res.teacher;
            this.clubItems= res.trains;
            this.$nextTick(function() {
                this.swiperInit();
            })
        })
      },
      study(id){
        if (this.isUserNeedLogin) {
             this.$router.push("/login");
             return;
        }
        this.$request.get(`/personal/followTrain?id=${id}`).then(data => {
            this.msg = data.msg;
            if(this.msg == "OK"){
                Notify({ message: "成功", type: "success" });
            }
        })
      },
      exhibition(item){
        this.$router.push({
            path: "/teacherClub/teacherDetails",
            query: {
            id: item.id
            }
        });
    },
    clubdetail(id){
        this.$router.push('/messagedetail/'+id);
    },
    goback(){
        this.$router.go(-1)
    },
    // 点赞
    thumb() {
        if (this.isUserNeedLogin) {
            this.$router.push('/login')
             Toast('请登录')
             return;
        } 
        this.$request.get('/personal/thumbsUpClub/'+this.$route.query.id).then(res => {
            if(res.status==1) {
                this.isThumb = true;
                this.praise=1;
            } else {
                this.isThumb = false;
                this.praise=0;
            }
        }).catch(err => {
            Toast('点赞失败!');
        })
    }
  }
};
</script>
<style lang="scss" scope>
.van-nav-bar .van-icon {
  vertical-align: middle;
}
.van-nav-bar--fixed {
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99 !important;
}
.clubhouse_main {
  width: 100%;
  height: 100%;
  display: inline-block;
  background: #fff !important;
  .list_clubhouse {
    width: 93%;
    height: 60px;
    margin: 0 auto;
    margin-top: 50px;
    .list_clubhouse_page {
      display: flex;
      margin-top: 15px;
      img {
        width: 13px;
        height: 15px;
        display: block;
      }
      .tips {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(44, 44, 44, 1);
        padding-left: 6px;
      }
    }
    .list_clubhouse_staff {
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(44, 44, 44, 1);
      padding-top: 5px;
    }
  }
  .club_items {
    .news-swiper {
      padding: 2px 0 5px 16px;
      .swiper-slide {
        width: 131px;
        height: 190px;
        margin-right: 10px;
        box-shadow: 0px 1px 4px 0px rgba(22, 27, 27, 0.18);
        border-radius: 7px;
        margin-bottom: 10px;
        .club_items_img {
          width: 100%;
          height: 110px;
          background-color: #e5e5e5;
          img {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
            border-radius: 7px 7px 0px 0px;
          }
        }
        .club_items_title {
          height: 63px;
          width: 92%;
          margin: 0 auto;
          .diff {
            font-size: 12px;
            color: #7bbb62;
          }
          h3 {
            font-family: PingFang SC;
            font-weight: bold;
            color: rgba(44, 44, 44, 1);
            font-size: 12px;
            margin-top: 15px;
          }
          .van-rate {
            display: inherit;
            user-select: none;
            height: 20px;
            line-height: 14px;
          }
          .club_items_title_its {
            display: flex;
            justify-content: space-between;
            margin-top: 8px;
            .club_price {
              font-family: PingFang SC;
              font-weight: 500;
              font-size: 10px;
              color: rgba(44, 44, 44, 1);
            }
            .club_prict {
              font-family: PingFang SC;
              font-weight: 500;
              font-size: 10px;
              color: #999;
            }
          }
        }
      }
    }
  }
  .Default-page3 {
    width: 100%;
    height: 100px;
    margin: 0 auto;
    text-align: center;
    line-height: 60px;
    .page-span3 {
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #999;
    }
  }
  .border {
    width: 100%;
    height: 5px;
    background: #c6c6c6;
  }
  .thumb,
  .thumb-status {
    position: fixed;
    top: 252px;
    right: 30px;
    z-index: 99;
    width: 44px;
    height: 44px;
    border-radius: 22px;
    box-shadow: 0px 1px 6px 0px rgba(50, 50, 50, 0.29);
    background: url("../../assets/img/xin.png") no-repeat;
    background-color: #fff;
    background-position: left;
    background-size: 2900%;
  }
  .thumb-status {
    background-position: right;
  }
  @-webkit-keyframes heartBlast {
    0% {
      background-position: left;
    }
    100% {
      background-position: right;
    }
  }
  @keyframes heartBlast {
    0% {
      background-position: left;
    }
    100% {
      background-position: right;
    }
  }
  .heartThumb {
    -webkit-animation-name: heartBlast;
    animation-name: heartBlast;
    -webkit-animation-duration: 0.8s;
    animation-duration: 0.8s;
    -webkit-animation-iteration-count: 1;
    animation-iteration-count: 1;
    -webkit-animation-timing-function: steps(28); //共28个背景图片帧
    animation-timing-function: steps(28);
    background-position: right;
  }
  .club_ambient {
    width: 93%;
    height: 70px;
    margin: 0 auto;
    position: relative;
    .club_ambient_page {
      display: flex;
      margin-top: 50px;
      img {
        width: 13px;
        height: 15px;
        display: block;
      }
      .tips {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(44, 44, 44, 1);
        padding-left: 6px;
      }
    }
    .club_ambient_staff {
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(44, 44, 44, 1);
      padding-top: 5px;
    }
    .club_ambient_img {
      position: absolute;
      width: 220px;
      top: -15px;
    }
  }
  .club_picture {
    width: 100%;
    height: 100%;
    .hot-swiper {
      padding: 5px 0 23px 0px;
      .swiper-slide {
        width: 151px;
        height: 113px;
        margin-right: 11px;
        .club_items_img {
          width: 100%;
          height: 113px;
          background-color: #e5e5e5;
          border-radius: 4px;
          .list_foot_img {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
            border-radius: 4px;
          }
        }
      }
    }
  }
  .club_picture_present {
    width: 93%;
    height: auto;
    margin: 0 auto;
    margin-bottom: 20px;
    line-height: 15px;
    border-left: 7px solid #e5e5e5;
    .present_text {
      font-size: 10px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      margin-left: 15px;
    }
  }
  .club_tel {
    width: 93%;
    height: 30px;
    margin: 0 auto;
    font-size: 10px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(44, 44, 44, 1);
    .img_tel {
      width: 17px;
      height: 17px;
    }
  }
  .club_address {
    width: 93%;
    height: 30px;
    margin: 0 auto;
    font-size: 10px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(44, 44, 44, 1);
    margin-bottom: 18px;
    .img_address {
      width: 17px;
      height: 17px;
    }
  }
  .border2 {
    width: 100%;
    height: 9px;
    background: #cdcdcd;
  }
  .house_personnel {
    width: 100%;
    height: 60px;
    margin: 0 auto;
    .house_personnel_page {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      img {
        width: 13px;
        height: 15px;
        display: block;
      }
      .tips {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(44, 44, 44, 1);
        padding-left: 6px;
      }
    }
    .house_personnel_staff {
      font-size: 12px;
      text-align: center;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(44, 44, 44, 1);
      padding-top: 5px;
    }
  }
  .house_personnel_lists {
    width: 100%;
    height: 100%;
    .club-swiper {
      padding: 5px 0 23px 0px;
      .swiper-slide {
        width: 254px;
        height: 330px;
        margin-right: 11px;
        box-shadow: 0px 1px 4px 0px rgba(22, 27, 27, 0.18);
        margin-bottom: 30px;
        border-radius: 7px;
        .club_items_img {
          width: 100%;
          height: 254px;
          background-color: #e5e5e5;
          border-radius: 7px;
          .list_foot_img {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
            border-radius: 7px 7px 0px 0px;
          }
        }
        .personnel_lists_name {
          text-align: center;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(44, 44, 44, 1);
          line-height: 30px;
          padding-top: 10px;
          width: 90%;
          margin: 0 auto;
        }
        .personnel_lists_name2 {
          text-align: center;
          font-size: 10px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(44, 44, 44, 1);
          padding-bottom: 20px;
          width: 90%;
          margin: 0 auto;
        }
      }
    }
  }
  .Default-page2 {
    width: 100%;
    height: 100px;
    margin: 0 auto;
    text-align: center;
    line-height: 60px;
    .page-span2 {
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #999;
    }
  }
}
// .popup {
//   /deep/ .van-icon {
//       position: absolute;
//       top: 12px;
//       font-size: 18px;
//       color: #2c2c2c;
//   }
//   .wenan-title {
//       margin: 10px 0;
//       font-size: 16px;
//       font-weight: 600;
//       text-align: center;
//   }
//   .wenan-box {
//       position: absolute;
//       top: 41px;
//       left: 16px;
//       bottom: 64px;
//       width: 343px;
//       padding: 10px;
//       background-color: #eee;
//       overflow: scroll;
//       &-item {
//           width: 100%;
//           padding: 8px 10px;
//           margin-bottom: 13px;
//           background-color: #ddd;
//           border-radius: 5px;
//           font-size: 14px;
//           font-weight: 600;
//       }
//       &-item:hover {
//           box-sizing: border-box;
//           background-color: #eefaed;
//           border: 1px solid #7BBB62;
//       }
//   }
//   #copy {
//       position: absolute;
//       left: 16px;
//       bottom: 10px;
//       width: 343px;
//       height: 44px;
//       line-height: 44px;
//       background-color: #7BBB62;
//       border-radius: 22px;
//       border: none;
//       text-align: center;
//       font-size: 16px;
//       color: #fff;
//   }
// }
</style>