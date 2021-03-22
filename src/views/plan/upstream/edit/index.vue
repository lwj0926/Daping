<template>
  <div class="container">
    <div class="filter-container mb-1">
      <el-date-picker
        v-model="value"
        type="year"
        placeholder="选择年"
        :clearable="false"
        class="mr-1"
      />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      />
      <el-button class="filter-item" style="margin-left: 10px;" type="primary">保存</el-button>
    </div>
    <div class="table-container">
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column type="index" label="月份" width="100" align="center" />
        <!-- <el-table-column prop="name" label="月份" align="center" width="100" /> -->
        <el-table-column label="月计划(万方)" align="center">
          <template slot-scope="scope">
            <el-input />
          </template>
        </el-table-column>
        <el-table-column label="月批复(万方)" align="center">
          <template slot-scope="scope">
            <el-input />
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="{row}">
            <el-tag :type="getAuditType(row.status)">{{ row.status | auditTypeFilter }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" width="300">
          <template slot-scope="scope">
            <el-button type="primary" plain>暂存</el-button>
            <el-button type="primary">提交</el-button>
            <el-button type="primary">审批</el-button>
            <el-button type="danger">撤回</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pie-chart :data="chartData" height="500px" width="500px" />
    </div>
  </div>
</template>

<script>
import PieChart from '@/components/Charts/PietwoChart'
import waves from '@/directive/waves' // waves directive
import { array2Object } from '@/utils'
import { auditTypeOptions } from '@/utils/options'

console.log(auditTypeOptions)
export default {
  name: 'C',
  components: { PieChart },
  directives: { waves },
  filters: {
    auditTypeFilter(type) {
      return array2Object(auditTypeOptions)[type]
    },
  },
  props: {},
  data() {
    return {
      value: new Date(),
      tableData: [
        { id: 1, name: '1月', status: 1 },
        { id: 2, name: '2月', status: 2 },
        { id: 3, name: '3月', status: 3 },
        { id: 4, name: '4月', status: 4 },
        { id: 5, name: '5月', status: 1 },
        { id: 6, name: '6月', status: 1 },
        { id: 7, name: '7月', status: 1 },
        { id: 8, name: '8月', status: 1 },
        { id: 9, name: '9月', status: 1 },
        { id: 10, name: '10月', status: 1 },
        { id: 11, name: '11月', status: 1 },
        { id: 12, nam: '12月', status: 1 },
      ],
      chartData: [
        { value: 1, name: '1月' },
        { value: 2, name: '2月' },
        { value: 3, name: '3月' },
        { value: 4, name: '4月' },
        { value: 5, name: '5月' },
        { value: 6, name: '6月' },
        { value: 7, name: '7月' },
        { value: 8, name: '8月' },
        { value: 9, name: '9月' },
        { value: 10, name: '10月' },
        { value: 11, name: '11月' },
        { value: 12, name: '12月' },
      ],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleFilter() {},
    getAuditType(type) {
      return auditTypeOptions.find((item) => item.key === type).type
    },
  },
}
</script>

<style scoped lang="scss">
.container {
  padding: 20px;
  .table-container {
    display: flex;
    flex-wrap: wrap;
    .el-table {
      text-align: center;
      // width: 60% !important;
      flex-grow: 1;
      // text-align: center;
      // border: 1px solid #ccc;
    }
    .chart {
      width: 500px !important;
    }
  }
}
</style>
