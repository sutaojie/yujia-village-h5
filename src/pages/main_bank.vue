<template>
    <div>
        <div class="main" >
            <!-- 热门课程 -->
            <div class="popular-course">
                <div class="top-course">
                    <div>
                        <span>热门课程</span>
                        <span class="e-title">Popular course</span>
                    </div>
                    <div>
                        <span class="more" @click="more('course')">更多</span>
                        <span class="el-icon-arrow-right i-right"></span>
                    </div>
                </div>
                <div class="hot-swiper">
                    <div class="swiper-container swiper1">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="(item,index) in hotCourse" :key="index" @click="goCourseDetail(item.id)">
                                <div class="img" :style="{backgroundImage: 'url('+item.teacher_img+')'}"></div>
                                <div class="overlay">{{item.type}}</div>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
            <!-- 瑜伽资讯 -->
            <div class="yoga-news">
                <div class="top-course">
                    <div>
                        <span>瑜伽资讯</span>
                        <span class="e-title">Yoga news</span>
                    </div>
                    <div>
                        <span class="more" @click="more('news')">更多</span>
                        <span class="el-icon-arrow-right i-right"></span>
                    </div>
                </div>
                <div class="news-swiper"> 
                    <div class="swiper-container swiper2">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="(item,index) in yogaNews" :key="index" @click="goInfoDetail(item.id)">
                                <div class="img" :style="{backgroundImage: 'url('+item.icon_url+')'}"></div>
                                <div class="introduce">{{item.headline}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 瑜伽名师 -->
            <div class="famous-teacher">
                <div class="top-course">
                    <div>
                        <span>瑜伽名师</span>
                        <span class="e-title">Famous teacher</span>
                    </div>
                    <div>
                        <span class="more" @click="more('teacher')">更多</span>
                        <span class="el-icon-arrow-right i-right"></span>
                    </div>
                </div>
                <div class="teacher">
                    <div class="swiper-container swiper3">
                        <div class="swiper-wrapper" :v-if="famousTeacher.length">
                            <div class="swiper-slide" v-for="(item,index) in famousTeacher" :key="index" @click="goTeacherDetail(item.id)">
                                <div class="img" :style="{backgroundImage: 'url('+item.first_img+')'}"></div>                                
                                <div class="name">
                                    <div class="en-name">{{item.name}}</div>
                                    <div class="title">{{item.good_at}}</div>
                                </div>
                                <div class="line">
                                    <div class="short-line line-l"></div>
                                    <div class="short-line line-r"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 培训信息 -->
            <div class="training-information">
                <div class="top-course">
                    <div>
                        <span>培训信息</span>
                        <span class="e-title">Training Information</span>
                    </div>
                    <div>
                        <span class="more" @click="more('information')">更多</span>
                        <span class="el-icon-arrow-right i-right"></span>
                    </div>
                </div>
                <div class="information-box">
                    <div class="training-item" v-for="(item,index) in trainingInfo" :key="index" @click="goCourseDetail(item.id)">
                        <div class="left-box">
                            <div class="img" :style="{backgroundImage: 'url('+item.teacher_img+')'}"></div>                                
                        </div>
                        <div class="right-box">
                            <div class="title">{{item.theme}}</div>
                            <div class="certification">{{item.type}}</div>
                            <div class="time">{{item.startTime}}至{{item.endTime}}</div>
                            <div class="address">{{item.custom_address }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 联盟机构 -->
            <div class="union-hall">
                <div class="top-course">
                    <div>
                        <span>机构</span>
                        <span class="e-title">Union hall</span>
                    </div>
                    <div>
                        <span class="more" @click="more('hall')">更多</span>
                        <span class="el-icon-arrow-right i-right"></span>
                    </div>
                </div>
                <div class="hall-swiper">
                    <div class="swiper-container swiper4">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="(item,index) in unionHall" :key="index">
                                <div class="img" :style="{backgroundImage: 'url('+item.first_img+')'}"></div>                                
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Swiper from 'swiper';
export default {
    data() {
        return {
            hotCourse: [],
            yogaNews: [],
            famousTeacher: [],
            trainingInfo: [],
            unionHall: []
        }
    }, 
    created() {
        this.getHomeData();
        // 清空index 和 tabbar ，防止通过地址访问 “/” 时的头部消失
        window.sessionStorage.removeItem('index');
        window.sessionStorage.removeItem('tabbar');
    },
    methods: {
        swiperInit() {
            new Swiper('.swiper1', {
                slidesPerView: 'auto',
                freeMode: true,
                observer: true,
            });
            new Swiper('.swiper2', {
                slidesPerView: 'auto',
                freeMode: true,
                observer: true,
            });
            new Swiper('.swiper3', {
                slidesPerView: 'auto',
                freeMode: true,
                observer: true,
            });
            new Swiper('.swiper4', {
                slidesPerView: 'auto',
                freeMode: true,
                freeModeMomentumRatio: 0.1,
                loop: true,
                speed: 2500,
                autoplay: {
                    delay: 0,
                    disableOnInteraction: false,
                },
            });
        },
        getHomeData() {
            this.$request.get('/home').then(data => {
                console.log(data);
                const { hot, information, teachers, clubs} = data;
                this.hotCourse = hot;
                this.yogaNews = information;
                this.famousTeacher = teachers;
                this.trainingInfo = data.new;
                this.unionHall = clubs;
                this.$nextTick(function() {
                    this.swiperInit();
                })
            }).catch(error => {
                console.log(error);
            })
        },
        more(keyword) {
            if(keyword === 'course' || keyword === 'information') {
                this.$router.push('/yogamessage');
            } else if(keyword === 'news') {
                this.$router.push('/yagainformation');
            } else if(keyword === 'teacher') {
                this.$router.push('/teacherClub');
            } else if(keyword === 'hall') {
                this.$router.push('/teacherClub');
            }  
        },
        goCourseDetail(id) {
            this.$router.push('/messagedetail/'+id);
        },
        goInfoDetail(id) {
            this.$router.push('/informationdetail/'+id);
        },
        goTeacherDetail(id) {
            this.$router.push({
                name: 'teacherDetails',
                query: {
                    id: id
                }
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.main {
    width: 100%;
    padding-top: 88px;
    // margin-bottom: 50px;
}
.top-course {
    display: flex;
    justify-content: space-between;
    height: 44px;
    line-height: 44px;
    padding: 0 16px;
    font-size: 14px;
    background-color: #E0EED2;
    .e-title {
        margin-left: 8px;
        margin-top: 2px;
        font-size: 10px;
        color: #2c2c2c;
    }
    .more,
    .i-right {
        font-size: 12px;
    }
}
.yoga-news,
.famous-teacher,
.training-information,
.union-hall {
    margin-top: 3px;
    background-color: #fff;
}
.popular-course,
.union-hall {
    background-color: #fff;
    .top-course {
        background-color: #fff;
        .e-title {
            color: #999;
        }
    }
}
.img {
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
}
.popular-course {
    height: 195px;
    .hot-swiper {
        padding: 5px 0 23px 16px;
        .swiper-slide {
            width: 123px;
            height: 123px;
            margin-right: 11px;
            .overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 123px;
                line-height: 123px;
                background-color: rgba(0,0,0,.3);
                text-align: center;
                font-size: 12px;
                color: #fff;
                font-weight: 700;
            }
        }
   }
}
.yoga-news {
    height: 222px;
    .news-swiper {
        padding: 14px 0 23px 16px;
        .swiper-slide {
            width: 226px;
            height: 141px;
            margin-right: 10px;
            .img {
                height: 118px;
            }
            .introduce {
                width: 165px;
                margin-top: 5px; 
                overflow: hidden;
                white-space: nowrap; 
                text-overflow:ellipsis;
                font-size: 10px;
            }
        }
    }
}
.famous-teacher {
    position: relative;
    height: 290px;
    .teacher {
        position: relative;
        z-index: 99;
        padding: 10px 0 16px 16px;
        .swiper-slide {
            width: 130px;
            height: 220px;
            margin-right: 10px;
            background-color: #fff;
            .img {
                width: 100%;
                height: 165px;
                // background-repeat: no-repeat;
                // background-size: contain;
                // background-position: center;
            }
            .name {
                margin-top: 11px;
                text-align: center;
                .en-name {
                    width: 40px;
                    margin: 0 auto;
                    overflow: hidden;
                    white-space: nowrap; 
                    text-overflow:ellipsis;
                    font-size: 12px;
                }
                .title {
                    margin-top: 6px;
                    font-size: 10px;
                }
            }
            .line {
                position: absolute;
                left: 0;
                bottom: 34px;
                width: 140px;
                .short-line {
                    height: 1px;
                    background-color: #BFBFBF;            
                }
                .line-l {
                    float: left;
                    width: 23px;
                }
                .line-r {
                    float: right;
                    width: 43px;
                }
            }
        }
    }
}
.training-information {
    height: 451px;
    overflow: hidden;
    .information-box {
        padding-left: 16px;
        padding-right: 26px;
        width: 385px;
        height: 408px;
        overflow-y: auto;
        .training-item {
            padding: 12px 0;
            overflow: hidden;
            border-bottom: 1px solid #e5e5e5;
            .left-box {
                float: left;
                width: 137px;
                height: 112px;
                .img {
                    background-position: center top;
                }
            }
            .right-box {
                position: relative;
                float: right;
                width: 187px;
                height: 113px;
                font-size: 10px;
                .title {
                    width: 130px;
                    font-size: 12px;
                    font-weight: 700;
                    overflow: hidden;
                    white-space: nowrap; 
                    text-overflow:ellipsis;
                }
                .certification {
                    width: 75px;
                    height: 17px;
                    line-height: 17px;
                    margin-top: 8px;
                    background-color: #638C0B;
                    border-radius: 8px;
                    text-align: center;
                    color: #fff;
                }
                .time {
                    margin-top: 15px;
                    color: #999;
                }
                .address {
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 110px;
                    height: 32px;
                    color: #999;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2; 
                }
                .more {
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    width: 60px;
                    height: 26px;
                    line-height: 26px;
                    background-color: #313131;
                    border-radius: 5px;
                    text-align: center;
                    color: #fff;
                }
            }
        }
        
    }
}
.union-hall {
    height: 85px;
    .hall-swiper {
        padding: 8px 0;
        .swiper-wrapper {
            transition-timing-function: linear;
            .swiper-slide {
                width: 83px;
                height: 30px;
                margin-right: 2px;
            }
        }
        
    }
}
</style>