<template>
  <el-container>
    <el-header>
      <el-row type="flex" align="middle" :gutter="24">
        <el-col :md="4">
          <router-link class="logo" to="/" title="系统名称">
            <el-badge :hidden="!VUE_APP_ENV" :value="VUE_APP_ENV" :type="ENVBadgeType[VUE_APP_ENV]">
              <span>系统名称</span>
            </el-badge>
          </router-link>
        </el-col>

        <el-col :md="16">
          <el-menu mode="horizontal" background-color="#000730" :default-active="$route.path" text-color="#ffffff" active-text-color="#409EFF" router>
            <el-menu-item index="/index">首页</el-menu-item>
            <el-menu-item index="/about">关于</el-menu-item>
            <el-menu-item index="/report-forms">报表</el-menu-item>
          </el-menu>
        </el-col>

        <el-col :md="4" style="text-align:right">
          <el-dropdown @command="handleCommand">
            <div class="el-dropdown-link">
              <el-avatar size="medium" icon="el-icon-user-solid" :src="user.avatar"></el-avatar>
              {{user.name}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </div>
            <template v-slot:dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="logout">退出登陆</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <br>
      <router-view />
      <br>
    </el-main>
  </el-container>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapState, mapGetters } from "vuex";
export default Vue.extend({
  name: 'layout',
  data() {
    return {
      VUE_APP_ENV: process.env.VUE_APP_ENV,
      ENVBadgeType: {
        dev: 'warning',
        test: 'primary',
        pre: 'success'
      }
    }
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    handleCommand(command: string) {
      if (command === "logout") {
        console.log('logout');
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #000730;
  .el-avatar {
    vertical-align: middle;
  }
}
.el-main {
  width: 100vw;
  height: calc(100vh - 60px);
  padding: 0 24px;
  box-sizing: border-box;
}
</style>