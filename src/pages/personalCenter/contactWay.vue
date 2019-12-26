<template>
    <div>
        <van-nav-bar title="设置我的联系方式" left-arrow @click-left="onClickLeft">
        </van-nav-bar>
    </div>
</template>
<script>
export default {
    data () {
        return {
            
        }
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        }
    }
}
</script>
<style lang="scss" scoped>

</style>