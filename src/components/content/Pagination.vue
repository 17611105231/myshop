<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="queryInfo.pagenum"
    :page-sizes="[3, 5, 10, 20]"
    :page-size="queryInfo.pagesize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  >
  </el-pagination>
</template>

<script>
export default {
  props: ['queryInfo', 'total'],
  methods: {
    handleSizeChange(newSize) {
      this.$emit('handleSizeChange', newSize)
    },
    handleCurrentChange(newPage) {
      this.$emit('handleCurrentChange', newPage)
    }
  }
}
</script>

<style scoped>
.el-pagination {
  margin-top: 15px;
  text-align: center;
}
</style>
