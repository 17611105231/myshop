<template>
  <div class="login">
    <div class="box">
      <div class="headImage">
        <img src="../assets/001.png" alt="" />
      </div>
      <el-form
        :model="userInfo"
        :rules="userInfoRules"
        ref="userInfoRef"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user"
            v-model="userInfo.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="userInfo.password"
            placeholder="请输入密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginn } from '../network/login'
export default {
  data() {
    return {
      userInfo: {
        username: 'admin',
        password: '123456'
      },
      userInfoRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs.userInfoRef.validate(valid => {
        if (!valid) {
          return false
        } else {
          loginn(this.userInfo).then(res => {
            if (res.meta.status !== 200) {
              return this.$message.error(res.meta.msg)
            } else {
              this.$message.success(res.meta.msg)
              sessionStorage.setItem('token', res.data.token)
              this.$router.push('/home')
            }
          })
        }
      })
    },
    reset() {
      this.$refs.userInfoRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  background-color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box {
  position: relative;
  width: 450px;
  height: 300px;
  padding: 0px 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 1px -1px 2px #ddd;
  .headImage img {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0px 0px 10px #ddd;
    padding: 12px;
  }
}

.demo-ruleForm {
  margin-top: 100px;
}
.btn {
  width: 150px;
  position: absolute;
  right: 20px;
}
</style>
