<template>
  <div class="container">
    <div class="table-container" style="width: 50%">
      <div class="filter-container mb-1">
        <el-date-picker
          v-model="listQuery.date"
          type="month"
          placeholder="选择月"
          :clearable="false"
          @change="handleFilter"
        />

        <el-button type="primary" @click="savePlan">保存</el-button>
      </div>
      <el-table :data="tableData" border stripe>
        <el-table-column type="index" label="#" width="50" />
        <el-table-column prop="orgName" label="公司名称" width="240" />
        <el-table-column label="计划量(万方)">
          <template slot-scope="{row}">
            <el-input-number v-model="row.quantity" :controls="false" :min="0" class="w-100" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pie-chart :data="chartData" height="500px" width="50%" />
  </div>
</template>

<script>
import { fetchList } from '@/api/org'
import { fetchPlanBranch, savePlanBranch } from '@/api/plan'
import PieChart from '@/components/Charts/PietwoChart'
import waves from '@/directive/waves' // waves directive
export default {
  components: { PieChart },
  directives: { waves },
  props: {},
  data() {
    return {
      tableData: [],
      // chartData: [
      //   { value: 1, name: '黄石公司' },
      //   { value: 2, name: '咸宁昆仑' },
      //   { value: 3, name: '荆门公司' },
      //   { value: 4, name: '武汉管道' },
      //   { value: 5, name: '武汉压缩' },
      //   { value: 6, name: '武汉昆仑' },
      //   { value: 7, name: '恩施公司' },
      //   { value: 8, name: '仙桃公司' },
      //   { value: 9, name: '十堰公司' },
      //   { value: 10, name: '东湖公司' },
      //   { value: 11, name: '孝感公司' },
      //   { value: 12, name: '昆利湖北' },
      //   { value: 13, name: '咸宁公司' },
      //   { value: 14, name: '湖北新捷' }
      // ],
      listLoading: true, // 加载动画
      listQuery: {
        date: new Date(),
        type: 'month'
      }
    }
  },
  computed: {
    chartData() {
      const temp = []
      this.tableData.forEach(item => {
        temp.push({ value: item.quantity, name: item.orgName })
      })
      console.log(this.tableData.length)
      console.log(temp.length)
      return temp
    }
  },
  created() {
    this.getPlan()
  },
  methods: {
    // 获取列表
    async getPlan() {
      this.listLoading = true

      const response = await fetchPlanBranch({
        year: this.listQuery.date.getFullYear(),
        month: this.listQuery.date.getMonth() + 1,
        type: this.listQuery.type
      })
      // 如果当前已经填写了计划，就取填写的，如果没有填写就根据组织信息取
      if (response.data.length) {
        this.tableData = response.data
      } else {
        this.getOrgs()
      }

      this.listLoading = false
    },
    async savePlan() {
      console.log(this.tableData)
      await savePlanBranch(this.tableData)
      this.$message.success('数据保存成功')
    },
    async getOrgs() {
      const response = await fetchList({
        // 查询条件
        pageNum: 1,
        pageSize: 1000,
        reportType: 1
      })
      const temp = []
      response.data.forEach(item => {
        temp.push({
          orgId: item.id,
          orgName: item.orgName,
          quantity: 0,
          year: this.listQuery.date.getFullYear(),
          month: this.listQuery.date.getMonth() + 1,
          type: this.listQuery.type
        })
      })
      this.tableData = temp
      this.listLoading = false
    },
    handleFilter() {}
  }
}
</script>

<style scoped lang="scss">
.container {
  padding: 20px;
  display: flex;
}
</style>
