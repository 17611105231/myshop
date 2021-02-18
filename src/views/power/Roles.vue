<template>
  <div>
    <breadcrumb>
      <span slot="first">权限管理</span><span slot="second">角色列表</span>
    </breadcrumb>
    <el-card>
      <el-row>
        <el-col :span="5">
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>
      <roles-table
        @removeRightsById="removeRightsById"
        :roles-list="rolesList"
      ></roles-table>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from '../../components/content/Breadcrumb'
import RolesTable from './components/RolesTable'

import { rolesList, removeRightsById } from '../../network/power/roles'
export default {
  components: { Breadcrumb, RolesTable },
  data() {
    return {
      rolesList: []
    }
  },
  created() {
    rolesList().then(res => {
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.msg)
      } else {
        this.rolesList = res.data
      }
    })
  },
  methods: {
    async removeRightsById(row, id) {
      console.log(row, id)
      const res = await removeRightsById(row.id, id)
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.$message.success(res.meta.msg)
      row.children = res.data
    }
  }
}
</script>

<style></style>
