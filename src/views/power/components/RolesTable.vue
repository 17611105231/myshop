<template>
  <el-table border stripe :data="rolesList" style="width: 100%">
    <el-table-column type="expand">
      <template v-slot="scoped">
        <el-row
          :class="{
            vcenter: true,
            topline: index == 0,
            bottomline: true
          }"
          v-for="(item, index) in scoped.row.children"
          :key="index"
        >
          <el-col :span="5">
            <el-tag @close="removeRightsById(scoped.row, item.id)" closable>{{
              item.authName
            }}</el-tag>
          </el-col>
          <el-col :span="19">
            <el-row
              :class="{ vcenter: true, topline: index1 !== 0 }"
              v-for="(item1, index1) in item.children"
              :key="item1.id"
            >
              <el-col :span="6"
                ><el-tag
                  @close="removeRightsById(scoped.row, item1.id)"
                  type="success"
                  closable
                  >{{ item1.authName }}</el-tag
                >
              </el-col>
              <el-col :span="18">
                <el-tag
                  v-for="item2 in item1.children"
                  :key="item2.id"
                  type="warning"
                  closable
                  @close="removeRightsById(scoped.row, item2.id)"
                  >{{ item2.authName }}</el-tag
                >
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </template>
    </el-table-column>
    <el-table-column type="index" label="#"></el-table-column>
    <el-table-column label="角色名称" prop="roleName"></el-table-column>
    <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
    <el-table-column label="角色操作" width="280">
      <template>
        <el-button size="mini" type="primary" class="el-icon-edit"
          >编辑</el-button
        >
        <el-button size="mini" type="danger" class="el-icon-delete"
          >删除</el-button
        >
        <el-button size="mini" type="warning" class="el-icon-setting"
          >分配权限</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: ['rolesList'],
  methods: {
    async removeRightsById(row, id) {
      const result = await this.$confirm(
        '此操作将永久删除该文件, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (result === 'cancel') return false
      this.$emit('removeRightsById', row, id)
    }
  }
}
</script>

<style scoped>
.el-table {
  margin-top: 15px;
}
.el-tag {
  margin: 7px;
}
.vcenter {
  display: flex;
  align-items: center;
}
.topline {
  border-top: 1px solid rgb(233, 232, 232);
}
.bottomline {
  border-bottom: 1px solid rgb(233, 232, 232);
}
</style>
