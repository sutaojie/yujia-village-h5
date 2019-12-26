<template>
    <div>
        <van-nav-bar title="购物袋" left-arrow :right-text="rightText" @click-left="onClickLeft" @click-right="onClickRight">
        </van-nav-bar>
        <div class="content">
            <div class="commodity" v-for="(item,index) in shoppingBagList" :key="index">
                <van-checkbox v-model="item.check" checked-color="#B3D465" label-disabled>
                </van-checkbox>
                <div class="order-describe">
                    <div class="img" :style="{backgroundImage: 'url('+item.pic+')'}"></div>
                    <div class="name">{{item.describe}}</div>
                    <div class="style">
                        <span>{{item.color}}</span><span>{{item.size}}</span>
                    </div>
                    <div class="price">￥{{item.price}}</div>
                </div>
                <van-stepper v-model="item.num" integer />
            </div>
            <div
            v-if="shoppingBagList.length === 0"
            class="empty"
            style="background-size: 100% 100%;margin-top:1rem;"
            >
            <span class="empty_tips">暂无商品</span>
            </div>
        </div>
        <div class="check-all" v-if="isCompile==false">
            <van-checkbox :value="isAllChecked" @click="handleAllCheck" checked-color="#B3D465">全选</van-checkbox>
            <div class="total">合计 <span>￥{{countCheckedPrice.toFixed(2)}}</span></div>
            <div class="place-order" :style="`background:${ hasSomeChecked ?'':'#ccc'}`" @click="order">去下单</div>
        </div>
        <div class="check-all delete" v-if="isCompile==true">
            <van-checkbox :value="isAllChecked" checked-color="#B3D465" @click="handleAllCheck">全选</van-checkbox>
            <div class="del" :style="`background:${ hasSomeChecked ?'':'#ccc'}`" @click="delCommodity">删除</div>
        </div>
    </div>
</template>
<script>
import { postUserOrder, deleteUserCartDelCart } from '@/services/api/goods.js'
export default {
    data() {
        return {
            // 全选按钮的 状态
            checked: false,
            // 编辑按钮的切换状态
            isCompile: false,
            // 编辑 和 完成的文字切换
            rightText: '编辑',
            // 购物袋商品列表
            shoppingBagList: [],
        }
    },
    created() {
        this.getShoppingBag();
    },
    computed: {
        isAllChecked(){
            return this.shoppingBagList.length > 0 && this.shoppingBagList.every( item => item.check )
        },
        hasSomeChecked(){
            return this.shoppingBagList.some( item => item.check )
        },
        countCheckedPrice(){
            return this.shoppingBagList.filter( item => item.check ).reduce((pre, next) => {                
                return (pre) + (next.price * next.num)
            }, 0) 
        }
    },
    methods: {
        // 选择全部
        handleAllCheck() {
            this.checked = !this.checked
            const is_all_check = this.shoppingBagList.every( item => item.check )
            this.shoppingBagList = this.shoppingBagList.map(item => {
                item.check = !is_all_check;
                return item
            })
        },
        // 去下单
        order() {
            if(!this.hasSomeChecked) return;
            
            const id = this.shoppingBagList.filter(item => item.check).map(item => item.id);
            const num = this.shoppingBagList.filter(item => item.check).map(item => item.num);
            postUserOrder({ id, num }).then(data => {
                this.$router.push('/fillorder')
            });

        },
        onClickLeft() {
            this.$router.go(-1);
        },
        onClickRight() {
            this.isCompile = !this.isCompile;
            if(this.isCompile) {
                this.rightText = '完成';
            } else {
                this.rightText = '编辑';
            }
        },
        delCommodity() {
            if(!this.hasSomeChecked) return;
            this.$dialog.confirm({
                message: '是否删除选中商品？',
                confirmButtonText: '是',
                cancelButtonText: '否',
                closeOnClickOverlay: true,
                closeOnPopstate: true,
                beforeClose: (action, done) => {
                    if(action === 'confirm') {
                        this.delShoppingBag(this.shoppingBagList.filter(item => item.check).map(item => item.id))
                        done(); 
                    } else {
                        done(); 
                    }
                }
            });
        },
        delShoppingBag(items_id) {
          
          deleteUserCartDelCart({ id: items_id }).then(() => {
            this.$toast("删除成功");
            this.shoppingBagList = this.shoppingBagList.filter(item => !item.check)
          });
        },
        // 获取购物袋数据
        getShoppingBag() {
            this.$request.get('/userCart/create').then(data => {
                data.forEach(item => {
                    const cart = {
                        id: item.id,
                        describe: item.describe,
                        color: item.color,
                        size: item.size,
                        price: (item.sell_price-item.discount).toFixed(2),
                        pic: item.url,
                        num: item.num,
                        check: true,
                    }
                    this.shoppingBagList.push(cart);
                });
            }) 
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
    margin-bottom: 5px;
    background-color: #eee;
    .van-icon {
        font-size: 20px;
        color: #2c2c2c;
    }
    .van-nav-bar__text {
        color: #2c2c2c;
    }
}
.content {
    padding-top: 46px;
    margin-bottom: 49px;
    overflow: hidden;
    overflow-y: scroll;
}
.commodity {
    display: flex;
    justify-content: space-between;
    position: relative;
    height: 143px;
    padding: 31px 16px 32px 16px;
    margin-bottom: 9px;
    background-color: #fff;
    box-shadow:0px 3px 5px #c8c8c8 ;
    /deep/ .van-checkbox__label {
        margin-left: 15px;
    }
    .order-describe {
        position: relative;
        width: 308px;
        font-size: 11px;
        .img {
            width: 82px;
            height: 80px;
            background-size: cover;
            background-position: center;
        }
        .name {
            position: absolute;
            top: 0;
            left: 98px;
            width: 165px;
            overflow: hidden;
            white-space: nowrap; 
            text-overflow:ellipsis;
        }
        .style {
            position: absolute;
            top: 30px;
            left: 98px;
            width: 100%;
            color: #999;
            font-size: 10px;
            span {
                margin-right: 15px;
                padding: 3px 7px;
                border: 0.5px solid #eee;
            }
        }
        .price {
            position: absolute;
            bottom: 0;
            left: 98px;
        }
    }
    .van-stepper {
        position: absolute;
        right: 16px;
        bottom: 22px;
    }
}
.check-all {
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 49px;
    padding-left: 16px;
    background-color: #fff;
    box-shadow: 0 -3px 3px #c8c8c8;
    font-size: 15px;
    .total {
        margin-left: 20px;
        line-height: 49px;
        span {
            color: #D30606;
            font-weight: 700;
        }
    }
    .place-order {
        position: absolute;
        right: 0;
        width: 104px;
        height: 49px;
        line-height: 49px;
        background-color: #B3D465;
        color: #fff;
        text-align: center;
    }
}
.delete {
    justify-content: space-between;
    .del {
        width: 104px;
        height: 49px;
        line-height: 49px;
        background-color: #FF1900;
        color: #fff;
        text-align: center;
    }
}
</style>