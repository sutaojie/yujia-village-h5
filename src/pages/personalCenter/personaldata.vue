<template>
    <div>
        <van-nav-bar title="编辑资料" right-text="保存" left-arrow 
        @click-left="onClickLeft" @click-right="onClickRight">
        </van-nav-bar>
        <van-cell-group>
            <!-- 头像 -->
            <van-uploader class="upload" :after-read="afterRead" :max-count="1" :max-size="4096000" @oversize="overSize">
                <van-cell class="head" is-link>
                    <template slot="title">
                        <div class="head-portrait" :style="{backgroundImage:'url('+img_url+')'}"></div>
                        <span class="custom-title">更换头像</span>
                    </template>
                </van-cell>
            </van-uploader>
            <!-- 用户名 -->
            <van-field v-model="personalData.name" clearable input-align="right" label="用户名" placeholder="用户名(必填)"/>
            <van-field v-model="personalData.real_name" clearable input-align="right" label="真实姓名" placeholder="可以不填"/>
            <!-- 性别 -->
            <van-cell title="性别" :value="sex" is-link @click="showPopup('性别')"/>
            <van-cell title="生日" :value="personalData.birthday" is-link @click="showPopup('生日')"/>
            <van-cell title="地区" :value="area" is-link @click="showPopup('地区')"/>
            <!-- 弹框区域 -->
            <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
                <!-- 性别弹框 -->
                <van-picker v-if="keyword == '性别'" :item-height="30" show-toolbar :columns="columns" @cancel="onCancel" @confirm="onSexConfirm" />
                <!-- 日期弹框 -->
                <van-datetime-picker v-if="keyword == '生日'" :item-height="30" show-toolbar v-model="currentDate" type="date" :min-date="minDate"
                @cancel="onCancel" @confirm="onDateConfirm"/>
                <!-- 地区弹框 -->
                <van-area v-if="keyword == '地区'" :area-list="areaList" :item-height="30" @cancel="onCancel" @confirm="onAreaConfirm"/>
            </van-popup>
           
        </van-cell-group>
    </div>
</template>
<script>
import areaList from "../../assets/js/area.js";
import lrz from 'lrz';
export default {
    data() {
        return {
            show: false,
            keyword: '',
            // 需要渲染的数据
            columns: ['男', '女', '保密'],
            currentDate: new Date(),
            minDate: new Date(1960,1,1),
            areaList,
            sex: '',
            area: '',
            img_url:'',
            // 提交的个人资料数据
            personalData: {
                name: '',
                real_name: '',
                sex: '',
                birthday: '',
                province: '',
                city: '',
                area: '',
                icon: ''
            },
        }
    },
    created() {
        this.getUserInitialInfo();
    },
    methods: {
        // 修改资料时，用户原数据的渲染
        getUserInitialInfo() {
            const { icon, name, real_name, sex, birthday,
                province, city, area } = JSON.parse(window.sessionStorage.getItem('user'));
            this.img_url = icon;
            this.personalData.name = name;
            this.personalData.real_name = real_name;
            if(sex == 1) {
                this.sex = '女';
                this.personalData.sex = sex;
            } else if(sex == 2) {
                this.sex = '男';
                this.personalData.sex = sex;
            } else {
                this.sex = '保密';
                this.personalData.sex = sex;
            }
            this.personalData.birthday = birthday;
            if(province === null && city === null && area === null) {
                this.area = ''
            } else {
                if(province === city) {
                    this.area = province + '/' + area;
                } else {
                    this.area = province + '/' + city + '/' + area;
                }
                this.personalData.province = province;
                this.personalData.city = city;
                this.personalData.area = area;
            }
        },
        onClickLeft() {
            this.$router.go(-1);
        },
        onClickRight() {
            if(this.personalData.name === '') {
                this.$toast({
                    message: '请填写用户名',
                });
                return
            }
            this.$request.post('/personal/updateInfo',this.personalData).then(data => {
                if(data.msg === '保存成功,完善全部资料可获得积分哦') {
                    this.$toast({
                        message: '保存成功,完善全部资料可获得积分哦',
                    });
                }
            })
        },
        // 图片上传完毕后的回调函数
        afterRead(fileInfo) {
            this.img_url = fileInfo.content;
            let that = this;
            lrz(fileInfo.file).then(rst => {
                that.personalData.icon = rst.base64
            })
            .catch(function (err) {
                alert(err);
            })
        },
        // 文件超过大小时
        overSize() {
            this.$toast({
                message: '图片大小不能超过4M',
            });
        },
        showPopup(val) {
            this.show = true;
            if(val == '性别') {
                this.keyword = '性别';
            } 
            if(val == '生日') {
                this.keyword = '生日';
            }
            if(val == '地区') {
                this.keyword = '地区';
            }
        },
        onSexConfirm(value) {
            this.show = false;
            this.sex = value;
            if(value == '男') {
                this.personalData.sex = 2;
            }
            if(value == '女') {
                this.personalData.sex = 1;
            }
            if(value == '保密') {
                this.personalData.sex = 3;
            }
        },
        onDateConfirm(value) {
            const date = this.changDate(value);
            this.personalData.birthday = date;
            this.show = false;            
        },
        // 将日期格式 转化为 日期标准字符串
        changDate(date) {
            var y = date.getFullYear();  
            var m = date.getMonth() + 1;  
            m = m < 10 ? '0' + m : m;  
            var d = date.getDate();  
            d = d < 10 ? ('0' + d) : d;  
            return y + '-' + m + '-' + d; 
        },
        onAreaConfirm(area) {
            if(area[0].name === area[1].name) {
                this.area = area[0].name + '/' + area[2].name;
            } else {
                this.area = area[0].name + '/' + area[1].name + '/' + area[2].name;
            }
            this.personalData.province = area[0].name;
            this.personalData.city = area[1].name;
            this.personalData.area = area[2].name;
            this.show = false;         
        },
        onCancel() {
            this.show = false;
        }
    }
}
</script>
<style lang="scss" scoped>
.van-nav-bar {
    top: 0;
    width: 100%;
    font-size: 16px;
    .van-icon {
        font-size: 20px;
        color: #2c2c2c;
    }
    .van-nav-bar__text {
        color: #2c2c2c;
    }
}
.upload {
    width: 100%;
    // height: 100%;
    /deep/ .van-uploader__input-wrapper {
        width: 100%;
        // height: 56px;
    }
}
.head {
    // margin-top: 46px;
    .van-cell__title {
        display: flex;
    }
    .head-portrait {
        width: 36px;
        height: 36px;
        border-radius: 18px;
        background-size: cover;
        background-position: center;
    }
    .custom-title {
        line-height: 36px;
        margin-left: 9px;
    }
    .van-cell__right-icon {
        margin-top: 6px;
    }
}
.van-cell__value {
    overflow: hidden;
    white-space: nowrap; 
    text-overflow:ellipsis;
}
</style>