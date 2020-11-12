<template>
  <div class="about">
    <el-row type="flex" align="middle" :gutter="24">
      <el-col :span="12">
        <el-page-header @back="$router.back()" content="报表模型"></el-page-header>
      </el-col>
      <el-col :span="12">
        <el-button type="primary">编辑表单</el-button>
        <el-button type="primary">新建表单</el-button>
        <el-button type="primary">导出表单</el-button>
      </el-col>
    </el-row>
    <br>
    <el-row :gutter="24">
      <el-col :span="22">
        <GcSpreadSheets class="spread-container" @workbook-initialized="initSpread" />
      </el-col>
      <el-col :span="2">
        <el-button size="mini" type="primary">增行</el-button>
        <el-button size="mini" type="primary">删行</el-button>
        <el-button size="mini" type="primary">增列</el-button>
        <el-button size="mini" type="primary">删列</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import GC from "@grapecity/spread-sheets";
import GcSpreadSheets from '@/components/GcSpreadSheets.vue'
interface ComData {
  spread: null| GC.Spread.Sheets.Workbook;
}
const source = [
    { Course: '0,0', Term: '0,1', Credit: '0,2', Score: '0,3', Teacher: "0,4" },
    { Course: '1,0', Term: '1,1', Credit: '1,2', Score: '1,3', Teacher: "1,4" },
    { Course: '2,0', Term: '2,1', Credit: '2,2', Score: '2,3', Teacher: "2,4" },
    { Course: '3,0', Term: '3,1', Credit: '3,2', Score: '3,3', Teacher: "3,4" },
    { Course: '4,0', Term: '4,1', Credit: '4,2', Score: '4,3', Teacher: "4,4" }
];
export default Vue.extend({
  components: {
    GcSpreadSheets
  },
  data(): ComData {
    return {
      spread: null
    }
  },
  methods: {
    initSpread(spread: GC.Spread.Sheets.Workbook){
      this.spread = spread;
      const spreadNS = GC.Spread.Sheets;
      const sheet = spread.getActiveSheet();
      const table = sheet.tables.addFromDataSource("Table1", 0, 0, source, spreadNS.Tables.TableThemes.light13);
      table.showHeader(true);
    },
    // 获取活动单元格基于表格索引
    getTableActiveIndexs(spread: GC.Spread.Sheets.Workbook): any{
      const position = {
        row:0,
        col:0
      }
      const sheet = spread.getActiveSheet();
      const sheetActiveRowIndex = sheet.getActiveRowIndex();
      const sheetActiveColumnIndex = sheet.getActiveColumnIndex();
      const table = sheet.tables.find(sheetActiveRowIndex, sheetActiveColumnIndex);
      const tableRange = table.range();
      const showHeader = table.showHeader();
      const tableEndRowIndex = tableRange.rowCount - tableRange.row;
      const tableEndCol = tableRange.col + tableRange.colCount;
      for(let i=0; i<= tableEndRowIndex; i++){
        if(sheetActiveRowIndex == tableRange.row + i + 1){
          console.log('tableActiveRowIndex',i)
          position.row = i
        }
      }
      for(let i=0; i<= tableEndCol; i++){
        if(sheetActiveColumnIndex == tableRange.col + i){
          console.log('tableActiveColIndex',i)
          position.col = i
        }
      }
      return position;
    },
  }
})
</script>

<style lang="scss" scoped>
.spread-container{
  height: calc(100vh - 160px);
}
</style>