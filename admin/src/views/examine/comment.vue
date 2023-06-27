<template>
  <div class="comment">
    <el-main>
<!--      面包屑-->
      <div class="top">
        <BreadCrumb :breadList="breadList"/>
      </div>

      <div class="main">
<!--        搜索-->
        <div class="search">
          <Search :queryData="queryData" :queryInfo="queryInfo" @getQuery="getQuery"/>
        </div>

        <el-table
          :data="tableData"
          border
          style="width: 100%;min-height:500px"
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
        >
          <!-- @expand-change="getreply" -->
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table :data="props.row.child" style="width: 100%">
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column prop="createtime" label="创建日期">
                  <template slot-scope="scope">{{ scope.row.comment_createtime | dataFormat }}</template>
                </el-table-column>
                <el-table-column label="回复者" prop="nickname"></el-table-column>
                <el-table-column label="被回复者" prop="tousernickname"></el-table-column>
                <el-table-column label="状态" prop="comment_ispublic">
                  <template slot-scope="scope">
                    <span style="color:#6cbb7a" v-if="scope.row.ispublic==1">审核通过</span>
                    <span style="color:#409eff" v-if="scope.row.ispublic==0">未审核</span>
                    <span style="color:#f60c6c" v-if="scope.row.ispublic==-1">审核未通过</span>
                  </template>
                </el-table-column>
                <el-table-column label="回复内容" prop="desc">
                  <template slot-scope="scope">
                    <el-popover placement="right" width="400" trigger="hover">
                      <span v-html="scope.row.reply_content"></span>
                      <el-button type="text" slot="reference">查看回复</el-button>
                    </el-popover>
                  </template>
                </el-table-column>
                <el-table-column label="审核人" prop="admin"></el-table-column>

                <el-table-column fixed="right" label="操作" width="250">
                  <template slot-scope="scope">
<!--                    <el-button-->
<!--                      type="text"-->
<!--                      size="small"-->
<!--                      v-if="scope.row.ispublic==1"-->
<!--                      @click="changestate('reply',-1,scope.row.reply_id)"-->
<!--                    >不通过审核</el-button>-->
                    <el-button
                      type="text"
                      size="small"
                      v-if="scope.row.ispublic==0"
                      @click="changestate('reply',1,scope.row.reply_id)"
                    >通过审核</el-button>
                    <el-button
                      type="text"
                      size="small"
                      v-if="scope.row.ispublic==0"
                      @click="changestate('reply',-1,scope.row.reply_id)"
                    >不通过审核</el-button>
<!--                    <el-button-->
<!--                      type="text"-->
<!--                      size="small"-->
<!--                      v-if="scope.row.ispublic==-1"-->
<!--                      @click="changestate('reply',1,scope.row.reply_id)"-->
<!--                    >通过审核</el-button>-->
                    <el-button
                      type="text"
                      size="small"
                      @click="del(scope.row.reply_id,'reply')"
                      :disabled="uinfo.username !== 'admin'"
                    >删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>

          <el-table-column prop="createtime" label="创建日期">
            <template slot-scope="scope">{{ scope.row.comment_createtime | dataFormat }}</template>
          </el-table-column>
          <el-table-column label="评论者" prop="nickname"></el-table-column>
          <el-table-column label="状态" prop="comment_ispublic">
            <template slot-scope="scope">
              <span style="color:#6cbb7a" v-if="scope.row.ispublic==1">审核通过</span>
              <span style="color:#409eff" v-if="scope.row.ispublic==0">未审核</span>
              <span style="color:#f60c6c" v-if="scope.row.ispublic==-1">审核未通过</span>
            </template>
          </el-table-column>
          <el-table-column label="评论内容" prop="desc">
            <template slot-scope="scope">
              <el-popover placement="right" width="400" trigger="hover">
                <span v-html="scope.row.comment_content"></span>
                <el-button type="text" slot="reference">查看内容</el-button>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="审核人" prop="admin"></el-table-column>
          <el-table-column fixed="right" label="操作" width="250">
            <template slot-scope="scope">
