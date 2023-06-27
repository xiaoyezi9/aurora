<template>
  <div class="useruser">
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
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          :data="tableData"
          border
          style="width: 100%;min-height:500px"
        >
          <el-table-column prop="username" label="账号"></el-table-column>
          <el-table-column prop="nickname" label="昵称"></el-table-column>
          <el-table-column prop="realstate" label="实名认证状态">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="changerealstatedialog(scope.row)"
              >{{ scope.row.realstate |userstatefilter}}</el-button>
            </template>
          </el-table-column>

          <el-table-column prop="activationdate" label="启用时间">
            <template slot-scope="scope">{{ scope.row.activationdate | dataFormat }}</template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="170">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                :disabled="uinfo.username !== 'admin'"
                @click="activationdate(scope.row)"
              >封禁解封</el-button>
              <el-button
                type="text"
                size="small"
                :disabled="uinfo.username !== 'admin'"
                @click="deleteuser(scope.row)"
              >删除</el-button>
              <el-button
                type="text"
                size="small"
                :disabled="scope.row.username== 'admin'||uinfo.username !== 'admin'"
                @click="changepw(scope.row)"
              >修改密码</el-button>
            </template>
          </el-table-column>
        </el-table>


        <!--修改密码对话框-->
        <el-dialog title="输入新的密码" :visible.sync="dialogpw" width="500px">
          <el-form :model="changepassword">
            <el-form-item label="账号" label-width="100px">{{changepassword.username}}</el-form-item>
            <el-form-item label="新密码" label-width="100px">
              <el-input v-model="changepassword.newpassword" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogpw = false">取 消</el-button>
            <el-button type="primary" @click="change">确 定</el-button>
          </div>
        </el-dialog>

        <!--用户信息认证弹窗-->
        <el-dialog title="用户认证信息" :visible.sync="dialogstudent">
          <div v-if="changerealstateuser.realstate===1">
            <img src="../../assets/img/noinfo.png" width="100%" alt />
            <div style="width:100%;text-align:center">该用户还没有添加认证信息</div>
          </div>
          <el-form v-else>
            <el-form-item label="学号">{{changerealstateuser.realname}}</el-form-item>
            <el-form-item label="姓名">{{changerealstateuser.studentid}}</el-form-item>
            <el-form-item label="学生证">
              <img
                v-for="(img,id) in changerealstateuser.studentcard"
                style="width:40% ;margin:20px"
                :key="id"
                :src="img.url"
                alt
              />
            </el-form-item>
          </el-form>

          <div slot="footer" class="dialog-footer" v-if="changerealstateuser.realstate===1">
            <el-button @click="dialogstudent = false">取消</el-button>
          </div>
          <div slot="footer" v-else class="dialog-footer">
            <el-button
              type="primary"
              v-if="changerealstateuser.realstate!==3"
              @click="changestate('realstate',3,changerealstateuser.user_id)"
            >通过认证</el-button>
            <el-button
              type="danger"
              @click="changestate('realstate',0,changerealstateuser.user_id)"
            >不通过认证</el-button>
            <el-button @click="dialogstudent = false">取消</el-button>
          </div>
        </el-dialog>

<!--        用户封禁解封弹窗-->
        <el-dialog title="封禁时间(天)" :visible.sync="activationttime.dialog" width="500px">
          <el-form :model="activationttime">
            <el-form-item label>
              <el-input v-model="activationttime.time"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="activationttime.dialog = false">取 消</el-button>
            <el-button type="primary" @click="changeactivationdate">确 定</el-button>
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
import { mapState, mapActions } from "vuex";


