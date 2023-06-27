<template>
  <div class="chatRoom" ref="room">

    <div class="chatList">
      <div class="avatar">
        <img v-img-lazy='user.avatar' :src="user.avatar" alt="" />
        <span>{{ user.username }}</span>
      </div>
      <el-divider></el-divider>

      <div
          class="group"
          :class="isGroup ? 'active-user' : ''"
          @click="chooseGroup"
      >
        <img src="../assets/img/star.png" alt="" />
        <span>公共聊天室</span>
      </div>

      <div class="listTop">
        <span>在线用户列表</span>
      </div>
      <div class="userChat">
        <div
            class="userBox"
            :class="active === index ? 'active-user' : ''"
            @click="chooseUser(item, index)"
            v-for="(item, index) in userList"
            :key="index"
        >
          <img :src="item.avatar" alt="" />
          <span>{{ item.username }}</span>
        </div>
      </div>
    </div>


    <div class="roomRight">
      <p class="name" v-if="isGroup">聊天室({{ userListLength }})</p>
      <p class="name" v-else>{{ username }}</p>

      <div class="chatContent">
        <ul class="join" ref="joinUs">
          <li
              v-for="(item1, index) in messageContent"
              :key="index"
              :class="{
              'my-message': item1.type === 1 ? true : false,
              'other-message': item1.type === 2 ? true : false,
            }"
          >
            <div v-if="item1.type === 3">
              欢迎{{ item1.username }}加入聊天室
            </div>
            <div v-if="item1.type === 4">{{ item1.username }}离开了聊天室</div>

            <div v-if="item1.type === 1">
<!--本人消息-->
              <span >{{ item1.msg }}</span>
              <img :src="item1.avatar" class="avatar" />
            </div>
<!--其他人消息-->
            <div v-if="item1.type === 2">
              <img :src="item1.avatar" alt class="avatar" />
              <p class="username">{{ item1.username }}</p>
              <p class="content" >{{ item1.msg }}</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="sendMessage">
        <textarea
            style="width: 660px;"
            cols="200"
            rows="6"
            ref="textarea"
            @keydown.enter="handlePress"
        ></textarea>
