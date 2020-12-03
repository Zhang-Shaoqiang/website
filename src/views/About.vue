<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button type="parimary" @click="loadData({a:'A'})">请求A</el-button>

    <el-button type="parimary" @click="loadData({a:'B'})">请求B</el-button>
    
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="username" label="姓名"></el-table-column>
      <el-table-column prop="date" label="出生日期"></el-table-column>
      <el-table-column prop="address" label="地区"></el-table-column>
      <el-table-column prop="type" label="类型"></el-table-column>
    </el-table>
  </div>
</template>


<script lang="ts">
import Vue from 'vue'
import { queryUserList } from "@/services"
export default Vue.extend({
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    async loadData(params: any) {
      const { data } = await queryUserList(params);
      this.tableData = data
    }
  }
})
</script>