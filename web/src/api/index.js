import request from "./request";
export const reqCode=()=>{
    return  request({
        url:'/webadmin/sms',
        method:'post'
    })
}
//登录
export const reqRegister=(data) => {
    return  request({
        url:'/webadmin/registered',
        method:'post',
        data
    })
}
//登录
export const reqLogin=(data) => {
    return  request({
        url:'/webadmin/login',
        method:'post',
         data
    })
}
export const reqUpload=(data) => {
    return  request({
        url:'/upload',
        method:'post',
        data
    })
}
//获取通知
export const reqNotice=(data) => {
    return  request({
        url:'/web/getnotice',
        method:'post',
        data
    })
}
export const reqChangeNotice=(data) => {
    return  request({
        url:'/web/changenotice',
        method:'post',
        data
    })
}
export const reqSearch=(data) => {
    return  request({
        url:'/web/search',
        method:'post',
        data
    })
}
//获取轮播图
export const reqCarousellist=() => {
    return  request({
        url:'/admin/carousellist',
        method:'post'
    })
}
//获取活动列表
export const reqActivityList=(data) => {
    return  request({
        url:'/web/webgetwebactivitylist',
        method:'post',
        data
    })
}
//获取单个活动内容
export const reqActivityContent=(data) => {
    return  request({
        url:'/web/getactivitycontent',
        method:'post',
        data
    })
}
//获取活动公告
export const reqAnnouncementlist=(data) => {
    return  request({
        url:'/admin/announcementlist',
        method:'post',
        data
    })
}
//参与活动
export const reqSetJoin=(data) => {
    return  request({
        url:'/web/setjoin',
        method:'post',
        data
    })
}
// 获取求助列表
export const reqGetwebHelpList=(data) => {
    return  request({
        url:'/web/webgetwebhelplist',
        method:'post',
        data
    })
}
export const reqGetWebHelpList=(data) => {
    return  request({
        url:'/webadmin/getwebhelplist',
        method:'post',
        data
    })
}
export const reqHelpContent=(data) => {
    return  request({
        url:'/web/gethelpcontent',
        method:'post',
        data
    })
}
//获取文章列表
export const reqGetArticleList=(data) => {
    return  request({
        url:'/web/getarticlelist',
        method:'post',
        data
    })
}
//获取单个文章内容
export const reqArticleContent=(data) => {
    return  request({
        url:'/web/getarticlecontent',
        method:'post',
        data
    })
}
//获取标签列表
export const reqLabelList=(data) => {
    return  request({
        url:'/admin/lablelist',
        method:'post',
        data
    })
}
//获取评论列表
export const reqGetComment=(data) => {
    return  request({
        url:'/web/getcomment',
        method:'post',
        data
    })
}
export const reqSetComment=(data) => {
    return  request({
        url:'/web/setcomment',
        method:'post',
        data
    })
}
// 获取回复
export const reqGetReply=(data) => {
    return  request({
        url:'/web/getreply',
        method:'post',
        data
    })
}
//添加回复
export const reqSetreply=(data) => {
    return  request({
        url:'/web/setreply',
        method:'post',
        data
    })
}
//获取图表数据
export const reqUserNumbering=() => {
    return  request({
        url:'/webadmin/getusernumbering',
        method:'post'
    })
}

// 获取用户信息
export const reqGetUser=() => {
    return  request({
        url:'/webadmin/getuser',
        method:'post'

    })
}
//修改用户信息
export const reqUpdateUser=(data) => {
    return  request({
        url:'/webadmin/updatauser',
        method:'post',
        data
    })
}
//获取用户发布的求助
export const reqGetList=(data) => {
    return  request({
        url:'/webadmin/getwebhelplist',
        method:'post',
        data
    })
}
//Del用户发布的求助
export const reqDeleteHelp=(data) => {
    return  request({
        url:'/webadmin/deletehelp',
        method:'post',
        data
    })
}
//获取用户发布的求助的详细内容
export const reqGetHelpDetail=(data) => {
    return  request({
        url:'/webadmin/gethelpdetails',
        method:'post',
        data
    })
}
//用户发布求助
export const reqCreateHelp=(data) => {
    return  request({
        url:'/webadmin/createhelp',
        method:'post',
        data
    })
}

