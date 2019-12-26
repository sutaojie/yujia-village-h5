<template>
    <div>
        <van-nav-bar title="我的点赞" left-arrow @click-left="onClickLeft">
        </van-nav-bar>
        <main class="main">
            <van-tabs v-model="active" animated color="#7BBB62" @click="click">
                <van-tab title="点赞的名师" name="teacher">
                    <van-list v-model="loading" :offset="30" :immediate-check="false" :finished="finished" finished-text="没有更多了" @load="onLoad1">
                        <div class="teacher-content">
                            <div class="teacher-card" v-for="(item,index) in thumbTeacherList" :key="index">
                                <div class="img" :style="{backgroundImage: 'url('+ item.first_img +')'}" @click="goTeacherDetail(item.id)"></div>
                                <div class="teacher-name text">{{item.name}}</div>
                                <div class="text">{{item.good_at}}</div>
                                <div class="bottom-box text">
                                    <div>教龄：{{item.num}}年</div>
                                    <div class="thumb" @click="delTeacherThumb(item.id)">
                                        <van-icon name="good-job" /><span> {{item.praise}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </van-list>  
                    <div class="kong" v-if="thumbTeacherList.length == 0">
                        <img src="../../assets/img/thumb_kong.png" alt="">
                    </div>
                </van-tab>
                <van-tab title="点赞的机构" name="club">
                    <van-list v-model="loading" :offset="30" :immediate-check="false" :finished="finished" finished-text="没有更多了" @load="onLoad2">
                        <div class="clubs-content">
                            <div class="clubs-card" v-for="(item,index) in thumbClubsList" :key="index">
                                <img :src="item.first_img" alt="" @click="goClubDetail(item.id)">
                                <div class="card-right">
                                    <div class="club-name">{{item.club_name}}</div>
                                    <div class="club-address">{{item.club_address}}</div>
                                    <div class="club-thumb" @click="delClubThumb(item.id)">
                                        <van-icon name="good-job" />
                                        <span>{{item.praise}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </van-list> 
                    <div class="kong" v-if="thumbClubsList.length == 0">
                        <img src="../../assets/img/thumb_kong.png" alt="">
                    </div>
                </van-tab>
            </van-tabs>
        </main>
          
    </div>
</template>
<script>
export default {
    inject: ['reload'],
    data() {
        return {
            active: 'teacher',
            thumbTeacherList: [],
            thumbClubsList: [],
            loading: false,
            finished: false,
            page: 1,
            page2: 1,
            last_page: '',
            last_page_club: ''
        }
    },
    created() {
        if(sessionStorage.getItem('thumb')) {
            this.active = sessionStorage.getItem('thumb');
            if(this.active === 'club') {
                this.getClubsThumbs();
            }
        }
        this.getTeacherThumbs();
    },
    methods: {
        onClickLeft() {
            sessionStorage.removeItem('thumb');
            this.$router.go(-1);
        },
        click(name) {
            sessionStorage.setItem('thumb',name);
            this.finished = false;
            if(name === 'club'&&this.thumbClubsList.length==0) {
                this.getClubsThumbs();
            }
        },
        onLoad1() {
            // 异步更新数据
            setTimeout(() => {
                this.page++;
                // 加载状态结束
                this.loading = false;
                // 数据全部加载完成
                if (this.page > this.last_page) {
                   return this.finished = true;
                } 
                this.getTeacherThumbs(this.page);
            }, 500);
        },
        onLoad2() {
            // 异步更新数据
            setTimeout(() => {
                this.page2++;
                // 加载状态结束
                this.loading = false;
                // 数据全部加载完成
                if (this.page2 > this.last_page_club) {
                   return this.finished = true;
                } 
                this.getClubsThumbs(this.page2);
            }, 500);
        },
        // 获取我点赞的老师数据
        async getTeacherThumbs(page = 1) {
            const res = await this.$request.get('/personal/teacherThumbsUp/6?page=' + page);
            const {data} = res;
            data.forEach(item => {
                if(item) {
                    this.thumbTeacherList.push(item);
                }
            });
            this.last_page = res.last_page;
        },
        // 获取我点赞的会馆数据
        async getClubsThumbs(page=1) {   
            const res = await this.$request.get('/personal/myThumbsUpClub/5?page=' + page);
            const {data} = res;
            data.forEach(item => {
                if(item) {
                    this.thumbClubsList.push(item);
                }
            });
            this.last_page_club = res.last_page;
        },
        // 取消老师点赞
        delTeacherThumb(id) {
            this.$request.get('/personal/teachers/thumbsUp/'+id).then(res => {
                if(res.status == 0) {
                    this.reload();
                }
            })
        },
        delClubThumb(id) {
            this.$request.get('/personal/thumbsUpClub/'+id).then(res => {
                if(res.status == 0) {
                    this.reload();
                }
            })
        },
        // 跳转 -> 老师详情页
        goTeacherDetail(id) {
            this.$router.push({
                name: 'teacher-details',
                query: {
                    id: id
                }
            });
        },
        // 
        goClubDetail(id) {
            this.$router.push('/teacher-club/club-house-details?id='+id);
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
    background-color: #fff;
    .van-icon {
        font-size: 20px;
        color: #2c2c2c;
    }
}
.main {
    margin-top: 46px;
    /deep/ .van-tabs__wrap {
        position: fixed;
        width: 100%;
        z-index: 99; 
        /deep/ .van-tabs__line {
            width: 80px !important;
            bottom: 20px;
        }
    }
    .kong {
        width: 100%;
        img {
            width: 163px;
            height: 167px;
            margin-left: 117px;
        }
    }
}

.teacher-content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 46px;
    padding: 0 12px;
    padding-top: 10px;
    .teacher-card {
        width: 169px;
        height: 270px;
        margin-bottom: 13px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0px 3px 3px #c8c8c8;
        font-size: 10px;
        overflow: hidden;
        .img {
            width: 169px;
            height: 155px;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }
        .text {
            padding: 0 9px;
            padding-top: 5px;
            overflow: hidden;
            white-space: nowrap; 
            text-overflow:ellipsis;
        }
        .teacher-name {
            margin-top: 15px;
            font-size: 12px;
            font-weight: 700;
            overflow: hidden;
            white-space: nowrap; 
            text-overflow:ellipsis;
        }
        .bottom-box {
            display: flex;
            justify-content: space-between;
            margin-top: 15px;
            align-items: flex-end;
            height: 31px;
            .thumb {
                width: 60px;
                height: 29px;
                line-height: 29px;
                border: 1px solid #eee;
                border-radius: 15px;
                text-align: center;
                color: #81C16A;
            }
            .van-icon {
                font-size: 16px;
                vertical-align: sub;
            }
            span {
                padding-top: 2px;
            }
        }
    }
}
.clubs-content {
    padding: 0 16px;
    padding-top: 10px; 
    margin-top: 46px;
    .clubs-card {
        margin-bottom: 8px;
        width: 100%;
        height: 146px;
        background-color: #fff;
        border-radius: 5px;
        overflow: hidden;
        display: flex;
        img {
            width: 166px;
            height: 100%;
        }
        .card-right {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 10px 16px 10px 20px;
            font-size: 12px;
            .club-name {
                margin-top: 20px;
            }
            .club-address {
                font-size: 10px;
                color: #999;
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }
            .club-thumb {
                height: 29px;
                border-radius: 15px;
                border: 1px solid #eee;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #81C16A;
                .van-icon {
                    margin-right: 5px;
                }
            }
        }
    }
}
</style>