<template>
    <div class="header">
        <div class="home">首页</div>
        <van-tabs v-model="activeName" color="#B3D465" title-active-color="#7BBB62" @click="onClick">
            <van-tab title="首页" name="home" to="/main" replace></van-tab>
            <van-tab title="瑜伽资讯" name="yagainformation" to="/yagainformation" replace></van-tab>
            <van-tab title="瑜伽知识" name="yogaknowledge" to="/yogaknowledge" replace></van-tab>
            <van-tab title="关于我们" name="aboutUs" to="/aboutUs" replace></van-tab>
        </van-tabs>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeName: 'home'
        }
    },
    mounted() {
        this.activeName = window.sessionStorage.getItem('index');
    },
    methods: {
        onClick(name) {
            window.sessionStorage.setItem('index',name);
        }
    }
}
</script>
<style lang="scss" scoped>
.header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
}
.home {
    width: 100%;
    height: 44px;
    line-height: 44px;
    background-color: #E0EED2;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
}
.van-tabs /deep/ .van-tabs__line {
    width: 60px !important;
}
</style>