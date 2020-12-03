<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="username" label="姓名"></el-table-column>
      <el-table-column prop="date" label="出生日期"></el-table-column>
      <el-table-column prop="address" label="地区"></el-table-column>
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
  created() {
    this.loadData()
  },
  methods: {
    async loadData() {
      const { data } = await queryUserList();
      this.tableData = data
    }
  }
})
</script>