<!--              <el-button-->
<!--                type="text"-->
<!--                size="small"-->
<!--                v-if="scope.row.ispublic==1"-->
<!--                @click="changestate('comment',-1,scope.row.comment_id)"-->
<!--              >不通过审核</el-button>-->
              <el-button
                type="text"
                size="small"
                v-if="scope.row.ispublic==0"
                @click="changestate('comment',1,scope.row.comment_id)"
              >通过审核</el-button>
              <el-button
                type="text"
                size="small"
                v-if="scope.row.ispublic==0"
                @click="changestate('comment',-1,scope.row.comment_id)"
              >不通过审核</el-button>
<!--              <el-button-->
<!--                type="text"-->
<!--                size="small"-->
<!--                v-if="scope.row.ispublic==-1"-->
<!--                @click="changestate('comment',1,scope.row.comment_id)"-->
<!--              >通过审核</el-button>-->
              <el-button
                type="text"
                size="small"
                @click="del(scope.row.comment_id,'comment')"
                :disabled="uinfo.username !== 'admin'"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--分页-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pagelistquery.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagelistquery.total"
          style="margin-top: 20px;"
        ></el-pagination>
      </div>
    </el-main>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import {reqDelContent, reqReplyList} from "@/api";

export default {
  name: "comment",
  computed: {
    ...mapState({
      uinfo: state => state.user.uinfo
    })
  },
  data() {
    return {
      breadList :[
        { text: "首页", path: "/" },
        { text: "审核管理", path: undefined },
        { text: "评论中心", path: undefined },
      ],
      queryData:[
        {
          type:'input',
          value:"admin",
          label:"",
          placeholder:"输入审核管理员账号",
        },
        {
          type:'select',
          value:"state",
          label:"",
          placeholder:"审核状态",
          options:[
            {
              value:'',
              label:'全部',
            },
            {
              value:'0',
              label:'待审核',
            },
            {
              value:'1',
              label:'审核通过',
            },
            {
              value:'-1',
              label:'审核不通过',
            },
          ]
        },
      ],
      queryInfo:{
        admin:'',
        state:"",
      },
      loading: false,
      pagelistquery: {
        admin: "",
        state: "",
        total: 0,
        page: 1,
        pagesize: 10
      },
      tableData: []
    };
  },
  watch:{
    'pagelistquery': {
      handler: function(newValue, oldValue) {
        this.getcommentlist();
      },
      immediate: true ,// 立即执行
      deep:true
    }
  },
  methods: {
    async getreply() {
      for (let index = 0; index < this.tableData.length; index++) {
        let res = await this.$API.reqReplyList(this.qs.stringify({ comment_id: this.tableData[index].comment_id }));
        if (res.data.state.type === "SUCCESS") {
          console.log(res.data.data);
          this.tableData[index].child = res.data.data;
        }
      }
    },

    async changestate(type, state, id) {
      let data = {
        id: id,
        type: type,
        state: state
      };
      let res = await this.$API.reqChangeContentState(this.qs.stringify(data));
      if (res.data.state.type === "SUCCESS") {
        this.$message.success("操作成功");
        this.getcommentlist();
        this.dialog = false;
      }
    },
    // 分页
    handleSizeChange(val) {
      this.pagelistquery.pagesize = val;
      this.getcommentlist();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pagelistquery.page = val;
      this.getcommentlist();
      console.log(`当前页: ${val}`);
    },
    // 删除
    async del(id, type) {
      let data = {
        id: id,
        type: type
      };
      let res = await this.$API.reqDelContent(this.qs.stringify(data));
      if (res.data.state.type === "SUCCESS") {
        this.$message.success("删除成功");
        this.getcommentlist();
      }
    },
    getQuery({admin,state}) {
      this.pagelistquery.admin=admin
      this.pagelistquery.state=state
    },
    // 获取评论列表
    async getcommentlist() {
      this.loading = true;
      let res = await this.$API.reqCommentList(this.qs.stringify(this.pagelistquery));
      if (res.data.state.type === "SUCCESS") {
        this.tableData = res.data.data;
        console.log(res.data.data);
        this.pagelistquery.total = res.data.count;
        this.getreply();
      }
      this.loading = false;
    }
  },
  created() {
    this.getcommentlist();
  }
};
</script>
<style  scoped>
.top {
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 35px);
  padding: 12px 16px;
  background-color: #fff;
}
.comment {
  position: relative;
  width: 100%;
}
.main {
  margin-top: 40px;
  padding: 20px;
  background-color: #fff;
}
</style>