export default {
  name: "useruser",
  data() {
    return {
      breadList :[
        { text: "首页", path: "/" },
        { text: "用户管理", path: undefined },
        { text: "普通用户管理", path: undefined },
      ],
      queryData:[
        {
          type:'input',
          value:"user",
          label:"",
          placeholder:"输入账号",
        },
        {
          type:'select',
          value:"state",
          label:"",
          placeholder:"认证状态",
          options:[
            {
              value:'',
              label:'全部',
            },
            {
              value:'1',
              label:'未认证',
            },
            {
              value:'2',
              label:'待审核',
            },
            {
              value:'3',
              label:'通过认证',
            },
            {
              value:'0',
              label:'认证失败',
            },
          ]
        },
      ],
      queryInfo:{
        user:'',
        state:"",
      },
      changepassword: {}, //修改密码弹窗数据
      changerealstateuser: {}, //正在审核的用户信息
      dialogstudent: false,
      dialogcompany: false,
      dialogpw: false, //密码框
      loading: false,
      pagelistquery: {
        realstate: "",
        total: 0,
        page: 1,
        pagesize: 10,
        user: "",

      },
      tableData: [], //列表信息

      activationttime: {
        time: 0,
        userid: "",
        jubao_id: "",
        dialog: false
      }
    };
  },
  computed: {
    ...mapState({
      uinfo: state => state.user.uinfo
    })
  },
  filters: {
    userstatefilter(state) {
      if (state == 3) {
        return "认证成功";
      }
      if (state == 2) {
        return "待审核";
      }
      if (state == 1) {
        return "未认证";
      }
      if (state == 0) {
        return "认证失败";
      }
    }
  },
  watch:{
    'pagelistquery': {
      handler: function(newValue, oldValue) {
        this.getuserlist();
      },
      immediate: true ,// 立即执行
      deep:true
    }
  },
  methods: {
    activationdate(row) {
      this.activationttime.userid = row.user_id;
      this.activationttime.dialog = true;
    },
    //修改账号封禁时间
    async changeactivationdate() {
      this.changepassword.type = "adminuser";
      let res = await this.$API.reqActivationDate(this.qs.stringify(this.activationttime));
      if (res.data.state.type === "SUCCESS") {
        this.$message.success("操作成功");
        // this.getuserlist();
        this.activationttime.dialog = false;
      }
    },
    //用户认证处理
    async changestate(type, state, userid) {
      let data = {
        type: type,
        state: state,
        user_id: userid,
      };
      let res = await this.$API.reqChangeState(this.qs.stringify(data));
      if (res.data.state.type === "SUCCESS") {
        this.$message.success("操作成功");
        this.getuserlist();
        this.dialogstudent = false;
        this.dialogcompany = false;
      }
    },

    changepw(row) {
      this.dialogpw = true;
      this.changepassword = row;
    },
    //修改密码
    async change() {
      this.changepassword.type = "adminuser";
      console.log(this.changepassword.newpassword);
      if(this.changepassword.newpassword==''||this.changepassword.newpassword==undefined){
          this.$message.error("不能为空！");
      }
      else{
          let res = await this.$API.reqChangePassword(this.qs.stringify(this.changepassword));
          if (res.data.state.type === "SUCCESS") {
            this.$message.success('修改成功');
            this.changepassword.newpassword=''
              this.dialogpw = false;
             
          }
      }
     
    },
    //删除用户
    async deleteuser(row) {
      let data = {
        user_id: row.user_id,
        usertype: "user"
      };
      let res = await this.$API.reqDelAdmin(this.qs.stringify(data));
      if (res.data.state.type === "SUCCESS") {
        this.$message.success("删除成功");
        this.dialogpw = false;
        this.getuserlist();
      }
    },


    //学生认证信息
    changerealstatedialog(user) {
      this.changerealstateuser = JSON.stringify(user);
      this.changerealstateuser = JSON.parse(this.changerealstateuser);
      this.changerealstateuser.studentcard = JSON.parse(
        this.changerealstateuser.studentcard
      );
      this.dialogstudent = true;
    },
    // 分页处理
    handleSizeChange(val) {
      this.pagelistquery.pagesize = val;
      this.getuserlist();
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pagelistquery.page = val;
      this.getuserlist();
      // console.log(`当前页: ${val}`);
    },
    getQuery({user,state}) {
      this.pagelistquery.user=user
      this.pagelistquery.realstate=state
    },
    //获取用户列表
    async getuserlist() {
      console.log(this.pagelistquery)
      this.loading = true;
      let res = await this.$API.reqUserList(this.qs.stringify(this.pagelistquery));
      if (res.data.state.type === "SUCCESS") {
        this.tableData = res.data.data;
        console.log(res.data);
        this.pagelistquery.total = res.data.count;
        this.loading = false;
      }
    },
//从路由获取信息
    jubao() {
      // console.log(1)
      this.pagelistquery.user = this.$route.query.user;
      this.activationttime.jubao_id = this.$route.query.jubao_id;
    }
  },
  created() {
    this.$route.query.user&& this.jubao();
    this.getuserlist();
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
.useruser {
  position: relative;
  width: 100%;
}
.main {
  margin-top: 40px;
  padding: 20px;
  background-color: #fff;
}
</style>