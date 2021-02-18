<template>
  <div class="home">
    <el-container class="container">
      <el-header>
        <div class="image">
          <img src="../assets/001.png" alt="" />
        </div>
        <div class="title">电商管理系统</div>
        <el-button type="danger" size="small" @click="logout">退出</el-button>
      </el-header>
      <el-container>
        <el-aside :width="asideWidth">
          <div class="collapse" @click="controlCollapse">
            |||
          </div>
          <el-menu
            :collapse="collapse"
            :default-active="defaultActiveItem"
            :unique-opened="true"
            background-color="#333744"
            text-color="#fff"
            :collapse-transition="false"
            router
          >
            <el-submenu
              v-for="(item, index) in menuList"
              :key="index"
              :index="item.id + ''"
            >
              <template slot="title">
                <i :class="submenuIcon[index]"></i>
                <span>{{ item.authName }}</span>
              </template>
              <el-menu-item
                v-for="(itemChildren, index1) in item.children"
                :key="index1"
                :index="'/' + itemChildren.path"
                @click="saveActive('/' + itemChildren.path)"
              >
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{ itemChildren.authName }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu></el-aside
        >
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getMenu } from '../network/home'
export default {
  created() {
    getMenu().then(res => (this.menuList = res.data))
    this.defaultActiveItem = sessionStorage.getItem('activePath')
  },
  data() {
    return {
      menuList: [],
      submenuIcon: [
        'el-icon-user-solid',
        'el-icon-s-platform',
        'el-icon-s-goods',
        'el-icon-s-order',
        'el-icon-s-data'
      ],
      collapse: false,
      defaultActiveItem: ''
    }
  },
  methods: {
    logout() {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('activePath')
      this.$router.push('/login')
    },
    controlCollapse() {
      this.collapse = !this.collapse
    },
    saveActive(path) {
      sessionStorage.setItem('activePath', path)
    }
  },
  computed: {
    asideWidth() {
      return this.collapse ? 64 + 'px' : 200 + 'px'
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
}
.container {
  height: 100%;

  .el-aside {
    overflow: hidden;
    .collapse {
      line-height: 25px;
      text-align: center;
      color: #ddd;
      letter-spacing: 2px;
      font-size: 12px;
      background-color: rgb(82, 75, 75);
    }
    .el-menu {
      height: 100%;
      border: none;
    }
  }
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .image {
    img {
      height: 50px;
      border-radius: 50%;
      box-shadow: 0px 0px 5px #ddd;
    }
  }
  .title {
    font-size: 19px;
    color: #ddd;
  }
}
</style>
