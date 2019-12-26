<template>
    <div>
         <van-nav-bar :title="title" left-arrow @click-left="onClickLeft">
        </van-nav-bar>
        <div class="rz-content">
            <div class="owner" v-if="title==='认证机构负责人'">
                <van-field v-model="ownerDataList.real_name" clearable input-align="right" label="真实姓名" placeholder="只能是中文或者英文" @blur="onBlur"/>
                <van-field v-model="ownerDataList.club_name" clearable input-align="right" label="机构名称" placeholder="由中文、字母、数字组成" @blur="onBlur"/>
                <van-field v-model="ownerDataList.club_tel" type="tel" clearable input-align="right" label="机构电话" placeholder="电话" @blur="onBlur"/>
                <van-field v-model="region_a" readonly input-align="right" label="机构地区" placeholder="选择省/市/区" @focus="focus"/>
                <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
                    <van-area :area-list="areaList" @confirm="onConfirm" @cancel="onCancel"/>
                </van-popup>
                <van-field v-model="ownerDataList.address" clearable input-align="right" label="详细地址" placeholder="街道门牌等" />
                <div class="upload-license">
                    <div class="license">请上传营业执照</div>
                    <div class="upload">
                        <van-uploader v-model="fileList1" :after-read="afterRead" :max-count="1"
                        :max-size="4096000" @oversize="overSize" @delete="onDel"/>
                    </div>
                </div>
            </div>
            <div class="coach" v-if="title==='认证教练'">
                <van-field v-model="coachDataList.real_name" clearable input-align="right" label="真实姓名" placeholder="只能是中文或者英文" @blur="onBlur"/>
                <van-field v-model="coachDataList.club_name" clearable input-align="right" label="机构名称" placeholder="由中文、字母、数字组成" @blur="onBlur"/>
                <van-field v-model="coachDataList.club_tel" type="tel" clearable input-align="right" label="机构电话" placeholder="电话" @blur="onBlur"/>
                <van-field v-model="region_b" readonly input-align="right" label="机构地区" placeholder="选择省/市/区" @focus="focus"/>
                <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
                    <van-area :area-list="areaList" @confirm="onConfirm" @cancel="onCancel"/>
                </van-popup>
                <van-field v-model="coachDataList.address" clearable input-align="right" label="详细地址" placeholder="街道门牌等" />
                <div class="upload-license">
                    <div class="license">请上传瑜伽毕业证书</div>
                    <div class="upload">
                        <van-uploader v-model="fileList2" :after-read="afterRead" :max-count="1"
                        :max-size="4096000" @oversize="overSize" @delete="onDel"/>
                    </div>
                </div>
            </div>
            <div class="owner-coach" v-if="title==='认证导师'">
                <van-field v-model="ownerAndCoachList.real_name" clearable input-align="right" label="真实姓名" placeholder="只能是中文或者英文" @blur="onBlur"/>
                <van-field v-model="ownerAndCoachList.club_name" clearable input-align="right" label="机构名称" placeholder="由中文、字母、数字组成" @blur="onBlur"/>
                <van-field v-model="ownerAndCoachList.club_tel" type="tel" clearable input-align="right" label="机构电话" placeholder="电话" @blur="onBlur"/>
                <van-field v-model="region_c" readonly input-align="right" label="机构地区" placeholder="选择省/市/区" @focus="focus"/>
                <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
                    <van-area :area-list="areaList" @confirm="onConfirm" @cancel="onCancel"/>
                </van-popup>
                <van-field v-model="ownerAndCoachList.address" clearable input-align="right" label="详细地址" placeholder="街道门牌等" />
                <div class="upload-license">
                    <div class="license">请上传您的证书</div>
                    <div class="upload">
                        <van-uploader v-model="fileList3" :after-read="afterRead" :max-count="1" multiple
                        :max-size="4096000" @oversize="overSize" @delete="onDel"/>
                    </div>
                </div>
                <van-field class="textarea" v-model="ownerAndCoachList.supplement" rows="3" 
                autosize label="补充说明" type="textarea" maxlength="200" placeholder="（必填）不能超过200字" show-word-limit/>
            </div>
        </div>

        <div v-show="isshowFileWrap">
          <van-dialog v-model="isshowFile" title="瑜伽村平台认证服务协议">
            <div style="height:400px;overflow: scroll;">
                <div id="pdf" style="padding: 0 20px;" v-html="editor_html"></div>
            </div>
          </van-dialog>
        </div>
        <div class="bottom-box">
            <van-button class="submit" :disabled="isDisabled" @click="submit()">
            {{isDisabled ? '您已提交认证，不能再次认证...' : '提交认证'}}
            </van-button>
            <div class="agreement">
                <van-checkbox v-model="checked" checked-color="#8FCD71"></van-checkbox>
                <div>
                    <span class="agreed">同意</span>
                    <span @click="showFile">《瑜伽村平台认证服务协议》</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import areaList from "../../assets/js/area.js";
