<template>
  <el-table
      :data="tableData"
      border
      style="width: 100%;min-height:500px"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
  >
    <el-table-column fixed prop="createtime" label="创建日期">
      <template slot-scope="scope">{{ scope.row.createtime | dataFormat }}</template>
    </el-table-column>
    <el-table-column prop="nickname" label="作者"></el-table-column>
    <el-table-column prop="title" label="标题" >
      <template slot-scope="scope">{{scope.row.title}}</template>
    </el-table-column>
    <el-table-column prop="locale" label="地点" v-if="$attrs.isType">
    </el-table-column>
    <el-table-column prop="lable" label="分类"></el-table-column>
    <el-table-column prop="ispublic" label="状态">
      <template slot-scope="scope">
        <span style="color:#6cbb7a" v-if="scope.row.ispublic==1">审核通过</span>
        <span style="color:#409eff" v-if="scope.row.ispublic==0">未审核</span>
        <span style="color:#f60c6c" v-if="scope.row.ispublic==-1">审核未通过</span>
      </template>
    </el-table-column>
    <el-table-column prop="admin" label="审核人"></el-table-column>
    <el-table-column fixed="right" label="操作" width="170">
      <template slot-scope="scope">
        <el-button @click=" sendShenhe(scope.row)" type="text" size="small" :disabled="scope.row.ispublic!=0">审核</el-button>
        <el-button
            type="text"
            size="small"
            @click="sendDel(scope.row.id)"
            :disabled="uinfo.username !== 'admin'"
        >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "commonList",
  computed: {
    ...mapState({
      uinfo: state => state.user.uinfo
    })
  },
  props:['tableData','loading'],
  data(){
    return {
      type:'',
    }
  },

  methods:{
    sendShenhe(row){
      this.$emit('shenhe',row)
    },
    sendDel(id){
      this.$emit('del',id)
    }
  },
  mounted() {

  }


}
</script>

<style scoped>

</style>