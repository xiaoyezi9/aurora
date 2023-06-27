<template>
  <div  class="help">
<div v-title data-title="问答"></div>

    <div class="page-container">
      <div class="container">
        <div class="row">
          <div class="span8 page-content">
            <div >
              <h1>
                求助问答
              </h1>
            </div>
            <!-- Basic Home Page Template -->
            <ul class="tabs-nav">
              <li :class="pagelistquery.lable===''&&pagelistquery.tag===''?'active':''" @click="changelable('')">
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

<!--               <li v-if="pagelistquery.tag!=''"  class="active" @click="changelable('')">-->
<!--                <a>{{this.pagelistquery.tag}}</a>-->
<!--              </li>-->

            </ul>
            <section class="widget">
              <ul class="articles">
                <li class="article-entry standard" v-for="(item,id) in tableData" :key="id">
                  <h4>
                    <router-link :to="'/helpcontent/'+item.help_id">{{item.help_title}}</router-link>
                  </h4>
                  <span class="article-meta">
                    <a class="iconfont">&#xe619;</a>
                    {{item.createtime| dataFormat}}
                    <a
                      class="iconfont"
                      style="margin-left:50px"
                    >&#xe688;</a>
                  </span>
                  <span class="like-count">
                      <a class="iconfont">&#xe61c;</a>{{item.help_read_num}}
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
  name:'help',
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
        pagesize: 10,
        page: 1
      },
      tableData: {}
    };
  },
  props: {
    tag:{}
  },
  methods: {
    changelable(lable) {
      this.pagelistquery.lable = lable;
      this.pagelistquery.tag = "";
      this.gethelplist();
    },

    changetag() {
      this.pagelistquery.tag = this.tag;
    },

    handleCurrentChange(val) {
      this.pagelistquery.page = val;
      this.gethelplist();
      console.log(`当前页: ${val}`);
    },
    //获取求助列表
    async gethelplist() {
      let res = await this.$API.reqGetwebHelpList(
        this.qs.stringify(this.pagelistquery)
      );
      if (res.data.state.type === "SUCCESS") {
        this.tableData = res.data.data;
        this.pagelistquery.total = res.data.count;
      }
    },
    //获取标签列表
         async lablelist() { 
      let res = await this.$API.reqLabelList(
        this.qs.stringify({ lable_name:'问答分类' })
      );
      if (res.data.state.type === "SUCCESS") {
          this.lables = JSON.parse(res.data.data[0].lable);

      }
    }

  },
  created() {
    this.tag && this.changetag();
    this.gethelplist();
    this.lablelist()
  }
};
</script>
<style>
.help {
  min-height: 200px;
}
</style>