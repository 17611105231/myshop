<template>
  <div>
    <el-table border :data="tableData" stripe style="width: 100%">
      <el-table-column type="index" label="#" width="40"> </el-table-column>
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"> </el-table-column>
      <el-table-column prop="role_name" label="角色"> </el-table-column>
      <el-table-column prop="mg_state" label="状态">
        <template v-slot="scoped">
          <el-switch
            v-model="scoped.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeStatus(scoped.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="scoped">
          <el-button
            size="small"
            type="primary"
            class="el-icon-edit"
            @click="queryUserInfo(scoped.row)"
          ></el-button>
          <el-button
            size="small"
            type="danger"
            class="el-icon-delete"
            @click="deleteUser(scoped.row)"
          ></el-button>
          <el-tooltip effect="dark" content="分配角色" placement="top">
            <el-button
              size="small"
              type="warning"
              class="el-icon-setting"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  methods: {
    changeStatus(row) {
      this.$emit('changeStatus', row)
    },
    queryUserInfo(row) {
      this.$emit('queryUserInfo', row)
    },
    deleteUser(row) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$emit('deleteUser', row)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style scoped>
.el-table {
  margin-top: 15px;
}
</style>