//用户编辑求助
export const reqUpdateHelp=(data) => {
    return  request({
        url:'/webadmin/updatehelp',
        method:'post',
        data
    })
}

//获取用户发布的文章
export const reqGetWebArticleList=(data) => {
    return  request({
        url:'/webadmin/articlelist',
        method:'post',
        data
    })
}
//Del用户发布的文章
export const reqDeleteArticle=(data) => {
    return  request({
        url:'/webadmin/deletearticle',
        method:'post',
        data
    })
}
//获取用户发布的文章的详细内容
export const reqGetArticleDetail=(data) => {
    return  request({
        url:'/webadmin/getarticledetails',
        method:'post',
        data
    })
}
//用户发布文章
export const reqCreateArticle=(data) => {
    return  request({
        url:'/webadmin/createarticle',
        method:'post',
        data
    })
}

//用户编辑文章
export const reqUpdateArticle=(data) => {
    return  request({
        url:'/webadmin/updatearticle',
        method:'post',
        data
    })
}

//获取用户发布的活动
export const reqGetWebActivityList=(data) => {
    return  request({
        url:'/webadmin/getwebactivitylist',
        method:'post',
        data
    })
}
// /获取用户参与的活动
export const reqJoinsList=() => {
    return  request({
        url:'/webadmin/joinslist',
        method:'post'
    })
}

//Del用户发布的活动
export const reqDeleteActivity=(data) => {
    return  request({
        url:'/webadmin/deleteactivity',
        method:'post',
        data
    })
}

//获取用户发布的活动的详细内容
export const reqGetActivityDetail=(data) => {
    return  request({
        url:'/webadmin/getactivitydetails',
        method:'post',
        data
    })
}

//用户发布活动
export const reqCreateActivity=(data) => {
    return  request({
        url:'/webadmin/createactivity',
        method:'post',
        data
    })
}

//用户编辑活动
export const reqUpdateActivity=(data) => {
    return  request({
        url:'/webadmin/updateactivity',
        method:'post',
        data
    })
}
//参与活动
export const reqwebSetJoin=(data) => {
    return  request({
        url:'/webadmin/setjoin',
        method:'post',
        data
    })
}
//取消参加活动
export const reqDeleteJoin=(data) => {
    return  request({
        url:'/webadmin/deletejoin',
        method:'post',
        data
    })
}
//获取活动公告列表
export const reqAnnouncementList=(data) => {
    return  request({
        url:'/admin/announcementlist',
        method:'post',
        data
    })
}

//发布活动公告
export const reqSetAnnouncement=(data) => {
    return  request({
        url:'/admin/setannouncement',
        method:'post',
        data
    })
}
//获取活动参与人员
export const reqGetWebJoinList=(data) => {
    return  request({
        url:'/admin/getwebjoinslist',
        method:'post',
        data
    })
}
export const reqGetJoinList=(data) => {
    return  request({
        url:'/webadmin/getwebjoinslist',
        method:'post',
        data
    })
}
//发送反馈内容
export const reqCreateFankui=(data) => {
    return  request({
        url:'/webadmin/createfankui',
        method:'post',
        data
    })
}
//举报
export const reqCreateJubao=(data) => {
    return  request({
        url:'/webadmin/createjubao',
        method:'post',
        data
    })
}
//申诉
export const reqCreateShensu=(data) => {
    return  request({
        url:'/webadmin/createshensu',
        method:'post',
        data
    })
}
///获取举报内容
export const reqJubaoContent=(data) => {
    return  request({
        url:'/webadmin/jubaocontent',
        method:'post',
        data
    })
}
//添加好友
export const reqaddFriend=(data) => {
    return  request({
        url:'/web/addfriends',
        method:'post',
        data
    })
}