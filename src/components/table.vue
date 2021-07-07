<template>
  <el-table :data="tableData" border max-height="176" align="center" size="mini" style="font-size:14px;">
    <el-table-column v-for="(p, key) in column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false">
      <template slot-scope="scope">
        <div v-html="scope.row[p.prop]" />
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: ['tableData', 'column']
}
</script>
