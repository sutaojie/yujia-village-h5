<template>
    <div>
        <van-nav-bar title="地址管理" left-arrow @click-left="onClickLeft">
        </van-nav-bar>
        <div class="content">
            <div class="info" @click="chooseAddress(item)" v-for="(item,index) in userAddress" :key="index">
                <div class="name">{{item.name}}</div>
                <div>
                    <div class="tel">{{item.tel}}</div>
                    <div class="address">{{item.userAddress}}</div>
                </div>
                <div class="default" v-if="item.is_default == 1">默认地址</div>
                <div class="compile" @click="addressCompile(item.id)"></div>
            </div>
            <div
            v-if="userAddress.length === 0"
            class="empty"
            style="background-size: 100% 100%;margin-top:1rem;"
          >
          <span class="empty_tips">暂无地址</span>
          </div>
        </div>
        <div class="add-address" @click="addAddress">
            <van-icon name="plus" />
            <span>添加地址</span>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            userAddress: '',
        }
    },
    created() {
        this.getAddress();
    },
    methods: {
        // 选择地址
        chooseAddress(item) {
          const { type } = this.$route.query;
          if( type == 1 ) {
            sessionStorage.setItem('select address', JSON.stringify(item));
            this.$router.go(-1);
          } 
        },
        onClickLeft() {
            this.$router.go(-1)
        },
        getAddress() {
            this.$request.get('/goodOrder/create').then(data => {
                this.userAddress = data.address;
            })
            .then(() => {
              // TODO 无地址直接进入新增地址页面
              // const { type } = this.$route.query;
              // type == 1 && this.userAddress.length === 0? this.addAddress() : ''
            })
        },
        addressCompile(id) {
            this.$router.push({
                name: 'address-compile',
                query: { 
                    keyword: '编辑地址',
                    id: id
                }
            })

        },
        addAddress() {
            this.$router.push({
                name: 'address-compile',
                query: { keyword: '新增地址' }
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
    background-color: #eee;
    font-size: 16px;
    .van-icon {
        font-size: 20px;
        color: #2c2c2c;
    }
    .icon {
        display: block;
        width: 22px;
        height: 22px;
        margin-bottom: 12px;
    }
}
.content {
    padding-top: 46px;
}
.info {
    position: relative;
    display: flex;
    height: 109px;
    padding: 30px 16px 15px 16px;
    margin-bottom: 5px;
    background-color: #fff;
    .name {
        width: 66px;
        font-size: 12px;
    }
    .tel {
        font-size: 12px;
        margin-bottom: 17px;
    }
    .address {
        width: 170px;
        font-size: 11px;
    }
    .default {
        position: absolute;
        top: 4px;
        left: 0;
        width: 91px;
        height: 19px;
        line-height: 19px;
        background-color: #B3D465;
        color: #fff;
        text-align: center;
        font-size: 11px;
    }
    .compile {
        position: absolute;
        top: 50%;
        right: 16px;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        background: url('../../assets/img/compile.png') no-repeat;
        background-size: cover;
    }
}
.add-address {
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 49px;
    background-color: #fff;
    color: #A3C554;
    font-size: 13px;
    .van-icon {
        margin-right: 5px;
    }
}
</style>