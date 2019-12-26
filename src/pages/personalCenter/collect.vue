<template>
    <div class="commodity-content">
        <van-nav-bar title="我的收藏" left-arrow @click-left="onClickLeft">
        </van-nav-bar>
        <van-tabs v-model="activeName" color="#7BBB62" title-active-color="#7BBB62" animated :border="false">
                <van-tab title="培训课程" name="course">
                    <div class="course-content" v-if="courseList.length > 0">
                        <van-list v-model="loading" :offset="30" :finished="courseFinished" finished-text="没有更多了" @load="onLoadCourse">
                            <div class="course" v-for="(item,index) in courseList" :key="index" @click="toCourseDetail(item.id)">
                                <div class="img" :style="{backgroundImage:'url('+ item.teacher_img +')'}"></div>
                                <div class="info">
                                    <div class="title">{{item.theme}}</div>
                                    <van-rate v-model="item.diff" :size="5" color="#7BBB62" void-color="#7BBB62" readonly />
                                    <div class="price">￥{{item.price}}</div>
                                    <div class="address">{{item.custom_address}}</div>
                                    <div class="time">{{item.startTime}}~{{item.endTime}}</div>
                                </div>
                                <div class="advisory" @click.stop="show = true">咨询</div>
                            </div>
                        </van-list>
                    </div>
                    <div v-else>
                        <div class="empty"></div>
                        <!-- 没数据时广告位 -->
                        <!-- <div class="recommend">
                            <div class="course" v-for="(item,index) in courseList" :key="index" @click="toCourseDetail(item.id)">
                                <div class="img" :style="{backgroundImage:'url('+ item.teacher_img +')'}"></div>
                                <span class="ad">广告</span>
                                <div class="info">
                                    <div class="title">{{item.theme}}</div>
                                    <van-rate v-model="item.diff" :size="5" color="#7BBB62" void-color="#7BBB62" readonly />
                                    <div class="price">￥{{item.price}}</div>
                                    <div class="address">{{item.custom_address}}</div>
                                    <div class="time">{{item.startTime}}~{{item.endTime}}</div>
                                </div>
                                <div class="advisory" @click.stop="show = true">咨询</div>
                            </div>
                        </div> -->
                    </div>
                    
                </van-tab>
                <van-tab title="商品" name="commodity">
                    <div v-if="goodsList.length > 0">
                        <van-list v-model="loading" :offset="30" :finished="GoodsFinished" finished-text="没有更多了" @load="onLoadGoods">
                            <div class="commodity-box">
                                <div class="commodity-item" v-for="(item,index) in goodsList" :key="index" @click="toGoodsDetail(item.id)">
                                    <div class="img" :style="{backgroundImage:'url('+ item.url +')'}"></div>
                                    <div class="name">{{item.describe}}</div>
                                    <div class="price">￥{{item.sell_price}}</div>
                                </div>
                            </div>
                        </van-list>
                    </div>
                    <div class="empty" v-else></div>
                </van-tab>
        </van-tabs>
        <van-popup class="tel-advisory" v-model="show">
            <div class="hint">资讯课程，请拨打以下电话</div>
            <div class="phone-img"></div>
            <div class="hot-line">客服电话　400-100-7191</div>
        </van-popup>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeName: 'course',
            show: false,
            // 难度指数
            value: 2,
            loading: false,
            courseFinished: false,
            GoodsFinished: false,
            coursePage: 1,
            goodsPage: 1,
            courseTotal: '',
            goodsTotal: '',
            // 收藏的课程数据
            courseList: [],
            // 收藏的商品数据
            goodsList: []
        }
    },
    created() {
        this.getCollectGoods();
        this.getCollectCourse();
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        onLoadCourse() {
            // 异步更新数据
            setTimeout(() => {
                this.coursePage++;
                this.getCollectCourse(this.coursePage);
                // 加载状态结束
                this.loading = false;
                // 数据全部加载完成
                if (this.courseList.length >= this.courseTotal) {
                    this.courseFinished = true;
                }
            }, 500);
        },
        onLoadGoods() {
            // 异步更新数据
            setTimeout(() => {
                this.goodsPage++;
                this.getCollectGoods(this.goodsPage)
                this.loading = false;
                // 数据全部加载完成
                if (this.goodsList.length >= this.goodsTotal) {
                    this.GoodsFinished = true;
                }
            }, 500);
        },
        // 获取收藏商品的数据
        getCollectGoods(page = 1) {
            this.$request.get('/userCollect/create/6?page=' + page).then(data => {
                console.log(data);
                const collectGoods = data.data;
                collectGoods.forEach(item => {
                    this.goodsList.push(item);
                })
                this.goodsTotal = data.total;
            })
        },
        // 获取收藏(我想学)的课程数据
        getCollectCourse(page = 1) {
            this.$request.get('/personal/myFollowTrain/5?page=' + page).then(data => {
                // console.log(data);
                const collectCourse = data.data;
                collectCourse.forEach(item => {
                    item.startTime = item.startTime.replace(/-/g,'.');
                    item.endTime = item.endTime.replace(/-/g,'.');
                    this.courseList.push(item);
                })
                this.courseTotal = data.total;
            })
        },
        // 
        toGoodsDetail(goodsId) {
            this.$router.push("/goods/detail/" + goodsId)
        },
        toCourseDetail(courseId) {
            this.$router.push("/messagedetail/" + courseId) 
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
    background-color: #eee;
    .van-icon {
        font-size: 20px;
        color: #2c2c2c;
    }
}
.van-tabs {
    margin-top: 46px;
    /deep/ .van-tabs__line {
        width: 60px !important;
        bottom: 20px;
    }
    /deep/ .van-tabs__wrap {
        position: fixed;
        width: 100%;
        z-index: 99;
    }
    /deep/ .van-tabs__track {
        margin-top: 44px;
    }   
}
.course-content {
    padding-top: 2px;
}
.empty {
    width: 100%;
    height: 193px;
    padding: 0 16px;
    background: url('../../assets/img/empty.jpg');
    background-size: cover;
}
.course {
    position: relative;
    display: flex;
    height: 138px;
    padding: 15px 16px;
    margin-bottom: 7px;
    background-color: #fff;
    box-shadow: 0px 3px 3px #c8c8c8;
    .ad {
        width: 24px;
        height: 15px;
        opacity: 0.6;
        text-align: center;
        line-height: 15px;
        font-size: 12px;
        background: #000000;
        color: white;
        position: absolute;
        bottom: 15px;
        left: 100px;
    }
    .img {
        width: 108px;
        height: 108px;
        background-size: cover;
        background-position: center;
        border-radius: 15px;
        overflow: hidden;
    }
    .info {
        position: relative;
        margin-left: 20px;
        font-size: 10px;
        .title {
            width: 160px;
            font-size: 14px;
            font-weight: 600;
            overflow: hidden;
            white-space: nowrap; 
            text-overflow:ellipsis;
        }
        .price {
            padding-top: 5px;
            padding-bottom: 10px;
        }
        .address {
            width: 160px;
            overflow: hidden;
            white-space: nowrap; 
            text-overflow:ellipsis;
        }
        .time {
            margin-top: 8px;
        }
    }
    .advisory {
        position: absolute;
        top: 51px;
        right: 16px;
        width: 51px;
        height: 20px;
        background-color: #7BBB62;
        border-radius: 10px;
        line-height: 20px;
        text-align: center;
        color: #fff;
        font-size: 10px;
    }
}
.commodity-box {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 0 16px;
    padding-top: 8px;
    .commodity-item {
        margin-bottom: 22px; 
        box-shadow: 1px 3px 3px #c8c8c8;
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;
        .img {
            width: 166px;
            height: 197px;
            background-size: cover;
            background-position: center;
            
        }
        .name {
            width: 130px;
            padding: 12px 0 8px 10px;
            font-size: 12px;
            overflow: hidden;
            white-space: nowrap; 
            text-overflow:ellipsis;
        }
        .price {
            padding-left: 10px;
            margin-bottom: 8px;
            color: #D30606;
            font-size: 10px;
        }
    }
}
.tel-advisory {
    width: 285px;
    height: 132px;
    background: url('../../assets/img/yuan.png') no-repeat;
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
        background: url('../../assets/img/phone.png') no-repeat;
        background-size: cover;
    }
    .hot-line {
        margin-top: 28px;
        margin-left: 32px;
    }
}
</style>