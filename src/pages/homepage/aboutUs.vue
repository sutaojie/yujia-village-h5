<template>
    <div class="aboutUs">
        <van-nav-bar title="关于我们" left-arrow @click-left="onClickLeft">
        </van-nav-bar>
        <div class="banner" :style="{backgroundImage: 'url('+aboutUs.banner+')'}"></div>
        <div class="aboutUs_warp">
            <div class="share_warp_rule">
                <div class="border-left"></div>
                <div class="h2"><img src="../../assets/teacherclub/yujia.png"/>瑜伽村平台</div>
                <div class="rule_name">Sometimes beauty is so simple</div>
                <div class="border-right"></div>
            </div>
            <div class="aboutUs_p">
                <p>
                    中国瑜伽村是全国培训信息最丰富的瑜伽行业平台。瑜伽村平台集合了全球瑜伽名师信息，瑜伽培训、大会信息等。
                    可通过课程类型、地域、时间、老师、价格等信息进行进准分类搜索，是目前中国培训信息最丰富、搜索最进准的瑜伽行业资讯平台。
                </p>
                <p>目前有100多家培训机构进驻，1000多个知名导师展示，10000多条瑜伽培训、大会信息，三个月目标做到100000位注册瑜伽老师。
                    中国瑜伽村致力于打造内容最丰富，搜索最精准，注册瑜伽老师最多的的瑜伽行业平台。
                </p>
                <p>只要注册成为中国瑜伽村村民，即可参与推荐分享积分活动，积分可兑换瑜伽培训课程及各种瑜伽活动等优惠礼遇。详情请见中国瑜伽村积分规则。</p>
            </div>
        </div>
        <div class="borders"></div>
        <div class="aboutUs_warp2">
            <div class="share_warp_rule">
                <div class="border-left"></div>
                <div class="h2"><img src="../../assets/teacherclub/yujia.png"/>瑜伽村积分规则</div>
                <div class="rule_name">Sometimes beauty is so simple</div>
                <div class="border-right"></div>
            </div>
            <div class="content-box">
                <div class="rules-box">
                    <div class="title">1.什么是瑜伽村积分</div>
                    <p class="introduction">
                        瑜伽村积分是通过瑜伽爱好者、教练、机构负责人等完成注册、完善信息及邀请注册等途径获得的积分奖励。
                    </p>
                </div>
                <div class="rules-box">
                    <div class="title">2.瑜伽村积分有什么用</div>
                    <ul class="introduction">
                        <li>1）瑜伽老师/普通村民：积分可兑换瑜伽培训课程、瑜伽活动优惠，及抵用课程费用等优惠礼遇</li>
                        <li>2）瑜伽名师/瑜伽机构：积分可兑换中国瑜伽村官网及手机端的广告位信息展示</li>
                    </ul>
                </div>
                <div class="rules-box">
                    <div class="title">3.瑜伽村积分获取详情</div>
                    <p class="introduction">
                        <ul>
                            <li>1）注册中国瑜伽村普通村民，即获得<span class="num">500</span>积分；</li>
                            <li>2）注册后完善个人资料，即获得<span class="num">100</span>积分；</li>
                            <li>3）完成认证信息，即获得<span class="num">200</span>积分；</li>
                            <li>4）邀请好友注册中国瑜伽村普通村民，每邀请注册一个好友，即获得<span class="num">300</span>积分，以此叠加；</li>
                            <li>5）您邀请的好友再邀请其他好友注册，每邀请注册一个好友，即获得<span class="num">100</span>积分，以此叠加；</li>
                            <li class="zhuyi">注：在2019年12月31日前参与注册推荐积分活动，所有积分翻倍</li>
                            <li>例：</li>
                            <li>注册获得500积分，现可获得<span class="num">1000</span>积分；</li>
                            <li>完善资料100积分，现可获得<span class="num">200</span>积分；</li>
                            <li>认证信息200积分，现可获得<span class="num">400</span>积分；</li>
                            <li>推荐好友300积分，现可获得<span class="num">600</span>积分；</li>
                            <li>以此类推，最终解释权归中国瑜伽村所有。</li>
                        </ul>
                    </p>
                </div>
            </div>
        </div>
        <div class="borders"></div>
        <div class="aboutUs_warp3">
            <div class="share_warp_rule">
                <div class="border-left"></div>
                <div class="h2"><img src="../../assets/teacherclub/yujia.png"/>瑜伽村网络板块</div>
                <div class="rule_name">Sometimes beauty is so simple</div>
                <div class="border-right"></div>
            </div>
            <div class="aboutUs_lists">
                <div class="aboutUs_items" v-for="(item,index) in aboutusmodel" :key="index">
                    <div class="aboutUs_items_li">
                        <div class="aboutUs_items_img">
                            <img :src="item.url_pic"/>
                        </div>
                        <div class="aboutUs_items_text">
                            <div class="text1">{{item.name}}</div>
                            <div class="text2">{{item.describe}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="borders"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            aboutUs:"",
            aboutusmodel:[]
        }
    },
    created(){
      this.listhomedata();
  },
   methods:{
        onClickLeft() {
            this.$router.go(-1);
        },
        listhomedata(){
        this.$request.get("/aboutUs").then(res => {
            console.log(res);
            
            this.aboutUs = res;
            this.aboutusmodel = res.about_us_model;
        })
        .catch(error => {
            let { response: { data: { errorCode, msg } } } = error;
            if (errorCode != 0) {
            this.$message({
                message: msg,
                type: "error"
            });
            return;
            }
        });
      },
    }
}
</script>
<style lang="scss" scope>
.aboutUs{
    .van-nav-bar {
        position: fixed;
        top: 0;
    }
    margin-bottom: 50px;
    background: #fff !important;
    .banner {
        margin-top: 46px;
        background-image: url('../../assets/teacherclub/banner.png');
        height: 170px;
        background-size: cover;
        background-position: center;
    }
    .aboutUs_warp{
        display: inline-block;
        position: relative;
        width: 100%;
        .share_warp_rule{
            width: 100%;
            line-height: 23px;
            text-align: center;
        .rule_name{
          font-size: 10px;
          font-family:PingFang SC;
          font-weight:400;
          color: #999;
          text-align: center;
        }
        .border-left{
          width: 25%;
          position: absolute;
          top: 40px;
          background-color: #DCDCDC;
          height: 1px;
          left: 10px;
        }
        .border-right{
          width: 25%;
          position: absolute;
          top: 40px;
          background-color: #DCDCDC;
          height: 1px;
          right: 10px;
        }
        .h2{
            color: #2c2c2c;
            font-size: 14px;
            margin-top: 20px;
            font-family:Microsoft YaHei;
            font-weight:500;
            display: flex;
            justify-content: center;
            img{
                width: 20px;
                height: 18px;
                margin-left: -7px;
                display: block;
            }
        }
      }
      .aboutUs_p {
        width: 93%;
        margin: 0 auto;
        font-size: 12px;
        font-family:PingFang SC;
        font-weight: 400;
        color:rgba(44,44,44,1);
        margin-top: 20px;
        margin-bottom: 20px;
        p {
            text-indent: 2em;
            line-height: 20px;
        }
      }
    }
    .aboutUs_warp2{
        display: inline-block;
        position: relative;
        width: 100%;
        .share_warp_rule{
            width: 100%;
            line-height: 23px;
            text-align: center;
            .rule_name{
            font-size: 10px;
            font-family:PingFang SC;
            font-weight:400;
            color: #999;
            text-align: center;
            }
            .border-left{
            width: 25%;
            position: absolute;
            top: 40px;
            background-color: #DCDCDC;
            height: 1px;
            left: 10px;
            }
            .border-right{
            width: 25%;
            position: absolute;
            top: 40px;
            background-color: #DCDCDC;
            height: 1px;
            right: 10px;
            }
            .h2{
                color: #2c2c2c;
                font-size: 14px;
                margin-top: 20px;
                font-family:Microsoft YaHei;
                font-weight:500;
                display: flex;
                justify-content: center;
                img{
                    width: 20px;
                    height: 18px;
                    margin-left: -7px;
                    display: block;
                }
            }
        }
        // 积分规则
        .content-box {
            background-color: #fff;
            .rules-box {
                padding: 0 16px;
                font-size: 12px;
                .title {
                    padding: 15px 0;
                    font-size: 12px;
                    font-weight: 600;
                }
                .introduction {
                    padding: 0 16px;
                    line-height: 24px;
                    color: #999;
                    .num {
                        color: rgb(255, 38, 0);
                        font-weight: 600;
                    }
                    .zhuyi {
                        color: rgb(255, 38, 0);
                        font-weight: 600;
                    }
                }
            }
        }
        .aboutUs_p {
            width: 93%;
            margin: 0 auto;
            text-align: center;
            font-size:10px;
            font-family:PingFang SC;
            font-weight:400;
            color:rgba(44,44,44,1);
            margin-top: 20px;
            margin-bottom: 20px;
            line-height: 20px;
        }
    }
    .aboutUs_warp3{
        display: inline-block;
        position: relative;
        width: 100%;
        .share_warp_rule{
            width: 100%;
            line-height: 23px;
            text-align: center;
        .rule_name{
          font-size: 10px;
          font-family:PingFang SC;
          font-weight:400;
          color: #999;
          text-align: center;
        }
        .border-left{
          width: 25%;
          position: absolute;
          top: 40px;
          background-color: #DCDCDC;
          height: 1px;
          left: 10px;
        }
        .border-right{
          width: 25%;
          position: absolute;
          top: 40px;
          background-color: #DCDCDC;
          height: 1px;
          right: 10px;
        }
        .h2{
            color: #2c2c2c;
            font-size: 14px;
            margin-top: 20px;
            font-family:Microsoft YaHei;
            font-weight:500;
            display: flex;
            justify-content: center;
            img{
                width: 20px;
                height: 18px;
                margin-left: -7px;
                display: block;
            }
        }
      }
      .aboutUs_lists{
        margin-top: 20px;
        // margin-bottom: 20px;
        .aboutUs_items{
            width: 100%;
            height: 70px;
            background-color: #EEEEEE;
            .aboutUs_items_li{
                width: 93%;
                margin: 0 auto;
                display: flex;
                .aboutUs_items_img{
                    width: 26%;
                    margin-top: -4px;
                    img{
                        width: 78px;
                        height: 78px;
                        display: block;
                        border-radius: 50%;
                        object-fit: cover;
                    }
                }
                .aboutUs_items_text{
                    line-height: 25px;
                    margin-top: 10px;
                    text-align: left;
                    width: 70%;
                    .text1{
                        font-size:12px;
                        font-family:PingFang SC;
                        font-weight:500;
                        color:rgba(44,44,44,1);
                    }
                    .text2{
                        font-size:11px;
                        font-family:PingFang SC;
                        font-weight:400;
                        color:rgba(153,153,153,1);
                    }
                }
            }
        }
        .aboutUs_items:nth-child(2n){
            width: 100%;
            height: 70px;
            background-color: #fff;
            .aboutUs_items_li{
                width: 93%;
                margin: 0 auto;
                display: flex;
                position: relative;
                .aboutUs_items_img{
                    width: 26%;
                    margin-top: -4px;
                    position: absolute;
                    right: 0;
                    img{
                        width: 78px;
                        height: 78px;
                        display: block;
                        border-radius: 50%;
                        object-fit: cover;
                    }
                }
                .aboutUs_items_text{
                    line-height: 25px;
                    margin-top: 10px;
                    text-align: right;
                    width: 70%;
                    .text1{
                        font-size:12px;
                        font-family:PingFang SC;
                        font-weight:500;
                        color:rgba(44,44,44,1);
                    }
                    .text2{
                        font-size:11px;
                        font-family:PingFang SC;
                        font-weight:400;
                        color:rgba(153,153,153,1);
                    }
                }
            }
        }
      }
    }
    .borders{
        height: 7px;
        background: #eee;
    }
}
</style>