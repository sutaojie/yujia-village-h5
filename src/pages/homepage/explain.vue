<template>
    <div class="add">
        <van-nav-bar title="网站添加至手机桌面设置" left-arrow @click-left="onClickLeft">
        </van-nav-bar>
        <div class="content">
            <van-tabs v-model="activeName" color="#93D57B">
                <van-tab title="安卓手机" name="android">
                    <div class="content-box">
                        <div class="title">您是通过微信扫描进入网站的吗？</div>
                        <div class="choose">
                            <a class="yes" @click="goId('#weixin')">是</a>
                            <a class="no" @click="goId('#liulanqi')">否，我在浏览器</a>
                        </div>
                        <div id="weixin" class="bz-title">1. 微信操作方式</div>
                        <div class="img">
                            <img src="../../assets/img/buzhou1.png" alt="">
                        </div>
                        <div class="img">
                            <img src="../../assets/img/buzhou2.png" alt="">
                        </div>
                        <div id="liulanqi" class="bz-title">2. 浏览器操作</div>
                        <div class="img">
                            <img src="../../assets/img/buzhou3.png" alt="">
                        </div>
                        <div class="img">
                            <img src="../../assets/img/buzhou4.png" alt="">
                        </div>
                        <div class="img">
                            <img src="../../assets/img/buzhou5.png" alt="">
                        </div>
                        <div class="img">
                            <img src="../../assets/img/buzhou6.png" alt="">
                        </div>
                    </div>
                </van-tab>
                <van-tab title="苹果手机" name="apple">
                     <div class="content-box">
                        <div class="title">您是通过微信扫描进入网站的吗？</div>
                        <div class="choose">
                            <a class="yes" @click="goId('#apple-weixin')">是</a>
                            <a class="no" @click="goId('#apple-liulanqi')">否，我在浏览器</a>
                        </div>
                        <component-a></component-a>
                        <div id="apple-weixin" class="bz-title">1. 微信操作方式</div>
                        <div class="img">
                            <img src="../../assets/img/buzhou1.png" alt="">
                        </div>
                        <div class="img">
                            <img src="../../assets/img/apple-buzhou2.png" alt="">
                        </div>
                        <div id="apple-liulanqi" class="bz-title">2. 浏览器操作</div>
                        <div class="img">
                            <img src="../../assets/img/apple-buzhou3.png" alt="">
                        </div>
                        <div class="img">
                            <img src="../../assets/img/apple-buzhou4.png" alt="">
                        </div>
                        <div class="img">
                            <img src="../../assets/img/apple-buzhou5.png" alt="">
                        </div>
                        <div class="img">
                            <img src="../../assets/img/apple-buzhou6.png" alt="">
                        </div>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeName: 'android'
        }
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1)
        },
        goId(idName) {
            document.querySelector(idName).scrollIntoView(true);
        }
    }
}
</script>
<style lang="scss" scoped>
.van-nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10 !important;
}
.content {
    padding-top: 46px; 
    background-color: #fff;
}
.van-tabs {
    /deep/ .van-tabs__line {
        width: 65px!important;
    }
    .content-box {
        width: 343px;
        margin: 0 auto;
        margin-top: 16px;
        font-size: 16px;
        .title {
            font-weight: 700;
        }
        .choose {
            display: flex;
            margin-top: 24px;
            font-size: 14px;
            a {
                height: 30px;
                line-height: 30px;
                border-radius: 3px;
                text-align: center;
                font-weight: 700;
            }
            .yes {
                width: 62px;
                margin-right: 33px;
                background-color: #8FCD71;
                color: #fff;
            }
            .no {
                width: 121px;
                background-color: #EEEEEE;
                color: #999;
            }
        }
        .bz-title {
            padding-top: 46px;
            font-size: 14px;
            font-weight: 700;
        }
        .img {
            width: 343px;
            padding-top: 20px;
            background-color: #fff;
        }
    }
}
</style>