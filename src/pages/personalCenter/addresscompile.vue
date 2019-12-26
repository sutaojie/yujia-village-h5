<template>
    <div>
        <van-nav-bar :title="navTitle" left-arrow @click-left="onClickLeft"></van-nav-bar>
        <van-address-edit style="padding-top: 46px;" :area-list="areaList" :show-delete="isShowDelete" :address-info="AddressInfo" show-set-default 
        @save="onSave" @delete="onDelete"/>
    </div>
</template>
<script>
import areaList from "../../assets/js/area.js";
export default {
    data() {
        return {
            navTitle: '',
            // 编辑地址的 id
            addressId: '',
            isShowDelete: true,
            areaList,
            // 初始地址信息
            AddressInfo: {},
            // 用户信息
            userInfoForm: {
                userName: "",
                userTel: "",
                province: "",
                area: "",
                city: "",
                userAddress: "",
                isDefault: ''
            }
        }
    },
    created() {
        this.navTitle = this.$route.query.keyword;
        this.addressId = this.$route.query.id;
        if(this.navTitle == '新增地址') {
            this.isShowDelete = false
        }
        this.showAddress();
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1)
        },
        // 保存时的 操作
        onSave(content) {
            this.userInfoForm.userName = content.name;
            this.userInfoForm.userTel = content.tel;
            this.userInfoForm.province = content.province;
            this.userInfoForm.city = content.city;
            this.userInfoForm.area = content.county;
            this.userInfoForm.areaCode = content.areaCode;
            this.userInfoForm.userAddress = content.addressDetail;
            if(content.isDefault) {
                this.userInfoForm.isDefault = 1
            } else {
                this.userInfoForm.isDefault = 0
            }

            if(this.navTitle == '新增地址') {
                this.addAddress();
            } else {
                this.complileAddress();
            }
        },
        // 新增地址
        addAddress() {
            this.$request.post('/createAddress',this.userInfoForm).then(data => {
                if(data.msg === 'ok') {
                    this.$toast({
                        message: '新增成功',
                    });
                    this.timeout();
                }    
            })
        },
        // 编辑地址时，获取的原地址
        showAddress() {
            this.$request.get('/showAddress/'+ this.addressId).then(data => {
                var isDefault = false;
                if(data.is_default == 1) {
                    isDefault = true
                } else {
                    isDefault = false
                }
                const info = {
                    name: data.name,
                    tel: data.tel,
                    areaCode: data.areaCode,
                    addressDetail: data.address,
                    isDefault
                }
                this.AddressInfo = info
            })
        },
        // 修改地址
        complileAddress() {
            this.$request.post('/updateAddress/'+this.addressId,this.userInfoForm).then(data => {
                if(data.msg === 'ok') {
                    this.$toast({
                        message: '修改成功',
                    });
                    this.timeout();
                }
            })
        },
        // 删除地址
        onDelete() {
            this.$request.delete('delAddress/'+ this.addressId).then(data => {
                if(data.msg === 'ok') {
                    this.$toast({
                        message: '删除成功',
                    });
                    this.timeout();
                }
            })
        },
        // 定时器
        timeout() {
            setTimeout(() => {
                this.$router.go(-1);
            },1000)
        }
    }
}
</script>
<style lang="scss" scoped>
.van-nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10 !important;
    .van-nav-bar__text {
        color: #2c2c2c;
    }
}
.van-address-edit {
    /deep/ .van-cell {
        .van-cell__title {
            flex: none;
            width: 90px;
        }
        .van-cell__value--alone {
            .van-cell {
                padding: 0;
            }
        }
    }
    /deep/ .van-switch-cell .van-cell__title {
        width: 120px;
    }
    /deep/ .van-button--danger {
        background-color: #7BBB62;
        border-color: #7BBB62;
    }
} 
</style>