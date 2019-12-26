<template>
  <div class="body-box">
    <div class="body-wrap">
      <div class="back_home-wrap" @click="goHome">
        <div class="back_home" style="color: #fff;">
          <van-icon style="color: #fff;" name="wap-home" />
        </div>
      </div>
      <div class="back_login-wrap" v-show="form.type !== 'login'" @click="changeType('login')">
        <div class="back_login" style="color: #fff;">
          <van-icon style="color: #fff;" name="manager" />
        </div>
      </div>
      <div class="body">
        <!-- <div class="tips" v-show="false">
          <span :class="isActive('register')" @click="changeType('register')">注册</span>
          <span :class="isActive('login')" @click="changeType('login')">登录</span>
          <span :class="isActive('reset')" @click="changeType('reset')">登录</span>
        </div>-->
        <div class="form login" v-show="form.type === 'login'">
          <div class="logo" v-if="false">
            <img :src="icon.welcome" alt />
          </div>
          <div class="input-box flex line ">
            <div class="icon">
              <img :src="icon.tel" alt />
            </div>
            <input class="input tel" type="tel" v-model="ruleForm.tel" placeholder="请输入手机号码" ref="ruleFormkeytel" @change="Verificationinput('tel', ruleForm.tel)"/>
          </div>
          <div class="verifymessage">
            {{ messagetel }}
          </div>
          <div class="input-box flex line">
            <div class="icon key">
              <img :src="icon.key" alt />
            </div>
            <input class="input key" type="password" v-model="ruleForm.password" placeholder="请输入密码" ref="ruleFormkeypwd" @change="Verificationinput('pwd', ruleForm.password)"/>
          </div>
          <div class="verifymessage">
            {{ messagepwd }}
          </div>
          <div class="input-box flex" v-show="false">
            <input class="input captcha" type="tel" v-model="ruleForm.captcha" placeholder="请输入验证码"/>
            <div class="code">
              <div class="img">
                <img :src="verification.code_img" alt />
              </div>
              <div :class="['refresh', {start: verification.is_tap}]">
                <img
                  :class="[{start: verification.is_tap}]"
                  @click="getVerificationCode"
                  :src="icon.refresh"
                  alt
                />
              </div>
            </div>
          </div>
          <div class="input-btn">
            <van-button @click="login" type="default">登录</van-button>
            <div class="login-tips">
              <span :class="isActive('register')" @click="changeType('register')">立即注册</span>
              <span :class="isActive('reset')" @click="changeType('reset')">忘记密码</span>
            </div>
          </div>
        </div>
        <div class="form register" v-show="form.type === 'register'">
          <div class="input-box reg tel">
            <van-field type="tel" v-model="registerForm.tel" placeholder @change="Verificationinput('tel', registerForm.tel)"/>
          </div>
          <div class="verifymessage">
            {{ messagetel }}
          </div>
          <van-dialog
            title="请输入下方图形验证码"
            v-model="to_send_sms.registerForm"
            @confirm="confirmSend('registerForm')"
            @cancel="cancelSend('registerForm')"
            show-cancel-button
          >
            <div style="padding-top:20px;"></div>
            <div class="input-box flex">
              <div class="reg-captch">
                <van-field type="tel" v-model="registerForm.captcha" placeholder />
              </div>

              <div class="code">
                <div class="img">
                  <img :src="verification.code_img" alt />
                </div>
                <div class="refresh">
                  <img
                    @click="getVerificationCode"
                    :class="[{start: verification.is_tap}]"
                    :src="icon.refresh"
                    alt
                  />
                </div>
              </div>
            </div>
          </van-dialog>
          <div class="input-box reg ver_code">
            <van-field
              type="tel"
              v-model="registerForm.verification_code"
              center
              clearable
              placeholder
              @change="Verificationinput('dxcode',registerForm.verification_code)"
            ></van-field>
            <van-button
              class="sms"
              size="small"
              @click="openImgCode('registerForm')"
              type="primary"
            >{{codeTips.msg}}</van-button>
          </div>
          <div class="verifymessage">
            {{ messagecode }}
          </div>
          <div class="input-box reg pwd">
            <van-field v-model="registerForm.password" type="password" placeholder @change="Verificationinput('pwd', registerForm.password)"/>
          </div>
          <div class="verifymessage">
            {{ messagepwd }}
          </div>
          <div class="input-box reg nvitation_id">
            <van-field type="text" v-model="registerForm.invitation_id" placeholder @change="Verificationinput('nvitation_id',registerForm.invitation_id)"/>
          </div>
          <div class="verifymessage">
            {{ messageid }}
          </div>
          <div class="input-btn">
            <van-button type="default" @click="register">注册</van-button>
            <div class="reg-tips" v-show="false">
              已有账号？
              <span style="color:#8FCD71;" :class="isActive('login')" @click="changeType('login')">立即登录</span>
            </div>
          </div>
        </div>
        <div class="form reset" v-show="form.type === 'reset'">
          <div class="input-box reg re_tel">
            <van-field type="tel" v-model="reset.tel" placeholder @change="Verificationinput('tel',reset.tel)"/>
          </div>
          <div class="verifymessage">
            {{ messagetel }}
          </div>
          <van-dialog
            title="请输入下方图形验证码"
            v-model="to_send_sms.reset"
            @confirm="confirmSend('reset')"
            @cancel="cancelSend('reset')"
            show-cancel-button
          >
          <div class="input-box flex">
            <div class="reg-captch">
              <van-field type="tel" v-model="reset.captcha" placeholder/>
            </div>
            <div class="code">
              <div class="img">
                <img :src="verification.code_img" alt />
              </div>
              <div class="refresh">
                <img
                  @click="getVerificationCode"
                  :class="[{start: verification.is_tap}]"
                  :src="icon.refresh"
                  alt
                />
              </div>
            </div>
          </div>
          </van-dialog>
          <div class="input-box reg ver_code">
            <van-field type="tel" v-model="reset.verification_code" center clearable placeholder @change="Verificationinput('dxcode',reset.verification_code)"></van-field>
            <van-button
              class="sms"
              size="small"
              @click="openImgCode('reset')"
              type="primary"
            >{{codeTips.msg}}</van-button>
          </div>
          <div class="verifymessage">
            {{ messagecode }}
          </div>
          <div class="input-box reg pwd">
            <van-field v-model="reset.password" type="password" placeholder @change="Verificationinput('pwd',reset.password)"/>
          </div>
          <div class="verifymessage">
            {{ messagepwd }}
          </div>
          <div class="input-btn">
            <van-button type="default" @click="resetPwd">更改</van-button>
            <div class="reg-tips" v-show="false">
              <span style="color:#8FCD71;" :class="isActive('login')" @click="changeType('login')">立即登录</span>
            </div>
          </div>
        </div>
      </div>
      <div v-show="show.sy">
        <van-dialog title="查看瑜伽村使用协议" v-model="open.sy">
          <div style="height:60vh;overflow: scroll;">
            <!-- <iframe src="../../static/doc/瑜伽村使用协议.pdf" width="100%" height="100vh" frameborder="1"></iframe> -->
            <div id="sy"></div>
          </div>
          <span slot="footer">
            <van-button class="sure_btn" type="primary" @click="open.sy = false">确 定</van-button>
          </span>
        </van-dialog>
      </div>
      <div v-show="show.ys">
        <van-dialog style="margin-top:1rem;" title="查看瑜伽村隐私政策" v-model="open.ys">
          <div style="height:60vh;overflow: scroll;">
            <div id="ys"></div>
            <!-- <iframe src="../../static/doc/瑜伽村隐私政策.pdf" width="100%" height="100%" frameborder="1"></iframe> -->
          </div>
          <span slot="footer">
            <van-button class="sure_btn" type="primary" @click="open.ys = false">确 定</van-button>
          </span>
        </van-dialog>
      </div>
      <div class="back-wrap" v-show="form.type === 'reset'" @click="changeType('login')">
        <div class="back">
          <img :src="icon.back" alt />
        </div>
        <span>返回</span>
      </div>
      <div class="shuoming" v-show="form.type === 'register'">
        <p>
          注册即等于同意
          <span
            href="../../../static/doc/瑜伽村隐私政策.DOCX"
            @click="openFile('ys')"
            class="file"
          >《瑜伽村隐私政策》</span>和
          <span
            href="../../../static/doc/瑜伽村使用协议.DOCX"
            @click="openFile('sy')"
            class="file"
          >《瑜伽村使用协议》</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import "pdfh5/css/pdfh5.css";
