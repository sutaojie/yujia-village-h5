<template>
    <div>
        <div class="details_main">
            <van-nav-bar title="名师详情" left-arrow @click-left="goback" fixed>
                <share-ing slot="right"
                    type="teacher"
                ></share-ing>
            </van-nav-bar>
            <div class="details_head">
                <div class="count-img">
                    <div class="count-name">
                        <span class="span1">瑜伽名师<span class="span2">-{{teacher.name}}</span></span>
                    </div>
                    <div class="count-imgpic">
                      <img :src="teacher.cover" class="count-name-img" :alt="teacher.name"/>
                    </div>
                </div>
            </div>
            <div :class="[isThumb?'heartThumb':'',praise==1?'thumb-status':'thumb']" @click="thumb">

            </div>
            <div class="details_center">
                <div class="yogofigcaption-title">
                    <h2>个人简介</h2>
                    <p class="p1">Good at courses</p>
                    <div class="p2">擅长课程：<div style="width: 81%;line-height: 20px;">{{teacher.good_at}}</div></div>
                    <div class="p3">课程特色：<div style="width: 81%;line-height: 20px;" v-html="teacher.content">{{teacher.content}}</div></div>
                </div>
            </div>
            <div class="details_foot">
                <div class="foot_exhibition">
                    <div class="foot_exhibition_page">
                        <img src="../../assets/teacherclub/yujia.png"/>
                        <span class="tips">名师个人SHOW</span>
                    </div>
                    <div class="foot_exhibition_staff">PERSONAL DISPLAY</div>
                </div>
                <div class="hot-swiper" v-if="footlist.length > 0">
                    <div class="swiper-container swiper1">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="(item,index) in footlist" :key="index">
                                <div class="club_items_img">
                                    <img :src="item" class="list_foot_img" alt="名师个人show"/>
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>
                <div class="Default-page" v-else>
                    <span class="page-span">我寻寻觅觅却找不到您的踪迹~</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import Bus from "@/utils/Bus";
import shareIng from '../../components/shareing'
import { mapGetters } from "vuex"
import Swiper from 'swiper';
import { Toast } from 'vant';

