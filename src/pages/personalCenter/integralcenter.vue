<template>
    <div class="integral-content">
        <van-nav-bar title="积分中心" left-arrow @click-left="onClickLeft">
            <van-icon name="question-o" slot="right" @click="question"/>
        </van-nav-bar>
        <div class="bgc">
            <div class="my-jf">可用积分</div>
            <div class="number">{{integral}}</div>
            <div class="explain">2019年12月31日前注册及邀请注册可获双倍积分哟！</div>
        </div>
        <div class="kong"></div>
        <div class="title-box">
            <div class="title">
                <div class="detail">积分明细</div>
                <div>Points details</div>
            </div>
        </div>
        <van-tabs class="detail-box" v-model="active" :border="false" animated color="#93D57B">
            <van-tab title="收入">
                <van-list v-model="loading" :offset="20" :finished="incomeFinished" finished-text="没有更多了" @load="incomeOnLoad">
                    <div class="detail-item" v-for="(item,index) in incomeRecord" :key="index">
                        <div class="jf-source">{{item.reason}}</div>
                        <div>{{item.created_at}}</div>
                        <div class="integral">+{{item.num}}</div>
                    </div>
                </van-list> 
            </van-tab>
            <van-tab title="支出">
                <van-list v-model="loading" :offset="20" :finished="spendingFinished" finished-text="没有更多了" @load="spendingOnLoad">
                    <div class="detail-item" v-for="(item,index) in spendingRecord" :key="index">
                        <div class="jf-source">{{item.reason}}</div>
                        <div>{{item.created_at}}</div>
                        <div class="integral">-{{item.num}}</div>
                    </div>
                </van-list> 
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
export default {
    data() {
        return {
            active: '',
            integral: '',
            incomeRecord: [],
            spendingRecord: [],
            loading: false,
            incomeFinished: false,
            spendingFinished: false,
            page1: 1,
            page2: 1,
            incomeTotal: '',
            spendingTotal: ''
        }
    },
    created() {
        this.integral = JSON.parse(window.sessionStorage.getItem('user')).fraction
        this.getIncomeRecord();
        this.getSpendingRecord();
    },
    methods: { 
        onClickLeft() {
            this.$router.go(-1);
        },
        question() {
            this.$router.push('/integralrules')
        },
        getIncomeRecord(page = 1) {
            this.$request.get('/personal/fractioRecord/7?page='+page).then(data => {
                // console.log(data);
                const incomeRecord = data.in.data;
                incomeRecord.forEach(item => {
                    this.incomeRecord.push(item);
                });
                this.incomeTotal =  data.in.total;
            })
        },
        getSpendingRecord(page = 1) {
            this.$request.get('/personal/fractioRecord/7?page='+page).then(data => {
                // console.log(data);
                const spendingRecord = data.out.data;
                spendingRecord.forEach(item => {
                    this.spendingRecord.push(item);
                });
                this.spendingTotal =  data.out.total;
            })
        },
        incomeOnLoad() {
            // 异步更新数据
            setTimeout(() => {
                this.page1++;
                this.getIncomeRecord(this.page1);
                // 加载状态结束
                this.loading = false;
                // 数据全部加载完成
                if (this.incomeRecord.length >= this.incomeTotal) {
                    this.incomeFinished = true;
                }
            }, 500);
        },  
        spendingOnLoad() {
            // 异步更新数据
            setTimeout(() => {
                this.page2++;
                this.getSpendingRecord(this.page2);
                // 加载状态结束
                this.loading = false;
                // 数据全部加载完成
                if (this.spendingRecord.length >= this.spendingTotal) {
                    this.spendingFinished = true;
                }
            }, 500);
        } 
    }
}
</script>
<style lang="scss" scoped>
.integral-content {
    height: 100%;
    background-color: #fff;
}
.van-nav-bar {
    position: fixed;
    top: 0;
}
.bgc {
    position: fixed;
    top: 46px;
    z-index: 99;
    width: 100%;
    height: 145.5px;
    background: url("../../assets/img/bgc.png") no-repeat;
    background-size: cover;
    .my-jf {
        position: absolute;
        top: 48%;
        left: 101px;
        font-size: 14px;
    }
    .number {
        position: absolute;
        top: 50%;
        left: 160px;
        transform: translateY(-50%);
        color: #93D57B;
        font-size: 34px;
    }
    .explain {
        position: absolute;
        left: 16px;
        bottom: -22px;
        width: 343px;
        height: 44px;
        line-height: 44px;
        box-shadow: 3px 1px 8px 1px rgba(0, 0, 0, 0.15);
        border-radius: 10px;
        background-color: #fff;
        color: #65AC4C;
        font-size: 12px;
        text-align: center;
    }
}

.kong {
    position: fixed;
    top: 192px;
    z-index: 90;
    width: 100%;
    height: 28px;
    background-color: #eee;
}
.title-box {
    position: fixed;
    top: 220px;
    z-index: 99;
    width: 100%;
    padding: 0 16px;
    padding-top: 16px;
    background-color: #fff;
    .title {
        padding-left: 12px;
        border-left: 4px solid #93D57B;
        font-size: 12px;
        .detail {
            font-size: 16px;
            font-weight: 600;
        }
    }
}
.detail-box {
    position: absolute;
    top: 317px;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 0 16px;
    overflow: scroll;
    background-color: #fff;
    /deep/ .van-tabs__wrap {
        position: fixed;
        top: 273px;
        left: 0;
        width: 100%;
        z-index: 99;
        background-color: #fff;
    }
    // /deep/ .van-tabs__content {
    //     // margin-top: 317px;
    // }
    /deep/ .van-tabs__line {
        width: 60px!important;
    }
    .detail-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 54px;
        padding: 0 10px;
        border-bottom: 0.5px solid #eee;
        font-size: 12px;
        .jf-source {
            width: 80px;
        }
        .integral {
            width: 50px;
            line-height: 54px;
            font-weight: 600;
            text-align: right;
        }
    }
}
</style>