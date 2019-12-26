<template>
    <div>
        <van-nav-bar title="更改手机号" :right-text="rightText" left-arrow 
        @click-left="onClickLeft" @click-right="onClickRight">
        </van-nav-bar>
        <div class="" v-if="rightText === '下一步' ">
            <div class="current-num">
                更改当前绑定手机号：{{currentNumber}}
            </div>
            <van-field v-model="sms" type="number" center clearable label="短信验证码" placeholder="请输入短信验证码">
                <van-button class="button" slot="button" size="small" type="primary" :disabled="isDisabled"  @click="getVerificationCode">
                    <van-count-down v-if="isDisabled" :time="time" format="ss秒" @finish="onFinish"/><div>{{isDisabled == false ? '获取验证码' : '后重新发送'}}</div>
                </van-button>
            </van-field>
        </div>
        <div class=" " v-if="rightText === '完成' ">
            <van-field v-model="newTel" type="number" center clearable label="新号码" placeholder="请输入新号码">
            </van-field>    
            <van-field v-model="sms" type="number" center clearable label="短信验证码" placeholder="请输入短信验证码">
                <van-button class="button" slot="button" size="small" type="primary" :disabled="disabled"  @click="getVerificationCode">
                    <van-count-down v-if="disabled" :time="time" format="ss秒" @finish="onFinish"/><div>{{disabled == false ? '获取验证码' : '后重新发送'}}</div>
                </van-button>
            </van-field>
        </div>
        <div v-if="show" class="mask-box">   
            <div class="validation-box">
                <van-icon name="cross" @click="close"/>
                <div class="title">图形验证码</div>
                <div class="code-img">
                    <img class="img" :src="verificationCode.img" alt="">
                    <div @click="getVerificationCode">看不清，换一张</div>
                </div>
                <van-password-input :value="value" :mask="false" :focused="showKeyboard" @focus="showKeyboard = true"
                :length="4" :gutter="15"/>
                <div class="is-ok" @click="confirm(rightText)">确定</div>
            </div>
            <van-number-keyboard style="z-index: 9999;" :show="showKeyboard" theme="custom" extra-key="." 
            close-button-text="完成" @blur="showKeyboard = false" @input="onInput" @delete="onDelete"/>
        </div>    
    </div>
