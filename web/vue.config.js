/*
 * @Author: 爱吃香菜的猹
 * @Date: 2023-05-22 19:59:43
 * @LastEditors: 爱吃香菜的猹
 * @LastEditTime: 2023-06-26 22:14:45
 * @FilePath: \aurora-beta\web\vue.config.js
 * @Description: 
 */
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? './'
      : '/',
      configureWebpack: {
        module: {
          rules: [{
            test: /\.mjs$/,
            include: /node_modules/,
            type: 'javascript/auto'
          }]
        }
      }
    
  }