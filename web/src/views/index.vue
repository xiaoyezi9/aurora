<template>
  <div class="index">
    <!-- Start of Header -->
    <div class="header-wrapper">
      <header>
        <div class="container">
          <div class="logo-container">
            <span style="font-size: 35px;color: white;margin-right: 5px">Aurora</span>
            <span class="tag-line" style="font-size: 18px">交友平台</span>
          </div>
          <!-- 导航栏 -->
          <nav class="main-nav">
            <div class="menu-top-menu-container">
              <ul id="menu-top-menu" class="clearfix">
<!--                默认情况下router-link是渲染a标签， tag指定渲染li标签-->
                <router-link to="/" tag="li" exact-active-class="current-menu-item">
                  <a>首页</a>
                </router-link>
                <router-link to="/help" tag="li" exact-active-class="current-menu-item">
                  <a>问答</a>
                </router-link>
                <router-link to="/activity" tag="li" exact-active-class="current-menu-item">
                  <a>活动</a>
                </router-link>
                <router-link to="/news" tag="li" exact-active-class="current-menu-item">
                  <a>文章/新闻</a>
                </router-link>
                <router-link to="/chat" tag="li" exact-active-class="current-menu-item">
                  <a>聊天室</a>
                </router-link>
                <li v-if="avatar==''">
                  <a @click="closein">登录/注册</a>
                </li>

                <el-dropdown v-else>
                  <a style="color: #c1cad1;">
<!--                    头像-->
                    <img
                      v-if="unread==0"
                      style="height: 20px; "
                      :src="avatar"
                      class="avatar touxiang avatar-60 photo"
                      height="20"
                      width="20"
                    />
                    <el-badge v-else :value="unread" class="item">
                      <img
                        style="height: 20px; "
                        :src="avatar"
                        class="avatar touxiang avatar-60 photo"
                        height="20"
                        width="20"
                      />
                    </el-badge>
                    {{nickname}}
                  </a>
                  <!--       登录成功后的下拉框-->
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                      <router-link to="/admin" tag="a" exact-active-class="current-menu-item">个人管理</router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <router-link
                        to="/admin/notice"
                        tag="li"
                        exact-active-class="current-menu-item"
                      >
                        <a v-if="unread==0">消息管理</a>
                        <el-badge v-else :value="unread" class="item">
                          <a>消息中心</a>
                        </el-badge>
                      </router-link>
                    </el-dropdown-item>
                    <el-dropdown-item>
                      <a @click="logout">退出登录</a>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>

              </ul>
            </div>

            <select
              v-model="selected"
              @change="changeHref(parseInt(selected))"
              class="responsive-nav"
            >
              <option value="1">首页</option>
              <option value="2">问答</option>
              <option value="3">活动</option>
              <option value="4">聊天室</option>
              <option value="5">登录/注册</option>
            </select>
          </nav>

        </div>
      </header>
    </div>

    <div class="search-area-wrapper">
      <div class="search-area container">
        <h3 class="search-header">一起来探索吧</h3>
<!--onSubmit阻止默认行为-->
        <form class="search-form clearfix" @submit.prevent="onSubmit">
          <input
            class="search-term required"
            type="text"
            v-model="search"
            placeholder="请输入内容"
          />
          <input class="search-btn" type="submit" @click="searchbtn" value="搜索" />
          <div id="search-error-container"></div>
        </form>
      </div>
    </div>

    <router-view />

    <foot />

    <!-- 登录弹出框组件 -->
    <div class="login" v-if="isclose">
      <div id="mask"></div>
      <div id="loginBox">
        <h2>{{islogin?"网站登录":"新用户注册"}}</h2>
        <div class="user">
          账 号：
          <input type="text" v-model="username" name="username" class="text" />
        </div>
        <div class="pass">
          密 码：
          <input type="password" v-model="password" name="password" class="text" />
        </div>
        <div class="pass" v-if="!islogin">
          确 认：
          <input type="password" v-model="password1" name="password" class="text" />
        </div>
        <div class="button" v-if="islogin">
          <input type="button" @click="login" value="登录" class="submit" />
        </div>
        <div class="button" v-else>
          <input type="button" value="注册" @click="registered" class="submit" />
        </div>
<!--        切换登录还是注册-->
        <div class="other" @click="join">{{islogin?"注册新用户":"快去登录"}}</div>
<!--        控制弹出框的开关-->
        <a class="iconfont" @click="close">&#xe608;</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import foot from "@/components/foot.vue";
import moment from "moment";

