 
<template>
  <div class="help">
    <div v-title data-title="新闻"></div>

    <!-- Start of Page Container -->
    <div class="page-container">
      <div class="container">
        <div class="row">
          <!-- start of page content -->
          <div class="span8 page-content">
            <div class="page-header">
              <h3>
                文章/新闻
              </h3>
            </div>
            <!-- Basic Home Page Template -->
            <ul class="tabs-nav">
              <li
                :class="pagelistquery.lable===''&&pagelistquery.tag===''?'active':''"
                @click="changelable('')"
              >
                <a>全部</a>
              </li>
              <li
                v-for="(lable,id) in lables"
                :key="id"
                :class="pagelistquery.lable===lable?'active':''"
                @click="changelable(lable)"
              >
                <a>{{lable}}</a>
              </li>

              <li v-if="pagelistquery.tag!=''" class="active" @click="changelable('')">
                <a>{{this.pagelistquery.tag}}</a>
              </li>
            </ul>

            <article
              class="format-standard type-post hentry clearfix"
              v-for="(item,id) in tableData"
              :key="id"
            >
              <header class="clearfix">
                <h3 class="post-title">
                  <router-link :to="'/newscontent/'+item.article_id">{{item.article_title}}</router-link>
                </h3>

                <div class="post-meta clearfix">
                  <span class="date">{{ item.article_createtime| dataFormat}}</span>
                  <span class="category">
                    <a href="#" title="View all posts in Server &amp; Database">{{item.nickname}}</a>
                  </span>
                  <span class="comments">
                  </span>
                  <span class="like-count">
                      <a class="iconfont">&#xe61c;</a>{{item.article_read_num}}
                  </span>
                </div>
                <!-- end of post meta -->
              </header>

              <p>
                {{item.article_introduction}}
                <router-link :to="'/newscontent/'+item.article_id" class="readmore-link">...查看更多</router-link>
              </p>
            </article>

            <el-pagination
              @current-change="handleCurrentChange"
              layout="prev, pager, next"
              :total="pagelistquery.total"
            ></el-pagination>
          </div>

          <aside class="span4 page-sidebar">
            <carousel />
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import carousel from "@/components/carousel.vue";

export default {
  name: "news",
  components: {
    carousel,
  },
  data() {
    return {
      lables: [],
      pagelistquery: {
        lable: "",
        tag: "",
        total: 0,
        pagesize: 5,
        page: 1
      },
      tableData: {}
    };
  },
  props: {
    tag: {}
  },
  methods: {
    changelable(lable) {
      this.pagelistquery.lable = lable;
      this.pagelistquery.tag = "";
      this.getarticlelist();
    },
    changetag() {
      this.pagelistquery.tag = this.tag;
    },
    handleCurrentChange(val) {
      this.pagelistquery.page = val;
      this.getarticlelist();
      console.log(`当前页: ${val}`);
    },

    async getarticlelist() {
      let res = await this.$API.reqGetArticleList(
        this.qs.stringify(this.pagelistquery)
      );
      if (res.data.state.type === "SUCCESS") {
        this.tableData = res.data.data;
        console.log(res.data);
        this.pagelistquery.total = res.data.count;
      }
    },

    async lablelist() {
      let res = await this.$API.reqLabelList(
        this.qs.stringify({ lable_name: "文章分类" })
      );
      if (res.data.state.type === "SUCCESS") {
        this.lables = JSON.parse(res.data.data[0].lable);
      }
    }
  },
  created() {
    this.tag && this.changetag();
    this.getarticlelist();
    this.lablelist();
  }
};
</script>
<style>
.help {
  min-height: 200px;
}
</style>