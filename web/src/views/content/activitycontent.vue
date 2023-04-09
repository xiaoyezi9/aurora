<template>
  <div class="activitycontent">
    <div v-title data-title="活动详情"></div>
    <div class="page-container">
      <div class="container">
        <div class="row">
          <div class="span8 page-content">
            <el-page-header @back="$router.back(-1)" content="活动详情"></el-page-header>
            <article class="type-post format-standard hentry clearfix">
              <h3>{{content.activity_title}}</h3>
              <div>
                <div class="show_unit fl ativity">
                  <a class="iconfont ic">&#xe622;</a>
                  <a class="tagname">活动名称:</a>
                  {{content.activity_title}}
                </div>
                <el-popover placement="left" width="400" trigger="hover">
                  <span>
                    <li class="comment even thread-odd thread-alt depth-1" id="li-comment-4">
                      <article id="comment-4">
                        <img
                          :src="content.avatar"
                          class="avatar touxiang avatar-60 photo"
                          height="60"
                          width="60"
                        />

                        <div class="comment-meta">
                          <h5 class="author">{{content.nickname}}</h5>
                          <p class="date" v-if="content.realstate==3">认证用户</p>
                          <p class="date" v-else>未认证用户</p>
                        </div>
                      </article>
                    </li>
                    <div class="xinxi">
                      <p style="  color: #000;">账号：</p>
                      <p>{{content.username}}</p>
                    </div>
                    <div class="xinxi">
                      <p style="  color: #000;">邮箱：</p>
                      <p>{{content.mail}}</p>
                    </div>
                    <div class="xinxi">
                      <p style="  color: #000;">QQ：</p>
                      <p>{{content.qq}}</p>
                    </div>
                    <div class="xinxi">
                      <p style="  color: #000;">个人简介：</p>
                      <p>{{content.synopsis}}</p>
                    </div>
                     <el-button
                      @click="jubao(content.username)"
                      style="margin:10px 150px"
                      type="danger"
                      plain
                    >举报</el-button>
                  </span>

                  <div slot="reference" class="show_unit fl ativity">
                    <a class="iconfont ic">&#xe66a;</a>
                    <a class="tagname">发起者:</a>
                    {{content.nickname}}
                  </div>
                </el-popover>


                <div class="show_unit fl ativity">
                  <a class="iconfont ic">&#xe62a;</a>
                  <a class="tagname">活动时间:</a>
                  {{content.activity_statetime| dataFormat}}——{{content.activity_endtime| dataFormat}}
                </div>
                <div class="show_unit fl ativity">
                  <a class="iconfont ic">&#xe62a;</a>
                  <a class="tagname">活动人数:</a>
                  {{content.activity_num}}
                </div>
                <div class="show_unit fl ativity">
                  <a class="iconfont ic">&#xe62a;</a>
                  <a class="tagname">活动地点:</a>
                  {{content.activity_locale}}
                </div>
                <div style="clear:both"></div>
              </div>
              <h3>活动描述</h3>
              <blockquote v-html="content.activity_content"></blockquote>
            </article>
            <el-button
              type="primary"
              @click="setjoin"
              style="width:80px;margin:0 auto;display:block;"
            >参加</el-button>

            <div class="block">
              <h3>活动公告</h3>
              <el-timeline>
                <el-timeline-item
                  v-for="(item,id) in announcementlist"
                  :key="id"
                  :timestamp="item.announcement_createtime | dataFormat"
                  placement="top"
                >
                  <el-card>
                    <h4>{{item.announcement_name}}</h4>
                    <p>{{item.announcement_content}}</p>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>

<!--            <div class="like-btn">-->
<!--              <form id="like-it-form" action="#" method="post">-->
<!--                <span class="like-it">0</span>-->
<!--                <input type="hidden" name="post_id" value="99" />-->
<!--                <input type="hidden" name="action" value="like_it" />-->
<!--              </form>-->
<!--            </div>-->

            <comment />
          </div>
          <aside class="span4 page-sidebar">
            <carousel />
            <activity />
          </aside>
          <!-- end of sidebar -->
        </div>
      </div>
    </div>
    <!-- End of Page Container -->
  </div>
</template>


<script>
import carousel from "@/components/carousel.vue";
import comment from "@/components/comment.vue";
import activity from "@/components/activity.vue";
import { mapState, mapActions } from "vuex";
import {reqActivityContent} from "@/api";

export default {
  name:'activitycontent',
  components: {
    carousel,
    comment,
    activity
  },
  computed: {
    ...mapState({
      contentuserid: state => state.contentuserid,
      commentnum: state => state.commentnum
    })
  },
  data() {
    return {
      data: {
        type: "", //类型
        name: "", //  名称
        describe: "", //  描述
        content_id: "",
        activity_title: "",
        to_userid: ""
      },
      dialogFormVisible: false, //弹框相关
      content: {},
      announcementlist: {}
    };
  },
  props: {
    id: {}
  },
  methods: {
    ...mapActions(["setcontentid", "setcontentinfo"]),
    jubao(username) {
      //获取当前页面url并对编码进行处理
      // let url=escape(window.location.href)
      let url=encodeURIComponent(window.location.href)
      console.log(url)
      this.$router.push({
        path: "/jubao",
        query : { user: username, url: url }
      });
    },
    //获取单个活动内容
    async getactivitycontent() {
      let data = {
        id: this.id
      };
      let res = await this.$API.reqActivityContent(
        this.qs.stringify(data)
      );
      if (res.data.state.type === "SUCCESS") {
        this.content = res.data.data;
        this.setcontentinfo({
          contentname: res.data.data.activity_title,
          contentuserid: res.data.data.user_id
        });
      }
    },
//参与活动
    async setjoin() {
      this.data.type = this.$route.name; //类型--路由里配置好了 这里是activitycontent
      this.data.contentname = this.content.activity_title;
      this.data.to_userid = this.contentuserid;
      this.data.content_id = this.content.activity_id;
      let res = await this.$API.reqSetJoin(
        this.qs.stringify(this.data)
      );
      if (res.data.state.type === "SUCCESS") {
        this.$message.success("参加成功");
      } else {
        this.$message.error("你已经报名参加了本项目");
      }
    },
    //获取公告列表
    async getannouncementlist() {
      let res = await this.$API.reqAnnouncementlist(
        this.qs.stringify({ content_id: this.id })
      );
      if (res.data.state.type === "SUCCESS") {
        this.announcementlist = res.data.data;
      }
    }
  },
  watch: {
    id: {
      handler(newVal) {
        this.getactivitycontent();
        this.getannouncementlist();
        this.setcontentid(this.id);
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.getannouncementlist();
    this.setcontentid(this.id);
  }
};
</script>
<style >
.activitycontent {
  min-height: 200px;
}
.tagname {
  margin-right: 16px;
  font-size: 18px;
}
</style>