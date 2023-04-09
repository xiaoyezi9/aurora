<template>
  <div class="home">
    <div v-title data-title="搜索"></div>

    <!-- Start of Page Container -->
    <div class="page-container">
      <div class="container">
        <div class="row">
          <!-- start of page content -->
          <div class="span8 page-content">
            <h3>
              有关
              <span style="color:#1890ff">{{search}}</span>
              的搜素结果
            </h3>
            <div v-if="tableData.help==''&&tableData.activity==''&&tableData.article==''">
              <img src="../assets/images/noinfo.png" width="100%" alt />
              <div style="width:100%;text-align:center">
                没有找到有关
                <span style="color:#1890ff">{{search}}</span> 的搜素结果
              </div>
            </div>


            <!--starthelp-->
            <section class="widget" v-if="tableData.help.length!==0">
              <div class="row">
                <ul class="articles">
                  <li class="article-entry standard" v-for="(item,id) in tableData.help" :key="id">
                    <h4>
                      <router-link :to="'/helpcontent/'+item.help_id" v-html="item.titlewraper"></router-link>
                    </h4>
                    <span class="article-meta">
                      <a class="iconfont">&#xe619;</a>
                      {{item.createtime| dataFormat}}
                      <a
                        class="iconfont"
                        style="margin-left:50px"
                      >&#xe688;</a>
                    </span>

<!--                    <span class="like-count">-->
<!--                      <span class="like-count">-->
<!--                        <a class="iconfont">&#xe61c;</a>0-->
<!--                      </span>-->
<!--                    </span>-->
                  </li>
                </ul>
              </div>
            </section>
            <!--end help-->


            <!--activity-->
            <section class="widget" v-if="tableData.activity.length!==0">
              <div class="row">
                <ul class="articles">
                  <li
                    class="article-entry standard"
                    v-for="(activity,id) in tableData.activity"
                    :key="id"
                  >
                    <h4>
                      <router-link
                        :to="'/activitycontent/'+activity.activity_id"
                        v-html="activity.titlewraper"
                      ></router-link>
                    </h4>
                    <span class="article-meta">
                      <a class="iconfont">&#xe619;</a>
                      {{activity.createtime|dataFormat}}
                      <a
                        class="iconfont"
                        style="margin-left:50px"
                      >&#xe609;</a>
                      {{activity.activity_locale}}
                    </span>
                    <span class="like-count">
                      <a class="iconfont">&#xe61c;</a>
                      {{activity.activity_num}}
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            <!--article-->
            <section class="widget" v-if="tableData.article.length!==0">
              <div class="row">
                <article
                  class="format-standard type-post hentry clearfix"
                  v-for="(item,id) in tableData.article"
                  :key="id"
                >
                  <header class="clearfix">
                    <h3 class="post-title">
                      <router-link :to="'/newscontent/'+item.article_id" v-html="item.titlewraper"></router-link>
                    </h3>

                    <div class="post-meta clearfix">
                      <span class="date">{{ item.article_createtime| dataFormat}}</span>
                      <span class="category">
                        <a
                          href="#"
                          title="11"
                        >{{item.nickname}}</a>
                      </span>
<!--                      <span class="comments">-->
<!--                        <a-->
<!--                          href="#"-->
<!--                          title="C"-->
<!--                        ></a>3-->
<!--                      </span>-->
<!--                      <span class="like-count">66</span>-->
                    </div>
                    <!-- end of post meta -->
                  </header>
<!--                  文章的介绍-->
                  <p v-html="item.introductionwraper">
                    <router-link :to="'/newscontent/'+item.article_id" class="readmore-link">...查看更多</router-link>
                  </p>
                </article>
              </div>
            </section>

<!--右侧-->
          </div>
          <aside class="span4 page-sidebar">
            <section class="widget">
              <div class="support-widget">
                <h3 class="title">搜索功能</h3>
                <p class="intro">搜索含有关键字的信息</p>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>
<script>



export default {
  name: "search",
  components: {

  },
  data() {
    return {
      tableData: [],
      search: ""
    };
  },

  methods: {
    // 关键字高亮
    wraperkeyword(k, v) {
      console.log(k,v)
      function highlight(value) {
        console.log(value,111);
        return `<span style="color:#1890ff">${value}</span>`;
      }
//replace方法第二个参数为函数的话有四个参数，分别表示被匹配到的子串、捕获的分组、匹配的位置、原始字符串等信息
      return v.replace(new RegExp(this.search, "ig"), v => highlight(v));
    },
    // 搜索列表
    async searchlist() {
      this.search = this.$route.query.search;
      let res = await this.$API.reqSearch(this.qs.stringify({ search: this.search }));
      if (res.data.state.type === "SUCCESS") {
        this.tableData = res.data.data;
//对数据进行处理
        this.tableData.help.forEach(element => {
          element.titlewraper = this.wraperkeyword(
            "help_title",
            element.help_title
          );
        });
        this.tableData.activity.forEach(element => {
          element.titlewraper = this.wraperkeyword(
            "activity_title",
            element.activity_title
          );
        });
        this.tableData.article.forEach(element => {
          element.titlewraper = this.wraperkeyword(
            "article_title",
            element.article_title
          );
          element.introductionwraper = this.wraperkeyword(
            "article_introduction",
            element.article_introduction
          );
        });

      }
    }
  },
  created() {
    this.searchlist();
  },
  watch: {
    $route(to, from) {
      this.searchlist();
    }
  }
};
</script>
<style>
.guomore {
  float: right;
}
</style>