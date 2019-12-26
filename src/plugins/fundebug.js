import Vue from 'vue'
import * as fundebug from "fundebug-javascript";
import fundebugVue from "fundebug-vue";

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production') {
  fundebug.init({
      apikey: "6bd9c0ab954a13c99bc1998fa8044a91d5c00ca54dada835f15702aab21f3f71"
  })
  fundebugVue(fundebug, Vue);
}