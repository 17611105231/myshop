<template>
  <el-dialog
    title="添加用户"
    :visible.sync="dialogVisible"
    width="30%"
    @close="dialogClose"
  >
    <el-form
      :model="addUserInfo"
      :rules="addUserInfoRules"
      ref="addUserInfoRef"
      label-width="70px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="addUserInfo.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="addUserInfo.password"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="addUserInfo.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="addUserInfo.phone"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addUser">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      addUserInfo: {
        username: '',
        password: '',
        email: '',
        phone: ''
      },
      addUserInfoRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    addUser() {
      this.dialogVisible = false
      this.$refs.addUserInfoRef.validate(valid => {
        if (!valid) {
          return false
        } else {
          this.$emit('confirmAddUser', this.addUserInfo)
        }
      })
    },
    dialogClose() {
      this.$refs.addUserInfoRef.resetFields()
    }
  }
}
</script>

<style></style>
