<template>
  <div>
    <div class="head-top">
      <div class="back" @click="goback">
        <van-icon name="arrow-left" />
      </div>
      <form action="/">
        <van-search
          v-model="value"
          placeholder="商品名称/关键词搜索"
          shape="round"
          show-action
          clearable
          @search="onSearch(value)"
          ref="tagInput"
        >
          <div slot="action" @click="onSearch(value)">搜索</div>
        </van-search>
      </form>
      <img class="search" src="../../assets/img/search.png" alt />
    </div>
    <div class="search-history">
      <div class="history-head">
        <div>搜索历史</div>
        <van-icon name="delete" @click="deleteHistory"/>
      </div>
      <div class="history-body">
        <div class="history-body-item" v-for="(item,index) in searchHistory" :key="index">
            {{item}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      searchHistory: []
    };
  },
  created() {
    this.onfoucs();
    if(window.localStorage.getItem('search')) {
        this.searchHistory = JSON.parse(window.localStorage.getItem('search'));
    }
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    onfoucs() {
      this.$nextTick(_ => {
        // 页面加载，输入框自动聚焦
        this.$refs.tagInput.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].focus();
      });
    },
    onSearch(value) {
        // 去掉前后空格
        value = value.replace(/^\s+|\s+$/g,'');
        this.searchHistory.unshift(value);
        window.localStorage.setItem('search',JSON.stringify(this.unique(this.searchHistory)));
        this.searchHistory = JSON.parse( window.localStorage.getItem('search'));
    },
    // 数组去重
    unique(arr) {
        var array = [];
        for (var i = 0; i < arr.length; i++) {
            if (array.indexOf(arr[i]) === -1) {
                array.push(arr[i])
            }
        }
        return array;
    },
    // 删除搜索历史
    deleteHistory() {
        window.localStorage.removeItem('search');
        this.searchHistory = []
    }
  }
};
</script>
<style lang="scss" scoped>
.head-top {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 44px;
  padding: 0 16px;
  background-color: #fff;
  .back {
    height: 30px;
    padding-top: 3px;
    margin-right: 10px;
    font-size: 24px;
  }
  .van-search {
    padding: 0;
    .van-search__content {
      padding-left: 46px;
      margin-right: 30px;
      width: 250px;
      height: 30px;
      .van-cell {
        padding-top: 3px;
        padding-bottom: 0;
        font-size: 12px;
        /deep/ .van-field__left-icon {
          display: none;
        }
      }
    }
  }
  .search {
    position: absolute;
    top: 14px;
    left: 68px;
    width: 15px;
    height: 16px;
  }
}
.search-history {
  position: absolute;
  top: 44px;
  bottom: 0;
  width: 100%;
  padding: 0 16px;
  background-color: #fff;
  .history-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    div {
      font-size: 14px;
      font-weight: 700;
    }
    .van-icon {
      font-size: 16px;
    }
  }
  .history-body {
    display: flex;
    flex-wrap: wrap;
    &-item {
      height: 29px;
      padding: 0 14px;
      margin-right: 10px;
      margin-bottom: 10px;
      line-height: 29px;
      background-color: #eee;
      border-radius: 15px;
      font-size: 12px;
    }
  }
}
</style>