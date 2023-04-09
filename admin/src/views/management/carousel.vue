<template>
  <div class="contentexamine">
    <el-main>
      <div class="top">
        <BreadCrumb :breadList="breadList"/>
      </div>

      <div  style=" margin-top: 40px;">
        <el-alert
            title="填写完毕后按回车保存，如果上传图片前其相应的链接不为空，则自动完成相应的添加或修改动作"
            type="warning"
            center
            show-icon
            :closable="false"
            >
        </el-alert>

      </div>

      <div class="main" style=" position: relative;" v-for="(carousel,id) in carousel" :key="id">
        <el-form ref="form" :model="carousel" style="margin-top:40px;width:80%" label-width="80px">
          <el-form-item label="图片">
            <el-upload
              :action="'http://localhost:8000/upload'"
              :headers="{ Authorization: 'Bearer ' + token }"
              :show-file-list="false"
              :on-success="(value)=> uplogsuccess(value, id)"
              class="avatar-uploader"
            >
              <img v-if="carousel.carousel_img" :src="carousel.carousel_img" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="carousel.carousel_title" @keyup.enter.native="changecarousel(id)"></el-input>
          </el-form-item>
          <el-form-item label="链接">
            <el-input v-model="carousel.carousel_url" @keyup.enter.native="changecarousel(id)"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-delete" @click="del(id)" class="del" circle></el-button>
      </div>

      <el-button
          type="primary"
          icon="el-icon-plus"
          @click="add"
          style="margin-top: 50px;margin-left:45% "
      ></el-button>
    </el-main>
  </div>
</template>

<script>


export default {
  name: "contentexamine",
  data() {
    return { breadList :[
        { text: "首页", path: "/" },
        { text: "网站管理", path: undefined },
        { text: "轮播图管理", path: undefined },
      ],
      carousel: [],

    };
  },
  computed: {
    token(){
      return window.localStorage.getItem('admin_jwt_token')
    }
  },
  methods: {
    // 修改
    async changecarousel(id) {
      if (this.carousel[id].carousel_img !== "" && this.carousel[id].carousel_url !== "" && this.carousel[id].carousel_title !== "")
      {
        let res = await this.$API.reqChangeCarousel(this.qs.stringify(this.carousel[id]));
        if (res.data.state.type === "SUCCESS") {
          this.carousel[id].carousel_id !== "" &&
            this.$message.success("修改成功");
          this.carousel[id].carousel_id == "" &&
            this.$message.success("添加成功");
          this.carousellist();
        }
      } else {
        this.carousel[id].carousel_id == "" && this.carousel.shift();
      }
    },

    add() {
      this.carousel.unshift({
        carousel_img: "",
        carousel_url: "",
        carousel_id: "",
        carousel_title: ""
      });
    },

    // 删除
    del(id) {
      if (this.carousel[id].carousel_img !== "" && this.carousel[id].carousel_url !== "" &&
          this.carousel[id].carousel_id !== "" && this.carousel[id].carousel_title !== "")
        this.deletecarouse(id);
      else this.carousel[id].carousel_id == "" && this.carousel.shift();//如果添加的轮播图什么信息都没有填写
    },

    //文件上传成功时的钩子
    uplogsuccess(res, id) {
      console.log(res);
      this.carousel[id].carousel_img = res.url;
      if (
        this.carousel[id].carousel_url !== "" &&
        this.carousel[id].carousel_title !== ""
      )
        this.changecarousel(id);
    },

    async deletecarouse(id) {
      let res = await this.$API.reqDelCarousel(this.qs.stringify(this.carousel[id]));
      if (res.data.state.type === "SUCCESS") {
        this.carousel = res.data.data;
        this.$message.success("删除成功");
        console.log(this.carousel);
        this.carousellist();
      }
    },

    async carousellist() {
      let res = await this.$API.reqCarouselList();
      if (res.data.state.type === "SUCCESS") {
        this.carousel = res.data.data;
      }
    },



  },
  created() {
    this.carousellist();
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
.contentexamine {
  position: relative;
  width: 100%;
}
.main {
  margin-top: 20px;
  padding: 5px 40px 20px 40px;
  background-color: #fff;
}
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
  width: 100px;
  height: 100px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  min-width: 100px;
  height: 100px;
  display: block;
}
.del {
  position: absolute;
  right: 100px;
  top: 100px;
}
</style>