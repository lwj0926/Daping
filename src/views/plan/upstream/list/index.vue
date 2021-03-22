<template>
  <div class="container">
    <div class="filter-container mb-1">
      <el-date-picker v-model="value" type="month" :clearable="false" />
    </div>
    <div class="table-container">
      <line-chart height="300px" :data="chartData" />
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column type="index" label="#" width="50" align="center" />
        <el-table-column prop="company" label="公司名称" align="center" width="240" />
        <el-table-column prop="plan" label="月计划(万方)" align="center" />
        <el-table-column prop="plan" label="月批复(万方)" align="center" />
      </el-table>
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/Charts/LineChart'
import waves from '@/directive/waves' // waves directive

export default {
  name: 'C',
  components: { LineChart },
  directives: { waves },
  props: {},
  data() {
    return {
      value: new Date(),
      tableData: [
        { id: 1, company: '黄石公司', plan: 100 },
        { id: 2, company: '咸宁昆仑', plan: 100 },
        { id: 3, company: '荆门公司', plan: 100 },
        { id: 4, company: '武汉管道', plan: 100 },
        { id: 5, company: '武汉压缩', plan: 100 },
        { id: 6, company: '武汉昆仑', plan: 100 },
        { id: 7, company: '恩施公司', plan: 100 },
        { id: 8, company: '仙桃公司', plan: 100 },
        { id: 9, company: '十堰公司', plan: 100 },
        { id: 10, company: '东湖公司', plan: 100 },
        { id: 11, company: '孝感公司', plan: 100 },
        { id: 12, company: '昆利湖北', plan: 100 },
        { id: 13, company: '咸宁公司', plan: 100 },
        { id: 14, company: '湖北新捷', plan: 100 }
      ],
      chartData: [
        ['product', '黄石公司', '咸宁昆仑', '荆门公司', '武汉管道', '武汉压缩', '武汉昆仑', '恩施公司', '仙桃公司', '十堰公司', '东湖公司', '孝感公司', '昆利湖北', '咸宁公司', '湖北新捷'],
        ['月计划', 41.1, 30.4, 65.1, 53.3, 41.1, 30.4, 65.1, 53.3, 41.1, 30.4, 65.1, 53.3, 65.1, 53.3],
        ['月批复', 86.5, 92.1, 85.7, 83.1, 86.5, 92.1, 85.7, 83.1, 86.5, 92.1, 85.7, 83.1, 86.5, 92.1]
      ]
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleFilter() {},
    getAuditType(type) {
      return auditTypeOptions.find(item => item.key === type).type
    }
  }
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
    .chart-container {
      width: 500px !important;
    }
  }
}
</style>
