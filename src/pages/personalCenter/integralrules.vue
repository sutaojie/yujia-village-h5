<template>
    <div>
        <van-nav-bar title="积分规则" left-arrow @click-left="onClickLeft">
        </van-nav-bar>
        <div class="content-box">
            <div class="rules-box">
                <div class="title">1.什么是瑜伽村积分</div>
                <p class="introduction">
                    瑜伽村积分是通过瑜伽爱好者、教练、机构负责人等完成注册、完善信息及邀请注册等途径获得的积分奖励。
                </p>
            </div>
            <div class="rules-box">
                <div class="title">2.瑜伽村积分有什么用</div>
                <ul class="introduction">
                    <li>1）瑜伽老师/普通村民：积分可兑换瑜伽培训课程、瑜伽活动优惠，及抵用课程费用等优惠礼遇</li>
                    <li>2）瑜伽名师/瑜伽机构：积分可兑换中国瑜伽村官网及手机端的广告位信息展示</li>
                </ul>
            </div>
            <div class="rules-box">
                <div class="title">3.瑜伽村积分获取详情</div>
                <p class="introduction">
                    <ul>
                        <li>1）注册中国瑜伽村普通村民，即获得<span class="num">500</span>积分；</li>
                        <li>2）注册后完善个人资料，即获得<span class="num">100</span>积分；</li>
                        <li>3）完成认证信息，即获得<span class="num">200</span>积分；</li>
                        <li>4）邀请好友注册中国瑜伽村普通村民，每邀请注册一个好友，即获得<span class="num">300</span>积分，以此叠加；</li>
                        <li>5）您邀请的好友再邀请其他好友注册，每邀请注册一个好友，即获得<span class="num">100</span>积分，以此叠加；</li>
                        <li class="zhuyi">注：在2019年12月31日前参与注册推荐积分活动，所有积分翻倍</li>
                        <li>例：</li>
                        <li>注册获得500积分，现可获得<span class="num">1000</span>积分；</li>
                        <li>完善资料100积分，现可获得<span class="num">200</span>积分；</li>
                        <li>认证信息200积分，现可获得<span class="num">400</span>积分；</li>
                        <li>推荐好友300积分，现可获得<span class="num">600</span>积分；</li>
                        <li>以此类推，最终解释权归中国瑜伽村所有。</li>
                    </ul>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    methods: {
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
.content-box {
    position: absolute;
    top: 46px;
    bottom: 0;
    left: 0;
    overflow: scroll;
    // margin-top: 46px;
    width: 100%;
    background-color: #fff;
    .rules-box {
        padding: 0 16px;
        border-top: 2px solid #eee;
        font-size: 14px;
        .title {
            padding: 15px 0;
            font-size: 16px;
            font-weight: 600;
        }
        .introduction {
            padding: 0 16px;
            padding-bottom: 16px;
            line-height: 24px;
            color: #999;
            .num {
                color: rgb(255, 38, 0);
                font-weight: 600;
            }
            .zhuyi {
                color: rgb(255, 38, 0);
                font-weight: 600;
            }
        }
    }
}
</style>