<template>
  <div class="myself">
    <h2>管理账户</h2>

    <el-tabs type="border-card">
      <el-tab-pane label="个人信息编辑">
        <el-form ref="form" :model="form" label-width="150px" size="medium ">
          <el-form-item label="头像">
            <el-upload
                :action="'http://81.68.220.8:8000/upload'"
                :headers="{ Authorization: 'Bearer ' + token }"
              :show-file-list="false"
              :on-success="uplogsuccess"
              class="avatar-uploader"
            >
              <img v-if="form.avatar" :src="form.avatar" class="avata" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="form.nickname"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="form.mail"></el-input>
          </el-form-item>
          <el-form-item label="qq">
            <el-input v-model="form.qq"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="个人简介">
            <el-input type="textarea" v-model="form.synopsis" rows="4"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确定</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="实名认证">
        <el-steps :active="form.realstate" align-center>
          <el-step title="填写个人信息" description></el-step>
          <el-step title="审核中" description></el-step>
          <el-step title="认证通过" description></el-step>
        </el-steps>
        <el-form ref="form" :model="form" label-width="150px" size="medium ">
          <el-form-item label="姓名">
            <el-input
              v-model="student.realname"
              :disabled="form.realstate ===2|| form.realstate === 3"
            ></el-input>
          </el-form-item>
          <el-form-item label="学号">
            <el-input
              v-model="student.studentid"
              :disabled="form.realstate ===2|| form.realstate === 3"
            ></el-input>
          </el-form-item>
          <el-form-item label="学生证">
            <el-upload
                :action="'http://81.68.220.8:8000/upload'"
                :headers="{ Authorization: 'Bearer ' + token }"
              list-type="picture-card"
              :on-success="studentuploadsuccess"
              :on-remove="studenthandleRemove"
              :file-list="this.student.studentcard"
              :disabled="form.realstate ===2|| form.realstate === 3"
            >
              <i class="el-icon-plus" ></i>
            </el-upload>
            <el-dialog>
              <img width="100%" :src="student.studentcard" alt />
            </el-dialog>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmitstudent"
              :disabled="form.realstate ===2|| form.realstate === 3"
            >确定</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      student: {
        m: "student",
        realname: "",
        studentid: "",
        studentcard: []
      },
      form: {
        m: "user",
        avatar: "",
        nickname: "",
        qq: "",
        mail: "",
        phone: "",
        synopsis: ""
      },
      dataform: {}
    };
  },
  computed: {
    token() {
      return window.localStorage.getItem('web_jwt_token')
    }
  },

    methods: {
      ...mapActions("user", ["setUserInfo"]),
      //文件上传成功时的钩子
      uplogsuccess(res) {
        this.form.avatar = res.url;
      },
      //
      studentuploadsuccess(res) {
        this.student.studentcard.push({url: res.url});
        console.log(this.student.studentcard);
        console.log(res.url,222);
      },
      //文件列表移除文件时的钩子
      studenthandleRemove(file, fileList) {
        console.log(file, fileList);
        let b = this.student.studentcard.indexOf(file);
        this.student.studentcard.splice(b, 1);
        console.log(this.student.studentcard,111);
      },
      //学生认证
      onSubmitstudent() {
        this.dataform = JSON.stringify(this.student);
        this.dataform = JSON.parse(this.dataform);
        this.dataform.studentcard = JSON.stringify(this.dataform.studentcard);
        this.studentandcompany(this.dataform.studentcard);
      },
      //信息认证
      async studentandcompany() {
        const res = await this.$API.reqUpdateUser(
            this.qs.stringify(this.dataform)
        );
        if (res.data.state.type === "SUCCESS") {
          this.$message.success("信息提交成功等待审核");
        }
      },
      //用户信息修改
      async onSubmit() {
        const res = await this.$API.reqUpdateUser(
            this.qs.stringify(this.form)
        );
        let data = res.data.data;
        if (res.data.state.type === "SUCCESS") {
          this.$message.success("成功");
          console.log(data.userinfo)
          this.setUserInfo(data.userinfo);
        }
      },
      //获取用户信息
      async getuser() {
        let res = await this.$API.reqGetUser();
        this.form = res.data.data;
        this.form.realstate = this.form.realstate * 1;
        this.student = {
          m: "student",
          realname: this.form.realname,
          studentid: this.form.studentid,
          studentcard: JSON.parse(this.form.studentcard)
        };
        if (this.form.studentcard == null) this.student.studentcard = [];

        this.form.m = "user"
            console.log(this.student);
      }
    },
    created() {
      this.getuser();
    }
  }
</script>
<style >
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avata {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

