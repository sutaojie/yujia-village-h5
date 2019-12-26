<template>
    <div>
        <van-nav-bar title="优惠券" left-arrow @click-left="onClickLeft"></van-nav-bar>
        <van-tabs v-model="activeName" color="#B3D465">
            <van-tab v-for="(item,index) in orderTitle" :key="index" :title="item" :name="item">
                <div v-if="activeName === '未使用'">
                    <div class="Notused">
                        <div v-for="(item,index) in couponlist" :key="index">
                        <div class="Notused_count" v-if="item.status == '未使用'">
                            <div class="Notused_count_title">
                                <div class="title1">消费商品</div>
                                <div class="title2">{{item.name}}</div>
                                <div class="title3">{{item.range}}</div>
                            </div>
                            <div class="Notused_count_price">
                                <div class="price"><span class="coin">￥</span>{{item.money}}</div>
                                <div class="date">{{item.startDate}}-{{item.endDate}}</div>
                            </div>
                            <div class="Notused_count_horn"></div>
                        </div>
                        </div>
                    </div>
                </div>
                <div v-if="activeName === '已使用'">
                    <div class="Notused2">
                        <div v-for="(item,index) in couponlist" :key="index">
                        <div class="Notused_count" v-if="item.status == '已使用'">
                            <div class="Notused_count_title">
                                <div class="title1">消费商品</div>
                                <div class="title2">{{item.name}}</div>
                                <div class="title3">{{item.range}}</div>
                            </div>
                            <div class="Notused_count_price">
                                <div class="price"><span class="coin">￥</span>{{item.money}}</div>
                                <div class="date">{{item.startDate}}-{{item.endDate}}</div>
                            </div>
                            <div class="Notused_count_horn">
                                <span class="bestow">已使用</span>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div v-if="activeName === '已失效'">
                    <div class="Notused3">
                        <div v-for="(item,index) in couponlist" :key="index">
                        <div class="Notused_count" v-if="item.status == '已失效'">
                            <div class="Notused_count_title">
                                <div class="title1">消费商品</div>
                                <div class="title2">{{item.name}}</div>
                                <div class="title3">{{item.range}}</div>
                            </div>
                            <div class="Notused_count_price">
                                <div class="price"><span class="coin">￥</span>{{item.money}}</div>
                                <div class="date">{{item.startDate}}-{{item.endDate}}</div>
                            </div>
                            <div class="Notused_count_horn">
                                <span class="abate">已失效</span>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
