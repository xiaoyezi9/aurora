<template>
  <div>
    <el-card class="chatBox" :body-style="{ padding: '0px' }">
      <div class="loginChat" v-if="!isEnter">
        <img :src="avatar" alt="" />
        <span>{{ username }}</span>
        <button @click="loginChat">进入聊天室</button>
      </div>
      <room
          v-if="isEnter"
          :user="user"
          :userList="userList"
          ref="chatroom"
          @sendServer="sendServer"
          @activeSid="activeSid"
      />
    </el-card>
  </div>
</template>

<script>
import Room from "./ChatRoom";
//引入socket.io-client
import io from "socket.io-client";
import {mapActions} from "vuex";
export default {
  components: { Room },
  data() {
    return {
      username: "您还未登录",
      avatar: "http://localhost:8000/uplodes/avatar.jpg",
      uid: null,
      isEnter: false,
      socket: null,
      user: {},
      userList: [],
      sid: null,
    };
  },
  created() {
    let userInfo = window.sessionStorage.getItem("userInfo");
    userInfo = JSON.parse(userInfo);
    this.avatar = userInfo.avatar;
    this.username = userInfo.nickname;
    this.uid = userInfo.id;
  },
  mounted() {
    /**
     * 聊天室的主要功能
     */
    // 连接服务器
    this.socket = io('http://localhost:8000');
    // 监听登录失败的请求
    this.socket.on("loginfail", (data) => this.$message.error(data.msg));
    // 监听登录成功的请求
    this.socket.on("loginSuccess", (data) => {
      this.$message.success(data.msg);
      // console.log(data,'loginSuccess')
      this.user = data; //返回登陆用户的数据
      this.isEnter = true;
    });

    this.socket.on("addUser", (data) => {
      // this.$store.commit("setJoinRoom", data);
      console.log(data,'adduser')
      this.setJoinRoom(data)
      this.$refs.chatroom ? this.$refs.chatroom.haveOneJoinRoom() : null;
    });

    this.socket.on("leaveroom", (data) =>  {
      // this.$store.commit("setLeaveRoom", data);
      // console.log(data,'leaveRoom')
      this.setLeaveRoom(data)
      this.$refs.chatroom ? this.$refs.chatroom.haveOneleaveRoom() : null;
    });
    // 监听用户列表的信息
    this.socket.on("userList", (data) => {
      console.log(data,'userList')
      this.userList = data;
    });

    // 监听聊天的消息
    this.socket.on("receiveMessage", (data) => {
      // 把接收到的消息显示到聊天窗口中
      this.$refs.chatroom.handleGroup(data);
    });

    // 一对一单聊消息
    this.socket.on("oneMsg", (data) => {
      // 把接收到的消息显示到聊天窗口中
      this.$refs.chatroom.handleOne(data);
    });

  },
  //组件销毁断开连接
  destroyed() {
    if (this.socket) this.socket.disconnect();
  },
  methods: {
    ...mapActions('chat',['setJoinRoom','setLeaveRoom','setAvatar']),
    loginChat() {
if(this.username=='您还未登录'){
  this.$message.warning("请您登录");

}else{
  this.socket.emit("login", {
    id: this.uid,
    username: this.username,
    avatar: this.avatar,
  });
}


    },

    activeSid(sid) {
      this.sid = sid;
    },
    sendServer(content, isGroup) {
      const { username, avatar, sid } = this.user;
      if (isGroup) {
        this.socket.emit("sendMessage", { username, avatar, msg: content });
      } else {
        const tosid = this.sid;
        this.socket.emit("oneMessage", {
          username,
          avatar,
          sid,
          tosid,
          msg: content,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.chatBox {
  position: relative;
  width: 900px;
  height: 550px;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;
  border: none;
}
.loginChat {
  width: 900px;
  height: 550px;
  background-image: linear-gradient(
      to right top,
      #a98fb3,
      #a08fb9,
      #9490bd,
      #8691c1,
      #7593c4
  );
  img {
    width: 100px;
    height: 100px;
    top: 140px;
    border-radius: 50px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  span {
    position: absolute;
    display: block;
    left: 50%;
    transform: translateX(-50%);
    font-size: 18px;
    font-weight: 700;
    top: 250px;
    color: #ffffff;
  }
  button {
    width: 135px;
    height: 47px;
    font-size: 20px;
    top: 330px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    background-color: rgb(157, 82, 226);
    cursor: pointer;
    border: none;
    border-radius: 50px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  }
}
</style>