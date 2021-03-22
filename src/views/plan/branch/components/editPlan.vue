<template>
  <div class="container">
    <!-- 表格部分 -->
    <div class="table-container" style="width: 50%">
      <!-- 操作按钮 -->
      <div class="filter-container mb-1">
        <el-date-picker v-model="listQuery.date" :type="type" :clearable="false" @change="getPlan" />
        <el-button type="primary" @click="savePlan">保存</el-button>
      </div>
      <!-- 表格 -->
      <el-table :data="tableData" border stripe>
        <el-table-column type="index" label="#" width="50" />
        <el-table-column prop="orgName" label="组织名称" width="240" />
        <el-table-column label="计划量(万方)">
          <template slot-scope="{ row }">
            <el-input-number v-model="row.quantity" :controls="false" :min="0" class="w-100" />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 图表部分 -->
    <pietwo-chart :data="chartData" height="500px" width="50%" />
  </div>
</template>

<script>
import { fetchList } from '@/api/org'
import { fetchPlanBranch, savePlanBranch } from '@/api/plan'
import PietwoChart from '@/components/Charts/PietwoChart'
import waves from '@/directive/waves' // waves directive
export default {
  components: { PietwoChart },
  directives: { waves },
  props: {
    type: {
      type: String,
      default: 'year'
    }
  },
  data() {
    return {
      tableData: [],
      listQuery: {
        date: new Date()
      }
    }
  },
  computed: {
    chartData() {
      const temp = []
      this.tableData.forEach(item => {
        temp.push({ value: item.quantity, name: item.orgName })
      })
      return temp
    }
  },
  created() {
    this.getPlan()
  },
  methods: {
    // 获取列表
    async getPlan() {
      const param = {
        year: this.listQuery.date.getFullYear(),
        type: this.type
      }
      if (this.type === 'month') {
        param['month'] = this.listQuery.date.getMonth() + 1
      }
      const response = await fetchPlanBranch(param)
      // 如果当前已经填写了计划，就取填写的，如果没有填写就根据组织信息取
      if (response.data.length) {
        this.tableData = response.data
      } else {
        this.getOrgs()
      }
    },
    // 保存计划
    async savePlan() {
      await savePlanBranch(this.tableData)
      this.$message.success('数据保存成功')
    },
    // 查询需要填写购销存日报的组织
    async getOrgs() {
      const response = await fetchList({
        // 查询条件
        pageNum: 1,
        pageSize: 1000,
        reportType: 1
      })
      const temp = []
      response.data.forEach(item => {
        const obj = { orgId: item.id, orgName: item.orgName, quantity: 0, year: this.listQuery.date.getFullYear(), type: this.type }
        obj['month'] = this.type === 'month' ? this.listQuery.date.getMonth() + 1 : 0
        temp.push(obj)
      })
      this.tableData = temp
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  padding: 20px;
  display: flex;
}
</style>
