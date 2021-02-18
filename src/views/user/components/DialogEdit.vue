<template>
  <el-dialog title="添加用户" :visible.sync="dialogVisible" width="30%">
    <el-form
      :model="editUserInfo"
      :rules="editUserInfoRules"
      ref="editUserInfoRef"
      label-width="70px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input disabled v-model="editUserInfo.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="editUserInfo.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="editUserInfo.mobile"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editUser">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ['editUserInfo'],
  data() {
    //验证邮箱的规则
    var checkEmail = (rule, value, cb) => {
      //邮箱的正则表达式
      const regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (regEmail.test(value)) {
        //合法的邮箱
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }

    return {
      dialogVisible: false,
      editUserInfoRules: {
        email: [{ validator: checkEmail, trigger: 'blur' }],
        mobile: [
          { required: false, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入合法的手机号', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    editUser() {
      this.$refs.editUserInfoRef.validate(valid => {
        if (!valid) {
          return false
        } else {
          this.$emit('editUser', this.editUserInfo)
        }
      })
    }
  }
}
</script>

<style></style>
