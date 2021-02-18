<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="queryInfo.query">
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="queryUser"
          ></el-button
        ></el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="addUser">{{
          buttonName
        }}</el-button></el-col
      >
    </el-row>
  </div>
</template>

<script>
export default {
  props: { queryInfo: {}, buttonName: { type: String, default: '添加' } },
  methods: {
    addUser() {
      this.$emit('addUser')
    },
    queryUser() {
      this.$emit('queryUser', this.queryInfo.query)
    }
  }
}
</script>

<style></style>
