<template>
  <div id="contentexamine" class="contentexamine">
    <el-main>
      <div class="top">
        <BreadCrumb :breadList="breadList"/>
      </div>

      <div class="main">
        <div class="search">
          <Search :queryData="queryData" :queryInfo="queryInfo" @getQuery="getQuery"/>
        </div>
        <!-- 弹出框-->
        <el-dialog title="详情" :visible.sync="dialog">

          <el-form v-if="type=='help'">
            <el-form-item label="标题">{{content.title}}</el-form-item>
            <el-form-item label="分类">{{content.lable}}</el-form-item>
            <el-form-item label="内容">
              <span v-html="content.content"></span>
            </el-form-item>
          </el-form>

          <el-form v-if="type=='activity'">
            <el-form-item label="标题">{{content.title}}</el-form-item>
            <el-form-item label="分类">{{content.lable}}</el-form-item>
            <el-form-item label="地点">{{content.locale}}</el-form-item>
            <el-form-item
                label="时间"
            >{{content.statetime| dataFormat }}——{{content.endtime| dataFormat }}</el-form-item>
            <el-form-item label="内容">
              <span v-html="content.content"></span>
            </el-form-item>
          </el-form>

          <el-form v-if="type=='article'">
            <el-form-item label="标题">{{content.title}}</el-form-item>
            <el-form-item label="分类">{{content.lable}}</el-form-item>
            <el-form-item label="简介">{{content.introduction}}</el-form-item>
            <el-form-item label="内容">
              <span v-html="content.content"></span>
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="changestate(1)">通过审核</el-button>
            <el-button type="danger" @click="changestate(-1)">不通过审核</el-button>
            <el-button @click="dialog=false">取消</el-button>
          </div>
        </el-dialog>

        <!--help-->
        <div v-if="type=='help'">
        <commonList :tableData="tableData"  :loading="loading"  @shenhe="shenhe" @del="del" />
        </div>
        <!--article-->
        <div v-if="type=='article'">
          <commonList :tableData="tableData"  :loading="loading"  @shenhe="shenhe" @del="del" />
        </div>
        <!--activity-->
        <div v-if="type=='activity'">
          <commonList :tableData="tableData"  :loading="loading"  :isType="type" @shenhe="shenhe" @del="del" />
        </div>
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
import { mapState } from "vuex";
import commonList from '../../components/examine/commonList.vue'
export default {
  name: "contentexamine",
  components:{
    'commonList':commonList
  },
  computed: {
    ...mapState({
      uinfo: state => state.user.uinfo
    }),
    tableData() {
      switch (this.type) {
        case 'help':
          //对数据进行处理
          return this.RawData.map(item => {
            const newObj = {}
            for (let key in item) {
              let newKey = key.replace(/^help_/, '')
              newObj[newKey] = item[key]
            }
            return newObj
          });
        case 'activity':
          //对数据进行处理
          return this.RawData.map(item => {
            const newObj = {}
            for (let key in item) {
              let newKey = key.replace(/^activity_/, '')
              newObj[newKey] = item[key]
            }
            return newObj
          });
        case "article":
          //对数据进行处理
          return this.RawData.map(item => {
            const newObj = {}
            for (let key in item) {
              let newKey = key.replace(/^article_/, '')
              newObj[newKey] = item[key]
            }
            return newObj
          });
        default:
          return []
      }

    },
  },
  data() {
    return {
      breadList :[
        { text: "首页", path: "/" },
        { text: "审核管理", path: undefined },
        { text: "内容审核", path: undefined },
      ],
      queryData:[
        {
          type:'input',
          value:"user",
          label:"",
          placeholder:"输入用户账号",
        },
        {
          type:'input',
          value:"admin",
          label:"",
          placeholder:"输入审核管理员账号",
        },
        {
          type:'input',
          value:"search",
          label:"",
          placeholder:"关键字",
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
        {
          type:'select',
          value:"type",
          label:"",
          placeholder:"板块",
          options:[
            {
              value:'help',
              label:'求助问答',
            },
            {
              value:'activity',
              label:'交友活动',
            },
            {
              value:'article',
              label:'文章新闻',
            },

          ]
        },
      ],
      queryInfo:{
        admin:'',
        state:"",
        user:'',
        search:'',
        type:'help'
      },
      loading: false,
      dialog: false,
      pagelistquery: {
        user: "",
        admin: "",
        state: "",
        search: "",
        type: "help",
        total: 0,
        page: 1,
        pagesize: 10
      },
      type: "help",
      thiscontent: {},
      RawData: [],
      content: {}
    };
  },
  watch:{
    'pagelistquery': {
      handler: function(newValue, oldValue) {
        this.getcontentlist();
      },
      immediate: true ,// 立即执行
      deep:true
    }
  },
  methods: {
    shenhe(row) {
      this.content = row;
      this.dialog = true;
    },
    // 审核
    async changestate(state) {
      let data = {
        id: this.content.id,
        type: this.pagelistquery.type,
        state: state  //1 或 -1
      };
      let res = await this.$API.reqChangeContentState(this.qs.stringify(data));
      if (res.data.state.type === "SUCCESS") {
        this.$message.success("操作成功");
        this.dialog = false;
        this.getcontentlist();
      }
    },
    // 删除
    async del(id) {
      let data = {
        id: id,
        type: this.pagelistquery.type
      };
      console.log(data)
      let res = await this.$API.reqDelContent(this.qs.stringify(data));
      if (res.data.state.type === "SUCCESS") {
        this.$message.success("删除成功");
        this.getcontentlist();
      }
    },

    // 分页器
    handleSizeChange(val) {
      this.pagelistquery.pagesize = val;
      this.getcontentlist();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pagelistquery.page = val;
      this.getcontentlist();
      console.log(`当前页: ${val}`);
    },
    getQuery({admin,state,user,search,type}) {
      this.pagelistquery.admin=admin
      this.pagelistquery.state=state
      this.pagelistquery.user=user
      this.pagelistquery.type=type
      this.pagelistquery.search=search
    },
    // 请求内容列表
    async getcontentlist() {
      this.loading = true;
      this.type = this.pagelistquery.type;
      let res = await this.$API.reqGetContentList(this.qs.stringify(this.pagelistquery));
      if (res.data.state.type === "SUCCESS") {
         this.RawData=res.data.data
        this.pagelistquery.total = res.data.count;
        this.loading = false;
      }
    }
  },
  created() {
    this.getcontentlist();
  }
}
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
.contentexamine {
  position: relative;
  width: 100%;
}
.main {
  margin-top: 40px;
  padding: 20px;
  background-color: #fff;
}
</style>