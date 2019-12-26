<template>
  <div>
    <van-nav-bar title="系统消息" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="System">
        <div class="System_list" v-for="(item,index) in Message" :key="index">
            <div class="text">{{item.day}} {{item.time}}</div>
            <div class="System_list_item">
                <div class="System_img">
                   <img src="../../assets/teacherclub/messageimg.png"/>
                </div>
                <div class="send">
                   <div class="kailong"></div>
                   <div class="send_text">{{item.content}}</div>
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
            Message:[]
        }
    },
    created(){
        this.messagedetails();
    },
    methods: {
        messagedetails(){
            this.$request.get(`/personal/message/mobile/all`).then(res => {
                this.Message = res;
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
    }
}
</script>
<style lang="scss" scoped>
  .van-nav-bar {
    position: fixed;
    top: 0;
   
}
.System{
    display: flow-root;
    padding: 53px 0 0 0;
    .System_list{
        width: 93%;
        margin: 0 auto;
        height: auto;
        margin-bottom: 10px;
        .text{
            text-align: center;
            font-size:11px;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(153,153,153,1);
            margin-top: 13px;
            margin-bottom: 13px;
         }
         .System_list_item{
             display: flex;
            .System_img{
                width: 16%;
                img{
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    object-fit: cover;
                }
            }   
            .send{
                position:relative;
                width:70%;
                height:auto;
                background:#fff;
                border-radius:5px;
                margin-left: 6px;
                line-height: 20px;
                margin-bottom: 10px;
                .send_text{
                font-size:12px;
                font-family:PingFang SC;
                font-weight:500;
                color:rgba(153,153,153,1);
                margin: 10px;
                }
                .kailong {
                position: absolute;
                top: 10px;
                left: -16px;
                width: 0;
                height: 0;
                font-size: 0;
                border: solid 8px;
                border-color: #eee #fff #eee #eee;
                }
              }
       }
    }
}
</style>