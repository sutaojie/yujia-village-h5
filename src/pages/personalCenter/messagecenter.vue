<template>
  <div>
    <van-nav-bar title="消息中心" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="messagecenter">
        <div class="messagecenter_warp" @click="nextstep">
            <div class="messagecenter_title">
                <div class="messagecenter_img">
                    <img src="../../assets/teacherclub/message1.png" class="message_img"/>
                    <span class="message_text">系统消息</span>
                </div>
                <div class="messagelist">
                    <div class="messagelist_img">
                        <img src="../../assets/teacherclub/messageimg.png"/>
                    </div>
                    <div class="notice" v-if="Message.count != 0">{{Message.count}}</div>
                     <div class="notices" v-else></div>
                    <div class="messagelist_name">
                        <div class="messagelist_title">
                            <div class="title1 van-ellipsis">瑜伽村</div>
                            <div class="title2">{{first.day}} {{first.time}}</div>
                        </div>
                        <div class="messagelist_text van-ellipsis">{{first.content}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  data() {
        return {
            Message:{},
            first:{}
        }
    },
    created(){
        this.messagecenter();
    },
    methods: {
        messagecenter(){
            this.$request.get(`/personal/message/mobile/first`).then(res => {
                this.Message = res;
                this.first = res.first;
        })
        .catch(error => {
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
        onClickLeft() {
            this.$router.go(-1);
        },
        nextstep(){
            this.$router.push({
            path: "/messagedetails",
         });
        }
    }
}
</script>
<style lang="scss" scoped>
.van-nav-bar {
    position: fixed;
    top: 0;
   
}
.messagecenter{
    display: flow-root;
    padding: 53px 0 0 0;
    .messagecenter_warp{
        height: 110px;
        width: 100%;
        background-color: #ffffff;
        margin-bottom: 5px;
        .messagecenter_title{
            width: 93%;
            margin: 0 auto;
            .messagecenter_img{
                .message_img{
                    width: 17px;
                    height: 12px;
                }
                .message_text{
                    font-size:14px;
                    font-family:PingFang SC;
                    font-weight:500;
                    color:rgba(44,44,44,1);
                    margin-left: 7px;
                }
            }
            .messagelist{
                line-height: 25px;
                margin-top: 10px;
                position:relative;
                .messagelist_img{
                    width: 16%;
                    float: left;
                    img{
                        width: 45px;
                        height: 45px;
                        border-radius: 50%;
                        object-fit: cover;
                    }
                }
                .notice {
                    width:19px;
                    height:19px;
                    line-height:20px;
                    font-size:10px;
                    color:#fff;
                    text-align:center;
                    background-color:#E31414;
                    border-radius:50%;
                    position:absolute;
                    left:32px;
                    top:-2px;
                }
                .notices {
                    width:19px;
                    height:19px;
                    line-height:20px;
                    font-size:10px;
                    color:#fff;
                    text-align:center;
                    // background-color:#E31414;
                    border-radius:50%;
                    position:absolute;
                    left:32px;
                    top:-2px;
                }
                .messagelist_name{
                    display: flow-root;
                    .messagelist_title{
                        display: flex;
                        justify-content: space-between;
                        .title1{
                            font-size:13px;
                            font-family:PingFang SC;
                            font-weight:500;
                            color:rgba(44,44,44,1);
                        }
                        .title2{
                            font-size:12px;
                            font-family:PingFang SC;
                            font-weight:500;
                            color:rgba(153,153,153,1);
                        }
                    }
                    .messagelist_text{
                        font-size:12px;
                        font-family:PingFang SC;
                        font-weight:500;
                        color:rgba(153,153,153,1);
                    }
                }
            }
        }
    }
}
</style>