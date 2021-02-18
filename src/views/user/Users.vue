<template>
  <div>
    <breadcrumb>
      <span slot="first">用户管理</span><span slot="second">用户列表</span>
    </breadcrumb>
    <el-card>
      <search
        :query-info="queryInfo"
        :button-name="'添加用户'"
        @queryUser="queryUser"
        @addUser="addUser"
      ></search>
      <tabble
        :table-data="userList"
        @queryUserInfo="queryUserInfo"
        @changeStatus="changeStatus"
        @deleteUser="deleteUser"
      ></tabble>
      <pagination
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        :queryInfo="queryInfo"
        :total="total"
      ></pagination>
    </el-card>
    <Dialog ref="dialog" @confirmAddUser="confirmAddUser"></Dialog>
    <DialogEdit
      ref="dialogEdit"
      @editUser="editUser"
      :editUserInfo="editUserInfo"
    ></DialogEdit>
  </div>
</template>

<script>
import Breadcrumb from '../../components/content/Breadcrumb'
import Search from '../../components/content/Search'
import Tabble from './components/Tabble'
import Dialog from './components/Dialog'
import DialogEdit from './components/DialogEdit'
import Pagination from '../../components/content/Pagination'

import {
  userList,
  addUser1,
  changeStatus,
  queryUserInfo,
  editUser,
  queryUser,
  deleteUser
} from '../../network/user/user'
export default {
  components: { Breadcrumb, Search, Tabble, Dialog, Pagination, DialogEdit },
  created() {
    this.getUserList()
  },
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      userList: [],
      editUserInfo: {
        username: '',
        email: '',
        mobile: ''
      },
      currentUserId: ''
    }
  },
  methods: {
    getUserList() {
      userList(this.queryInfo).then(res => {
        console.log(res)
        if (res.meta.status !== 200) {
          this.$message.error(res.meta.msg)
        } else {
          this.total = res.data.total
          this.userList = res.data.users
          this.$message.success(res.meta.msg)
        }
      })
    },
    addUser() {
      this.$refs.dialog.dialogVisible = true
    },
    confirmAddUser(data) {
      // console.log(data)
      addUser1(data).then(res => {
        if (res.meta.status !== 201) {
          this.$message.error(res.meta.msg)
        } else {
          this.$message.success(res.meta.msg)
          this.getUserList()
        }
      })
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getUserList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getUserList()
    },
    changeStatus(row) {
      console.log(row)
      changeStatus(row.id, row.mg_state).then(res => {
        if (res.meta.status !== 200) {
          this.$message.error(res.meta.msg)
        } else {
          this.$message.success(res.meta.msg)
        }
      })
    },
    queryUserInfo(row) {
      this.currentUserId = row.id
      queryUserInfo(this.currentUserId).then(res => {
        if (res.meta.status !== 200) {
          this.$message.error(res.meta.msg)
        } else {
          this.$refs.dialogEdit.dialogVisible = true
          this.$message.success(res.meta.msg)
          this.editUserInfo.username = res.data.username
          this.editUserInfo.email = res.data.email
          this.editUserInfo.mobile = res.data.mobile
        }
      })
    },
    editUser(editUserInfo) {
      editUser(this.currentUserId, editUserInfo).then(res => {
        if (res.meta.status !== 200) {
          this.$message.error(res.meta.msg)
        } else {
          this.$refs.dialogEdit.dialogVisible = false
          this.$message.success(res.meta.msg)
          this.getUserList()
        }
      })
    },
    queryUser(query) {
      queryUser(query).then(res => {
        if (res.meta.status !== 200) {
          this.$message.error(res.meta.msg)
        } else {
          this.total = res.data.total
          this.userList = res.data.users
          this.$message.success(res.meta.msg)
        }
      })
    },
    deleteUser(row) {
      deleteUser(row.id).then(res => {
        if (res.meta.status !== 200) {
          this.$message.error(res.mete.msg)
        } else {
          this.$message.success(res.meta.msg)
          this.getUserList()
        }
      })
    }
  }
}
</script>

<style></style>
