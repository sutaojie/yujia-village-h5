<template>
    <div>
        <van-nav-bar title="课程订单" left-arrow @click-left="onClickLeft">
        </van-nav-bar>
        <van-tabs v-model="active" color="#7BBB62" title-active-color="#7BBB62" animated :border="false">
            <van-tab title="全部">
                <div class="content">
                    <div class="course" v-for="(item,index) in courseOrderAll" :key="index" @click="goCourseDetail(item.tid)">
                        <div class="course-order">
                            <div class="order-id">订单编号：{{item.out_trade_no}}</div>
                            <div class="status">{{item.status}}</div>
                        </div>
                        <div class="course-detail">
                            <img class="img" :src="item.teacher_img"/>
                            <div class="info">
                                <div class="title">{{item.theme}}</div>
                                <div class="price"><span>课程价格</span><span>￥{{item.price}}</span></div>
                            </div>
                        </div>
                        <div class="course-pay">
                            {{item.status === '已购买'? '实付': '待支付'}}：<span>{{item.total_price}}</span>
                        </div>
                        <div v-if="item.status === '未支付'" class="go-pay" @click.stop="payMoney(item.out_trade_no)">去支付</div>
                    </div>
                    <div class="empty" v-if="courseOrderAll.length === 0"></div>
                </div>
            </van-tab>
            <van-tab title="待支付">
                <div class="content">
                    <div class="course" v-for="(item,index) in courseOrderWaitpay" :key="index" @click="goCourseDetail(item.tid)">
                        <div class="course-order">
                            <div class="order-id">订单编号：{{item.out_trade_no}}</div>
                            <div class="status">{{item.status}}</div>
                        </div>
                        <div class="course-detail">
                            <img class="img" :src="item.teacher_img"/>
                            <div class="info">
                                <div class="title">{{item.theme}}</div>
                                <div class="price"><span>课程价格</span><span>￥{{item.price}}</span></div>
                            </div>
                        </div>
                        <div class="course-pay">
                            {{item.status === '已购买'? '实付': '待支付'}}：<span>{{item.total_price}}</span>
                        </div>
                        <div v-if="item.status === '未支付'" class="go-pay" @click.stop="payMoney(item.out_trade_no)">去支付</div>
                    </div>
                    <div class="empty" v-if="courseOrderWaitpay.length === 0"></div>
                </div>
            </van-tab>
            <van-tab title="已购买">
                <div class="content">
                    <div class="course" v-for="(item,index) in courseOrderSuccess" :key="index" @click="goCourseDetail(item.tid)">
                        <div class="course-order">
                            <div class="order-id">订单编号：{{item.out_trade_no}}</div>
                            <div class="status">{{item.status}}</div>
                        </div>
                        <div class="course-detail">
                            <img class="img" :src="item.teacher_img"/>
                            <div class="info">
                                <div class="title">{{item.theme}}</div>
                                <div class="price"><span>课程价格</span><span>￥{{item.price}}</span></div>
                            </div>
                        </div>
                        <div class="course-pay">
                            {{item.status === '已购买'? '实付': '待支付'}}：<span>{{item.total_price}}</span>
                        </div>
                        <div v-if="item.status === '未支付'" class="go-pay" @click.stop="payMoney(item.out_trade_no)">去支付</div>
                    </div>
                    <div class="empty" v-if="courseOrderSuccess.length === 0"></div>
                </div>
            </van-tab>
        </van-tabs>
        <div v-html="form"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            active: '',
            courseOrderAll: [],
            courseOrderSuccess: [],
            courseOrderWaitpay: [],
            form: ''
        }
    },
    created() {
        this.getBuyCourse();
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        getBuyCourse() {
            this.$request.get('/get/train/order').then(res => {
                this.courseOrderAll = res.all;
                this.courseOrderSuccess = res.success;
                this.courseOrderWaitpay = res.waitpay;
            })
        },
        // 跳转详情页
        goCourseDetail(id) {
            this.$router.push('/message-detail/'+id);
        },
        // 支付
        payMoney(orderId) {
            this.$request.get('/alipay/wappay/get?out_trade_no='+orderId).then(res => {
                this.form = res;
                this.$nextTick(() => {
                    document.forms['alipaysubmit'].submit() //渲染支付宝支付页面
                })
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.van-nav-bar {
    position: fixed;
    top: 0;
    width: 100%;
    font-size: 16px;
    .van-icon {
        font-size: 20px;
        color: #2c2c2c;
    }
}
.van-tabs {
    margin-top: 46px;
    /deep/ .van-tabs__wrap {
        position: fixed;
        top: 46px;
        left: 0;
        z-index: 10;
        width: 100%;
    }
    /deep/ .van-tabs__line {
        width: 55px !important;
        bottom: 20px;
    }
}
.content {
    margin-top: 44px;
    padding-top: 10px;
}
.course {
    position: relative;
    width: 343px;
    height: 152px;
    margin: 0 auto;
    margin-bottom: 7px;
    padding: 10px 15px;
    background-color: #fff;
    box-shadow:3px 1px 8px 1px rgba(0, 0, 0, 0.16);
    border-radius: 10px;

    &-order {
        display: flex;
        justify-content: space-between;
        padding-bottom: 6px;
        border-bottom: 1px solid #eee;
        font-size: 12px;
        .status {
            color: #7BBB62;
        }
    }
    &-detail {
        display: flex;
        justify-content: space-between;
        padding: 5px 0;
        .img {
            width: 94px;
            height: 80px;
        }
        .info {
            width: 200px;
            .title {
                height: 38px;
                line-height: 38px;
                margin-top: 5px;
                font-size: 14px;
                font-weight: 700;
                overflow: hidden;
                white-space: nowrap; 
                text-overflow:ellipsis;
            }
            .price {
                display: flex;
                justify-content: space-between;
                margin-top: 15px;
                font-size: 12px;
                font-weight: 700;
                color: #999;
                span:nth-child(2) {
                    font-weight: 600;
                }
            }
        }
    }
    &-pay {
        font-size: 14px;
        span {
            color: #D13824;
            font-weight: 600;
        }
    }
    .go-pay {
        position: absolute;
        right: 15px;
        bottom: 10px;
        border: 1px solid #7BBB62;
        border-radius: 5px;
        padding: 1px 15px;
        font-size: 14px;
        font-weight: 600;
        color: #7BBB62;
    }
}
.empty {
    width: 100%;
    height: 193px;
    margin-top: 100px;
    background: url('../../assets/img/empty.jpg');
    background-size: cover;
}
</style>