export default {
  data() {
    return {
        praise: '',
        footlist:[],
        teacher:{},
        base64img:"",
        isThumb: ''
    };
  },
  components: {
      shareIng
  },
   computed: {
    ...mapGetters(["info","isUserNeedLogin"]),
  },
  created(){
    if (this.isUserNeedLogin) {
        this.yogoteacherdata();
    } else {
        this.yogoteacherdataLogin();
    }
  },
  methods:{
    swiperInit() {
          new Swiper('.swiper1', {
              slidesPerView: 'auto',
              freeMode: true,
              observer: true,
          });
    },
    // 登录前
     yogoteacherdata(){
        this.$request.get(`/teachers/${this.$route.query.id}`).then(res => {
            let { teacher} = res;
            this.footlist = res.teacher.teacher_img;
            this.teacher = res.teacher;
            this.teacherid = res.teacher.id;
            this.$nextTick(function() {
                this.swiperInit();
            })
        })
        .catch(error => {
            Toast('暂无数据！');
        });
    },
    // 登录后
    yogoteacherdataLogin() {
        this.$request.get(`/teachers/show/login/${this.$route.query.id}`).then(res => {
            let { teacher, praise} = res;
            this.praise = praise;
            this.footlist = res.teacher.teacher_img;
            this.teacher = res.teacher;
            this.teacherid = res.teacher.id;
            this.$nextTick(function() {
                this.swiperInit();
            })
        })
    },
    goback() {
      this.$router.push('/teacherClub/list')
    },
    // 点赞
    thumb() {
        if (this.isUserNeedLogin) {
            this.$router.push('/login')
             Toast('请登录')
             return;
        } 
        this.$request.get(`/personal/teachers/thumbsUp/${this.$route.query.id}`).then(res => {
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
.van-nav-bar--fixed{
    position: fixed!important;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99 !important;
}

.details_main{
    width: 100%;
    height: 100%;
    display: inline-block;
    background: #fff !important;
    .details_head{
        width: 100%;
        height: 210px;
        background-color: #3E3E3E;
        background-image: url('../../assets/teacherclub/bg2.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-top: 46px;
        .count-img{
            width: 93%;
            height: 100%;
            position: relative;
            margin: 0 auto;
            .count-name{
                width: 48%;
                margin: 0 auto;
                border: 2px solid transparent;
                height: auto;
                position: absolute;
                bottom: 7%;
                left: 0%;
                transition: all .9s;
                line-height: 15px;
                padding-bottom: 5px;
                text-align: center;
                border-image:linear-gradient(to left,#43516A,#AE8D66) 1 10;
                .span1{
                    font-size:12px;
                    font-family:Gulim;
                    font-weight:400;
                    font-style:italic;
                    color: #43516A;
                    .span2{
                        font-size:12px;
                        font-family:Gulim;
                        font-weight:400;
                        font-style:italic;
                        color: #43516A;
                    }
                }
            }
            .count-imgpic{
                width: 98px;
                height: 98px;
                position: absolute;
                top: 10%;
                left: 19%;
                background-image: url('../../assets/teacherclub/bgimg22.png');
                background-repeat: no-repeat;
                background-size: 100% 100%;
                .count-name-img{
                    width: 73px;
                    height: 71px;
                    position: absolute;
                    top: 8%;
                    left: 11%;
                    object-fit: cover;
                }
            }
        }
    }
    .thumb,
    .thumb-status {
        position: fixed;
        top: 265px;
        right: 30px;
        z-index: 99;
        width: 44px;
        height: 44px;
        border-radius: 22px;
        box-shadow:0px 1px 6px 0px rgba(50,50,50,0.29);
        background: url('../../assets/img/xin.png') no-repeat;
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
    .heartThumb  {
        -webkit-animation-name: heartBlast;
        animation-name: heartBlast;
        -webkit-animation-duration: .8s;
        animation-duration: .8s;
        -webkit-animation-iteration-count: 1;
        animation-iteration-count: 1;
        -webkit-animation-timing-function: steps(28); //共28个背景图片帧
        animation-timing-function: steps(28);
        background-position: right;
    }
    .details_center{
        width: 100%;
        height: auto;
        background-color: #3E3E3E;
        background-image: url('../../assets/teacherclub/bg1.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        display: flex;
        .yogofigcaption-title{
                width: 93%;
                height: 100%;
                margin: 0 auto;
                margin-bottom: 10px;
                margin-top: 10px;
               h2{
                    font-size:16px;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    color: #fff;
                    margin-top: 3%;
               }
               .p1{
                   color: #fff;
                   font-size: 14px;
                   font-family:Myriad Pro;
                   font-weight:400;
               }
               .p2{
                   color: #fff;
                   font-size: 10px;
                   font-family:Microsoft YaHei;
                   margin-top: 6%;
                   font-weight:400;
                   margin-bottom: 7px;
                   display: flex;
               }
               .p3{
                   color: #fff;
                   font-size: 10px;
                   font-family:Microsoft YaHei;
                   font-weight:400;
                   display: flex;
               }
           }
    }
    .details_foot{
        width: 100%;
        height: auto;
        background-color: #3E3E3E;
        background-image: url('../../assets/teacherclub/bg3.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        display: inline-block;
        .foot_exhibition{
            width: 93%;
            height: 60px;
            margin: 0 auto;
            margin-top: 30px;
            .foot_exhibition_page{
                display: flex;
                margin-top: 15px;
                img{
                    width: 13px;
                    height: 15px;
                    display: block;
                    margin-top: 5px;
                }
                .tips{
                    font-size:16px;
                    font-family:PingFang SC;
                    font-weight:bold;
                    color:#65627D;
                    padding-left: 6px;
                }
            }
            .foot_exhibition_staff{
                font-size:12px;
                font-family:PingFang SC;
                font-weight:400;
                color:rgba(44,44,44,1);
                padding-top: 5px;
            }
        }
        .hot-swiper {
        padding: 5px 0 23px 16px;
        .swiper-slide {
            width: 214px;
            height: 270px;
            margin-right: 11px;
            .club_items_img{
                width: 100%;
                height:270px;
                background-color: #E5E5E5;
                border-radius: 4px;
                .list_foot_img{
                    width: 100%;
                    height: 100%;
                    display: block;
                    object-fit: cover;
                    border-radius: 4px;
                }
            }
        }
    }
        .Default-page{
            width: 100%;
            height: 100px;
            margin: 0 auto;
            text-align: center;
            line-height: 60px;
            .page-span{
                font-size:12px;
                font-family:PingFang SC;
                font-weight:500;
                color: #999;
            }
        }
    }
}

</style>
