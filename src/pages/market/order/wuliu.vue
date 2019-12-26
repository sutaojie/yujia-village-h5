<template>
    <div>
        <van-nav-bar title="物流信息" left-arrow @click-left="onClickLeft"></van-nav-bar>
        <main class="main">
            <div class="goods">
                <div class="goods-describe" v-for="(item,index) in goodsData" :key="index">
                    <div class="img" :style="{backgroundImage: 'url('+item.url+')'}"></div>
                    <div class="name">{{item.name}}</div>
                    <div class="num">x {{item.num}}</div>
                </div>
            </div> 
            <div class="wuliu-info">
                <div class="company">
                    <span>物流公司</span>
                    <span>{{logistics.shipper_name}}</span>
                </div>
                <div class="waybill-number">
                    <span>运单号码</span>
                    <span>{{logistics.logistic_code}}</span>
                </div>
                <div class="step-content">
                    <div class="step-item" v-for="(item,index) in logisticsInfo" :key="index">
                        <div v-if="item[0].time" class="time1" :class="index == 0 ? 'color':''">
                            {{item[0].time}}
                        </div>
                        <div v-else class="time" :class="index == 0 ? 'color':''">
                            {{item[0].accept_time[0]}}
                        </div>
                        <div class="time-node" v-for="(item2,index2) in item" :key="index2">
                            <div class="line-y">
                                <div class="line" :class="index == 0 && index2 == 0?'bgc':''"></div>
                                <div class="circle" :class="index == 0 && index2 == 0?'bgc':''"></div>
                            </div>
                            <div class="bubble" :class="index == 0 && index2 == 0?'bubble-style':''">
                                <p class="info">
                                    <span>{{item2.accept_time[1]}}</span>
                                    {{item2.accept_station}}
                                </p>
                                <div class="triangle" :class="index == 0 && index2 == 0?'triangle-style':''"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
<script>
export default {
    data() {
        return {
           active: 0,
           goodsData: [],
           logistics: [],
           // 处理之后的物流 信息
           logisticsInfo: []
        }
    },
    created() {
        var oid = this.$route.params.oid;
        this.goodsData = JSON.parse(sessionStorage.getItem('receive-goods'));
        this.getWuliu(oid);
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        getWuliu(oid) {
            var nowTime = new Date().getFullYear()+'/'+(new Date().getMonth()+1)+'/'+new Date().getDate()
            nowTime = new Date(nowTime).getTime()/1000;
            this.$request.post('/userExpressage',{id: oid}).then(res => {
                this.logistics = res;
                var data = res.data;
                data.forEach((item,index) => {
                    item.accept_time = item.accept_time.split(' ');
                    var time = item.accept_time[0].replace(/-/g,'/');
                    var timestamp = new Date(time).getTime()/1000;
                    if(nowTime-timestamp==86400) {
                        item.time = '昨天';
                    } else if(nowTime==timestamp) {
                        item.time = '今天';
                    }
                }); 
                var j = 0;
                var arr = [];
                arr[j] = [];
                for(var i=0;i<data.length;i++) {
                    if(i<data.length-1) {
                        if(data[i].accept_time[0] === data[i+1].accept_time[0]) {
                            data[i].accept_time[0] = data[i].accept_time[0].slice(5);
                            arr[j].unshift(data[i]);
                        } else {
                            data[i].accept_time[0] = data[i].accept_time[0].slice(5);
                            arr[j].unshift(data[i]);
                            j++;
                            arr[j] = [];
                        }
                    } else {
                        data[i].accept_time[0] = data[i].accept_time[0].slice(5);
                        arr[j].unshift(data[i]);
                    }
               }
               arr.forEach(item => {
                  this.logisticsInfo.unshift(item);
               })
               console.log(this.logisticsInfo);
            })
       }
    }
}
</script>
<style lang="scss" scoped>
.van-nav-bar {
    position: fixed;
    top: 0;
    z-index: 10 !important;
}
.main {
    margin-top: 46px;
    .goods {
        margin-bottom: 4px;
        &-describe {
            position: relative;
            padding: 20px 16px;
            background-color: #fff;
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
                left: 108px;
                width: 180px;
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2; 
            }
            .num {
                right: 16px;
            }
        }
    }
    .wuliu-info {
        padding: 28px 16px;
        background-color: #fff;
        .company,
        .waybill-number {
            height: 20px;
            span {
                margin-right: 15px;
                font-size: 14px;
                vertical-align: top;
            }
            span:nth-child(1) {
                color: #999;
            }
        }
        .company {
            margin-bottom: 22px;
        }
        .step-content {
            margin-top: 40px;
            font-size: 14px;
            .time1 {
                margin-left: 6px;
                margin-top: 3px;
                margin-bottom: 5px;
                color: #999;
            }
            .time {
                margin-top: 3px;
                margin-bottom: 5px;
                color: #999;
            }
            .color {
                color: #85B15E;
            }
            .time-node {
                display: flex;
                justify-content: space-between;
                .line-y {
                    position: relative;
                    margin-left: 18px;
                    div {
                        background-color: #dcdcdc;
                    }
                    .bgc {
                        background-color: #85B15E;
                    }
                    .line {
                        width: 1px;
                        height: 100%;
                    }
                    .circle {
                        position: absolute;
                        top: 50%;
                        left: -3px;
                        transform: translateY(-50%);
                        width: 7px;
                        height: 7px;
                        border-radius: 3.5px;
                    }
                }
                .bubble {
                    position: relative;
                    width: 282px;
                    padding: 10px 15px;
                    margin: 10px 0;
                    background-color: #eee;
                    border-radius: 5px;
                    color: #999;
                    .info {
                        span {
                            margin-right: 10px;
                        }
                    }
                    .triangle {
                        position: absolute;
                        top: 50%;
                        left: -14px;
                        transform: translateY(-50%);
                        width: 0;
                        height: 0;
                        border-width: 8px 15px 8px 0;
                        border-style: solid;
                        border-color: transparent #eee transparent transparent;
                    }
                    .triangle-style {
                        border-color: transparent #85B15E transparent transparent;
                    }
                }
                .bubble-style {
                    background-color: #85B15E;
                    color: #fff;
                }
            }
        }
    }
}
</style>