import bg from "@/assets/img/logo.png";
import logo from "@/assets/img/logo.png";
import welcome from "@/assets/img/welcome.png";
import tel from "@/assets/img/tel.png";
import back from "@/assets/img/back.png";
import key from "@/assets/img/key.png";
import refresh from "@/assets/img/refresh.png";
import Validator from '@/utils/Validator.js'
import Pdfh5 from "pdfh5";
import Vue from "vue";

import { mapGetters } from 'vuex'
import store from "@/store";

import { Field, Button, Notify, Dialog, Icon, Toast } from "vant";
Vue.use(Field)
  .use(Button)
  .use(Dialog)
  .use(Icon)
  .use(Notify);
const getUrlParams = function getUrlParams() {
  var search = window.location.search;
  var url = decodeURI(search); // 编码字符 解码
  var splitIndex = url.indexOf("?"); // 返回第一个？号的位置
  var str = url.substring(splitIndex + 1); // 获取到查询参数
  var getAllUrlParam = function(str) {
    var urlArr = str.split("&");
    var obj = {};
    for (var i = 0; i < urlArr.length; i++) {
      var arg = urlArr[i].split("=");
      arg[0] && (obj[arg[0]] = arg[1]);
    }
    return obj;
  };
  return getAllUrlParam(str);
};
export default {
  data() {
    return {
      pdfh5: null,
      show: {
        sy: false,
        ys: false
      },
      to_send_sms: {
        registerForm: false,
        reset: false
      },
      open: {
        sy: true,
        ys: true
      },
      icon: {
        key,
        tel,
        bg,
        logo,
        refresh,
        back,
        welcome
      },
      codeTips: {
        msg: "发送验证码",
        count: 0
      },
      form: { type: "login" },
      ruleForm: {
        tel: "",
        password: ""
        // captcha: "",
        // key: ""
      },
      registerForm: {
        name: "",
        tel: "",
        password: "",
        verification_key: "",
        verification_code: "",
        captcha: "",
        key: "",
        invitation_id: ""
      },

      reset: {
        tel: "",
        password: "",
        verification_key: "",
        verification_code: "",
        captcha: "",
        key: ""
      },
      verification: {
        code_img: "",
        code_key: "",
        is_tap: false
      },
      personalData: {},
      messagetel: '',    // 账号输入错误提示
      messagepwd: '',     // 密码输入提示
      messagecode: '',   // 短信验证提示
      messageid: '',     // 邀请码验证提示
    };
  },
  computed: {
    isActive() {
      return type => ({ active: this.form.type === type });
    },
    isHeightMore() {
      if(document.body.clientHeight > 400) {
        return true;
      } else {
        return false
      }
    }
  },
  mounted() {
    const { invitation_id = '', type = ''} = getUrlParams()
    
    if(invitation_id) {
      this.registerForm.invitation_id = invitation_id;
      this.form.type = "register";
    }

    const { q_type } = this.$route.query
    if(type == 'register' || q_type == 'register' ) {
      this.form.type = "register";
    }

    this.$store.commit("loadStatus", false);
    // this.getVerificationCode();
    this.loadFile("sy");
    this.loadFile("ys");
  },
  beforeDestroy() {
      window.sessionStorage.removeItem('personal');
  },
  methods: {
    // 登录验证验证输入框
    Verificationinput (type, value) {
      if(type === 'tel') {
        /^1[0-9]{10}$/.test(value)? this.messagetel = '' : this.messagetel = '手机号码格式不正确！'
      } else if (type === 'pwd') {
        if (value.length > 18 || value.length < 6 || /[^0-9a-zA-Z_]/.test(value) ) {this.messagepwd = '格式大于或等于6位小于18位且不含特殊字符'} else { this.messagepwd = '' }
      } else if (type === 'dxcode') {
        if (value.length > 6 || value.length < 4) { this.messagecode = '格式大于或等于4位小于6位' } else { this.messagecode = '' }
      } else if (type === 'nvitation_id') {
        if (value.length > 6 || value.length < 4) { this.messageid = '格式大于或等于4位小于6位' } else { this.messageid = '' }
      }
    },
    // 换页面重置提示信息
    validationtips () {
      this.messagetel = ''
      this.messagepwd = ''
      this.messagecode = ''
      this.messageid = ''
    },
    // 返回主页
    goHome() {
      this.$router.replace("/main");
    },
    openFile(type) {
      this.show[type] = true;
      this.open[type] = true;
    },
    loadFile(type) {
      this.pdfh5 = new Pdfh5(`#${type}`, {
        pdfurl: `./static/doc/${
          type == "ys" ? "瑜伽村隐私政策" : "瑜伽村使用协议"
        }.pdf`
      });
    },
    getUrlParams() {
      let search = window.location.search;
      let url = decodeURI(search); // 编码字符 解码
      let splitIndex = url.indexOf("?"); // 返回第一个？号的位置
      let str = url.substring(splitIndex + 1); // 获取到查询参数
      let getAllUrlParam = function(str) {
        var urlArr = str.split("&");
        var obj = {};
        for (var i = 0; i < urlArr.length; i++) {
          var arg = urlArr[i].split("=");
          obj[arg[0]] = arg[1];
        }
        return obj;
      };
      return getAllUrlParam(str);
    },
    login() {
      if (!this.validatorLogin()) return;
      const params = Object.assign({}, this.ruleForm);
      this.postLogin(params)
    },
    validatorLogin() {
      const validatorFunc = () => {
        const { tel, password} = this.ruleForm
        let validator = new Validator();
        validator.add(tel, [{
            strategy: 'isNonEmpty',
            errorMsg: '手机号码不能为空！'
        }, {
            strategy: 'isMoblie',
            errorMsg: '手机号码格式不正确！'
        }])

        validator.add(password, [{
            strategy: 'isNonEmpty',
            errorMsg: '密码不能为空！'
        }, {
            strategy: 'minLength:6',
            errorMsg: '密码长度不能小于 6 位！'
        }])
        let errorMsg = validator.start()
        return errorMsg
      }
      let errorMsg = validatorFunc()
      if(errorMsg) {
        Notify({ message: errorMsg, type: "warning" });
        this.message = errorMsg
        return false;
      }
      return true;
    },

    postLogin({ tel = "", password = "" }) {
      this.$request
        .post("/auth/auth", {tel, password})
        .then(data => {
          sessionStorage.setItem("access", JSON.stringify(data));
          Notify({ message: "登录成功", type: "success" });
          // this.$router.push("/personal");
          // 判断用户从什么页面登录的
          if(window.sessionStorage.getItem('personal')) {
            this.$router.push("/personal");
          } else if (this.registerForm.invitation_id) {
            this.$router.push('/')
          } else {
            this.$router.go(-1);  // 登录之后返回登陆之前的页面
          }
        }).then(() => {
          this.$nextTick(() => {
            this.getPersonalData()
          })
        })
        .catch(error => {
          Notify(error.msg);
        });
    },
    register() {
      this.registerForm.name = this.registerForm.tel.substr(7);
      
      if (!this.validatorRegister()) return;
      this.postRegister()
    },
    validatorRegister() {
      const validatorFunc = () => {
        const { tel, password, verification_code, invitation_id } = this.registerForm
        let validator = new Validator();

        validator.add(tel, [{
            strategy: 'isNonEmpty',
            errorMsg: '手机号码不能为空！'
        }, {
            strategy: 'isMoblie',
            errorMsg: '手机号码格式不正确！'
        }])

        validator.add(verification_code, [{
            strategy: 'isNonEmpty',
            errorMsg: '短信验证码不能为空！'
        }, {
            strategy: 'minLength:6',
            errorMsg: '短信验证码不能小于 6 位！'
        }])

        validator.add(password, [{
            strategy: 'isNonEmpty',
            errorMsg: '密码不能为空！'
        }, {
            strategy: 'minLength:6',
            errorMsg: '密码长度不能小于 6 位！'
        }, {
            strategy: 'maxLength:18',
            errorMsg: '密码长度不能大于 18 位！'
        }])

        validator.add(invitation_id, [{
            strategy: 'isNonEmpty',
            errorMsg: '邀请码不能为空！'
        }, {
            strategy: 'minLength:4',
            errorMsg: '邀请码不能小于 4 位！'
        }])
        let errorMsg = validator.start()
        return errorMsg
      }
      let errorMsg = validatorFunc()
      if(errorMsg) {
        Notify({ message: errorMsg, type: "warning" });
        return false;
      }
      return true;
    },

    postRegister() {
      const params = Object.assign({}, this.registerForm);
      this.$request
        .post("/register", params)
        .then(() => {
          Notify({ message: "注册成功, 请登录", type: "success" });
        })
        .then(() => {
          const toast = Toast.loading({
            duration: 0, // 持续展示 toast
            forbidClick: true,
            message: '3 秒后自动登录，请稍后'
          });

          let second = 3;
          const timer = setInterval(() => {
            second--;
            if (second) {
              toast.message = `${second} 秒后自动登录，请稍后`;
            } else {
              clearInterval(timer);
              // 手动清除 Toast
              Toast.clear();
              const { tel, password } = this.registerForm
              this.postLogin({tel, password})
            }
          }, 1000);
        })
        .catch(err => {
          Notify(err);
        });
    },
    resetPwd() {
      if (!this.validatorReset()) return;
      this.postReset();
    },

    validatorReset() {
      const validatorFunc = () => {
        const { tel, password, verification_code } = this.reset
        let validator = new Validator();
        validator.add(tel, [{
            strategy: 'isNonEmpty',
            errorMsg: '手机号码不能为空！'
        }, {
            strategy: 'isMoblie',
            errorMsg: '手机号码格式不正确！'
        }])

        validator.add(verification_code, [{
            strategy: 'isNonEmpty',
            errorMsg: '短信验证码不能为空！'
        }, {
            strategy: 'minLength:6',
            errorMsg: '短信验证码不能小于 6 位！'
        }])

        validator.add(password, [{
            strategy: 'isNonEmpty',
            errorMsg: '密码不能为空！'
        }, {
            strategy: 'minLength:6',
            errorMsg: '密码长度不能小于 6 位！'
        }])
        let errorMsg = validator.start()
        return errorMsg
      }
      let errorMsg = validatorFunc()
      if(errorMsg) {
        Notify({ message: errorMsg, type: "warning" });
        return false;
      }
      return true;
    },

    postReset() {
      this.$request
        .post("/personal/forgetPassword", this.reset)
        .then(() => {
          Notify({ message: "修改成功, 请登录", type: "success" });
        })
        .catch(err => {
          Notify(err.msg);
        });
    },

    changeType(type) {
      this.form.type = type;
      this.resetCode();
      this.validationtips();
    },
    resetCode() {
      this.ruleForm = {
        tel: "",
        password: ""
      };
      this.registerForm = {
        name: "",
        tel: "",
        verification_key: "",
        verification_code: "",
        captcha: "",
        key: "",
        invitation_id: getUrlParams().invitation_id || ""
      };
      (this.reset = {
        tel: "",
        verification_key: "",
        verification_code: "",
        captcha: "",
        key: ""
      }),
        // 重置获取验证码
        (this.codeTips.msg = "发送验证码");
      this.codeTips.count = 0;
    },
    /* 打开图形验证码 */
    openImgCode(formName) {
      if (this.codeTips.count > 0) return;
      const { tel, } = this[formName];
      if (!tel || tel.length !== 11) {
        Notify("请填写正确的手机号码");
        return;
      }

      if (this.to_send_sms[formName]) {
        return;
      }
      this.getVerificationCode();
      this.to_send_sms[formName] = true;
    },
    cancelSend(formName) {
      this.to_send_sms[formName] = false;
      this[formName].captcha = "";
    },
    confirmSend(formName) {
      this.getCode(formName);
    },
    /* 短信验证码 */
    getCode(formName) {
      const { tel, captcha, key } = this[formName];
      if (!tel || tel.length !== 11) {
        Notify("请填写正确的手机号码");
        return;
      }
      if (captcha == "") {
        Notify("请输入图形验证码");
        return;
      }
      if (this.codeTips.count > 0) return;
      this.codeTips.count = 59;
      let timer = setInterval(() => {
        this.codeTips.msg = `${this.codeTips.count--}s重新获取`;
        if (this.codeTips.count <= 0) {
          clearInterval(timer);
          this.codeTips.msg = "重新获取";
        }
      }, 1000);
      tel &&
        this.$request
          .post(
            `/${
              formName == "registerForm" ? "getCode" : "getVerificationCode"
            }`,
            { tel, key, captcha }
          )
          .then(data => {
            Notify({ message: "发送成功", type: "success" });
            this.registerForm.verification_key = data.key;
            this.reset.verification_key = data.key;
          })
          .catch(err => {
            this.codeTips.count = 0;
            clearInterval(timer);
            Notify(err.msg);
          });
    },
    /* 图形验证码 */
    getVerificationCode() {
      this.verification.is_tap = true;
      this.$request("/verificationCode")
        .then(data => {
          setTimeout(() => {
            this.verification.is_tap = false;
          }, 1000);
          const { img, key } = data;
          this.verification.code_img = img;
          // this.ruleForm.key = key;
          this.registerForm.key = key;
          this.reset.key = key;
        })
        .catch(err => {
          Notify(err.msg);
        });
    },

    // 积分显示
     getPersonalData() {
      this.$request.get('/personal/home').then(data => {
          // console.log(data);
          store.dispatch("INFO", data);
          sessionStorage.setItem('user data',JSON.stringify(data));
          const { fraction, icon, name, identity_auth, reason,cashCount,couponCount } = data.user;
          window.sessionStorage.setItem('user',JSON.stringify(data.user));
          const index = data.user.money.indexOf(".");
          const money = data.user.money.substring(index,0);
          // 获取 金币和积分
          const personal = {
              money,
              fraction,
              icon,
              name,
              identity_auth,
              reason,
              cashCount,
              couponCount
          }
          this.personalData = personal;
      })
    },
  }
};
</script>
<style scoped>
/* @import "pdfh5/css/pdfh5.css"; */
.pageNum {
  display: none;
}
.shuoming {
  color: #999;
  padding: 10px 0;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 30px;
  /* position: absolute; */
  font-size: 10px;
  text-align: center;
  /* left: 0;
  bottom: 0; */
}
.shuoming .file {
  color: #b0f566;
}
.code {
  height: 46px;
  width: 40%;
  margin-left: 10px;
  position: relative;
}
.code .img {
  height: 100%;
}
.code .refresh {
  width: 46px;
  height: 46px;
  position: absolute;
  top: 0;
  left: 100%;
  margin-left: 8px;
}
.code .refresh .start {
  -webkit-transform: rotate(360deg);
  transform: rotate(360deg);
  -webkit-transition: -webkit-transform 1s linear;
  transition: transform 1s linear;
}
.van-cell {
  background: transparent;
  color: #999;
  border-radius: 5px;
  border: 1px solid #fff;
}
.van-field__control {
  color: #999;
}
.van-button {
  border-radius: 20px;
  background-color: #8fcd71;
  color: #fff;
  border: none;
  width: 260px;
  /* font-size: 10px; */
}
.van-button.van-button--default.van-button--large.van-dialog__confirm {
  width: 100%;

}
.sms {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 90px;
  height: 100%;
  padding: 0;
  background: #8fcd71;
  color: #fff;
  border-radius: 4px;
  border-color: transparent;
}
</style>
<style lang="scss" scoped>
.back_home-wrap {
  position: absolute;
  left: 20px;
  top: 10px;
  .back_home {
    font-size: 20px;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    width: 1rem;
    height: 1rem;
    border: 0;
    border-radius: 100%;
    text-align: center;
    background: rgba(0, 0, 0, 0.4);
    color: #999;
    position: relative;
    &::after{
      content: '首页';
      position: absolute;
      bottom: -18px;
      left: 0;
      width: 1rem;
      text-align: center;
      font-size: 12px;
      color:#fff;
    }
  }
}
.back_login-wrap {
  position: absolute;
  right: 20px;
  top: 10px;
  .back_login {
    font-size: 20px;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    width: 1rem;
    height: 1rem;
    border: 0;
    border-radius: 100%;
    text-align: center;
    background: rgba(0, 0, 0, 0.4);
    color: #999;
    position: relative;
    &::after{
      content: '登录';
      position: absolute;
      bottom: -18px;
      left: 0;
      width: 1rem;
      text-align: center;
      font-size: 12px;
      color:#fff;
    }
  }
}
.back-wrap {
  width: 100%;
  color: #999;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-size: 11px;
  background: #fff;
  .back {
    width: 12px;
    height: 12px;
  }
  span {
    text-decoration: underline;
    color: #999;
    padding-left: 5px;
  }
}
.input {
  display: block;
  box-sizing: border-box;
  width: 100%;
  margin: 0;
  padding: 0;
  color: #999;
  text-align: left;
  background-color: transparent;
  border: 0;
  resize: none;
}
input::-webkit-input-placeholder {
  color: #999;
}
.body-wrap /deep/ .van-field__control {
  color: #999;
}
.input.tel,
.input.key,
input.nvitation_id .input.captcha {
  padding: 8px 6px;
  margin-left: 10px;
  color: #999;
  position: relative;
}
.input.captcha {
  width: 100px;
  border-bottom: 1px solid #fff;
  align-self: flex-end;
  margin-left: 0;
}
img {
  width: 100%;
  height: 100%;
}
.body-box {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  overflow: scroll;
  z-index: 999;

}
.body-wrap {
  background-color: #fff;
  background-image: url("~@/assets/img/login_bg.png");
  background-size: 100%;
  background-repeat: no-repeat;
}
.body {
  font-size: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
// .logo {
//   width: 100px;
//   height: 120px;
//   margin-top: 80px;
//   margin-bottom: 60px;
// }
.tips {
  width: 320px;
  color: #999;
  padding-bottom: 20px;
  font-size: 14px;
  span {
    &.active {
      border-bottom: 1px solid #fff;
    }
    margin-right: 10px;
  }
}
.form {
  display: flex;
  flex-direction: column;
  &.login {
    padding-top: 260px;
  }
  &.register {
    padding-top: 190px;
  }
  &.reset {
    padding-top: 260px;
  }
  .logo {
    width: 212px;
    height: 25px;
    margin: 55px auto 64px;
  }
}
.input-box {
  width: 260px;
  margin: 0 auto;
  // margin-bottom: 40px;
  position: relative;
  .icon {
    width: 16px;
    height: 16px;
    position: relative;
    &.key {
      width: 22px;
      height: 10px;
    }
    &.key::before {
      right: -6px;
      left: inherit;
      height: 16px;
      top: -4px;
    }
    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 100%;
      width: 10px;
      height: 100%;
      border-right: 1px solid #fff;
    }
  }
}
// 提示框样式
.verifymessage {
  width: 250px;
  height: 40px;
  color: red;
  overflow-x: auto;
  white-space: nowrap;
  font-size: 12px;
  opacity: 0.5;
}
.reg-captch {
  background-image: url("../assets/img/box.png");
  background-size: 100% 100%;
  border: none;
  width: 100px;
  position: relative;
  .van-cell {
    border: none;
  }
  &::before {
    content: "图形验证码";
    width: 200%;
    text-align: center;
    color: #999;
    display: block;
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
}
.input-box.reg {
  background-image: url("../assets/img/box.png");
  background-size: 100% 100%;
  .van-cell {
    border: none;
  }
  position: relative;
  &.tel,
  &.re_tel,
  &.ver_code,
  &.nvitation_id,
  &.pwd {
    &::before {
      color: #999;
      display: block;
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  &.ver_code {
    &::before {
      content: "短信验证码";
    }
  }
  &.pwd {
    &::before {
      content: "设置登录密码";
    }
  }
  &.nvitation_id {
    &::before {
      content: "邀请码";
    }
  }
  &.tel {
    &::before {
      content: "手机号码";
      color: #fff;
    }
  }
  &.re_tel {
    &::before {
      content: "手机号码";
    }
  }
}
.input-box.flex {
  display: flex;
  align-items: center;
}
.input-box.flex.line {
  border-bottom: 1px solid #e5e5e5;
  font-size: 12px;
}
.input-btn {
  margin: 0 auto;
  .login-tips {
    padding: 12px 0;
    display: flex;
    justify-content: space-between;
    color: #999;
  }
  .reg-tips {
    color: #dee0e2;
    padding: 12px 0;
    text-align: right;
    span {
      cursor: pointer;
      color: #999;
      text-decoration: underline;
      margin-left: 4px;
    }
  }
}
</style>