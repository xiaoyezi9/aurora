import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index.vue'
import home from "../views/home.vue"
import help from "../views/help.vue"
import Chat from "../views/Chat.vue"

import news from '../views/news.vue'
import search from "../views/search.vue"
import activity from "../views/activity.vue"

import helpcontent from "../views/content/helpcontent.vue"

import activitycontent from "../views/content/activitycontent.vue"
import newscontent from "../views/content/newscontent.vue"

import adminindex from "../views/webadmin/adminindex.vue"
import adminhome from "../views/webadmin/adminhome.vue"
import myself from "../views/webadmin/myself.vue"

import notice from "../views/webadmin/notice.vue"
import createhelp from "../views/webadmin/help/createhelp.vue"
import createhelplist from "../views/webadmin/help/createhelplist.vue"
import createactivity from "../views/webadmin/activity/createactivity.vue"
import createactivitylist from "../views/webadmin/activity/createactivitylist.vue"
import createarticle from "../views/webadmin/article/createarticle.vue"
import articlelist from "../views/webadmin/article/articlelist.vue"
import fankui from "../views/kefu/fankui.vue"
import jubao from "../views/kefu/jubao.vue"
import shensu from "../views/kefu/shensu.vue"
import Router from 'vue-router'
import PersonMessage from "@/views/webadmin/PersonMessage.vue";

Vue.use(VueRouter)

/**
 * 重写路由的push方法
 * 默认情况下，当你使用 router.push() 方法时，如果在路由跳转过程中出现错误，它会抛出一个错误。这段代码的作用是在路由跳转过程中捕获这个错误，防止它被抛出并导致程序崩溃。
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
const routes = [
  {
    path: '/', name: 'index', component: index,meta:{ispublic:true}, children: [
      { path: '', name: 'home', component: home, meta:{ispublic:true} },
      { path: 'chat', name: 'Chat', component: Chat, meta:{ispublic:true}},
      { path: 'help', name: 'help', component: help, meta:{ispublic:true}},
      { path: 'help/:tag', name: 'help', component: help,props:true ,meta:{ispublic:true }},
      { path: 'search', name: 'search', component: search,meta:{ispublic:true }},
      { path: 'helpcontent/:id', name: 'helpcontent', component: helpcontent,props:true, meta:{ispublic:true}},
      { path: 'activitycontent/:id', name: 'activitycontent', component: activitycontent,props:true, meta:{ispublic:true}},
      { path: 'newscontent/:id', name: 'newscontent', component: newscontent,props:true, meta:{ispublic:true}},
      { path: 'news', name: 'news', component: news, meta:{ispublic:true}},
      { path: 'activity', name: 'activity', component: activity, meta:{ispublic:true}},
      { path: 'fankui', name: 'fankui', component: fankui, meta:{ispublic:true}},
      { path: 'jubao', name: 'jubao', component: jubao, meta:{ispublic:true}},
      { path: 'shensu', name: 'shensu', component: shensu, meta:{ispublic:true}},
      {
        path: 'admin', name: 'adminindex',  component: adminindex, children: [
          { path: '', name: 'adminhome', component: adminhome },
          { path: 'myself', name: 'myself', component: myself },
          { path: 'createhelp', name: 'createhelp', component: createhelp },
          { path: 'notice', name: 'notice', component: notice },
          { path: 'personmessage', name: 'personmessage', component: PersonMessage },

          { path: 'updatehelp/:id', name: 'createhelp', component: createhelp ,props:true},
          { path: 'createhelplist', name: 'createhelplist', component: createhelplist },
          { path: 'updateactivity/:id', name: 'updateactivity', component: createactivity ,props:true},
          { path: 'createactivitylist', name: 'createactivitylist', component: createactivitylist },
          { path: 'createactivity', name: 'createactivity', component: createactivity },
          { path: 'createarticle', name: 'createarticle', component: createarticle },
          { path: 'updataarticle/:id', name: 'updataarticle', component: createarticle ,props:true},
          { path: 'articlelist', name: 'articlelist', component: articlelist },
        ]
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,Form,next)=>{
  //表示当路由跳转到的目标页面没有设置 meta 属性中的 ispublic 字段，即该页面需要用户登录才能访问时，
  if(!to.meta.ispublic&&!localStorage.web_jwt_token){
    return next('/home')
  }
  next()
})
export default router
