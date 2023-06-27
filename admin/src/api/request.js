/*
 * @Author: 爱吃香菜的猹
 * @Date: 2023-05-22 19:59:31
 * @LastEditors: 爱吃香菜的猹
 * @LastEditTime: 2023-06-26 21:10:48
 * @FilePath: \aurora-beta\admin\src\api\request.js
 * @Description: 
 */
import axios from "axios";
//引入进度条
import nProgress from "nprogress";
//引入进度条的样式
import "nprogress/nprogress.css";
import ElementUI from "element-ui";
import router from "@/router";
const request=axios.create({
    baseURL:'http://81.68.220.8:8000',
    timeout:5000,
    defaults: {
        headers: {
            post: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }
    }
})

//请求拦截器
request.interceptors.request.use((config) => {
    nProgress.start(); //进度条开始
    //config配置对象 ---包含请求体，url，data等等
    let admin_jwt_token =window.localStorage.getItem('admin_jwt_token');
    config.headers.Authorization = `Bearer ${admin_jwt_token}`;
    return config
})
//响应拦截器
request.interceptors.response.use((res) => {
    nProgress.done(); //进度条结束
    if (res.data && res.data.code) {
        if (parseInt(res.data.code) === 401) {
            //未登录
            ElementUI.Notification({
                title: '警告',
                message: '登录过期请重新登录',
                type: 'warning'
            });
            router.push('/login');
        }
        if (parseInt(res.data.code) === -1) {
            ElementUI.Notification({
                title: '警告',
                message: '请求失败',
                type: 'warning'
            });
        }
    }
    return res
},(error) => {
    console.dir(error);
    ElementUI.Notification({
        title: '警告',
        message: '服务器连接失败',
        type: 'warning'
    });
    return Promise.reject(new Error(error))
})
export default request