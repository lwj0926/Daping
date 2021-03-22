<template>
  <div class="container">
    <div class="calendar-container">
      <!-- <el-calendar v-model="value" /> -->
      <el-calendar v-model="value">
        <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
        <template slot="dateCell" slot-scope="{date, data}">
          <span
            :class="{ 'is-selected' :data.isSelected, 'is-error':calendarData[data]}"
          >{{ data.day.split('-').slice(2).join('-') }}</span>
        </template>
      </el-calendar>
    </div>
    <div class="table-container">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="#" width="80" align="center" />
        <el-table-column prop="name" label="报表名称" align="center" />
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-link type="primary" icon="el-icon-download">导出 Excel</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'C',
  components: {},
  props: {},
  data() {
    return {
      value: new Date(),
      calendarData: {
        '2020-08-01': true,
      },
      tableData: [
        { name: '中石油昆仑能源湖北分公司生产运行日报表' },
        { name: '中石油昆仑能源湖北分公司贸易气量统计表' },
        { name: '中石油昆仑能源湖北分公司生产运行日报表（LNG工厂日报）' },
        { name: '中石油昆仑能源湖北分公司生产运行日报表（LNG数据核对）' },
      ],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  background-color: #d9e0e7;
  padding: 20px;
  min-height: calc(100vh - 50px);
  .calendar-container {
    background-color: #fff;
    min-width: 550px;
    width: 550px;
    margin-right: 20px;
  }
  .table-container {
    padding: 20px;
    background-color: #fff;
    flex-grow: 1;
  }
}
</style>
