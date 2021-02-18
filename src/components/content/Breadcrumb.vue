<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>
        <slot name="first"></slot>
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <slot name="second"></slot>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
</style>
