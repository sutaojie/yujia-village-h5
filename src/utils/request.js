/* eslint-disable no-undef */
import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant';
let timer = null
// 处理非 get data 传参
function handleRequest(config) {
  store.commit('loadStatus', true)
  const {
    contentType
  } = config;
  // 向请求头中添加 token
  const access = sessionStorage.getItem('access') || ''
  config.headers['Authorization'] = access && `${JSON.parse(access).token_type}${JSON.parse(access).access_token}` || '';
  // config.baseURL = 'https://api.yujiacun.net/api';
  // config.baseURL = 'http://testapi.aomengyujia.com/api';
  // config.baseURL = '/api';
  if (process.env.NODE_ENV === 'development') {
    // config.baseURL = '/api'; // 
    // config.baseURL = 'http://api.aomengyujia.com/api';
    // config.baseURL = 'https://api.yujiacun.net/api';
    config.baseURL = 'http://testapi.aomengyujia.com/api';
  } else {
    config.baseURL = 'https://api.yujiacun.net/api';
  }
  if (contentType === 'json') {
    config.headers['Content-Type'] = 'application/json';
  }

  return config;
}

function handleRequestErr(err) {

  return Promise.reject(err);
}

// // 处理 responese 报错
function handleResponeseErr(err) {
  console.log(err.response.data);
  var response = err.response
  var data = response.data
  if(data.code === '0001') {
    request.post('/auth/refresh')
        .then(data => {
          sessionStorage.setItem('access', JSON.stringify(data))
          store.dispatch("INFO", data);
          window.location.reload();
        })
        .catch(() => {
          store.dispatch("INFO", {});
          Toast('请重新登录');
        })
        return Promise.resolve();
  }
  store.commit('loadStatus', false)
  return Promise.reject(err.response.data);
}

// 处理分页接口中的 meta ,element 分页组件，需要 number 类型
function handleResponse(response) {
  setTimeout(() => {
    store.commit('loadStatus', false)
  }, 300);
  
  const {
    data,
    status
  } = response

  if (status >= 400 && status < 500) {
    return Promise.reject(response)
  }
  if (status >= 200 && status < 300) {
    return Promise.resolve(data);
  }
}

const request = axios.create({
  timeout: 15000 // 请求超时时间
});
// request拦截器
request.interceptors.request.use(handleRequest, handleRequestErr)
// respone拦截器
request.interceptors.response.use(handleResponse, handleResponeseErr)

export default request;