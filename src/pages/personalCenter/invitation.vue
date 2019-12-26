<template>
    <div>
        <van-nav-bar title="我的邀请" left-arrow @click-left="onClickLeft">
        </van-nav-bar>
        <div class="integral">
            <div>累计获得积分</div>
            <div class="num">{{integralTotal}}</div>
            <ul class="notice">
                <li>注：</li>
                <li>1.积分可抵扣培训课程</li>
                <li>2.邀请好友获得的积分在1小时内到账</li>
            </ul>
        </div>
        <div class="title">成功邀请</div>
        <div class="success-invitation">
            <van-list v-if="userInfo.length>0" v-model="loading" :offset="30" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <van-collapse v-model="activeName" accordion >
                    <van-collapse-item :border="false" :name="item.id" :value="'他的邀请('+item.sub_level.length+')'" 
                    v-for="(item,index) in userInfo" :key="index">
                        <div class="invitation-people" slot="title">
                            <div class="img" :style="{backgroundImage: 'url('+ item.icon +')'}"></div>
                            <div class="user"> 
                                <div class="nickname">{{item.name}}</div>
                                <div class="tel">{{item.tel}}</div>
                            </div>
                            <div class="time">{{item.created_at[0]}}</div>
                        </div>
                        <div class="invitation-people second" v-for="(item,index) in item.sub_level" :key="index">
                            <div class="img" :style="{backgroundImage: 'url('+ item.icon +')'}"></div>
                            <div class="nickname">{{item.name === item.tel ? item.name.substr(0,3) + '****' + item.name.substr(7,4): item.name }} </div>
                            <div class="time">{{item.created_at[0]}}</div>
                        </div>
                    </van-collapse-item>
                </van-collapse>
            </van-list>
            <div class="none" v-else>暂无邀请</div>
        </div>
        <div class="invite-bottom">
            <div class="invite" @click="immediatelyInvitation">立即邀请</div>
        </div>
        <div class="overlay" v-if="show" @click="show = false">
            <van-loading v-if="isShow" type="spinner" class="loading" color="#fff" vertical>加载中...</van-loading>
            <div class="invite-pic" @click.stop="">
                <img :src="pic_img" alt/>
                <div v-show="isWenanBox">
                    <div class="text">长按图片保存</div>
                    <div class="bgc">
                        <img class="wenan-img" src="../../assets/img/fxwenan.png" alt="" @click="getWenan">
                    </div>
                </div>
                <van-popup v-model="wenanIsShow" round closeable position="bottom"
                :style="{ height: '80%' }">
                    <div class="wenan-title">选择分享文案</div>
                    <div class="wenan-box">
                        <div class="wenan-box-item" v-for="(item,index) in wenanData" :key="index" 
                        @click="selectItem(item.content)">{{item.content}}</div>
                    </div>
                    <button id="copy" v-clipboard:copy="copy_content" 
                        v-clipboard:success="onCopy"  v-clipboard:error="onError">一键复制</button>
                </van-popup>
            </div>  
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeName: '',
            integralTotal: 0,
            show: false,
            isShow: true,
            // 获取 分享码，传递的参数
            inviteInfo: {
                id: '',
                identity: 'person',
                userId: ''
            },
            pic_img: '',
            // 我邀请的用户信息
            userInfo: [],
            loading: false,
            finished: false,
            page: 1,
            total: '',
            // 
            isWenanBox: false,
            // 是否展示文案
            wenanIsShow: false,
            // 文案数据
            wenanData: [],
            // 复制的内容
            copy_content: ''
        }
    },
    created() {
        this.getIntegral();
        this.myShare();
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        onLoad() {
            // 异步更新数据
            setTimeout(() => {
                this.page++;
                this.loading = false;
                // 数据全部加载完成
                if (this.userInfo.length >= this.total) {
                    this.finished = true;
                    return
                }
                this.myShare(this.page);
                // 加载状态结束
            }, 500);
        }, 
        immediatelyInvitation() {
            this.show = true;
            const userId = JSON.parse(window.sessionStorage.getItem('user')).id;
            this.inviteInfo.userId = userId;   
            this.inviteInfo.id = userId;
            this.$request.post('/show/share/photo',this.inviteInfo).then(data => {
                this.pic_img = data;
                if(this.pic_img !== '') {
                    this.isShow = false;
                    this.isWenanBox = true;
                }
            })
        },
        // 获取文案
        getWenan() {
            this.wenanIsShow = true;
            this.$request.get('/personal/share/word/1').then(res => {
                this.wenanData = res;
            })
        },
        // 选中文案
        selectItem(copy_content) {
            this.copy_content = copy_content;
        },
        // 复制成功
        onCopy:function(e){
            this.$toast("复制成功！");
        },
        onError:function(e){
            this.$toast("复制失败！");
        },
        // 获取积分信息
        getIntegral() {
            this.$request.get('/personal/fractioRecord').then(data => {
                data.in.forEach(item => {
                    this.integralTotal += item.num;
                });
            })
        },
        // 获取 我成功邀请的用户信息
        myShare(page = 1) {
            this.$request.get('/personal/myShare?page=' + page).then(data => {
                this.userInfo = this.dealingData( data.data, this.userInfo);
                this.total = data.total;
            })
        },
        // 处理 获取的 电话号码 和时间 数据
        dealingData(data, userInfo) {
            const info = data;
            info.forEach(item  => {
                if(item.name === item.tel) {
                    item.name = item.name.substr(0,3) + '****' + item.name.substr(7,4);
                }
                item.tel = item.tel.substr(0,3) + '****' + item.tel.substr(7,4);

                item.created_at = item.created_at.split(' ');
                userInfo.push(item);

            })
            return userInfo;
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
    .van-icon {
        font-size: 20px;
        color: #2c2c2c;
    }
}
.integral {
    position: fixed;
    top: 46px;
    z-index: 99;
    width: 100%;
    height: 144px;
    padding: 16px;
    border-bottom: 4px solid #eee;
    background-color: #fff;
    font-size: 14px;
    text-align: center;
    .num {
        margin-top: 12px;
    }
    .notice {
        position: absolute;
        left: 16px;
        bottom: 16px;
        font-size: 11px;
        color: #999;
        text-align: left;
    }
}
.title {
    position: fixed;
    top: 190px;
    z-index: 99;
    width: 100%;
    padding: 24px 16px 10px 16px;
    background-color: #fff;
    font-size: 14px;
}
.success-invitation {
    position: relative;
    z-index: 0;
    margin-top: 243px;
    background-color: #fff;
    // font-size: 14px;
    margin-bottom: 74px;
    overflow: hidden;
    .invitation-people {
        display: flex;
        height: 50px;
        font-size: 10px;
        color: #999;
        .img {
            width: 50px;
            height: 50px;
            border-radius: 25px;
            background-size: cover;
            background-position: center;
        }
        .user {
            width: 72px;
            margin-left: 10px;
            height: 50px;
            .nickname {
                font-size: 14px;
                font-weight: 600;
                color: #2c2c2c;
                overflow: hidden;
                white-space: nowrap; 
                text-overflow:ellipsis;
            }
        }
        .time {
            margin-left: 40px;
            line-height: 50px;
        }
    }
    /deep/ .van-cell__value {
        flex: none;
        line-height: 50px;
        font-size: 10px;
    }
    /deep/ .van-icon {
        margin-top: 13px;
    }
    /deep/ .van-collapse-item__content {
        padding: 0;
    }
    .second {
        height: 60px;
        padding: 5px 0;
        margin: 0 32px;
        border-top: 0.5px solid #eee;
        line-height: 50px;
        .nickname {
            width: 80px;
            margin-left: 40px;
            overflow: hidden;
            white-space: nowrap; 
            text-overflow:ellipsis;
        }
        .time {
            margin-left: 60px;
        }
    }
    .none {
        width: 100%;
        height: 46px;
        text-align: center;
        line-height: 46px;
        font-size: 14px;
        color: #999;
    }
}
.invite-bottom {
    position: fixed;
    bottom: 0;
    z-index: 1;
    width: 100%;
    height: 76px;
    background-color: #eee;
}
.invite {
    position: absolute;
    left: 16px;
    bottom: 16px;
    width: 342px;
    height: 44px;
    line-height: 44px;
    border-radius: 22px;
    background-color: #8CA177;
    text-align: center;
    font-size: 14px;
    color: #fff;
}
.overlay {
    position: fixed;
    top: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    .loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        /deep/ .van-loading__text {
            color: #fff;
        }
    }
}
.invite-pic {
    position: absolute;
    top: 0;
    bottom: 0;
    display: block;
    width: 100%;
    margin-top: 60px;
    border-radius: 10px 10px 0 0;
    overflow: scroll;
    img {
        width: 100%;
        vertical-align: top;
    }
    .text {
        margin-top: -40px; 
        text-align: center;
        font-size: 14px;
    }
    .bgc {
        width: 100%;
        height: 58px;
        margin-top: 21px;
        background-color: #fff;
        text-align: center;
        .wenan-img {
            width: 79px;
            height: 58px;
            vertical-align: top;
        }
    }
    .van-popup {
        /deep/ .van-icon {
            position: absolute;
            top: 12px;
            font-size: 18px;
            color: #2c2c2c;
        }
        .wenan-title {
            margin: 10px 0;
            font-size: 16px;
            font-weight: 600;
            text-align: center;
        }
        .wenan-box {
            position: absolute;
            top: 41px;
            left: 16px;
            bottom: 64px;
            width: 343px;
            padding: 10px;
            background-color: #eee;
            overflow: scroll;
            &-item {
                width: 100%;
                padding: 8px 10px;
                margin-bottom: 13px;
                background-color: #ddd;
                border-radius: 5px;
                font-size: 14px;
                font-weight: 600;
            }
            &-item:hover {
                box-sizing: border-box;
                background-color: #eefaed;
                border: 1px solid #7BBB62;
            }
        }
        #copy {
            position: absolute;
            left: 16px;
            bottom: 10px;
            width: 343px;
            height: 44px;
            line-height: 44px;
            background-color: #7BBB62;
            border-radius: 22px;
            border: none;
            text-align: center;
            font-size: 16px;
            color: #fff;
        }
    }
    
}
</style>