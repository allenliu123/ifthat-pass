// vue.config.js
const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    proxy: {
      '/api/*': {
        // target: 'https://api.ifthat.com/ifthat-pass', //对应自己的接口
        target: 'http://localhost:8084', //对应自己的接口
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}