import lrz from 'lrz';
const editor_html =`
    <p>
			</p><p>
				</p><p>
					</p><p>
						</p><h1 style="font-size: 32px; font-weight: bold; border-bottom: 2px solid rgb(204, 204, 204); padding: 0px 4px 0px 0px; text-align: center; margin: 0px 0px 20px;"><strong><span style="font-size: 14.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">瑜伽村平台认证服务协议</span></strong></h1><p><br/></p><p>
						</p><p><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">【首部及导言】<br/>欢迎你使用瑜伽村平台!</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; font-weight: 700; color: rgb(20.784314%, 20.784314%, 20.784314%)">为使用瑜伽村平台认证服务(以下简称“本服务”)，你应当阅读并遵守《瑜伽村平台认证服务协议》(以下简称“本协议”)，以及</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; font-weight: 700; color: rgb(34.117648%, 41.960785%, 58.431375%)">《瑜伽村使用协议》</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; font-weight: 700; color: rgb(20.784314%, 20.784314%, 20.784314%)">、</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; font-weight: 700; color: rgb(34.117648%, 41.960785%, 58.431375%)">《瑜伽村隐私政策》</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; font-weight: 700; color: rgb(20.784314%, 20.784314%, 20.784314%)">以及专项规则等。
请你务必审慎阅读、充分理解各条款内容，特别是免除或限制责任的相应条款，以及开通或使用某项服务的单独协议，并选择接受或不接受。限制、免责条款可能以加粗形式提示你注意。
除非你已阅读并接受本协议所有条款，否则你无权使用瑜伽村平台服务。你对本服务的登录、查看、发布信息等行为即视为你已阅读并同意本协议的约束。<br/>如果你未满 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; font-weight: 700; color: rgb(20.784314%, 20.784314%, 20.784314%)">18 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; font-weight: 700; color: rgb(20.784314%, 20.784314%, 20.784314%)">周岁，请在法定监护人的陪同下阅读本协议，并特别注意未成年人使用条款。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">一、【协议的范围】<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; font-weight: 700; color: rgb(20.784314%, 20.784314%, 20.784314%)">1.1</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; font-weight: 700; color: rgb(20.784314%, 20.784314%, 20.784314%)">【协议适用主体范围】<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">本协议是你与上海一伽健身服务有限公司</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">(</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">及其相关服务可能存在的运营关联单位</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">)</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">之间关于你使用瑜伽村平台认证服务所订立的协议。 “用户”是指申请瑜伽村平台认证服务及</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">/</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">或已经认证成
功的瑜伽村帐号用户，在本协议中更多地称为“你”。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; font-weight: 700; color: rgb(20.784314%, 20.784314%, 20.784314%)">1.2</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; font-weight: 700; color: rgb(20.784314%, 20.784314%, 20.784314%)">【协议关系及冲突条款】</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">本协议被视为</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; font-weight: 700; color: rgb(34.117648%, 41.960785%, 58.431375%)">《瑜伽村使用协议》</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; font-weight: 700; color: rgb(20.784314%, 20.784314%, 20.784314%)">、</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; font-weight: 700; color: rgb(34.117648%, 41.960785%, 58.431375%)">《瑜伽村隐私政策》</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">的补充协议，是其不可分割的组成部分，与其构成统一整体。本协议与上述内容存在冲突的，以本协议为准。</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; font-weight: 700; color: rgb(20.784314%, 20.784314%, 20.784314%)">本协议内容同时包括瑜伽村平台可能不断发布的关于本服务的相关协议、服务声明、业务规则及公告指引等内容(以下统称为“专项规则”)。上述内容一经正式发布，即为本协议不可分割的
组成部分，你同样应当遵守。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">二、【术语定义】<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">2.1 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">瑜伽村平台认证服务:是指符合一定条件的用户可以对瑜伽村帐号申请瑜伽村平台认证。瑜伽村平台根据用户的申请及其提交的资料和信息，自行或者委托第三方审核机构进行审核，并
根据审核情况确定认证结果和认证信息的服务。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">2.2 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">认证审核:指用户向瑜伽村平台提出申请，瑜伽村平台根据法律规定及双方的约定和保证，基于用户提交的资料和信息，对用户的瑜伽村帐号进行帐号资质审核。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">2.2.1 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">帐号资质审核:指用户向瑜伽村平台提出申请，瑜伽村平台根据法律规定及双方的约定和保证，对用户提交的主体资质证明或其所拥有的权利证明资料和信息进行甄别及核实的过程。</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">2.3 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">第三方审核机构:指瑜伽村平台委托对用户进行认证审核的第三方机构。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">2.4 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">订单:指用户向瑜伽村平台发起的本服务申请，每发起一次申请为一个订单。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">2.5 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">新订单:指用户以获得认证成功或年审认证成功的审核结果为目的发起的本服务申请，在新订单的审核过程中，用户自发补充或者根据瑜伽村平台及</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">/</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">或瑜伽村平台委托第三方审核机构
的要求所补充的资料作为同一订单的审核范围。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">2.6 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">补充订单:指用户认证成功后，申请变更、修改用户信息所产生的订单</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">,</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">在补充订单审核过程中，用户自发补充或者根据瑜伽村平台及</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">/</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">或瑜伽村平台委托第三方审核机构的要求所补充的
资料同样作为同一订单的审核范围。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">2.7 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">认证结果:是指瑜伽村平台及其委托的第三方审核机构按照用户的申请进行认证审核后，瑜伽村平台向用户输出的认证结果，认证结果分为认证馆主审核结果、教练审核结果及认证馆主</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">+</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">教练三部分，每一部分的认证结果只包括成功和失败两种情形。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">2.7.1 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">认证馆主审核结果:指瑜伽村平台及其委托的第三方审核机构根据用户的申请，基于用户提交的资料和信息，对用户进行帐号资质审核后，瑜伽村平台向用户输出的结果。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">2.7.2 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">认证教练审核结果:指瑜伽村平台及其委托的第三方审核机构根据用户的申请，对用户进行帐号名称审核后，瑜伽村平台向用户输出的结果。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">2.7.3 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">认证馆主</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">+</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">教练审核结果:指瑜伽村平台及其委托的第三方审核机构根据用户的申请，对用户进行帐号名称审核后，瑜伽村平台向用户输出的结果。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">2.8 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">认证成功:指瑜伽村平台自行或委托第三方审核机构对用户提交的资料和信息进行甄别及核实，在完成所有审核流程后，由瑜伽村平台作出认证成功的判断。针对认证成功的用户，瑜伽
村平台将根据本协议确定用户的认证帐号名称，生成认证标识及认证信息。认证成功可获得申请开通相应的高级功能及高级权限的资格，但具体开通范围、标准等事宜，由瑜伽村平台制定和
执行。未按期完成年审认证或者年审认证失败的用户不属于认证成功用户。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">2.8.1 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">认证馆主审核成功:指瑜伽村平台自行或委托第三方审核机构对用户提交的资料和信息进行甄别及核实，在完成帐号资质审核流程后，由瑜伽村平台作出帐号资质审核成功的判断。资
质审核成功帐号仅具备申请瑜伽村平台开通高级功能的资格，但在用户帐号名称审核成功之前，该帐号不属于认证成功帐号，不会生成认证标识及认证信息，也不会具备申请开通高级权限的
资格。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">2.8.2 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">认证教练审核成功:指瑜伽村平台自行或委托第三方审核机构对用户提交的资料进行甄别及核实，在完成帐号名称审核流程后，由瑜伽村平台作出帐号名称审核成功的判断。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">2.8.3 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">认证馆主</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">+</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">教练审核成功:指瑜伽村平台自行或委托第三方审核机构对用户提交的资料进行甄别及核实，在完成帐号名称审核流程后，由瑜伽村平台作出帐号名称审核成功的判断。</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">2.9 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">系统通知用户调整申请内容:指用户在申请认证过程中，因不满足认证成功条件，而被瑜伽村平台以系统通知的方式要求作调整或补充的情形。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">2.10 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">认证失败:指瑜伽村平台直接或委托第三方审核机构对用户的资料进行甄别及核实，在完成所有审核流程后，由瑜伽村平台作出认证失败判断，包括但不限于以下任一情形:<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">2.10.1 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">由于用户原因，经瑜伽村平台系统通知用户调整申请内容，用户仍未能满足帐号资质审核及帐号名称审核要求的;<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">2.10.2 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">因其他原因而不能认证成功的情形。</span></p><p>
					</p><p>
				</p><p>
			</p><p>
		</p><p>
		</p><p>
			</p><p>
				</p><p>
					</p><p>
						</p><p><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">2.11 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">审核服务费用:指瑜伽村平台根据用户的申请对用户所提交的资料和信息进行认证审核而产生的费用。<br/>三、【用户的权利义务】<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">3.1 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">用户应保证其提供给瑜伽村平台或者第三方审核机构的所有资料和信息的真实性、合法性、准确性和有效性。如用户提供服务或内容需要取得相关法律法规规定的许可或进行备案的，用
户应当主动进行明确说明并提交相应的许可或备案证明。否则，瑜伽村平台有权拒绝或终止提供本服务，并依照本协议对违规帐号进行处罚。因此给瑜伽村平台或第三方造成损害的，你应当
依法予以赔偿。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">3.2 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">用户同意授权瑜伽村平台将其提交的资料和信息委托第三方审核机构进行甄别核实，第三方审核机构有权出于认证审核之必要查阅、使用及保存上述资料及信息，并有权受瑜伽村平台委
托以自身名义与用户就认证审核事宜进行联系与沟通，用户应当配合第三方审核机构在认证审核过程中所提出的相关需求。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">3.3 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">用户不得通过非瑜伽村平台授权的其他任何渠道使用本服务，如非因瑜伽村平台或者第三方审核机构原因导致的认证失败、认证流程过长等后果，瑜伽村平台及第三方审核机构不承担责
任。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">3.4 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">用户理解并且同意，用户提交的资料和信息是作出认证结果的重要依据，任何资料和信息的变更将可能影响认证结果，用户应当在资料和信息变更时及时提出补充认证申请，否则瑜伽村
平台有权依照本协议约定对用户进行处罚。瑜伽村平台因此遭受损失的，你也应当一并赔偿。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">3.5 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">帐号认证审核成功后，用户具备申请为其开通高级功能的资格，但高级功能的开通范围、标准等事宜，由瑜伽村平台制定和执行，用户使用高级功能时应遵守法律、行政法规和本协议或
相关服务条款的规定，否则，瑜伽村平台有权不经通知随时视行为情节对违规用户的帐号采取包括但不限于限制、停止使用高级功能等措施。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">3.6 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">认证成功后，用户有权以认证帐号名称和认证信息所公示的身份对外运营，并通过认证标识区别于其他非认证瑜伽村帐号用户。<br/>四、【瑜伽村平台的权利义务】<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">4.1 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">保护用户信息是瑜伽村平台的一项基本原则，瑜伽村平台将会采取合理的措施保护用户所提交的一切资料及信息。除法律法规规定的情形外，未经用户许可瑜伽村平台不会向其他第三方
公开、透露上述资料及信息。用户基于申请本服务的需要，授权瑜伽村平台将其提交的资料和信息委托第三方审核机构进行甄别核实，在法律、法规或监管部门的要求下，还需将用户提交的
资料和信息递交至相关政府部门或其委托的机构进行审核、备案，在本协议许可的范围内，瑜伽村平台及第三方审核机构对相关资料及信息采用专业加密存储与传输方式进行传输及使用，保
障用户的信息安全。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">4.2 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">为依法保障瑜伽村平台认证服务的规范有序，瑜伽村平台有权根据相关法律法规的规定及行业标准，针对用户的不同认证需求制定不同的认证审核标准及要求，并有权在必要时对相关标
准及要求进行修改。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">4.3 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">瑜伽村平台有权根据用户提交的资料及信息，并结合第三方审核机构甄别核实的情况独立判断，分别确定审核结果，并根据审核情况分阶段确定帐号资质审核结果以及用户的认证帐号名
称，生成认证标识及认证信息，对符合瑜伽村平台所制定的范围和标准等的瑜伽村帐号，准予其提交的开通相应的高级功能或高级权限的申请。<br/>五、【审核服务费用】<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">5.1 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">用户理解并同意，用户申请瑜伽村平台认证服务需要向瑜伽村平台支付审核服务费用，每项订单收取一次费用，申请瑜伽村平台认证服务因类别不同分为新订单与补充订单，具体费用标
准以认证申请页面公示为准。用户在帐号资质审核成功后发起的 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">3 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">次补充订单免收审核服务费用。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">5.2 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">用户理解并且同意，审核服务费用是基于瑜伽村平台提供的认证审核服务而支付的一次性费用，用户每申请一次认证服务均应向瑜伽村平台支付一次审核服务费，相关费用不以认证成功
为前提，且不受任何一种审核结果的任何情形及认证状态的影响。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">5.3 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">用户付款后，瑜伽村平台将根据用户提交的发票信息向用户开具等额合法有效发票，用户应保证其提交的发票信息真实、准确及有效，否则因此导致的损失由用户自行承担。
六、【认证服务规范】<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; font-weight: 700; color: rgb(20.784314%, 20.784314%, 20.784314%)">6.1 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; font-weight: 700; color: rgb(20.784314%, 20.784314%, 20.784314%)">【认证流程】<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">6.1.1 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">用户申请本服务需要登录申请页面按照瑜伽村平台提示提交有关资料及信息。你在申请本服务时应仔细阅读并同意本协议，你对本服务的接受、购买、提交资料和信息、付款等行为即
视为你已阅读并同意受本协议的约束。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">6.1.2 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">用户在完成在线申请及资料提交流程，并完成审核费用支付后，瑜伽村平台会在 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">15 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">个工作日内展开认证审核工作，用户应积极配合瑜伽村平台及第三方审核公司的审核需求，并有权
随时了解、查询审核进度。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">6.1.3 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">用户同意瑜伽村平台可自行委托第三方审核机构对其提交的资料和信息进行甄别核实，并在完成所有审核流程后，由瑜伽村平台独立作出认证成功或者认证失败的判断，并以前述判断
为依据确定用户的认证帐号名称，生成认证标识及认证信息，是否具备申请开通相应的高级功能及高级权限的资格等，用户应当予以配合。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">6.1.4 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">审核完成后，瑜伽村平台将反馈以下审核结果:<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">6.1.4.1 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">帐号认证成功，用户获得向瑜伽村平台申请开通高级功能的资格;<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">6.1.4.2 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">帐号认证成功，瑜伽村平台将作出认证成功的判断，生成认证标识及认证信息，获得申请开通相应的高级功能及高级权限的资格;<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">6.1.4.3 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">认证失败，瑜伽村平台将告知用户认证失败的原因。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; font-weight: 700; color: rgb(20.784314%, 20.784314%, 20.784314%)">6.1.5 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; font-weight: 700; color: rgb(20.784314%, 20.784314%, 20.784314%)">审核成功用户应根据以下条款申请年审认证:用户帐号认证成功后帐号认证成功状态将会被保留一年(起算日为帐号认证成功日)。用户如需持续保留认证成功状态，保持所具备的申
请、继续使用高级功能的资格，则应自帐号认证成功之日起一年内发起并完成年审认证，年审认证流程及认证审核标准与原认证审核一致。如用户未能及时完成年审认证或者认证审核失败，
其帐号认证成功状态终止，已经开通的高级功能、高级权限使用权将被取消，申请开通高级功能、高级权限的资格也将被取消。</span></p><p>
					</p><p>
				</p><p>
			</p><p>
		</p><p>
		</p><p>
			</p><p>
				</p><p>
					</p><p>
						</p><p><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; font-weight: 700; color: rgb(20.784314%, 20.784314%, 20.784314%)">。</span></p><p>
					</p><p>
				</p><p>
				</p><p>
					</p><p>
						</p><p><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">6.1.6 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">用户向瑜伽村平台第三方审核机构提供的资料和信息如有变更的，应当及时采取以下措施:<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">6.1.6.1 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">如处于认证审核过程中的资料和信息发生变更，用户应立即通知瑜伽村平台或负责审核订单的第三方审核机构更新有关资料及信息;<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">6.1.6.2 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">如认证成功后资料和信息发生变更，用户应及时申请补充订单变更有关资料及信息;<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">6.1.6.3 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">如认证成功后瑜伽村平台发现资料和信息存在错误，用户应及时申请补充订单更正有关资料及信息。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; font-weight: 700; color: rgb(20.784314%, 20.784314%, 20.784314%)">6.2 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; font-weight: 700; color: rgb(20.784314%, 20.784314%, 20.784314%)">【认证规则】<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">6.2.1 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">用户理解并同意:瑜伽村平台认证服务内容仅限于对用户提交的资料及信息进行甄别与核实，瑜伽村平台将对前述资料及信息进行合理、谨慎的形式审查，但在瑜伽村平台的合法权限
和合理能力范围内，瑜伽村平台无法实质审查用户的实际经营、运营以及推广等行为，并不为此提供任何担保。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">6.2.2 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">瑜伽村平台有权自行或委托第三方审核机构甄别核实包括但不限于以下内容:<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">6.2.2.1 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">用户是否拥有合法主体资质，以及是否取得提供服务或内容相应的权利或授权;<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">6.2.2.2 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">帐号运营者主体身份，以及是否经过用户明确授权;<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">6.2.2.3 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">其他瑜伽村平台或第三方审核机构认为需要审核的内容。用户应就上述内容提供相应的证明文件予以证明并承担真实性、合法性、准确性的瑕疵担保责任。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">6.3 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">认证帐号名称应当遵守瑜伽村平台为此制定的命名规则。瑜伽村平台有权根据命名规则审核用户提交的认证帐号名称申请，并提供建议名称。如用户申请名称不能符合命名规则要求的，
瑜伽村平台有权以建议名称作为用户认证帐号名称。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">6.4 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">认证信息内容由瑜伽村平台根据审核情况进行确定，并在认证帐号名称审核成功后生成，主要包括用户主体资质和权利等可有效证明的信息。瑜伽村平台有权根据平台规范运营的需要调
整认证信息的内容及格式。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">6.5 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">为保障瑜伽村平台安全运营及瑜伽村平台其他用户的合法权益，若瑜伽村平台发现或经他人举报用户的帐号存在任何违反法律法规、</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(34.117648%, 41.960785%, 58.431375%)">《瑜伽村平台服务协议》</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">及本协议等各项规范规则的
情况，或瑜伽村平台认为或经第三方通知用户的帐号存在或可能存在上述情况，不管该帐号是否已经认证成功，瑜伽村平台均有权采取拒绝提供年审认证服务等方式停止为该用户提供本服
务。<br/>七、【法律责任】<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; font-weight: 700; color: rgb(20.784314%, 20.784314%, 20.784314%)">7.1 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; font-weight: 700; color: rgb(20.784314%, 20.784314%, 20.784314%)">如果瑜伽村平台或收到他人投诉用户违反法律法规、</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; font-weight: 700; color: rgb(34.117648%, 41.960785%, 58.431375%)">《瑜伽村平台服务协议》</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; font-weight: 700; color: rgb(20.784314%, 20.784314%, 20.784314%)">或本协议约定的，瑜伽村平台知随时视行为情节对违规用户的帐号处以包括但不限于拒绝提供本服务、终止
本服务资质审核、责令用户补充资质审查资料、责令用户修改认证信息、责令用户再次申请认证、强制修改帐号名称及认证信息直至取消认证等措施。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">7.2 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">用户理解并同意，因用户违反本协议或相关服务条款的规定，导致或产生第三方主张的任何索赔、要求或损失，用户应当独立承担责任;瑜伽村平台遭受损失的，用户也应当一并赔偿。</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">7.3 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">申请人同意:在帐号认证审核成功之后，申请人帐号的使用权属于通过认证的申请人，该帐号自注册时其产生的一切权利义务均由该主体承担，该帐号所获得的所有收益、权限均归认证
后的主体享有，且所有运营活动都必须以该主体对外开展<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">7.4 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">申请人承诺:提交给瑜伽村平台的认证资料真实无误，并不可撤销地授权瑜伽村平台及其委托的任何第三方审核机构对提交的资料进行甄别核实，申请人理解并同意，一经申请即产生瑜
伽村平台及其委托的第三方审核机构的审核成本，故所交纳的认证审核服务费用将不因认证结果、申请人是否提出撤回申请等因素而退回。同时，帐号内容维护、开发维护及运营管理遵守国
家法律法规、政策及《瑜伽村使用协议》、《瑜伽村认证服务协议》、《瑜伽村隐私政策》的相关规定。如违反上述承诺，责任自行承担;<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">7.5 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">申请人清楚知悉并同意，本认证服务仅对该帐号所提交的认证资料的真实性、合法性进行书面甄别核实，其功能、权限是否开通、帐号能否发布等均需遵守对应业务平台为此所制定的专
项规则，而不与认证审核结果存在直接关联。<br/>八、【其他】<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; font-weight: 700; color: rgb(20.784314%, 20.784314%, 20.784314%)">8.1 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; font-weight: 700; color: rgb(20.784314%, 20.784314%, 20.784314%)">你使用本服务即视为你已阅读并同意受本协议的约束。瑜伽村平台有权在必要时修改本协议条款。你可以在相关服务页面查阅最新版本的条款。本协议条款变更后，如果你继续使用瑜伽
村平台认证服务，即视为你已接受修改后的协议。如果你不接受修改后的协议，应当停止使用瑜伽村平台认证服务。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">8.2 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">本协议签订地为中华人民共和国上海市长宁区<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">8.3 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">本协议的成立、生效、履行、解释及纠纷解决，适用中华人民共和国大陆地区法律(不包括冲突法)。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">8.4 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">若你和瑜伽村平台发生任何纠纷或争议，首先应友好协商解决;协商不成的，你同意将纠纷或争议提交本协议签订地有管辖权的人民法院管辖。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">8.5 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">本协议所有条款的标题仅为阅读方便，本身并无实际涵义，不能作为本协议涵义解释的依据。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">8.6 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">本协议条款无论因何种原因部分无效或不可执行，其余条款仍有效，对双方具有约束力。<br/></span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">8.7 </span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">你在使用本服务过程中，如发现相关内容存在违反相关法律法规或者侵犯了你的权利，请及时向我们</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(34.117648%, 41.960785%, 58.431375%)">举报或反馈</span><span style="font-size: 5.000000pt; font-family: &#39;MicrosoftYaHeiUI&#39;; color: rgb(20.784314%, 20.784314%, 20.784314%)">，我们将依法处理。</span></p><p>
					</p><p>
				</p><p>
			</p><p>
		</p><p><br/></p>`
