/* eslint-disable no-undef */

const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
module.exports = {
  // 代理 
  devServer: {
    proxy: {
      '/api': {
        target: 'http://testapi.aomengyujia.com/api',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''          
        }
      },
    }
  },  
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*'],
            // 该项仅在使用 Circle 组件时需要
            // 原因参见 https://github.com/youzan/vant/issues/1948
            selectorBlackList: ['van-circle__layer']
          })
        ]
      }
    }
  },
  // 打包输出目录
  outputDir: '../../dist/wap',
  publicPath: './',
  assetsDir: './',
}
