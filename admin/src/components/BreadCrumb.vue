<template>
  <!-- 面包屑 -->
  <el-breadcrumb  >
    <el-breadcrumb-item :to="{ path: bread.path }" v-for="(bread,index) in breadList" :key="index">{{bread.text}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "BreadCrumb",
  props:['breadList']
}
</script>

<style scoped>

</style>