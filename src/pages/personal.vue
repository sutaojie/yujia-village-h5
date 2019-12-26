<template>
    <div class="personal">
        <div class="banner-box">
            <div class="head-portraits" @click="goInfoEditor" :style="{backgroundImage:'url('+personalData.icon+')'}"></div>
            <div class="username">
                <span class="uname">{{personalData.name}} | </span><span>{{personalData.identity_auth}}</span>
            </div>
            <div class="bell" @click="message">
                <img src="../assets/teacherclub/bell.png" class="bell_img"/>
                <div class="bell_circle" v-if="Message.count != 0">{{Message.count}}</div>
                <div class="bell_circles" v-else></div>
            </div>
            <div class="my-box">
                <ul class="my-item">
                    <li @click="routerSkip('invite')">
                        <div class="img"></div>
                        <div>邀请</div>
                    </li>
                    <li @click="routerSkip('collect')">
                        <div class="img bgc-position1"></div>
                        <div>收藏</div>
                    </li>
                    <li @click="routerSkip('thumb')">
                        <div class="img bgc-position2"></div>
                        <div>赞</div>
                    </li>
                </ul>
            </div>
        </div>
        
        <div class="asset">
            <div class="asset-title">
                <img class="img" src="../assets/img/asset.png"/>
                <span>我的资产</span>
            </div>
            <div class="item-box">
                <div class="asset-item">
                    <div class="item-title">金币</div>
                    <div>
                        <!-- <span class="number">{{personalData.money}}</span> -->
                        <span class="number">0</span>
                        <span>可用</span>
                    </div>
                </div>
                <div class="asset-item">
                    <div class="item-title">现金券</div>
                    <div>
                        <!-- <span class="number">{{personalData.cashCount}}</span> -->
                        <span class="number">0</span>
                        <span>张可用</span>
                    </div>
                </div>
                <div class="asset-item">
                    <div class="item-title">优惠券</div>
                    <div>
                        <!-- <span class="number">{{personalData.couponCount}}</span> -->
                        <span class="number">0</span>
                        <span>张可用</span>
                    </div>
                </div>
                <div class="asset-item" @click="integralRules">
                    <div class="item-title">积分</div>
                    <div>
                        <span class="number">{{personalData.fraction}}</span>
                        <span>可用</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="cell">
            <van-cell is-link :border="false" to="/buycourse">
                <template slot="title">
                    <img class="icon" src="../assets/img/pay-course.png" alt="">
                    <span class="custom-title">课程订单</span>
                </template>
            </van-cell>
            <van-cell is-link :border="false" to="/myorder">
                <template slot="title">
                    <img class="icon" src="../assets/img/goods.png" alt="">
                    <span class="custom-title">商品订单</span>
                </template>
            </van-cell>
            <div class="cell-box">
                <van-cell is-link :border="false" to="/shoppingbag">
                    <template slot="title">
                        <img class="icon" src="../assets/img/shopping_bag.png" alt="">
                        <span class="custom-title">购物袋</span>
                    </template>
                </van-cell>
                <van-cell is-link :border="false" to="/address">
                    <template slot="title">
                        <img class="icon" src="../assets/img/address.png" alt="">
                        <span class="custom-title">收货地址</span>
                    </template>
                </van-cell>
            </div>
            <van-cell is-link :border="false" to="/authenticationcenter">
                <template slot="title">
                    <img class="icon" src="../assets/img/certification.png" alt="">
                    <span class="custom-title">认证中心</span>
                </template>
            </van-cell>
            <van-cell is-link :border="false" @click="showPopup">
                <template slot="title">
                    <img class="icon" src="../assets/img/customer-service.png" alt="">
                    <span class="custom-title">客服中心</span>
                </template>
            </van-cell>
            <van-popup class="call-center" v-model="show">
                <div class="hint">客服微信：ChinaYogaVillage</div>
                <div class="phone-img"></div>
                <a href="tel:400-100-7191">
                    <div class="hot-line">点击拨打 400-100-7191</div>
                </a>
            </van-popup>
            <van-cell is-link :border="false" to="/changephone">
                <template slot="title">
                    <img class="icon" src="../assets/img/mobile-phone.png" alt="">
                    <span class="custom-title">更改绑定手机</span>
                </template>
            </van-cell>
            <!-- <van-cell is-link :border="false" to="/contactway">
                <template slot="title">
                    <img class="icon" src="../assets/img/contact-way.png" alt="">
                    <span class="custom-title">设置联系方式</span>
                </template>
            </van-cell> -->
        </div>
        <div class="logout" @click="logout">退出登录</div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import store from "@/store";
