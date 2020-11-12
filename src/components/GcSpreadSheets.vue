<template>
  <div class="spread-wrapper">
    <div class="spreadsheets" ref="spreadRef"></div>
    <div class="status-bar" ref="statusBar"></div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
// import "@grapecity/spread-sheets-vue";
import GC from "@grapecity/spread-sheets";
import { SPREADJS_KEY } from '@/store/mutation-types';
// 导入ExcelIO模块
import spreadExcel, { IO } from "@grapecity/spread-excelio";
// 导入文件保存模块
import FileSaver from "file-saver";
import "@grapecity/spread-sheets-resources-zh";
GC.Spread.Common.CultureManager.culture("zh-cn");
GC.Spread.Sheets.LicenseKey = SPREADJS_KEY;
// 您需要使用相同的许可证密钥单独许可ExcelIO模块
// spreadExcel.LicenseKey = SPREADJS_KEY;
let $spread: GC.Spread.Sheets.Workbook;

export default Vue.extend({
  name: "GcSpreadSheets",
  data() {
    return {
      activeSheetIndex: 0
    };
  },
  mounted() {
    this.initSpread()
  },
  methods: {
    /**
     * 初始化SpreadJS
     */
    initSpread() {
      $spread = new GC.Spread.Sheets.Workbook(this.$refs.spreadRef as HTMLElement, {
        scrollByPixel: true,
        scrollbarMaxAlign: true
      });
      this.$emit('workbook-initialized', $spread);
      this.initStatusBar();
      this.initEvents();
    },
    /**
     * 初始化状态栏
     */
    initStatusBar() {
      const statusBar = new GC.Spread.Sheets.StatusBar.StatusBar(this.$refs.statusBar as HTMLElement);
      statusBar.bind($spread);
    },
    /**
     * 初始化绑定事件
     */
    initEvents() {
      // 当用户在单元格中按下鼠标左键时发生
      $spread.bind(GC.Spread.Sheets.Events.CellClick,  (sender: any, args: GC.Spread.Sheets.ICellsInfo) =>{
        const sheet = $spread.getActiveSheet()
        const formula = sheet.getFormula(args.row, args.col);
        const a = this.getTableActiveIndex($spread);
        console.log(a)
      });
      // 表单当选择区域发生变化
      $spread.bind(GC.Spread.Sheets.Events.SelectionChanged, (sender: any, args: GC.Spread.Sheets.ISelectionChangedEventArgs) => {
        // 获取选择区域
        const range: GC.Spread.Sheets.Range = args.newSelections[0];
        const lockedArr = this.getRangeLockedValue(range, args.sheet);
        // console.log(lockedArr)
      });
    },
    // 获取活动单元格基于表格索引
    getTableActiveIndex(spread: GC.Spread.Sheets.Workbook): any{
      
      const sheet = spread.getActiveSheet();
      const sheetActiveRowIndex = sheet.getActiveRowIndex();
      const sheetActiveColumnIndex = sheet.getActiveColumnIndex();
      const table = sheet.tables.find(sheetActiveRowIndex, sheetActiveColumnIndex);
      const tableRange = table.range();
      const showHeader = table.showHeader();
      const tableEndRow = tableRange.row + tableRange.rowCount ;
      const tableEndCol = tableRange.col + tableRange.colCount;
      const position = {
        row: tableRange.rowCount - (tableEndRow - sheetActiveRowIndex) -1,
        col: tableRange.colCount - (tableEndCol - sheetActiveColumnIndex)
      }
      return position;
    },
    // 获取选择区域锁定单元格的值
    getRangeLockedValue(range: GC.Spread.Sheets.Range, sheet: GC.Spread.Sheets.Worksheet) {
      const lockedArr = [];
      for (let r = 0; r < range.rowCount; r++) {
        for (let c = 0; c < range.colCount; c++) {
          // 获取单元格是否锁定，true则保存单元格位置与值
          const isLocked = sheet.getRange(range.row + r, range.col + c).locked();
          if (isLocked) {
            const val = sheet.getCell(range.row + r, range.col + c).value()
            lockedArr.push({
              row: range.row + r,
              col: range.col + c,
              value: val
            })
          }
        }
      }
      return lockedArr;
    },
    // 获取选择区域锁定单元格的公式
    getRangeLockedFormula(range: GC.Spread.Sheets.Range, sheet: GC.Spread.Sheets.Worksheet) {
      const lockedArr = [];
      for (let r = 0; r < range.rowCount; r++) {
        for (let c = 0; c < range.colCount; c++) {
          // 获取单元格是否锁定且单元格中是否有公式，true则保存单元格位置与公式
          const isLocked = sheet.getRange(range.row + r, range.col + c).locked();
          const formulaInfo: GC.Spread.Sheets.IFormulaInfo = sheet.getFormulaInformation(range.row + r, range.col + c)
          if (isLocked && formulaInfo.hasFormula) {
            const val = sheet.getCell(range.row + r, range.col + c).value()
            lockedArr.push({
              row: range.row + r,
              col: range.col + c,
              value: formulaInfo.formula
            })
          }
        }
      }
      return lockedArr;
    },
    // 设置单元格的值
    setCellsValue(cellArr: Array<any>, sheet: GC.Spread.Sheets.Worksheet) {
      cellArr.forEach(item => {
        sheet.getCell(item.row, item.col).value(item.value);
      })
    },
    addSheet(sheet: GC.Spread.Sheets.Worksheet) {
      $spread.addSheet($spread.getSheetCount(), sheet);
    },
    removeSheet() {
      const activeIndex = $spread.getActiveSheetIndex();
      if (activeIndex >= 0) {
        $spread.removeSheet(activeIndex);
      }
    },
    clearSheets() {
      $spread.clearSheets();
    },
    // 导出
    saveExcel() {
      const excelIo = new IO();
      let fileName = $spread.name;
      if (fileName.substr(-5, 5) !== ".xlsx") {
        fileName += ".xlsx";
      }
      const serializationOption = {
        includeBindingSource: true, // 将工作簿转换为json时包含绑定源，默认值为false
        ignoreStyle: false, // 将工作簿转换为json时忽略样式，默认值为false
        ignoreFormula: false, // 将工作簿转换为json时忽略公式，默认值为false
        saveAsView: false, // 将工作簿转换为json时包含格式字符串格式结果，默认值为false
        rowHeadersAsFrozenColumns: false, // 将工作簿转换为json时，将行标题视为冻结列，默认值为false
        columnHeadersAsFrozenRows: false, // 将工作簿转换为json时，将列标题视为冻结行，默认值为false
        includeAutoMergedCells: true // 将工作簿转换为json时，将自动合并的单元格包含到实际合并的单元格中
      };
      const jsonString = JSON.stringify($spread.toJSON(serializationOption));
      // here is excel IO API
      excelIo.save(jsonString, function (blob: any) {
        FileSaver.saveAs(blob, fileName);
      });
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "~@grapecity/spread-sheets/styles/gc.spread.sheets.excel2013white.css";
.spread-wrapper {
  width: 100%;
  height: 100%;
  .spreadsheets {
    position: relative;
    width: 100%;
    height: calc(100% - 30px);
    border: 1px solid rgb(246, 246, 246);
    box-sizing: border-box;
  }
  .status-bar {
    width: 100%;
    height: 30px;
  }
}
</style>
