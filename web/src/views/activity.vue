<template>
  <div class="help">
    <div v-title data-title=" 活动"></div>

    <!-- Start of Page Container -->
    <div class="page-container">
      <div class="container">
        <div class="row">
          <!-- start of page content -->
          <div class="span8 page-content">
            <div>
              <h3 class="title">活动</h3>
            </div>
            <!-- Basic Home Page Template -->
            <ul class="tabs-nav">
              <li :class="pagelistquery.lable===''?'active':''" @click="changelable('')">
                <a>全部</a>
              </li>
<!--              标签-->
              <li
                v-for="(lable,id) in lables"
                :key="id"
                :class="pagelistquery.lable===lable?'active':''"
                @click="changelable(lable)"
              >
                <a>{{lable}}</a>
              </li>
            </ul>

            <section class="widget">
              <ul class="articles">
                <li class="article-entry standard" v-for="(activity,id) in tableData" :key="id">
                  <h4>
                    <router-link
                      :to="'/activitycontent/'+activity.activity_id"
                    >{{activity.activity_title}}</router-link>
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
                    <span class="like-count">
                      <a class="iconfont">&#xe61c;</a>{{activity.activity_read_num}}
                    </span>
                  </span>
                </li>
              </ul>
            </section>
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
  name:'activity',
  components: {
    carousel,
    // job
  },
  data() {
    return {
      lables: [],
      pagelistquery: {
        lable: "",
        total: 0,
        pagesize: 10,
        page: 1
      },
      tableData: {}
    };
  },
  methods: {
    // 切换标签
    changelable(lable) {
      this.pagelistquery.lable = lable;
      this.getactivitylist();
    },

    handleCurrentChange(val) {
      this.pagelistquery.page = val;
      this.gethelplist();
      console.log(`当前页: ${val}`);
    },
    //获取活动
    async getactivitylist() {
      let res = await this.$API.reqActivityList(
        this.qs.stringify(this.pagelistquery)
      );
      if (res.data.state.type === "SUCCESS") {
        this.tableData = res.data.data;
        console.log(res.data);
        this.pagelistquery.total = res.data.count;
      }
    },
    // 获取标签
    async lablelist() {
      let res = await this.$API.reqLabelList(
        this.qs.stringify({ lable_name: "活动分类" })
      );
      if (res.data.state.type === "SUCCESS") {
        this.lables = JSON.parse(res.data.data[0].lable);
      }
    }
  },

  created() {
    this.getactivitylist();
    this.lablelist();
  }
};
</script>
<style>
.help {
  min-height: 200px;
}
</style>