export default {
    data() {
        return {
            show: false,
            // 个人信息数据
            Message:{},
            personalData: {},
        }
    },
    created() {
        this.getPersonalData()
        this.messagecenter();
    },
    methods: {
        getPersonalData() {
            this.$request.get('/personal/home').then(data => {
                store.dispatch("INFO", data);
                sessionStorage.setItem('user data',JSON.stringify(data));
                const { fraction, icon, name, identity_auth, reason,cashCount,couponCount } = data.user;
                window.sessionStorage.setItem('user',JSON.stringify(data.user));
                const index = data.user.money.indexOf(".");
                const money = data.user.money.substring(index,0);
                // 获取 金币和积分
                const personal = {
                    money,
                    fraction,
                    icon,
                    name,
                    identity_auth,
                    reason,
                    cashCount,
                    couponCount
                }
                this.personalData = personal;
            })
        },
        // 个人信息修改
        goInfoEditor() {
            this.$router.push('/personaldata')
        },
        message(){
            this.$router.push('/messagecenter')
        },
        messagecenter(){
            this.$request.get(`/personal/message/mobile/first`).then(res => {
                this.Message = res;
            }).catch(error => {
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
        routerSkip(keyword) {
            if(keyword === 'invite') {
                this.$router.push('/invitation');
            } else if(keyword === 'collect') {
                this.$router.push('/collect');
            } else {
                this.$router.push('/thumbteacher');
            }
        },
        // 跳转积分规则
        integralRules() {
            this.$router.push('/integral');
        },
        showPopup() {
            this.show = true;
        },
        logout() {
            store.dispatch("INFO", { user: {} });
            window.sessionStorage.clear();
            // 退出回到首页
            window.open(`${window.location.origin}`, "_self");
        },
    }
}
</script>
<style lang="scss" scoped>
.personal {
    margin-bottom: 50px;
    overflow: hidden;
    overflow-y: auto;
}
.banner-box {
    position: relative;
    height: 228px;
    padding-top: 48px;
    margin-bottom: 29px;
    background: url('../assets/img/head-banner.png');
    background-size: cover;
    text-align: center;
    .head-portraits {
        width: 76px;
        height: 76px;
        margin: 0 auto;
        border-radius: 38px;
        background-size: cover;
        background-position: center;
    }
    .username {
        margin-top: 15px;
        font-size: 11px;
        color: #fff;
        .uname {
            font-size: 14px;
        }
    }
    .bell{
        position: absolute;
        right: 25px;
        top: 15px;
        .bell_img{
            width: 17px;
            height: 21px;
        }
        .bell_circle{
            width: 15px;
            height: 15px;
            background-color: #E60012;
            font-size: 10px;
            color: #fff;
            border-radius: 50%;
            text-align: center;
            position: absolute;
            top: 4px;
            right: -9px;
        }
        .bell_circles{
            width: 15px;
            height: 15px;
            // background-color: #E60012;
            font-size: 10px;
            color: #fff;
            border-radius: 50%;
            text-align: center;
            position: absolute;
            top: 4px;
            right: -9px;
        }
    }
}
.my-box {
    position: absolute;
    left: 16px;
    bottom: -25px;
    width: 343px;
    height: 64px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow:2px 0px 6px 0px rgba(0, 0, 0, 0.15);
    font-size: 14px;
    .my-item {
        display: flex;
        height: 64px;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        li {
            .img {
                width: 31px;
                height: 30px;
                background: url('../assets/img/personal.png') no-repeat;
                background-size: cover;
            }
            .bgc-position1 {
                background-position: -110px 0;
            }
            .bgc-position2 {
                background-position: -221px 0;
            }
        }
    }
}
.asset {
    padding: 0 16px;
    padding-top: 20px;
    background-color: #fff;
    font-size: 10px;
    color: #999;
    .asset-title {
        display: flex;
        .img {
            width: 14px;
            height: 16px;
            margin-right: 9px;
        }
    }
    .item-box {
        display: flex;
        justify-content: space-between;
        padding-top: 15px;
        padding-bottom: 5px;
        .asset-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 82px;
            height: 54px;
            padding-left: 9px;
            border-radius: 5px;
            box-shadow:2px 0px 6px 0px rgba(0, 0, 0, 0.15);
            .item-title {
                margin-bottom: 4px;
                font-size: 14px;
                color: #2c2c2c;
                font-weight: 700;
            }
            .number {
                margin-right: 2px;
                font-size: 14px;
                color: #DB1717;
                font-weight: 700;
            }
        }
    }
}
.cell {
    margin-bottom: 20px;
    .van-cell__title {
        display: flex;
        .icon {
            width: 15px;
            height: 16px;
            margin-top: 4px;
            margin-right: 9px;
        }
    }
    .cell-box {
        margin: 4px 0;
        box-shadow: -4px 2px 6px 1px rgba(0, 0, 0, 0.13);
    }
    .call-center {
        width: 285px;
        height: 132px;
        background: url('../assets/img/yuan.png') no-repeat;
        background-size: cover;
        font-size: 14px;
        text-align: center;
        .hint {
            margin-top: 22px;
        }
        .phone-img {
            position: absolute;
            top: 66px;
            left: 50px;
            width: 23px;
            height: 27px;
            background: url('../assets/img/phone.png') no-repeat;
            background-size: cover;
        }
        .hot-line {
            margin-top: 28px;
            margin-left: 40px;
        }
    }
    .invitation {
        margin-top: 4px;
    }
}
.logout {
    width: 100%;
    height: 44px;
    line-height: 44px;
    margin-bottom: 20px;
    background-color: #fff;
    text-align: center;
    font-size: 14px;
}

</style>