export default {
  name: "index",
  components: {
    foot
  },
  data() {
    return {
      selected: 1,
      password: "",
      password1: "",
      username: "",
      hover: false,
      search: ""
    };
  },
  computed: {
    ...mapState({
      isclose: state => state.user.isclose,
      islogin: state => state.user.islogin, //默认true-为登录框,false-注册框
      avatar: state => state.user.userinfo.avatar,
      nickname: state => state.user.userinfo.nickname,
      unread: state => state.user.unread
    })
  },
  methods: {
    ...mapActions("user", [
      "setUserInfo",
      "changeislog",
      "setToken",
      "join",
      "close",
      "setunread",
      "deleteuserinfo"
    ]),

// 跳转页面
    changeHref(sortnum) {
      switch (sortnum) {
        case 1:
          this.$router.push({ path: "/" });
          break;
        case 2:
          this.$router.push({ path: "/help" });
          break;
        case 3:
          this.$router.push({ path: "/activity" });
          break;
        case 4:
          this.$router.push({ path: "/chat" });
          break;
        case 5:
          this.close();
          break;
      }
    },
    //退出登录
    logout() {
      // 清除token
      this.deleteuserinfo();
      sessionStorage.removeItem('userInfo')
      this.$message.success("退出成功");
    },

    //切换登录/注册
    joinin() {
      this.join();
    },
    // 控制登录/注册弹出框的出现
    closein() {
      this.close();
    },
//阻止浏览器默认行为
    onSubmit() {
      return false;
    },

    searchbtn() {
      if (this.search == "") {
        this.$message.error("关键字不能为空");
        return;
      }
      this.$router.push({ path: "/search", query: { search: this.search } });
      this.search=''
    },
    // 注册
    registered() {
      const userReg = /^[1-9a-zA-Z]{1}[0-9a-zA-Z]{5,9}$/; //6-10位字母数字
      const pwdReg = /^[a-zA-Z]\w{5,17}$/; //6-18位字母数字下划线 字母开头
      if (!userReg.test(this.username)) {
        this.$message.error("账号为6-10位字母数字字母");
        return;
      }
      if (!pwdReg.test(this.password)) {
        this.$message.error("密码为6-18位字母数字或下划线 字母开头");
        return;
      }
      if (this.password !== this.password1) {
        this.$message.error("两次密码不相等");
        return;
      }
      let obj = {
        password: this.password,
        username: this.username
      };
      this.$API.reqRegister(this.qs.stringify(obj)).then(res => {
          let data = res.data;
          if (data.state.type !== "SUCCESS") {
            if (data.state.type == "ERROR_PARAMS_EXIST") {
              this.$message.error("用户名重复");
            } else {
              this.$message.error("注册失败");
            }
            return;
          }
          this.$message.success("注册成功请登录");
          this.join();
        })
        .catch(e => {
          this.$message.error(e);
        });
    },

    //登录
    login() {
      if (this.password == "" || this.password == "") {
        this.$message.error("账号或者密码为空");
        return;
      }
      let obj = {
        password: this.password,
        username: this.username,
        type: ""
      };
      this.$API.reqLogin(this.qs.stringify(obj))
        .then(res => {
          let data = res.data.data;
          if (res.data.state.type === "SUCCESS") {
            this.$message.success("登录成功");
            this.setUserInfo(data.userinfo);
            this.setToken(data.token);
            sessionStorage.setItem('userInfo',JSON.stringify(data.userinfo))
            this.changeislog();
            console.log(data);
            this.close();
          }
          if (res.data.state === "s") {
            let time = moment(res.data.data).format("YYYY-MM-DD HH:mm");
            this.$message.error(`您的账号由于不良行为被限制登录至${time}`);
          }
          if (res.data.state.type === "ERROE")
            this.$message.error("用户名或密码错误");
        })
        .catch(e => {
          this.$message(e);
        });
    },
    // 获取通知
    async getnocitenmu() {     
          const res = await this.$API.reqNotice(this.qs.stringify({ num: 1 }));
          this.setunread(res.data.data.count);
    }
  },
  created() {
     // token读取不到就执行
     localStorage.web_jwt_token&&this.getnocitenmu();
  }
};
</script>

<style scoped>
.header-btn {
  background-color: #2c696d;
  font-size: 14px;
  line-height: 19px;
  font-weight: 600;
  padding: 14px 30px 15px;
  color: #fff;
  display: table;
  margin: 0 auto;
}
#mask {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  filter: alpha(Opacity=30);
  opacity: 0.2;
  margin: 0;
  /* display: none;  */
}
#loginBox {
  position: fixed;
  left: 50%; /* 定位父级的50% */
  top: 50%;
  transform: translate(-50%, -50%); /*自己的50% */
  z-index: 1000;
  width: 380px;
  height: 330px;
  border: 1px solid #ccc;
  background-color: #fff;
  /* display: none;  */
}
#loginBox h2 {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  letter-spacing: 1px;
  color: #666;
  /* background: url(../images/login_header.png) repeat-x; */
  margin: 0;
  padding: 0;
  border-bottom: 1px solid #ccc;
  margin: 0 0 20px 0;
}
#loginBox h2 img {
  display: block;
  float: right;
  position: relative;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
#loginBox .user,
#loginBox .pass {
  font-size: 14px;
  color: #666;
  padding: 5px 0;
  text-align: center;
}
#loginBox input.text {
  width: 200px;
  height: 25px;
  font-size: 14px;
  border: 1px solid #ccc;
  background-color: #fff;
}
#loginBox .button {
  text-align: center;
  padding: 10px 0;
}
#loginBox input.submit {
  width: 107px;
  height: 30px;
  background-color: rgb(179, 146, 233);
  border: none;
  cursor: pointer;
}
#loginBox .other {
  text-align: right;
  padding: 15px 10px;
  font-size: 14px;
  color: #666;

  cursor: pointer;
}
.iconfont {
  font-size: 20px;
  color: #000;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}
</style>

