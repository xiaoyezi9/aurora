<template>
  <div class="fankui">
    <el-main>
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
          <el-table-column prop="createtime" label="创建日期">
            <template slot-scope="scope">{{ scope.row.jubao_createtime | dataFormat }}</template>
          </el-table-column>
          <el-table-column prop="jubao_user" label="举报账号"></el-table-column>
          <el-table-column prop="jubao_url" label="违规链接">
            <template slot-scope="scope">
              <a :href="scope.row.jubao_url" target="_blank">举报地址</a>
            </template>
          </el-table-column>
          <el-table-column prop="jubao_content" label="详情">
            <template slot-scope="scope">
              <el-popover placement="right" width="400" trigger="hover">
                <span>
                  <el-form status-icon label-width="100px">
                    <el-form-item label="举报内容">{{scope.row.jubao_content}}</el-form-item>
                    <el-form-item label="截图">
                      <div>
                        <img
                          v-for="(img,id) in scope.row.jubao_img"
                          style="width:250px ;margin-top:5px"
                          :key="id"
                          :src="img.url"
                          alt
                        />
                      </div>
                    </el-form-item>
                    <el-form-item label="处理结果">{{scope.row.result}}</el-form-item>
                  </el-form>
                </span>
                <el-button type="text" slot="reference">查看详情</el-button>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="jubao_state">
            <template slot-scope="scope">
              <span style="color:#409eff" v-if="scope.row.jubao_state==0">未处理</span>
              <span style="color:#6cbb7a" v-if="scope.row.jubao_state==1">已处理</span>
              <span style="color:#f60c6c" v-if="scope.row.jubao_state==2">标记</span>
            </template>
          </el-table-column>
          <el-table-column prop="admin" label="管理员"></el-table-column>
          <el-table-column prop="nickname" fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="touser(scope.row)">去处理</el-button>
              <el-button type="text" size="small" @click="changestate(scope.row,2)">标记</el-button>
              <el-button type="text" size="small" @click="jieguo(scope.row)">已处理</el-button>
 <el-button type="text"  size="small" :disabled="scope.row.username == 'admin'" @click="deletkefu(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
<!--处理对话框-->
<el-dialog title="处理结果" :visible.sync="dialog" width="500px">
                <el-form :model="result">
                  <el-form-item label>
                    <el-input type="textarea" v-model="result"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialog = false">取 消</el-button>
                  <el-button type="primary" @click="setjieguo">确 定</el-button>
                </div>
              </el-dialog>
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
export default {
  name: "admin",
  data() {
    return {
      breadList :[
        { text: "首页", path: "/" },
        { text: "客服中心", path: undefined },
        { text: "违规举报", path: undefined },
      ],
      queryData:[
        {
          type:'select',
          value:"state",
          label:"",
          placeholder:"帐号状态",
          options:[
            {
              value:'0',
              label:'未处理',
            },
            {
              value:'1',
              label:'已处理',
            },
            {
              value:'2',
              label:'标记',
            },
          ]
        },
      ],
      queryInfo:{
        state:"0",
      },
      result: "",
      changepassword: {},
      dialog: false, //结果框
      loading: false,
      dialogFormVisibleadd: false, //添加弹框
      form: {},
      user: {
        username: "",
        password: "",
        password1: ""
      },
      pagelistquery: {
        total: 0,
        page: 1,
        pagesize: 10,
        kefu_type: "jubao",
        state: "0",
         id:''
      },
      row: {},
      tableData: [] //列表信息
    };
  },
  watch:{
    'pagelistquery.state': {
      handler: function(newValue, oldValue) {
        this.kefulist();
      },
      immediate: true // 立即执行
    }
  },
  methods: {
    jieguo(row) {
      this.dialog = true;
      this.row = row;
    },

    async setjieguo() {
      let data = {
        jubao_id: this.row.jubao_id,
        result: this.result
      };
      let res = await this.$API.reqSetFkResult(this.qs.stringify(data));
      if (res.data.state.type === "SUCCESS") {
        this.$message.success("成功");
        this.kefulist();
        this.dialog = false;
      }
    },

    async changestate(row, state) {
      let data = {
        kefu_id: row.jubao_id,
        kefu_state: state,
        type: "jubao"
      };
      let res = await this.$API.reqChangeFkState(this.qs.stringify(data));
      if (res.data.state.type === "SUCCESS") {
        this.$message.success("状态更改成功");
        this.kefulist();
      }
    },

    // 跳转用户管理界面 处理用户
    touser(row) {
        this.$router.push({ path: "/useruser", query: { user: row.jubao_user, jubao_id: row.jubao_id} });
    },
    //删除
    async deletkefu(row) {
      let res = await this.$API.reqDelKefu(this.qs.stringify({ id: row.jubao_id,type:'jubao' }));
      if (res.data.state.type === "SUCCESS") {
        this.$message.success("删除成功");
        this.kefulist();
      }
    },


     shensu() {
      this.pagelistquery.id = this.$route.query.jubao_id;
       this.pagelistquery.state=''

    },
    getQuery({state}) {
      this.pagelistquery.state=state
    },
    async kefulist() {
      this.loading = true;
      let res = await this.$API.reqKefuList(this.qs.stringify(this.pagelistquery));
      if (res.data.state.type === "SUCCESS") {
        this.tableData = res.data.data;
        console.log(res.data.data);
        this.pagelistquery.total = res.data.count;
        this.tableData.forEach(element => {
          element.jubao_img = JSON.parse(element.jubao_img);
        });
      }
      this.loading = false;
    },
    // 分页
    handleSizeChange(val) {
      this.pagelistquery.pagesize = val;
      this.kefulist();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pagelistquery.page = val;
      this.kefulist();
      console.log(`当前页: ${val}`);
    },
  },
  created() {
    this.$route.query && this.shensu();
    this.kefulist();
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
.fankui {
  position: relative;
  width: 100%;
}
.main {
  margin-top: 40px;
  padding: 20px;
  background-color: #fff;
}
</style>