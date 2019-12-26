<template>
<div>
    <div class="club_warp">
        <van-tabs title-active-color="#8FCD71" color="#8FCD71" v-model="current" line-width="70px" sticky>
            <van-tab title="培训机构">
                <div class="list_teacher">
                    <div>
                        <div class="list_banner" :style="{backgroundImage: 'url('+banner+')'}" v-if="!swiper"></div>
                        <div class="list_banner" :style="{backgroundImage: 'url('+swiper.path+')'}" v-else  @click="goAdvertising(swiper.mold, swiper.relation_id)"></div>
                    </div>

                    <div class="club_house">
                        <div class="club_house_title">
                            <span class="items" v-for="(item,index) in items" @click="clicktext(index)" :key="index" :class="{active:index==curritem}">{{item}}</span>
                                <van-dropdown-menu active-color="#7BBB62">
                                <van-dropdown-item v-model="value1" :options="option1" :title="value1?value1:'热门城市'" @change="dropdownchange"/>
                            </van-dropdown-menu>
                        </div>
                        <div class="club_house_inquiry">
                            <input type="text" class="club_house_inquiry_input" v-model="name" placeholder="输入机构名称"/>
                            <img src="../../assets/teacherclub/seek.png" class="seek" />
                            <div class="search" @click.stop="seekclick">搜索</div>
                        </div>
                    </div>
                    <van-list v-model="loading" :finished="finished" :offset="30" finished-text="没有更多了" @load="onLoad">
                    <div class="club_item_count" v-if="clubBox.length > 0">
                    <div class="club_item">
                        <div class="club_item_box" v-for="(item,index) in clubBox" :key="index" @click="clubBoxItem(item)">
                            <div class="club_item_img">
                                <img :src="item.first_img" :alt="item.club_name"/>
                            </div>
                            <div class="club_item_title">
                                <h3 class="van-ellipsis">{{item.club_name}}</h3>
                                <div class="text van-ellipsis">{{item.custom_address}}</div>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div class="Default-page4" v-else>
                        <span class="page-span4">我寻寻觅觅却找不到您的踪迹~</span>
                    </div>
                    </van-list>
                </div>
            </van-tab>
            <van-tab title="瑜伽名师" >
                <div class="list_clubhouse">
                    <div class="list_banner" :style="{backgroundImage: 'url('+banner2+')'}" v-if="!swiper"></div>
                    <div class="list_banner" :style="{backgroundImage: 'url('+swiper.path+')'}" v-else  @click="goAdvertising(swiper.mold, swiper.relation_id)"></div>
                    <div class="list_exhibition">
                        <div class="list_exhibition_page">
                            <img src="../../assets/teacherclub/yujia.png"/>
                            <span class="tips">名师精选</span>
                        </div>
                        <div class="list_exhibition_staff">Guild staff profile</div>
                    </div>
                    <div class="news-swiper"> 
                        <div class="swiper-container swiper2">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide" v-for="(item,index) in exhibitionBox2" :key="index">
                                    <div class="club_items_img" @click="exhibition(item)">
                                        <img :src="item.first_img" :alt="item.name"/>
                                    </div>
                                    <div class="club_items_title">
                                        <h3 class="van-ellipsis">{{item.name}}</h3>
                                        <div class="texts van-ellipsis">{{item.good_at}}</div>
                                        <div class="Rotation_zan">
                                        <div class="Rotation_zan_items">教龄：{{item.num}}年</div>
                                        <div class="Rotation_zan_tips" :class="item.is_prais?'thumbColor':''" @click="Giveuppraise(item.id,index,'choiceness')">
                                            <van-icon name="good-job"/> 
                                            <span class="span">{{item.praise}}</span>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="list_exhibition">
                        <div class="list_exhibition_page">
                            <img src="../../assets/teacherclub/yujia.png"/>
                            <span class="tips">瑜伽名师展</span>
                        </div>
                        <div class="list_exhibition_staff">Guild staff profile</div>
                    </div>
                    <div class="list_house">
                        <div class="list_house_title">
                            <div class="list_house_div" @click.stop="isOpen2 = true;isKey = 'city'">
                                <span class="house_title_tips">{{region ===''?'选择城市':region}}</span>
                                <img src="../../assets/teacherclub/launch.png" class="house_title_img"/>
                            </div>
                            <div class="list_house_div" @click.stop="isOpen3 = true;isKey = 'seniority'">
                                <span class="house_title_tips">{{seniority === ''?'选择资历': seniority}}</span>
                                <img src="../../assets/teacherclub/launch.png" class="house_title_img"/>
                            </div>
                            <div class="list_house_div" @click="toggle">
                                <span class="house_title_tips">{{ids === '' ? '擅长类型' : ids}}</span>
                                <van-icon name="arrow-down" class="house_title_img" v-if="launch"/>
                                <van-icon name="arrow-up" class="house_title_img" v-else/>
                            </div>
                        </div>
                    </div>
                    <div class="list_house_type" v-if="visible">
                        <div class="house_type">
                            <div class="house_type_one" @click="chooseClassify(item.name,index)" v-for="(item,index) in houseType" :key="index">
                                <span class="house_type_name" :class="{selected: isActive == index}">{{item.name}}</span>
                            </div>
                        </div>
                    </div>
                    
                    <van-list v-model="loading2" :offset="30" :finished="finished2" finished-text="没有更多了" @load="onLoad2">
                        <div class="exhibition_items" v-if="exhibitionBox.length > 0">
                        <div class="exhibition_content">
                            <div class="exhibition_box" v-for="(item,index) in exhibitionBox" :key="index">
                                <div class="exhibition_img" @click="exhibition(item)">
                                    <img :src="item.first_img" :alt="item.name"/>
                                </div>
                                <div class="exhibition_title">
                                    <h3 class="van-ellipsis">{{item.name}}</h3>
                                    <div class="texts van-ellipsis">{{item.good_at}}</div>
                                    <div class="exhibition_zan">
                                    <div class="exhibition_zan_items">教龄：{{item.num}}年</div>
                                    <div class="exhibition_zan_tips" @click="Giveuppraise(item.id,index)"
                                     :class="item.is_prais?'thumbColor':''">
                                        <van-icon name="good-job"/>
                                        <span class="span">{{item.praise}}</span>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="Default-page5" v-else>
                        <span class="page-span5">我寻寻觅觅却找不到您的踪迹~</span>
                    </div>
                    </van-list> 
                </div>
            </van-tab>
        </van-tabs>
        <!-- 资历 -->
        <van-action-sheet v-model="isOpen3" :actions="actions" @select="onSelect3" cancel-text="取消"/>
        <!-- 省市区 -->
        <van-popup v-model="isOpen2" position="bottom">
            <van-area :area-list="areaList" @confirm="changeArea" @cancel="isOpen2 = false" :columns-placeholder="['请选择', '请选择', '请选择']" />
        </van-popup>
    </div>
