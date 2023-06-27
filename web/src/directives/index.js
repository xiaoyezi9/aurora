/*
 * @Author: 爱吃香菜的猹
 * @Date: 2023-06-14 16:18:39
 * @LastEditors: 爱吃香菜的猹
 * @LastEditTime: 2023-06-14 16:49:14
 * @FilePath: \aurora-beta\web\src\directives\index.js
 * @Description: 
 */
import { useIntersectionObserver } from "@vueuse/core"

//定义懒加载插件
  const lazyPlugin={
    install(Vue,options){
        Vue.directive("img-lazy", {
            inserted:function(el, binding) {
                //el：指令绑定的那个元素
                //binding:指令后面的值
               const {stop}= useIntersectionObserver(el, ([{ isIntersecting }]) => {
                    //为true说明进入视口区域
                    if (isIntersecting) {
                        el.src = binding.value
                        console.log("懒加载测试",binding.value)
                        //useIntersectionObserver对元素的监听一直存在的，有内存浪费，所以在监听的图片第一次完成加载之后就停止监听
                        stop()
                    }
                })
            }
        })
    }
  }
  
export default lazyPlugin