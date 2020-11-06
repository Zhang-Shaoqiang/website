<template>
  <div class="about">
    <br />
    <GcSpreadSheets @workbookInitialized="initSpread" />
    <br />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import GC from "@grapecity/spread-sheets";
import GcSpreadSheets from '@/components/GcSpreadSheets.vue'
interface ComData {
  spread: null| GC.Spread.Sheets.Workbook;
}
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
    }
  }
})
</script>

<style lang="scss" scoped>
.about{
  height: calc(100vh - 100px);
}
</style>