export default {
    data() {
        return {
            title: '',
            editor_html,
            areaList,
            show: false,
            fileList1: [],
            fileList2: [],
            fileList3: [],
            checked: true,
            // 是否显示 协议 pdf
            isshowFileWrap: false,
            isshowFile: true,
            pdfh5: null,
            // 认证馆主需要提交的 数据列表
            ownerDataList: {
                identity_auth: '',
                real_name:'',
                club_name: '',
                club_tel: '',
                province: '',
                city: '',
                area: '',
                address: '',
                img_work: '',
                img_license: ''
            },
            coachDataList: {
                identity_auth: '',
                real_name:'',
                club_name: '',
                club_tel: '',
                province: '',
                city: '',
                area: '',
                address: '',
                img_work: '',
                img_license: ''
            },
            ownerAndCoachList: {
                identity_auth: '',
                real_name:'',
                club_name: '',
                club_tel: '',
                province: '',
                city: '',
                area: '',
                address: '',
                img_work: '',
                img_license: '',
                supplement: ''
            },
            // 渲染地区数据
            region_a: '',
            region_b: '',
            region_c: '',
            // slide的索引
            slideIndex: '',
            // 多选图片时，图片名保存的数组
            picNameArr: [],
            // 提交按钮的状态
            isDisabled: false
        }
    },
    created() {
        const status = JSON.parse(window.sessionStorage.getItem('user')).identity_auth
        if(status !== '未认证') {
            this.isDisabled = true
        }
        const key = this.$route.query.key;
        if(key === 'principal') {
            this.title = '认证机构负责人'
        } else if(key === 'coach') {
            this.title = '认证教练'
        } else {
            this.title = '认证导师'
        }
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        // 输入款失去焦点时，校验
        onBlur() {
            const name = /^([\u4e00-\u9fa5]{2,16}|[\u4E00-\u9FA5\·]{2,16}|[a-zA-Z.·\s]{2,16})$/;
            const hallName =  /^[\u4e00-\u9fa5a-zA-Z0-9]{2,16}$/;
            const tel = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
            if(this.title==='认证机构负责人') {
                this.validationRules(this.ownerDataList, name, hallName, tel);
            } else if(this.title==='认证教练') {
                this.validationRules(this.coachDataList, name, hallName, tel);
            } else {
                this.validationRules(this.ownerAndCoachList, name, hallName, tel);
            }
        },
        // 验证规则
        validationRules(identity,name,hallName,tel) {
            if(identity.real_name) {
                if(!name.test(identity.real_name)) {
                    this.$toast({
                        message: '姓名格式输入错误！，长度为2~16位',
                    });
                }
            }
            if(identity.club_name) {
                if(!hallName.test(identity.club_name)) {
                    this.$toast({
                        message: '会馆名称格式错误！长度为2~16位',
                    });
                }
            }
            if(identity.club_tel) {
                if(!tel.test(identity.club_tel)) {
                    this.$toast({
                        message: '电话号码输入错误！',
                    });
                }
            }
        },
        focus() {
            this.show = true;
        },
        // 点解确认，处理地区的显示
        onConfirm(area) {
            if(this.title==='认证机构负责人') {
                this.region_a = this.showArea(this.region_a, this.ownerDataList, area);   
            } else if(this.title==='认证教练') {
                this.region_b = this.showArea(this.region_b, this.coachDataList, area); 
            } else {
                this.region_c = this.showArea(this.region_c, this.ownerAndCoachList, area);
            }
            this.show = false;
        },
        // 渲染地区
        showArea(provinces, identity, area) {
            if(area[0].name === area[1].name) {
                provinces = area[0].name + '/' + area[2].name;
            } else {
                provinces = area[0].name + '/' + area[1].name + '/' + area[2].name;
            }
            identity.province = area[0].name;
            identity.city = area[1].name;
            identity.area = area[2].name;
            return provinces;  // 把地区数据 返回给 双向绑定的数据，不然双向绑定的数据为空
        },
        // 取消
        onCancel() {
            this.show = false;
        },
        // 图片上传之后的 回掉函数
        afterRead(fileInfo, name) {
            let that = this;
            if(fileInfo.length == 2) {
                
                lrz(fileInfo[0].file).then(rst => {
                    that.ownerAndCoachList.img_work = rst.base64;
                })
                .catch(function (err) {
                    alert(err);
                });
                lrz(fileInfo[1].file).then(rst => {
                    that.ownerAndCoachList.img_license = rst.base64;
                })
                .catch(function (err) {
                    alert(err);
                })
            } else {
                lrz(fileInfo.file).then(rst => {
                    if(that.title==='认证机构负责人') {
                        that.ownerDataList.img_work = rst.base64
                    } else if (that.title==='认证教练') {
                        that.coachDataList.img_license = rst.base64
                    } else {
                        if(that.ownerAndCoachList.img_work === '') {
                            that.ownerAndCoachList.img_work = rst.base64
                        } else {
                            that.ownerAndCoachList.img_license = rst.base64
                        } 
                    }
                })
                .catch(function (err) {
                    alert(err);
                })
            }
        },
        // 删除上传图片
        onDel(fileInfo,detail) {
            if(this.title==='认证机构负责人') {
                this.ownerDataList.img_work = ''
            } else if(this.title==='认证教练') {
                this.coachDataList.img_license = ''
            } else {
                if(detail.index == 0 && this.ownerAndCoachList.img_work !== '') {
                    this.ownerAndCoachList.img_work = '';
                } else {
                    this.ownerAndCoachList.img_license = ''
                }
            }
            
        },
        // 文件超过限制大小 
        overSize(file) {
            this.$toast({
                message: '图片大小不能超过4M',
            });
        },
        showFile() {
            this.isshowFileWrap = true
            this.isshowFile = true;
        },
        
        // 提交认证
        submit() {
            if(this.checked) {
                if(this.title==='认证机构负责人') {
                    this.ownerDataList.identity_auth = 2;
                    let status = this.formVerify(this.ownerDataList, this.fileList1);
                    if(status === -1) {
                        return
                    } else {
                        this.identityVerify(this.ownerDataList);
                    }                   
                } else if(this.title==='认证教练') {
                    this.coachDataList.identity_auth = 4;
                    let status = this.formVerify(this.coachDataList, this.fileList2);
                    if(status === -1) {
                        return
                    } else {
                        this.identityVerify(this.coachDataList);
                    }  
                } else if(this.title==='认证导师') {
                    this.ownerAndCoachList.identity_auth = 7;
                    let status = this.formVerify(this.ownerAndCoachList, this.fileList3);
                    if(status === -1) {
                        return
                    } else {
                        this.identityVerify(this.ownerAndCoachList);
                    }  
                } 
            } else {
                this.$toast({
                    message: '请阅读并勾选瑜伽村平台认证服务协议',
                });
            }
        },
        // 表单验证不为空
        formVerify(submitData, file) {
            if(submitData.real_name === '') {
                this.$toast('真实姓名不能为空！')
                return -1
            } 
            if(submitData.club_name === '') {
                this.$toast('机构名不能为空！')
                return -1
            } 
            if(submitData.club_tel === '') {
                this.$toast('机构电话不能为空！')
                return -1
            } 
            if(submitData.province === '') {
                this.$toast('请填写机构所在地区！')
                return -1
            } 
            if(submitData.address === '') {
                this.$toast('请填写机构的详细地址！')
                return -1
            } 
            if(file.length === 0) {
                this.$toast('请上传认证图片！')
                return -1
            } 
            if(this.title==='认证导师') {
                if(file.length !== 2) {
                    this.$toast('上传的图片资料至少2张！')
                    return -1
                }
            }
            if(submitData === this.ownerAndCoachList && submitData.supplement === '') {
                this.$toast('补充说明不能为空！')
                return -1
            }
        },
        // 认证
        identityVerify(submitList) {
            this.$request.post('/personal/home',submitList).then(data => {
                if(data.msg == 'OK') {
                    this.$toast('资料已上传，请耐心等候...');
                    this.isDisabled = true;
                }
            })
        }
    }
}
</script>
<style lang="scss">
.upload {
    .van-uploader__preview {
        margin-bottom: 0;
        height: 80px;
        .van-icon{
            position: absolute;
            font-size: 20px;
            vertical-align: middle;
        }
    }
}
</style>
<style lang="scss" scoped>
.van-nav-bar {
    position: fixed;
    top: 0;
}
.rz-content {
    background-color: #fff;
    margin-top: 46px;
    margin-bottom: 88px;
    .upload-license {
        .license {
            padding-left: 16px;
            margin-top: 9px;
            height: 44px;
            line-height: 44px;
            font-size: 12px;
        }
        .upload {
            padding: 13px 16px;
            /deep/ .van-uploader__upload {
                margin-bottom: 0;
            }
        }
    }
    .textarea {
        /deep/ .van-cell__title {
            flex: none;
        }
    }
} 
.bottom-box {
    position: fixed;
    bottom: 0;
    width: 100%;
}
.submit {
    width: 100%;
    height: 44px;
    line-height: 44px;
    background-color: #8FCD71;
    border: none;
    text-align: center;
    font-size: 12px;
}
.agreement {
    display: flex;
    justify-content: center;
    height: 44px;
    line-height: 44px;
    background-color: #fff;
    font-size: 12px;
    color: #619C39;
    .agreed {
        margin-left: 5px;
        color: #2c2c2c;
    }
}
</style>