<!--        <button class="sendMessage" @click="sendContentToServe">发送</button>-->
        <img :src="imgUrl" alt />
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
export default {
  name: "Room",
  props: {
    user: Object,
    userList: Array,
  },
  data() {
    return {
      messageContent: [], //0不渲染，1表示自己发出的信息，2表示别人发出的信息
      groupContent: [],
      oneContent: [], //存放私聊信息
      content: "", // 输入框的内容
      isGroup: true, // 是否是群聊
      active: null, // 当前聊天用户
      username: null, // 当前聊天用户名
    };
  },
  computed: {
    //计算用户数量
    userListLength() {
      return this.userList.length;
    },
    ...mapState({
      joinRoom:state=>state.chat.joinRoom,
      leaveRoom:state => state.chat.leaveRoom
    })
  },

  mounted() {
    this.userList.forEach((val, i) => {
      this.oneContent[i] = [];
    });
  },

  updated() {
    // 聊天定位到底部
    this.handleScrollBottom();
  },
  watch: {
    groupContent: {
      handler(val) {
        this.messageContent = val;
      },
      deep: true,
    },
    oneContent: {
      handler(val) {
        this.messageContent = val;
      },
      deep: true,
    },
  },

  methods: {
    // 监听键盘按下事件
    handlePress(e) {
      if (e.ctrlKey && e.keyCode == 13) {
        //用户点击ctrl+enter触发换行
        this.$refs.textarea.value += "\n";
      } else {
        //用户点击了enter触发发送消息
        this.sendContentToServe();
      }
    },

    // 处理收到的群聊消息
    handleGroup(data) {
      this.isGroup = true;
      this.active = null;
      this.handleMessageBox(data);
    },
    // 处理收到的单聊消息
    handleOne(data) {
      this.isGroup = false;
      this.userList.forEach((val, i) => {
        if (val.username == data.username) {
          this.active = i;
          this.username = val.username;
        }
      });
      this.$emit("activeSid", data.sid);
      this.handleMessageBox(data);
    },


    //处理用户进入聊天室
    haveOneJoinRoom() {
      this.groupContent.push({ ...this.joinRoom, type: 3 });
    },
    //处理用户离开聊天室
    haveOneleaveRoom() {
      this.groupContent.push({ ...this.leaveRoom, type: 4 });
    },

    // 发送信息
    sendContentToServe() {
      // 获取到聊天的内容
      this.content = this.$refs.textarea.value;
      if(this.content.length>50){
        return alert("消息过长，无法发送");
      }
      this.$refs.textarea.value = "";
      if (!this.content) {
        return alert("请输入内容");
      }
      //发送给服务器
      this.$emit("sendServer", this.content, this.isGroup);
      let msg = this.content;
      if (!this.isGroup) {
        this.oneContent.push({ ...this.user, msg, type: 1 });
      }
    },

    // 分类显示聊天窗口中的内容
    handleMessageBox(newValue) {
      // 群组消息
      if (this.isGroup) {
        if (newValue.username === this.user.username) {
          //是自己发的信息
          this.groupContent.push({ ...newValue, type: 1 });
        } else {
          //是别人发的信息
          this.groupContent.push({ ...newValue, type: 2 });
        }
        this.messageContent = this.groupContent;
      } else {
        // 单人消息
        if (this.oneContent.length > 1) {
          let user = this.oneContent[this.oneContent.length - 1];
          if (newValue.username !== user.username) {
            this.oneContent = [];
          }
        }
        this.oneContent.push({ ...newValue, type: 2 });
        this.messageContent = this.oneContent;
      }
    },

    handleScrollBottom() {
      const ul = this.$refs.joinUs;
      ul.scrollTop = ul.scrollHeight;
    },
    // 点击群聊进入群聊房间
    chooseGroup() {
      this.active = null;
      this.isGroup = true;
      this.$refs.textarea.value = "";
      this.messageContent = this.groupContent;
    },
    // 点击用户进行单聊
    chooseUser(user, index) {
      //不能选择自己
      if (user.username == this.user.username) return;
      this.isGroup = false;
      if (this.active !== index) {
        this.active = index;
        this.oneContent = [];
        this.username = user.username;
        this.$refs.textarea.value = "";
        this.$emit("activeSid", user.sid);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.chatRoom {
  display: flex;
  .chatList {
    width: 185px;
    height: 530px;
    padding: 20px 0 0 20px;
    border-radius: 15px;
    background-image: linear-gradient(
        to right top,
        #a98fb3,
        #a08fb9,
        #9490bd,
        #8691c1,
        #7593c4
    );
    .avatar {
      position: relative;
      span {
        position: absolute;
        left: 53px;
        top: 2px;
        font-size: 15px;
        color: #fff799;
      }
      img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
      }
    }
    .el-divider {
      margin: 10px auto;
    }
    .group {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      margin-right: 10px;
      cursor: pointer;
      box-sizing: border-box;
      img {
        width: 60px;
        height: 60px;
        margin-right: 8px;
      }
      span {
        font-size: 18px;
        color: #fff;
      }
    }

    .active-user {
      border: 2px solid #ccc;
      border-radius: 14px;
      color: #fff799;
    }

    .listTop {
      span {
        color: #fff;
        display: block;
        margin-bottom: 10px;
        font-weight: 700;
        font-size: 16px;
      }
      padding-left: 5px;
    }
    .userChat {
      overflow: auto;
      height: 350px;
      padding-left: 5px;
      margin-right: 10px;
      box-sizing: border-box;
      .userBox {
        display: flex;
        align-items: center;
        height: 60px;
        cursor: pointer;
        img {
          width: 50px;
          height: 50px;
          margin-right: 10px;
          border-radius: 50%;
        }
        span {
          font-size: 15px;
          color: #fff;
        }
      }
    }
    .userChat::-webkit-scrollbar {
      display: none;
    }
  }
}

.roomRight {
  flex: 1;
  background-color: #f6f6f6;
  display: flex;
  flex-direction: column;
  .name {
    display: flex;
    justify-content: center;
    line-height: 40px;
    margin-block-start: 0;
    margin-block-end: 0;
    font-size: 18px;
    border-bottom: 1px solid rgba(100, 100, 100, 0.3);
  }
  .chatContent {
    height: 340px;
    padding: 5px 0;
    .join {
      text-align: center;
      color: #ccc;
      overflow: auto;
      height: 100%;
      margin-bottom: 0;
      margin-top: 0;
      padding: 10px 30px 0;
      list-style: none;
      li {
        padding-bottom: 10px;
      }
    }
    .join::-webkit-scrollbar {
      display: none;
    }
    .my-message {
      display: flex;
      justify-content: flex-end;
      div {
        display: flex;
        position: relative;
        &::after {
          content: "";
          right: 45px;
          top: 50%;
          transform: translateY(-50%);
          position: absolute;
          border-left: 6px solid #9eea6a;
          border-top: 6px solid transparent;
          border-bottom: 6px solid transparent;
          border-right: 6px solid transparent;
        }
        .avatar {
          width: 45px;
          height: 45px;
          border-radius: 5px;
        }
        span {
          overflow: auto;
          box-sizing: border-box;
          display: inline-block;
          border-radius: 5px;
          line-height: 30px;
          background-color: #9eea6a;
          color: #000b00;
          font-weight: 700;
          padding: 5px;
          padding-top:7px;
          margin-right: 10px;
          min-width: 45px;
          max-width: 500px;
        }
      }
    }
    .other-message {
      position: relative;
      display: flex;
      justify-content: flex-start;
      div {
        display: flex;
        position: relative;
        margin-bottom: 20px;
        &::before {
          content: "";
          left: 45px;
          top: 34%;
          transform: translateY(-50%);
          position: absolute;
          border-left: 5px solid transparent;
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
          border-right: 5px solid #ccc;
        }

        .avatar {
          width: 45px;
          height: 45px;
        }
        .username {
          position: absolute;
          left: 2px;
          top: -25px;
          font-size: 12px;
          font-weight: 700;
          color: #888;
        }
        .content {
          overflow: auto;
          margin-top: 1px;
          box-sizing: border-box;
          display: inline-block;
          border-radius: 5px;
          line-height: 30px;
          background-color: #fff;
          color: #000b00;
          font-weight: 700;
          padding: 5px;
          margin-left: 10px;
          border: 1px solid #ccc;
          min-width: 45px;
          max-width: 500px;
        }
      }
    }
  }
  .sendMessage {
    position: relative;
    flex: 1;
    background-color: #fff;
    padding-left: 15px;
    textarea {
      border: none;
      resize: none;
      outline: none;
      font-size: 15px;
      padding-left: 10px;
    }
    textarea::-webkit-scrollbar {
      display: none;
    }
    .sendMessage {
      position: absolute;
      bottom: 35px;
      right: 20px;
      font-size: 16px;
      border-radius: 5px;
      padding: 4px 10px;
      background-color: #f5f5f5;
      border: 1px solid #ccc;
    }
  }
}
</style>