import Vue from 'vue'
import qs from 'querystringify'
Object.defineProperty(Vue.prototype, '$qs', { value: qs });