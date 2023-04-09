import request from "./request";
//登录
export const reqLogin=(data) => {
    return  request({
        url:'/admin/login',
        method:'post',
data
    })
}
//获取图表数据
export const reqChartData=() => {
    return  request({
        url:'/admin/numbering',
        method:'post'
    })
}
//获取管理员信息
export const reqAdminInfo=() => {
    return  request({
        url:'/admin/getadmin',
        method:'post'
    })
}
//更新管理员信息
export const reqUpdateUserInfo=(data) => {
    return  request({
        url:'/admin/changeadminuser',
        method:'post',
        data
    })
}
//获取管理员列表
export const reqAdminList=(data) => {
    return  request({
        url:'/admin/getadminlist',
        method:'post',
        data
    })
}
//修改密码
export const reqChangePassword=(data) => {
    return  request({
        url:'/admin/changepassword',
        method:'post',
        data
    })
}
//注册管理员
export const reqRegister=(data)=>{
    return request({
        url: "/admin/registered",
        method: "post",
        data
    })
}
//删除管理员/用户
export const reqDelAdmin=(data) => {
    return  request({
        url:'/admin/deleteuser',
        method:'post',
        data
    })
}
//修改管理员权限
export const reqChangeAdminState=(data) => {
    return  request({
        url:'/admin/changeadminstate',
        method:'post',
        data
    })
}
//修改用户账号封禁时间
export const reqActivationDate=(data) => {
    return  request({
        url:'/admin/changeactivationdate',
        method:'post',
        data
    })
}
//用户认证处理
export const reqChangeState=(data) => {
    return  request({
        url:'/admin/changeuserstate',
        method:'post',
        data
    })
}
//获取用户列表
export const reqUserList=(data) => {
    return  request({
        url:'/admin/getuserlist',
        method:'post',
        data
    })
}
//获取内容列表（help,active,article）
export const reqGetContentList=(data) => {
    return  request({
        url:'/admin/contentexamine',
        method:'post',
        data
    })
}
//删除内容（help,active,article,comment,reply）
export const reqDelContent=(data) => {
    return  request({
        url:'/admin/admindelete',
        method:'post',
        data
    })
}
//修改审核状态（help,active,article,comment,reply）
export const reqChangeContentState=(data) => {
    return  request({
        url:'/admin/changecontentstate',
        method:'post',
        data
    })
}
//获取评论列表
export const reqCommentList=(data) => {
    return  request({
        url:'/admin/getcomment',
        method:'post',
        data
    })
}
//获取回复列表
export const reqReplyList=(data) => {
    return  request({
        url:'/admin/getreply',
        method:'post',
        data
    })
}
//获取标签列表
export const reqLableList=(data) => {
    return  request({
        url:'/admin/lablelist',
        method:'post',
        data
    })
}
//修改标签（add,del）
export const reqChangeLable=(data) => {
    return  request({
        url:'/admin/changelable',
        method:'post',
        data
    })
}
//获取轮播图
export const reqCarouselList=() => {
    return  request({
        url:'/admin/carousellist',
        method:'post'

    })
}
//修改轮播（add,update）
export const reqChangeCarousel=(data) => {
    return  request({
        url:'/admin/changecarousel',
        method:'post',
        data

    })
}
//删除轮播图
export const reqDelCarousel=(data) => {
    return  request({
        url:'/admin/deletecarouse',
        method:'post',
        data

    })
}
//获取反馈列表（申诉反馈都在这）
export const reqKefuList=(data) => {
    return  request({
        url:'/admin/kefullist',
        method:'post',
        data
    })
}
//删除
export const reqDelKefu=(data) => {
    return  request({
        url:'/admin/deletekefu',
        method:'post',
        data

    })
}
export const reqChangeFkState=(data) => {
    return  request({
        url:'/admin/changkefustate',
        method:'post',
        data

    })
}
//设置处理结果
export const reqSetFkResult=(data) => {
    return  request({
        url:'/admin/changresult',
        method:'post',
        data

    })
}