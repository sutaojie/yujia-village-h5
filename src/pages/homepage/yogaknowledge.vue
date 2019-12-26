<template>
    <div class="knowledge">
        <van-nav-bar title="瑜伽知识" left-arrow @click-left="back" fixed>
        </van-nav-bar>
        <div class="banner" :style="{backgroundImage: 'url('+knowledgeClassify.banner+')'}" v-if="!swiper">
        </div>
        <div class="banner" :style="{backgroundImage: 'url('+swiper?swiper.path: ''+')'}" v-else  @click="goAdvertising(swiper.mold, swiper.relation_id)"></div>

        <div class="recommended">
            <van-collapse v-model="activeNames" @change="onChange">
                <van-collapse-item title="推荐" :value="label" name="1" accordion :border="false">
                    <div class="genre" :class="{selected: id == item.id}" 
                    v-for="(item,index) in knowledgeClassify.classify" :key="index" 
                    @click="chooseClassify(item.id)">{{item.classify}}</div>
                </van-collapse-item>
            </van-collapse>
        </div>
        <div class="knowledge-box">
            <van-list v-model="loading" :offset="30" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <div class="knowledge-item" v-for="(item,index) in knowledgeList" :key="index" @click="goInfoDetail(item.id)">
                    <div class="left-box">
                        <div class="img" :style="{backgroundImage: 'url('+item.icon_url+')'}"></div>                               
                    </div>
                    <div class="right-box">
                        <div class="title">{{item.headline}}</div>
                        <div class="author">
                            <div>
                                <img class="eye" src="../../assets/img/eye.png">
                                <span class="number">{{item.views || 100}}</span>
                            </div>
                            <span>{{item.updated_at}}</span>
                        </div>
                        <div class="description">{{item.summary}}</div>
                    </div>
                </div>
            </van-list>  
        </div>
    </div>
</template>
<script>
import { goAdvertingApi } from '@/services/api/main'
export default {
    data() {
        return {
            activeNames: ['1'],
            label: '收起',
            // 瑜伽知识分类数据
            knowledgeClassify: '',
            // isActive: 0,
            //知识列表
            knowledgeList: [], 
            loading: false,
            finished: false,
            page: 1,
            total: '',
            id: 0,
            swiper: {},
            advertis2: {}
        }
    },
    created() {
        this.getKnowledgeClassify();
        // 初始推荐知识列表
        this.getKnowledgeList();
        this.getAdvertising()
    },
    methods: {
        // 广告位
        goAdvertising (mold, relation_id) {
            goAdvertingApi(mold, relation_id)
        },
        getAdvertising () {
            return this.$request.get('/advertisement/data/' + 5).then((res) => {
            var reswiper = res.filter(((item) => item.position === 0))[0]
            this.swiper = reswiper? reswiper.advertisement[0] :''
            })
        },
          back() {
            this.$router.go(-1);
          },
          gotoPage(type) {
          const path = {
            train: '/yoga-message/list',
            information: '/yoga-knowledge',
            teacher: '/teacher-club/list?current=1',
            club: '/teacher-club/list?current=0',
          }
          path[type] && this.$router.push(path[type])
        },
        onChange() {
            if(this.label != '更多') {
                this.label = '更多';
            } else {
                this.label = '收起';
            }
        },
        onLoad() {
            // 异步更新数据
            setTimeout(() => {
                this.page++;
                this.onLoadClassify(this.id, this.page);
                // 加载状态结束
                this.loading = false;
                // 数据全部加载完成
                if (this.knowledgeList.length >= this.total) {
                    this.finished = true;
                }
            }, 500);
        },    
        // 获取瑜伽知识分类
        getKnowledgeClassify() {
            this.$request.get('/KnowledgeClassify').then(data => {
                this.knowledgeClassify = data;
            })
        },
        // 瑜伽知识列表
        getKnowledgeList(page =1) {
            this.$request.get('/knowledgeList/0?page='+ page).then(data => {
                this.knowledgeList = data.data;
                this.total = data.total;
            })
        },
        // 选择分类
        chooseClassify(id, page = 1) {
            this.finished = false;
            this.id = id;
            this.page = 1;
            this.$request.get('/knowledgeList/'+ this.id +'?page='+ page).then(data => {
                this.knowledgeList = data.data;
                this.total = data.total;
            })
        },
        onLoadClassify(id, page) {
            this.$request.get('/knowledgeList/'+ this.id +'?page='+ page).then(data => {
                const info = data.data;
                info.forEach(item => {
                    this.knowledgeList.push(item);
                });
                this.total = data.total;
            })
        },
        // 跳转到 知识详情页
        goInfoDetail(id) {
            this.$router.push('/knowledge-detail/'+id);
        }
        
    }
}
</script>
<style lang="scss" scoped>
.knowledge {
    padding-top: 40px;
    margin-bottom: 50px;
}
.knowledge /deep/ .van-nav-bar--fixed {
  position: fixed;
}
.banner {
    height: 170px;
    background-size: cover;
    background-position: center;
}
.recommended {
    /deep/ .van-collapse-item__content {
        width: 382px;
        background-color: #EEE;
        padding-top: 9px; 
        padding-bottom: 0; 
        overflow: hidden;
        .genre {
            float: left;
            width: 52px;
            height: 52px;
            margin-right: 6.2px;
            margin-bottom: 9px;
            border-radius: 26px;
            background-color: #fff;
            line-height: 52px;
            text-align: center;
            font-size: 10px;
            overflow: hidden;
        }
        .selected {
            color: #2c2c2c;
            font-size: 15px;
            font-weight: 700;
        }
    }
}
.knowledge-box {
    overflow: hidden;
    .knowledge-item {
        padding: 26px 16px;
        margin-bottom: 6px;
        overflow: hidden;
        background: #fff;
        .left-box {
            float: left;
            width: 132px;
            height: 122px;
            .img { 
                height: 100%;
                background-repeat: no-repeat;
                background-size: cover;
                // background-position: center;
                background-position: center top;
            }
        }
        .right-box {
            position: relative;
            float: right;
            width: 185px;
            height: 122px;
            font-size: 10px;
            .title {
                margin-top: 5px;
                font-size: 12px;
                font-weight: 700;
                overflow: hidden;
                white-space: nowrap; 
                text-overflow:ellipsis;
            }
            .author {
                height: 16px;
                display: flex;
                justify-content: space-between;
                margin-top: 12px;
                color: #999;
                .eye {
                    width: 16px;
                    height: 16px;
                    margin-right: 3px;
                    vertical-align: top;
                }
                .number {
                    line-height: 16px;
                }
            }
            .description {
                position: absolute;
                bottom: 5px;
                color: #999;
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3; 
            }
        }
    }
}
</style>