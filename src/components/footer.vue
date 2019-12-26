<template>
    <div class="footer">
        <van-tabbar v-model="active" active-color="#7BBB62" @change='onChange'>
            <van-tabbar-item v-for="(item,index) in tabbar" :key="index" :name="item.name"> 
                <span>{{item.title}}</span>
                <img class="img" slot="icon" slot-scope="props" 
                :src="props.active ? item.active : item.normal" />
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Footer',
    data() {
        return {
            active: 'home',
            tabbar: [
                {
                    title: '首页',
                    name: 'home',
                    normal: require('../assets/img/home-normal.png'),
                    active: require('../assets/img/home-active.png')
                },
                {
                    title: '名师机构',
                    name: 'teacher-club',
                    normal: require('../assets/img/teacher-normal.png'),
                    active: require('../assets/img/teacher-active.png')
                },
                {
                    title: '培训信息',
                    name: 'yogamessage',
                    normal: require('../assets/img/information-normal.png'),
                    active: require('../assets/img/information-active.png')
                },
                {
                    title: '个人中心',
                    name: 'personal',
                    normal: require('../assets/img/personal-normal.png'),
                    active: require('../assets/img/personal-active.png')
                }
            ],
        }
    },
    computed: {
      ...mapGetters(['isUserNeedLogin', 'lastLogin'])
    },
    watch: {
        '$route': 'getMeta'
    },
    created() {
        this.refresh();
    },
    methods: {
        getMeta() {
            const { header_name } = this.$route.meta;
            this.active = header_name;
        },
        onChange(active) {            
            // 切换 tabbar 路由跳转
            if(active === 'personal' && !window.sessionStorage.getItem('access')) {
                window.sessionStorage.setItem('personal',active);
                this.$router.push('/login');
            } 
            else {
                this.$router.push('/'+ active);
            }
        },
        refresh() {
            this.getMeta();
        }
    }
}
</script>
<style lang="scss" scoped>
.footer {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 295;
}
.fix-iphonex-bottom .footer{
  padding-bottom: 34px;
}

</style>