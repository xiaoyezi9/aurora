 <template>
  <div class="adminhome">
<div v-title data-title="个人中心 "></div>

    <div class="min">
      <el-container style="min-height: 700px; border: 1px solid #eee">
        <el-aside width="200px" style="    background-color: #fff;">

          <el-menu router default-active="2" class="el-menu-vertical-demo">
<!--            个人中心-->
            <el-menu-item index="/admin">
              <i class="el-icon-user-solid"></i>
              <span slot="title">信息展示</span>
            </el-menu-item>
<!--            账户管理-->
            <el-menu-item index="/admin/myself">
              <i class="el-icon-user-solid"></i>
              <span slot="title">账户管理</span>
            </el-menu-item>
           <!--内容管理-->
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>内容管理</span>
              </template>
              <el-menu-item index="/admin/createhelplist">问答</el-menu-item>
              <el-menu-item index="/admin/createactivitylist" :disabled="userinfo.realstate !==3">活动</el-menu-item>

              <el-menu-item index="/admin/articlelist" :disabled="userinfo.realstate !==3">文章/新闻</el-menu-item>
            </el-submenu>

            <el-menu-item index="/admin/notice">
              <i class="el-icon-bell"></i>
<!--              通知管理-->
              <span slot="title">通知中心</span>
            </el-menu-item>
<!--            <el-menu-item index="/admin/PersonalMessage">-->
<!--              <i class="el-icon-bell"></i>-->
<!--              &lt;!&ndash;              通知管理&ndash;&gt;-->
<!--              <span slot="title">私信</span>-->
<!--            </el-menu-item>-->
          </el-menu>
        </el-aside>

        <el-container>
          <el-main>
            <router-view />
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  
  data() {
    return {
      tableData:[]
    };
  },
  computed: {
  ...mapState({
      userinfo: state => state.user.userinfo,
    })
  },
};
</script>
<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
.min {
  width: 70%;
  min-height: 500px;
  margin-left: 15%;
}
</style>