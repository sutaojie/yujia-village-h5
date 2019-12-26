
<template>
  <div>
      <div class="share_warp">
          <div class="ation">
              <img src="../assets/img/img6.png" class="ation_img"/>
              <div class="share_warp_title">
                  <span class="tips">欢迎瑜伽老师，优质机构入驻平台！</span>
              </div>
              <div class="share_warp_rule">
                <div class="border-left"></div>
                <span class="rule_name">Sharing itself is a beautiful performance</span>
                <div class="border-right"></div>
              </div>
              <div class="share_warp_picture">
                  <img src="../assets/img/img7.png" class="picture_img"/>
                  <div class="warp_picture_right">
                      <img src="../assets/img/img8.png" class="picture_img2"/>
                      <span class="picture_text">找瑜伽老师、机构、专业用品<br/>只需简单注册，平台帮你搞定!</span>
                  </div>
              </div>
              <div class="share_warp_code">
                  <img src="../assets/img/img9.png" class="code_img"/>
                  <div class="warp_code_title">长按扫描二维码注册</div>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
  export default {
    name: "shareation"
  }
</script>
<style lang="scss" scoped>
.share_warp{
    width: 100%;
    height: 100%;
    display: inline-block;
    background-color: #ffffff;
    .ation{
        width: 100%;
        margin-top: 8%;
        margin-bottom: 15%;
        position: relative;
        .ation_img{
            margin: 0 auto;
            display: block;
            width: 86%;
        }
        .share_warp_title{
            width: 86%;
            text-align: center;
            position: absolute;
            top: 40%;
            right: 7%;
            height: 32px;
            line-height: 25px;
            .tips{
              font-size:10px;
              font-family:PingFang SC;
              font-weight:500;
              color: #2c2c2c;
            }
        }
        .share_warp_rule{
            width: 86%;
            text-align: center;
            position: absolute;
            top: 47%;
            right: 7%;
            height: 35px;
            line-height: 20px;
        .rule_name{
          font-size: 10px;
          font-family:PingFang SC;
          font-weight:400;
          color: #999;
        }
        .border-left{
          width: 16%;
          position: absolute;
          top: 17px;
          background-color: #999;
          height: 1px;
          left: 0;
        }
        .border-right{
          width: 16%;
          position: absolute;
          top: 17px;
          background-color: #999;
          height: 1px;
          right: 0;
        }
      }
      .share_warp_picture{
        width: 86%;
        position: absolute;
        display: flex;
        bottom: 28%;
        right: 7%;
        .picture_img{
            width: 79px;
            height: 79px;
            display: block;
            margin-left: 10px;
        }
        .warp_picture_right{
            padding-left: 15px;
            position: relative;
            .picture_img2{
                width: 218px;
                height: 60px;
                display: block;
                margin-top: 12px;
           }
           .picture_text{
                position: absolute;
                font-size: 12px;
                font-family:PingFang SC;
                font-weight:500;
                width: 71%;
                text-align: left;
                line-height: 20px;
                top: 18px;
                right: 23px;
           }
        }
      }
      .share_warp_code{
          width: 86%;
          position: absolute;
          bottom: 3%;
          right: 7%;
          .code_img{
              width: 79px;
              height: 79px;
              display: block;
              margin-left: 15%;
          }
          .warp_code_title{
              font-size: 12px;
              font-family:PingFang SC;
              font-weight:500;
              color: #ffffff;
              padding-left: 10%;
          }
      }
    }
}
</style>
