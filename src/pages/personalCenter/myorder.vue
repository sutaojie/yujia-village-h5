<template>
    <div>
        <van-nav-bar title="商品订单" left-arrow @click-left="onClickLeft">
        </van-nav-bar>
        <van-tabs v-model="activeName" color="#B3D465">
            <van-tab v-for="(item,index) in orderTitle" :key="index" :title="item" :name="item">
                <div v-if="activeName === '全部'">
                    <div class="all-order order" v-if="orderDataList.all.length > 0">
                        <div class="order-item" v-for="(item,index) in orderDataList.all" :key="index">
                            <div class="order-num">
                                <span>订单号：{{item.out_trade_no}}</span>
                                <div class="await">{{item.status}}</div>
                            </div>
                            <div class="order-describe" v-for="(item2,index) in item.data" :key="index" @click="goOrderDetail(item.out_trade_no,item.data[0].oid)">
                                <div class="img" :style="{backgroundImage: 'url('+item2.url+')'}"></div>
                                <div class="name">{{item2.name}}</div>
                                <div class="num">x {{item2.num}}</div>
                            </div>
                            <div class="number">
                                <span>共{{totalNum.all[index]}}件</span>
                                <span>合计：￥{{item.totalPrice}}</span>
                            </div>
                            <div class="order-again" v-if="item.status==='待付款'" @click="pay(item.out_trade_no,item.payment)">去支付</div>
                            <div class="wuliu" v-if="item.status==='待收货'" @click="look(item.data[0].oid,item.data)">查看物流</div>
                            <div class="order-again" v-if="item.status==='待收货'" @click="confirmReceipt(item.data[0].oid)">确认收货</div>
                        </div>
                    </div>
                    <div class="empty" v-else></div>
                </div>
                <div v-if="activeName === '待付款'">
                    <div class="obligation-order order" v-if="orderDataList.pay.length > 0">
                        <div class="order-item" v-for="(item,index) in orderDataList.pay" :key="index">
                            <div class="order-num">
                                <span>订单号：{{item.out_trade_no}}</span>
                                <div class="await">{{item.status}}</div>
                            </div>
                            <div class="order-describe" v-for="(item2,index) in item.data" :key="index" @click="goOrderDetail(item.out_trade_no,item.data[0].oid)">
                                <div class="img" :style="{backgroundImage: 'url('+item2.url+')'}"></div>
                                <div class="name">{{item2.name}}</div>
                                <div class="num">x {{item2.num}}</div>
                            </div>
                            <div class="number">
                                <span>共{{totalNum.pay[index]}}件</span>
                                <span>合计：￥{{item.totalPrice}}</span>
                            </div>
                            <div class="order-again" @click="pay(item.out_trade_no,item.payment)">去支付</div>
                        </div>
                    </div>
                    <div class="empty" v-else></div>
                </div>
                <div v-if="activeName === '待发货'">
                    <div class="await-order order" v-if="orderDataList.send.length > 0">
                        <div class="order-item" v-for="(item,index) in orderDataList.send" :key="index">
                            <div class="order-num">
                                <span>订单号：{{item.out_trade_no}}</span>
                                <div class="await">{{item.status}}</div>
                            </div>
                            <div class="order-describe" v-for="(item2,index) in item.data" :key="index" @click="goOrderDetail(item.out_trade_no,item.data[0].oid)">
                                <div class="img" :style="{backgroundImage: 'url('+item2.url+')'}"></div>
                                <div class="name">{{item2.name}}</div>
                                <div class="num">x {{item2.num}}</div>
                            </div>
                            <div class="number">
                                <span>共{{totalNum.send[index]}}件</span>
                                <span>合计：￥{{item.totalPrice}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="empty" v-else></div>
                </div>
                <div v-if="activeName === '待收货'">
                    <div class="shipped-order order" v-if="orderDataList.receive.length > 0">
                        <div class="order-item" v-for="(item,index) in orderDataList.receive" :key="index">
                            <div class="order-num">
                                <span>订单号：{{item.out_trade_no}}</span>
                                <div class="await">{{item.status}}</div>
                            </div>
                            <div class="order-describe" v-for="(item2,index) in item.data" :key="index" @click="goOrderDetail(item.out_trade_no,item.data[0].oid)">
                                <div class="img" :style="{backgroundImage: 'url('+item2.url+')'}"></div>
                                <div class="name">{{item2.name}}</div>
                                <div class="num">x {{item2.num}}</div>
                            </div>
                            <div class="number">
                                <span>共{{totalNum.receive[index]}}件</span>
                                <span>合计：￥{{item.totalPrice}}</span>
                            </div>
                            <div class="wuliu" @click="look(item.data[0].oid,item.data)">查看物流</div>
                            <div class="order-again" @click="confirmReceipt(item.data[0].oid)">确认收货</div>
                        </div>
                    </div>
                    <div class="empty" v-else></div>
                </div>
            </van-tab>
        </van-tabs>
        <div v-html="form"></div>
    </div>
</template>
<script>
import { Toast } from 'vant';
export default {
    data() {
        return {
            activeName: '全部',
            orderTitle: [
                '全部','待付款','待发货','待收货'
            ],
            // 订单数据
            orderDataList: {},
            totalNum: {
                all: [],
                pay: [],
                send: [],
                receive: []
            },
            form: ''
        }
    },
    created() {
        this.getUserGoodsOrder();
    },
    methods: {
        onClickLeft() {
            this.$router.push('/personal');
        },
        getUserGoodsOrder() {
            this.$request.get('/goodOrder/userOrder').then(data => {
                const { all, pay, receive, send, success } = data;
                const orderList = {
                    all,
                    pay,
                    receive,
                    send
                }
                this.orderDataList = orderList;
                this.calculateNumber(all,'all');
                this.calculateNumber(pay,'pay');
                this.calculateNumber(send,'send');
                this.calculateNumber(receive,'receive');
            })
        },
        // 遍历计算 订单商品的数量
        calculateNumber(value,key) {
            value.forEach(ele => {
                var num = 0;
                ele.data.forEach(item => {
                    num += item.num;
                })
                this.totalNum[key].push(num);
            })
        },
        // 去到订单详情页
        goOrderDetail(orderId,oid) {
            this.$router.push('/order/detail/'+orderId+'/'+oid);
        },
        // 查看物流
        look(oid,goodsData) {
            sessionStorage.setItem('receive-goods',JSON.stringify(goodsData));
            this.$router.push('/order/wuliu/'+oid);
        },
        // 确认收货 
        confirmReceipt(oid) {
            this.$request.post('/confirmOrder',{id: oid}).then(res => {
                if(res.mag == 'ok') {
                    Toast('收货成功');
                }
            })
            .catch(err => {
                Toast('收货失败');
            })
        },
        // 支付
        pay(orderId,payment) {
            if(payment === '支付宝') {
                this.payAlipay(orderId);
            } else {
                if(this.isWeiXin()) this.payForWexin(orderId);
                else this.payForWexinOut(orderId);
            }
        },
        // 支付宝支付 
        payAlipay(orderId) {
            this.$request.get('/alipay/wappay/get?out_trade_no=' + orderId).then(res => {
                this.form = res;
                this.$nextTick(() => {
                    document.forms['alipaysubmit'].submit() //渲染支付宝支付页面 
                })
            })
        },
        // 判断是否在微信内
        isWeiXin () {
            var ua = window.navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                return true;
            } else{
                return false;
            }
        },
        // 微信外部浏览器支付
        payForWexinOut (orderId) {
            this.$request.get('/alipay/wechat/h/test?out_trade_no=' + orderId ).then((res) => {
                window.location.replace(res.mweb_url);
            })
        },
        // 微信内置浏览器支付
        payForWexin (orderId) {
            var userid = sessionStorage.getItem('user')? JSON.parse(sessionStorage.getItem('user')).id: '';
            this.$request.get('/alipay/wechat/jsapi/url?out_trade_no=' + orderId + '&id=' + userid ).then((res) => {
                window.location.replace(res.url);
            })
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
.order {
    padding-top: 16px;
    margin-top: 90px;
}
.empty {
    width: 100%;
    height: 193px;
    margin-top: 180px;
    background: url('../../assets/img/Nothing_Order.png');
    background-size: cover;
}
.order-item {
    position: relative;
    width: 343px;
    margin: 0 auto;
    margin-bottom: 16px;
    padding: 12px 12px 12px 21px;
    border-radius: 5px;
    background-color: #fff;
    .order-num {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        .van-icon {
            font-size: 18px;
        }
        .await {
            color: #90B240;
        }
    }
    .order-describe {
        position: relative;
        margin-top: 20px;
        font-size: 12px;
        .img {
            width: 72px;
            height: 70px;
            background-color: #eee;
            background-size: cover;
            background-position: center;
        }
        .name,.num {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }
        .name {
            left: 88px;
            width: 165px;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2; 
        }
        .num {
            right: 0;
        }
    }
    .number {
        margin-top: 10px;
        span:nth-child(1) {
            margin-right: 15px;
            font-size: 12px;
            color: #999;
        }
        span:nth-child(2) {
            font-size: 14px;
        }
    }
    .order-again,
    .wuliu {
        position: absolute;
        right: 12px;
        bottom: 12px;
        width: 67px;
        height: 29px;
        line-height: 29px;
        border-radius: 15px;
        border: 1px solid #B3D465;
        text-align: center;
        font-size: 12px;
        color: #B3D465;
    }
    .wuliu {
        position: absolute;
        right: 89px;
    }
}
</style>