</div>
</template>
<script>
/* eslint-disable */
import areaList from "../../assets/js/area";
import Vue from 'vue';
import { mapGetters } from "vuex";
import { goAdvertingApi } from '@/api/main'
import Swiper from 'swiper';
import { Notify, Toast, Swipe, SwipeItem } from "vant";
Vue.use(Notify).use(Toast).use(Swipe).use(SwipeItem);
export default {
    data() {
        return {
            isOpen: false,
            isOpen2: false,
            isOpen3:false,
            launch:true,
            current:0,
            curritem:0,
            banner:'',
            // 上拉加载的状态
            finished: false,
            loading: false,
            finished2: false,
            loading2: false,

            visible:false,
            banner2:'',
            isActive: 0,
            value1:'',
            option1: [
                { text: '北京', value: '北京' },
                { text: '上海', value: '上海' },
                { text: '深圳', value: '深圳' },
                { text: '成都', value: '成都' },
                { text: '武汉', value: '武汉' },
                { text: '厦门', value: '厦门' },
                { text: '天津', value: '天津' },
                { text: '广州', value: '广州' },
                { text: '重庆', value: '重庆' },
                { text: '长沙', value: '长沙' },
                { text: '南京', value: '南京' },
                { text: '杭州', value: '杭州' },
            ],
            name:"",
            // 传入的资历参数
            num:"",
            record:"",
            // 显示资历
            seniority: '',
            items:["全部"],
            clubBox:[],
            value:"",
            ids:"",
            areaList,
            actions:[
                { name: '不限'},
                { name: '0-5' },
                { name: '5-10' },
                { name: '10-15' },
                { name: '15-20' },
                { name: '20-30' },
                { name: '30-40' },
                { name: '40以上' },
            ],
            houseType:[],
            exhibitionBox:[],
            exhibitionBox2:[],
            province:"",
            city:"",
            area:"",
            // 选择的城市
            region: '',
            current_page:1,
            last_page: 2,
            total:'',
            current_page2:1,
            last_page2: 2,
            total2:'',
            id:0,
            id2:0,
            routecurrent:'',
            isupdate: false,
            isKey: '',
            swiper: '', // 广告位1
        };
  },
   computed: {
    ...mapGetters(["info", "isUserNeedLogin"]),
  },
  created(){
      this.joindata();
      this.getAdvertising()
  },
  watch:{
      '$route'(to,from){
          this.routecurrent = this.$route.query.current;
      }
  },
  mounted() {
    if (this.isUserNeedLogin) {
      this.choiceness();
      this.onLoadlist2();
    } else {
      this.getChoicenessPrais()
      this.getTeachersPrais()
      
    }
    const { current } = this.$route.query;
    if (typeof current != 'undefined') {
      this.current = parseInt(current)
    }
  },
  methods:{
      // 广告位
    goAdvertising (mold, relation_id) {
        // goAdvertingApi(mold, relation_id)
      if(mold === 2) { this.$router.push(`/teacherClub/clubhouseDetails?id=${relation_id}`) }
      else if(mold === 3) {this.$router.push(`teacherClub/teacherDetails?id=${relation_id}`)}
      else if(mold === 4) { this.$router.push(`/messagedetail/${relation_id}`) }
      // else if(mold === 5) { this.$router.push(`/goods/detail/${relation_id}`) }
      else if(mold === 6) { this.$router.push(`/yogamessage/list`) }
      // else if(mold === 7) { 商品分类 }
      else if(mold === 1) { this.$router.push('/advertisement') }
    },
    getAdvertising () {
      return this.$request.get('/advertisement/data/' + 3).then((res) => {
      var reswiper = res.filter(((item) => item.position === 0))[0]
      this.swiper = reswiper? reswiper.advertisement[0] :''
      })
    },
      swiperInit() {
          new Swiper('.swiper-container', {
                slidesPerView: 'auto',
                freeMode: true,
                observer: true,
                observeParents: true
            });
      },
      //机构列表
      joindata(){
        this.$request.get(`/clubs?page=${this.current_page}`).then(res => {
            this.clubBox = res.data.data;
            this.banner = res.banner;
            this.current_page = res.data.current_page;
            this.last_page = res.data.last_page;
            this.total = res.data.total;
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
      //机构
      onLoadlist(){
          this.$request.get(`/clubs?page=${this.current_page}`).then(res => {
             const info = res.data.data;
            info.forEach(item => {
                this.clubBox.push(item);
            });
            this.total = res.data.total;
        })
      },
      // 名师列表
      onLoadlist2(){
          this.$request.get(`/teachers?page=${this.current_page2}`).then(res => {
            this.banner2 = res.banner
            this.houseType = res.course_types;
            const info2 = res.teachers.data;
            info2.forEach(item => {
                this.exhibitionBox.push(item);
            });
            this.total2 = res.teachers.total;
        })
      },
      //热门城市
      dropdownchange(){
          this.name = ''
          this.current_page = 1
          this.clubBox = []
          this.postHotCity()
          
      },
      postHotCity() {
        let params = {
            hot: this.value1
        }
        this.$request.post(`/clubs/search/hot/club?page=${this.current_page}`,params).then(res => {
             res.data.map((item) => {
                 this.clubBox.push(item)
            })
            this.current_page = res.current_page;
            this.last_page = res.last_page;
            this.total = res.total;
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
      //机构
      onLoad() {
        setTimeout(() => {
            this.current_page++;
            if(this.value1) this.postHotCity()
            else if(this.name) {this.postGuildList()}
            else {this.onLoadlist(this.current_page)}
            this.loading = false;
            // 数据全部加载完成
            if (this.clubBox.length >= this.total) {
                this.finished = true;
            }
          
        }, 500);
    },   
    onLoad2() {
        setTimeout(() => {
            this.current_page2++;
            this.loading2 = false;
            // 数据全部加载完成
            if (this.exhibitionBox.length >= this.total2) return this.finished2 = true;
            if(this.isKey === '') {
                if (this.isUserNeedLogin) {
                    this.onLoadlist2(this.current_page2);
                } else {
                    this.getTeachersPrais(this.current_page2)
                }
            } else {
                if(this.isUserNeedLogin) {
                    this.postTeachers(this.current_page2);
                } else {
                    this.postTeachersLogin(this.current_page2);
                }
            }
        }, 500);
    },
    // 登录之后的名师列表
    getTeachersPrais(page = 1) {
      this.$request.get(`/teachers/list/prais?page=${page}`)
      .then(res => {
        if(page == 1) {
          this.exhibitionBox = res.teachers.data;
          this.houseType = res.course_types;
          this.banner2 = res.banner;
          this.current_page2 = res.teachers.current_page;
          this.last_page2 = res.teachers.last_page;
          this.total2 = res.teachers.total;
        } else {
          const info2 = res.teachers.data;
            info2.forEach(item => {
                this.exhibitionBox.push(item);
            });
            this.total2 = res.teachers.total;
        }
      })
    },
    // 登录之后的点赞
    getChoicenessPrais() {
        this.$request.get(`/teachers/elites/prais`).then(res => {
          this.exhibitionBox2 = res;
          this.$nextTick(function() {
              this.swiperInit();
          })
        })
    },
    //名师精选
    choiceness(){
        this.$request.get(`/teachers/elites`).then(res => {
            this.exhibitionBox2 = res;
            this.$nextTick(function() {
                    this.swiperInit();
                })
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
      //点赞
      Giveuppraise(id,index,type){
        if (this.isUserNeedLogin) {
            this.$router.push('/login')
             Toast('请登录')
             return;
        } 
        this.$request.get(`/personal/teachers/thumbsUp/${id}`).then(data => {
            if(type==='choiceness'&&data.status == 1) {
                this.exhibitionBox2[index].praise = this.exhibitionBox2[index].praise + 1;
                this.exhibitionBox2[index].is_prais = 1;
            } else if(type!=='choiceness'&&data.status == 1) {
                this.exhibitionBox[index].praise = this.exhibitionBox[index].praise + 1;
                this.exhibitionBox[index].is_prais = 1;
            } else if(type!=='choiceness'&&data.status == 0) {
                this.exhibitionBox[index].praise = this.exhibitionBox[index].praise - 1;
                this.exhibitionBox[index].is_prais = 0;
            } else if(type==='choiceness'&&data.status == 0) {
                this.exhibitionBox2[index].praise = this.exhibitionBox2[index].praise - 1;
                this.exhibitionBox2[index].is_prais = 0;
            }
        })
        .catch(error => {
           Toast(error);
        });
      },
    //申请加盟
    goto() {
        const { name, identity_auth } = this.info.user;
        if(name){
            if(parseInt(identity_auth) === '未认证') {
            this.$router.push("/authenticationcenter");
            return;
            }
            const obj = {
            '认证机构负责人中': {message:'您已在申请中，请耐心等待审核', type:'success'},
            '认证机构负责人': {message:'您已加盟成功',type:'success'},
            '认证教练中': {message:'您是教练认证中，暂时不能申请加盟，详情请联系机构负责人认证',type:'warning'},
            '认证教练': {message:'您是教练，暂时不能申请加盟，详情请联系机构负责人认证',type:'warning'},
            '认证不通过': {message:'您的申请未通过，详情请联系客服',type:'error'},
            '认证机构负责人&教练中': {message:'您已加盟成功',type:'success'},
            '认证机构负责人&认证教练': {message:'您已加盟成功',type:'success'},
            }
            obj[identity_auth] && Dialog({ 
                message:`${obj[identity_auth].message}`, 
                title: '温馨提示'
            })
        }else{
            this.$router.push('/login')
        }
    },
    addClass:function(index){
        this.current=index;
    },
    clicktext:function(index){
        this.value1 = '';
        this.name = '';
        this.curritem = index;
        switch(index) {
            case 0:
                this.joindata();
                break;
        } 
    },
    toggle: function() {
        this.visible = !this.visible //取反
        this.launch = !this.launch;
     },
     //省市区
     changeArea(val) {
        if(val[0].name === '') {
            this.isOpen2 = false;
            return
        }
        if(val[1].name === '') {
            this.province = val[0].name;
            this.city = "";
            this.area = "";
            this.region = this.province;
        } else if(val[2].name === '') {
            this.province = val[0].name;
            this.city = val[1].name;
            this.area = "";
            this.region = this.city;
        } else if(val[2].name !== '') {
             this.province = val[0].name;
            this.city = val[1].name;
            this.area = val[2].name;
            this.region = this.area;
        }   
        this.exhibitionBox = [];
        this.current_page2 = 1;
        this.finished2 = false;
        this.isLogin();
        this.isOpen2 = false;
    },
    // 筛选时，判定是否登录
    isLogin() {
        if (this.isUserNeedLogin) {
            this.postTeachers();
        } else {
            this.postTeachersLogin();
        }
    },
    // 筛选条件
    postParams() {
        let params = {
            name:"",//老师名字
            good_at:this.ids,//擅长
            min_num: this.record,//最小资历
            max_num: this.num,//最大资历
            city: this.city,//城市
            province: this.province,//省
            area: this.area//区
        }
        return params;
    },
    // 登录前，名师筛选
    postTeachers (page =1) {
        this.$request.post(`/teachers?page=${page}`, this.postParams())
        .then(res => {
            const that = this;
            res.data.forEach(item => {
                that.exhibitionBox.push(item);
            })
            this.total2 = res.total;
        })
        .catch(error => {
            this.$message({
                message: '找不到你要的数据',
                type: "error"
            });
            return;
        });
    },
    // 登录后，名师筛选
    postTeachersLogin(page =1) {
        this.$request.post('teachers/store/prais?page='+page,this.postParams())
        .then(res => {
            const that = this;
            res.data.forEach(item => {
                that.exhibitionBox.push(item);
            })
            this.total2 = res.total;
        })
        .catch(error => {
            this.$message({
                message: '找不到你要的数据',
                type: "error"
            });
            return;
        });
    },
     // 选择工作资历
    onSelect3(item){
        if(item.name === '不限') {
            this.seniority = item.name;
            this.record = '';
            this.num = '';
        } else if(item.name === '40以上') {
            this.record = 40;
            this.num = 100;
            this.seniority = item.name;
        } else {
            this.record = Number(item.name.split('-')[0]);
            this.num = Number(item.name.split('-')[1]);
            this.seniority = this.record + '-' + this.num;
        }
        this.exhibitionBox = [];
        this.current_page2 = 1;
        this.finished2 = false;
        this.isLogin();
        this.isOpen3 = false;
    },
    // 选择分类
    chooseClassify(name,index) {
        this.isKey = 'classify';
        this.isActive = index;
        this.ids = name;
        this.exhibitionBox = [];
        this.current_page2 = 1;
        this.finished2 = false;
        this.isLogin();
    },
    //机构名称查询
    seekclick(){
        if (this.name) {
            this.value1 = ''
            this.current_page = 1
            this.clubBox = []
            this.postGuildList()
        } else if(this.name == '') {
            Toast('请输入机构名称')
        }
    },
    postGuildList() {
        let params = {
            name:this.name,//老师名字
            isNew:false,
        }
        this.$request.post(`/clubs/showClubListMobile`, params)
        .then(res => {
            res.data.map((item) => {
                this.clubBox.push(item)
            })
        })
        .catch(error => {
            this.$message({
                message: '找不到你要的数据',
                type: "error"
            });
            return;
        });
    },
    clubBoxItem(item){
        this.$router.push({
            path: "/teacherClub/clubhouseDetails",
            query: {
            id: item.id
            }
        });
    },
    exhibition(item){
        this.$router.push({
            path: "/teacherClub/teacherDetails",
            query: {
            id: item.id
            }
        });
    }
  }
}
</script>
<style lang="scss" scoped>
.list_banner{
    height: 170px;
    background-size: cover;
    background-position: center;
}
.distpicker-address-wrapper select{
    width: 70px !important;
    padding: 0px 4px !important;
    font-size: 12px !important;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0.8;
}
.van-cell--large .van-cell__title{
    font-size: 12px !important;
}
.van-cell--large{
    padding-top: 15px !important;
}
input::-webkit-input-placeholder{
    color:#999;
}
input:-moz-placeholder{
    color:#999;
}
input::-moz-placeholder{
    color:#999;
}
input:-ms-input-placeholder{
    color:#999;
}
.van-action-sheet{
    margin-bottom: 13%;
}
.el-dropdown-link {
    cursor: pointer!important;
    color: #2c2c2c!important;
  }
  .el-icon-arrow-down {
    font-size: 12px!important;
  }
  .van-dropdown-menu{
    height: 40px;
    background-color: #eee;
    color: #2c2c2c;
    width: 80px;
    padding-top: 1px;
}
.club_warp{
    width: 100%;
    height: 100%;
    display: inline-block;
    .list_teacher{
        width: 100%;
        background: #eee !important;
        position: relative;
        .league{
            width: 60px;
            height: 15px;
            border-radius: 6px;
            text-align: center;
            font-size: 10px;
            color: #ffffff;
            line-height: 15px;
            background: #97B3C1;
            position: absolute;
            left: 160px;
            top: 128px;
        }
        .club_house{
            width: 93%;
            height: 50px;
            margin: 0 auto;
            display: flex;
            .club_house_title{
                width: 50%;
                height: 50px;
                line-height: 50px;
                display: flex;
                .van-dropdown-menu {
                    margin-top: 5px;
                }
                .items{
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    color:rgba(44,44,44,1);
                    padding-right: 10px;
                }
                .active{
                    font-size:14px;
                    font-family:Microsoft YaHei;
                    font-weight:bold;
                    color:rgba(44,44,44,1);
                }
            }
            .club_house_inquiry{
                width: 50%;
                height: 30px;
                position: relative;
                border-radius: 13px;
                color: #999;
                top: 9px;
                border-radius: 13px;
                border: 1px solid rgb(216, 212, 212);
                font-size: 12px;
                line-height: 28px;
                overflow: hidden;
                .club_house_inquiry_input{
                    background-color: #fff;
                    height: 100%;
                    width: 70%;
                    float: left;
                    font-size: 12px;
                    color: #999;
                    text-indent: 25px;
                    overflow: hidden;
                }
               .seek {
                    position: absolute;
                    width: 10px;
                    height: 11px;
                    right: 88%;
                    top: 33%;
                }
                .search {
                    padding: 0 3px;
                    float: right;
                    width: 24%;
                    height: 28px;
                }
            }
        }
        .club_item_count{
            width: 100%;
            height: 100%;
            background: #eee !important;
            display: inline-block;
            .club_item{
                width: 93%;
                margin: 0 auto;
                display: flow-root;
                .club_item_box{
                    width: 48%;
                    height: 100%;
                    float: left;
                    margin-bottom: 10px;
                    overflow: hidden;
                    border-radius: 7px;
                    .club_item_img{
                        width: 100%;
                        height: 146px;
                        background-color: #E5E5E5;
                        img{
                            width: 100%;
                            height: 100%;
                            display: block;
                            object-fit: cover;
                        }
                    }
                    .club_item_title{
                        width: 100%;
                        height: 75px;
                        background-color: #fff;
                        display: inline-block;
                        h3{
                            font-size:12px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            color:rgba(44,44,44,1);
                            margin-top: 15px;
                            text-indent: 10px;
                            width: 93%;
                        }
                        .text{
                            font-size: 10px;
                            font-family:PingFang SC;
                            font-weight:400;
                            color: #999;
                            margin-top: 10px;
                            text-indent: 10px;
                            width: 93%;
                        }
                    }
                }
                .club_item_box:nth-child(2n){
                    width: 48%;
                    height: 222px;
                    margin-bottom: 10px;
                    margin-left: 13px;
                    .club_item_img{
                        width: 100%;
                        height: 146px;
                        img{
                            width: 100%;
                            height: 100%;
                            display: block;
                            object-fit: cover;
                        }
                    }
                    .club_item_title{
                        width: 100%;
                        height: 75px;
                        background-color: #fff;
                        display: inline-block;
                        h3{
                            font-size:12px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            color:rgba(44,44,44,1);
                            margin-top: 15px;
                            text-indent: 10px;
                            width: 93%;
                        }
                        .text{
                            font-size: 10px;
                            font-family:PingFang SC;
                            font-weight:400;
                            color: #999;
                            margin-top: 10px;
                            text-indent: 10px;
                            width: 93%;
                        }
                    }
                }
                .tips_text{
                    text-align: center;
                    color: #999;
                    font-size:12px;
                    font-family:PingFang SC;
                    font-weight:500;
                    margin-top: 70%;
                    margin-bottom: 30px;
                }
            }
        }
        .Default-page4{
            width: 100%;
            height: 100px;
            margin: 0 auto;
            text-align: center;
            line-height: 60px;
            .page-span4{
                font-size:12px;
                font-family:PingFang SC;
                font-weight:500;
                color: #999;
            }
        }
    }
    .list_clubhouse{
        width: 100%;
        background: #fff !important;
        .list_house{
            width: 100%;
            margin: 0 auto;
            display: flex;
            justify-content:flex-start;
            .list_house_title{
                width:85%;
                height: 50px;
                line-height: 45px;
                display: flex;
                margin-left: 11px;
                .list_house_div {
                    display: flex;
                    align-items: center;
                }
                .list_house_div:nth-child(1){
                    width: 80px;
                    .house_title_tips{
                    font-size:12px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    padding-right: 16px;
                  }
                  .house_title_img {
                      width: 10px;
                      height: 7px;
                      margin-left: -12px;
                  }
                }
                .list_house_div:nth-child(2){
                    width: 80px;
                    .house_title_tips{
                    font-size:12px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    padding-right: 16px;
                  }
                  .house_title_img{
                      width: 10px;
                      height: 7px;
                      margin-left: -12px;
                  }
                }
                .list_house_div:nth-child(3){
                    width: 80px;
                    .house_title_tips{
                    font-size:12px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    padding-right: 16px;
                  }
                  .house_title_img{
                      width: 10px;
                      margin-left: -12px;
                      font-size: 15px;
                  }
                }
            }
            .list_house_inquirys{
                width: 13%;
                height: 55px;
                line-height: 45px;
                text-align: end;
                .house_title_tips{
                    font-size:12px;
                    font-family:Microsoft YaHei;
                    font-weight:400;
                    padding-right: 16px;
                  }
                  .house_title_img{
                      width: 10px;
                      height: 7px;
                      margin-left: -12px;
                  }
                  .house_title_img2{
                    width: 18px;
                    height: 25px;
                    margin-left: -14px;
                    position: relative;
                    top: 8px;
                  }
            }
        }
        .searchtext {
            width: 100%;
            height: 30px;
            border-bottom: 1px solid #f1f1ff;
            font-size: 14px;
            padding: 0 0 0 13px;
            line-height: 30px;
            overflow: auto;
            transition: 0.5s;
            ul {
                display: flex;
                width: 80%;
                align-items: center;
                float: right;
                height: 30px;
                font-size: 12px;
                li {
                    height: 25px;
                    line-height: 25px;
                    border-radius: 10px;
                    padding: 0 6px;
                    background: rgb(143, 205, 113);
                    color: white;
                    transition: 0.5s;
                    margin-right: 10px;
                }
            }
        }
        .list_house_type{
            width: 100%;
            height: auto;
            background-color: #eeeeee;
            display: inline-block;
            .house_type{
                width: 93%;
                height: 100%;
                margin: 0 auto;
                display: flex;
                flex-wrap: wrap;
                margin-bottom: 10px;
                .house_type_one{
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    text-align: center;
                    background-color: #ffffff;
                    margin-top: 10px;
                    margin-right: 9px;
                    float: left;
                    font-size: 10px;
                    overflow: hidden;
                    .house_type_name{
                        font-size:10px;
                        font-family:PingFang SC;
                        font-weight:400;
                        display: block;
                        padding-top: 17px;
                        margin: 3px;
                        color:rgba(44,44,44,1);
                    }
                    .selected {
                        color: #2c2c2c;
                        font-size: 11px;
                        font-weight: 700;
                    }
                }
            }
        }
        // .club_items{
            .news-swiper {
                padding: 2px 0 5px 16px;
                /deep/ .swiper-wrapper {
                    overflow: auto;
                }
                .swiper-slide {
                    width: 131px;
                    height: 190px;
                    margin-right: 10px;
                    box-shadow:0px 1px 4px 0px rgba(22,27,27,0.18);
                    border-radius:7px;
                    margin-bottom: 10px;
                    .club_items_img{
                        width: 100%;
                        height: 110px;
                        background-color: #E5E5E5;
                        img{
                            width: 100%;
                            height: 100%;
                            display: block;
                            object-fit: cover;
                            border-radius: 7px 7px 0px 0px;
                        }
                    }
                    .club_items_title{
                        height: 63px;
                        width: 90%;
                        margin: 0 auto;
                        h3{
                            font-size:14px;
                            font-family:PingFang SC;
                            font-weight:bold;
                            color:rgba(44,44,44,1);
                            text-indent: 2px;
                            margin-top: 8%;
                        }
                        .texts{
                            font-size:12px;
                            font-family:PingFang SC;
                            font-weight:400;
                            color:rgba(44,44,44,1);
                            padding-top: 2px;
                            text-indent: 2px;
                        }
                        .Rotation_zan{
                            font-size:12px;
                            font-weight:400;
                            display: flex;
                            justify-content: space-between;
                            margin-top: 5px;
                            margin-bottom: 10px;
                            .Rotation_zan_items{
                                text-indent: 2px;
                            }
                            .Rotation_zan_tips{
                                display: flex;
                                padding-right: 2px;
                                img{
                                    width: 11px;
                                    height: 11px;
                                    display: block;
                                }
                                .span{
                                    font-size:12px;
                                    font-weight:400;
                                    margin-left: 4px;
                                    margin-top: -2px;
                                }
                            }
                            .thumbColor {
                                color: rgb(143, 205, 113);
                            }
                        }
                    }
                }
            }
        // }
        .list_exhibition{
            width: 93%;
            // height: 60px;
            margin: 0 auto;
            .list_exhibition_page{
                display: flex;
                margin-top: 15px;
                img{
                    width: 13px;
                    height: 15px;
                    display: block;
                }
                .tips{
                    font-size:14px;
                    font-family:PingFang SC;
                    font-weight:bold;
                    color:rgba(44,44,44,1);
                    padding-left: 6px;
                }
            }
            .list_exhibition_staff{
                font-size:12px;
                font-family:PingFang SC;
                font-weight:400;
                color:rgba(44,44,44,1);
                padding-top: 5px;
            }
        }
        .exhibition_items{
            width: 100%;
            background-color: #eeeeee;
            height: 100%;
            display: inline-block;
            // margin-bottom: 49px;
            .exhibition_content{
                width: 93%;
                height: 100%;
                // display: flow-root;
                margin: 0 auto;
                margin-top: 10px;
                // 改变的样式
                display: flex;
                flex-wrap: wrap;
                .exhibition_box{
                    width: 48%;
                    height: 100%;
                    // float: left;
                    border-radius:7px;
                    margin-bottom: 8px;
                    .exhibition_img{
                        width: 100%;
                        height: 130px;
                        background-color: #E5E5E5;
                        border-radius: 4px;
                        img{
                            width: 100%;
                            height: 100%;
                            display: block;
                            object-fit: cover;
                            border-radius: 7px 7px 0px 0px;
                        }
                    }
                    .exhibition_title{
                        width: 100%;
                        height: 85px;
                        background-color: #ffffff;
                        display: inline-block;
                        border-radius: 0px 0px 7px 7px;
                        h3{
                            font-size:14px;
                            font-family:PingFang SC;
                            font-weight:bold;
                            text-indent: 10px;
                            margin-top: 8%;
                            width: 95%;
                        }
                        .texts{
                            font-size:12px;
                            font-family:PingFang SC;
                            font-weight:400;
                            padding-top: 2px;
                            text-indent: 10px;
                            width: 95%;
                        }
                        .exhibition_zan{
                            font-size:12px;
                            font-family:PingFang SC;
                            font-weight:400;
                            display: flex;
                            justify-content: space-between;
                            margin-top: 12px;
                            .exhibition_zan_items{
                                text-indent: 10px;
                            }
                            .exhibition_zan_tips{
                                display: flex;
                                padding-right: 10px;
                                img{
                                    width: 11px;
                                    height: 11px;
                                    display: block;
                                }
                                .span{
                                    font-size: 12px;
                                    font-weight:400;
                                    margin-top: -2px;
                                    margin-left: 4px;
                                }
                            }
                            .thumbColor {
                                color: rgb(143, 205, 113);
                            }
                        }
                    }
                }
                .exhibition_box:nth-child(2n){
                    width: 48%;
                    height: 100%;
                    float: left;
                    border-radius:3px;
                    margin-bottom: 8px;
                    margin-left: 13px;
                    .exhibition_img{
                        width: 100%;
                        height: 130px;
                        background-color: #E5E5E5;
                        img{
                            width: 100%;
                            height: 100%;
                            display: block;
                            object-fit: cover;
                        }
                    }
                    .exhibition_title{
                        width: 100%;
                        height: 85px;
                        background-color: #ffffff;
                        display: inline-block;
                        h3{
                            font-size:14px;
                            font-weight:bold;
                            text-indent: 10px;
                            margin-top: 8%;
                        }
                        .texts{
                            font-size:12px;
                            font-weight:400;
                            padding-top: 2px;
                            text-indent: 10px;
                        }
                        .exhibition_zan{
                            font-size:12px;
                            font-weight:400;
                            display: flex;
                            justify-content: space-between;
                            margin-top: 12px;
                            .exhibition_zan_items{
                                text-indent: 10px;
                            }
                            .exhibition_zan_tips{
                                display: flex;
                                padding-right: 10px;
                                font-size: 14px;
                                .span{
                                    font-weight:400;
                                }
                            }
                        }
                    }
                }
            }
            .tips_text{
                text-align: center;
                color: #999;
                font-size:12px;
                font-family:PingFang SC;
                font-weight:500;
                margin-top: 30px;
                margin-bottom: 30px;
            }
        }
        .Default-page5{
            width: 100%;
            height: 100px;
            margin: 0 auto;
            text-align: center;
            line-height: 60px;
            .page-span5{
                font-size:12px;
                font-family:PingFang SC;
                font-weight:500;
                color: #999;
            }
        }
    }
}
</style>