</template>
<script>
export default {
    data() {
        return {
            rightText: '下一步',
            currentNumber: '',
            sms: '', 
            newTel: '',
            show: false,
            value: '',
            showKeyboard: false,
            time: 60 * 1000,
            isDisabled: false,
            disabled: false,
            // 获取图形验证码的得到数据
            verificationCode: {
                img: '',
                key: ''
            },
            // 图形验证码校验
            verifyData: {
                captcha: '',
                key: ''
            },
            // 获取短信验证码
            noteVerifyData: {
                tel: '',
                captcha: '',
                key: ''
            },  
            // 手机验证码的 key 值
            tel_key: '',  
            // 手机验证码，验证成功后的返回值
            // msg: '',
            // 更改手机号，传递的数据
            updateTel: {
                old_tel: '',
                tel: '',
                verification_key: '',
                verification_code: ''
            }
        }
    },
    created() {
        // 获取当前用户的手机号
        this.currentNumber = JSON.parse(window.sessionStorage.getItem('user')).tel; 
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        async onClickRight() {
            if(this.rightText == '下一步') {
                if(this.sms === '') {
                    this.$toast.fail('验证码不能为空！');
                    return;
                }
                const msg = await this.checkNoteCode();
                if(msg === 'OK') {
                    this.rightText = '完成';
                    this.sms = '';
                }
            } else {
                this.updateTel = {
                    old_tel: this.currentNumber,
                    tel: this.newTel,
                    verification_key: this.tel_key,
                    verification_code: this.sms
                }
                // console.log(this.updateTel);
                this.postUpdateTel(this.updateTel);
            }
            
        },  
        // 输入验证码
        onInput(key) {
            this.value = (this.value + key).slice(0, 4);
            // console.log(this.value);
        },
        // 删除验证码
        onDelete() {
            this.value = this.value.slice(0, this.value.length - 1);
        },
        // 关闭图形验证框
        close() {
            this.show = false;
        },
        // 获取图形验证码
        getVerificationCode() {
            if(this.rightText === '完成') {
                if(this.newTel === '') {
                    this.$toast('请输入新的手机号！');
                    return;
                }
            }
            this.show = true;
            this.$request.get("/verificationCode").then(data => {
                this.verificationCode = {
                    img: data.img,
                    key: data.key
                }
            })
        },
        // 确定，图形验证码校验
        confirm(rightText) {
            this.verifyData = {
                captcha: this.value,
                key: this.verificationCode.key
            }
            if(this.value !== '') {
                this.$request.post("/verificationCode",this.verifyData).then(data => {
                    // console.log(data);
                    if(data.msg === 'OK') {
                        console.log('success');
                        if(rightText === '下一步') {
                            this.getNoteCode(this.currentNumber);
                            this.isDisabled = true; 
                        } else {
                            this.getNoteCode(this.newTel);
                            this.disabled = true;
                        }
                        this.value = '';
                        this.show = false;
                    } else {
                        this.$toast.fail('验证码不匹配');
                        this.value = '';
                    }
                })
            }
        },
        // 获取短信验证码
        getNoteCode(tel) {
            this.noteVerifyData = {
                tel: tel,
                captcha: this.value,
                key: this.verificationCode.key
            }
            this.$request.post("/getVerificationCode",this.noteVerifyData).then(data => {
                // console.log(data);
                this.tel_key = data.key;
            })
        },
        // 原手机号码，短信验证码校验
        async checkNoteCode() {
            const checkCode = {
                verification_key: this.tel_key,
                verification_code: this.sms
            }
            const data = await this.$request.post('/checkCode', checkCode).catch(err => {
                this.$toast.fail('验证码错误！');
            })
            return data.msg;
        },
        // 更改手机号
        postUpdateTel(updateTel) {
            this.$request.post('/personal/updateTel', updateTel ).then(data => {
                // console.log(data);
                if(data.msg === 'OK') {
                    this.$toast.success('手机号码修改成功');
                }
            })
        },
        onFinish() {
            if(this.rightText === '下一步') {
                this.isDisabled = false;
            } else {
                this.disabled = false;
            }
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
        color: #999;
    }
}
.current-num {
    width: 100%;
    height: 33px;
    line-height: 33px;
    padding: 0 16px;
    font-size: 12px;
}
/deep/ .van-cell__title {
    flex: none;
}
.button .van-button__text {
    display: flex;
    .van-count-down {
        line-height: 28px;
        font-size: 12px;
        color: #fff;
    }
}
.mask-box {
    position: fixed;
    top: 0;
    z-index: 99;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
    .validation-box {
        position: relative;
        width: 268px;
        height: 244px;
        margin: 0 auto;
        margin-top: 80px;
        background-color: #fff;
        border-radius: 10px;
        .van-icon {
            position: absolute;
            top: 8px;
            right: 8px;
            font-size: 20px;
        }
        .title {
            padding-top: 25px; 
            font-size: 14px;
            text-align: center;
        }
        .code-img {
            display: flex;
            justify-content: space-around;
            padding: 0 16px;
            margin-top: 45px;
            margin-bottom: 15px;
            height: 33px;
            line-height: 33px;
            font-size: 12px;
            color: #7AC271;
            .img {
                width: 111px;
                background-color: #eee;
            }
        }
        .is-ok {
            height: 50px;
            line-height: 60px;
            font-size: 14px;
            text-align: center;
        }
        .van-password-input {
            margin: 0 26px;
            /deep/ .van-password-input__security {
                display: flex;
                justify-content: space-around;
                .van-hairline--left::after {
                    border: none;
                }
                li {
                    border-bottom: 0.5px solid #eee;

                }
            }
            /deep/ .van-hairline--surround::after {
                border-width: 0 !important;
            }
             
        }
    }
    /deep/ .van-icon {
        position: absolute;
    }
}


</style>