/* eslint-disable */
export default {
    data() {
        return {
            activeName: '未使用',
            orderTitle: ['未使用','已使用','已失效'],
            couponlist:[],
        }
    },
    created(){
        this.coupon();
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        coupon(){
        this.$request.get(`/personal/home`).then(res => {
            let { coupon } = res;
            this.couponlist = coupon;
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
<style lang="scss" scoped>
.van-nav-bar {
    position: fixed;
    top: 0;
    width: 100%;
    font-size: 16px;
    background-color: #8FCD71 !important;
    .van-icon {
        font-size: 20px;
        color: #2c2c2c;
    }
}
.van-tabs {
    /deep/ .van-tabs__wrap {
        position: fixed;
        top: 46px;
        width: 100%;
        z-index: 99;
    }
}
.Notused{
    background: #fff!important;
    display: flow-root;
    padding: 90px 0 0 0;
    .Notused_count{
        width: 93%;
        margin: 0 auto;
        height: 90px;
        background-image: url('../../assets/teacherclub/bgimg11.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-top: 15px;
        display: flex;
        position: relative;
        overflow: hidden;
        margin-bottom: 20px;
        .Notused_count_title{
            width: 33%;
            text-align: left;
            line-height: 23px;
            padding-top: 11px;
            text-indent: 25px;
            .title1{
                font-size:16px;
                font-family:FZLanTingHei-B-GBK;
                font-weight:bold;
                color:rgba(255,255,255,1);
            }
            .title2{
                font-size:18px;
                font-family:FZLanTingHei-B-GBK;
                font-weight:bold;
                color:rgba(255,255,255,1);
            }
            .title3{
                font-size:11px;
                font-family:FZLanTingHei-B-GBK;
                font-weight:400;
                color:rgba(255,255,255,1);
            }
        }
        .Notused_count_price{
            width: 50%;
            text-align: left;
            line-height: 23px;
            padding-top: 15px;
            .price{
                font-size: 40px;
                font-family:FZLanTingHei-H-GBK;
                font-weight:bold;
                color:rgba(255,255,255,1);
                text-indent: 20px;
                .coin{
                    font-size: 16px;
                    font-family:FZLanTingHei-H-GBK;
                    font-weight:bold;
                    color:rgba(255,255,255,1);
                }
            }
            .date{
                font-size: 11px;
                font-family:FZLanTingHei-H-GBK;
                font-weight:400;
                color:rgba(255,255,255,1);
                text-indent: 20px;
                padding-top: 5px;
            }
        }
        .Notused_count_horn{
            height: 20px;
            width: 23%;
            background: #E9F7C5;
            transform: rotate(45deg);
            position: absolute;
            right: -18px;
            top: 12px;
        }
    }
}
.Notused2{
    background: #fff!important;
    display: flow-root;
    padding: 90px 0 0 0;
    .Notused_count{
        width: 93%;
        margin: 0 auto;
        height: 90px;
        background-image: url('../../assets/teacherclub/bgimg12.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-top: 15px;
        display: flex;
        position: relative;
        margin-bottom: 20px;
        overflow: hidden;
        .Notused_count_title{
            width: 33%;
            text-align: left;
            line-height: 23px;
            padding-top: 11px;
            text-indent: 25px;
            .title1{
                font-size:16px;
                font-family:FZLanTingHei-B-GBK;
                font-weight:bold;
                color:rgba(255,255,255,1);
            }
            .title2{
                font-size:18px;
                font-family:FZLanTingHei-B-GBK;
                font-weight:bold;
                color:rgba(255,255,255,1);
            }
            .title3{
                font-size:11px;
                font-family:FZLanTingHei-B-GBK;
                font-weight:400;
                color:rgba(255,255,255,1);
            }
        }
        .Notused_count_price{
            width: 50%;
            text-align: left;
            line-height: 23px;
            padding-top: 15px;
            .price{
                font-size: 40px;
                font-family:FZLanTingHei-H-GBK;
                font-weight:bold;
                color:rgba(255,255,255,1);
                text-indent: 20px;
                .coin{
                    font-size: 16px;
                    font-family:FZLanTingHei-H-GBK;
                    font-weight:bold;
                    color:rgba(255,255,255,1);
                }
            }
            .date{
                font-size: 11px;
                font-family:FZLanTingHei-H-GBK;
                font-weight:400;
                color:rgba(255,255,255,1);
                text-indent: 20px;
                padding-top: 5px;
            }
        }
        .Notused_count_horn{
            height: 20px;
            width: 23%;
            background: #E9F7C5;
            transform: rotate(45deg);
            position: absolute;
            right: -18px;
            top: 12px;
            .bestow{
                font-size:10px;
                font-family:PingFang SC;
                font-weight:500;
                color:rgba(14,14,14,1);
                position: absolute;
                top: 4px;
                right: 24px;
            }
        }
    }
}
.Notused3{
    background: #fff!important;
    display: flow-root;
    padding: 90px 0 0 0;
    .Notused_count{
        width: 93%;
        margin: 0 auto;
        height: 90px;
        background-image: url('../../assets/teacherclub/bgimg13.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-top: 15px;
        display: flex;
        position: relative;
        overflow: hidden;
        margin-bottom: 20px;
        .Notused_count_title{
            width: 33%;
            text-align: left;
            line-height: 23px;
            padding-top: 11px;
            text-indent: 20px;
            .title1{
                font-size:16px;
                font-family:FZLanTingHei-B-GBK;
                font-weight:bold;
                color:rgba(255,255,255,1);
            }
            .title2{
                font-size:18px;
                font-family:FZLanTingHei-B-GBK;
                font-weight:bold;
                color:rgba(255,255,255,1);
            }
            .title3{
                font-size:11px;
                font-family:FZLanTingHei-B-GBK;
                font-weight:400;
                color:rgba(255,255,255,1);
            }
        }
        .Notused_count_price{
            width: 50%;
            text-align: left;
            line-height: 23px;
            padding-top: 15px;
            .price{
                font-size: 40px;
                font-family:FZLanTingHei-H-GBK;
                font-weight:bold;
                color:rgba(255,255,255,1);
                text-indent: 30px;
                .coin{
                    font-size: 16px;
                    font-family:FZLanTingHei-H-GBK;
                    font-weight:bold;
                    color:rgba(255,255,255,1);
                }
            }
            .date{
                font-size: 11px;
                font-family:FZLanTingHei-H-GBK;
                font-weight:400;
                color:rgba(255,255,255,1);
                text-indent: 30px;
                padding-top: 5px;
            }
        }
        .Notused_count_horn{
            height: 20px;
            width: 23%;
            background: #E9F7C5;
            transform: rotate(45deg);
            position: absolute;
            right: -18px;
            top: 12px;
            .abate{
                font-size:10px;
                font-family:PingFang SC;
                font-weight:500;
                color:rgba(14,14,14,1);
                position: absolute;
                top: 4px;
                right: 24px;
            }
        }
    }
}
</style>