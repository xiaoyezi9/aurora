<template>
  <el-form :inline="true" :model="queryInfo" class="demo-form-inline">
    <template v-for="(item,index) in queryData" >


      <el-form-item v-if="item.type == 'input'&&item.value=='user'" :label="item.label" :key="index">
        <el-input v-model="queryInfo[item.value]" :placeholder="item.placeholder"></el-input>
      </el-form-item>
      <el-form-item v-if="item.type == 'input'&&item.value=='admin'" :label="item.label" :key="index">
        <el-input v-model="queryInfo[item.value]" :placeholder="item.placeholder"></el-input>
      </el-form-item>
      <el-form-item v-if="item.type == 'input'&&item.value=='search'" :label="item.label" :key="index">
        <el-input v-model="queryInfo[item.value]" :placeholder="item.placeholder"></el-input>
      </el-form-item>

      <el-form-item v-if="item.type == 'select'&&item.value=='state'" :key="index">
        <el-select  v-model="queryInfo[item.value]" :placeholder="item.placeholder?item.placeholder:''" >
          <el-option v-for="(option,index) in item.options" :label="option.label" :value="option.value" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="item.type == 'select'&&item.value=='type'" :key="index">
        <el-select  v-model="queryInfo[item.value]" :placeholder="item.placeholder?item.placeholder:''" >
          <el-option v-for="(option,index) in item.options" :label="option.label" :value="option.value" :key="index"></el-option>
        </el-select>
      </el-form-item>
    </template>
      <el-form-item>
        <el-button type="primary" @click="sendgetQuery">查询</el-button>
      </el-form-item>


    </el-form >
</template>

<script>
export default {
  name: "Search",
  props:['queryData','queryInfo'],
  data(){
    return {

    }
  },
  methods:{
    sendgetQuery(){
      this.$emit('getQuery',this.queryInfo)
    }
  }
}
</script>

<style scoped>

</style>