<template>
  <div class="container">
    <!-- 左边日历 -->
    <div class="calendar-container">
      <el-calendar v-model="listQuery.date">
        <template slot="dateCell" slot-scope="{data}">
          <span
            :class="{ 'is-selected' :data.isSelected, 'is-error':isError(data)}"
          >{{ data.day.split('-').slice(2).join('-') }}</span>
        </template>
      </el-calendar>
      <pie-chart :data="chartData" />
    </div>

    <div class="form-container">
      <!-- 按钮操作区域 -->
      <div v-show="isShow" class="button-container">
        <el-tooltip class="item" effect="dark" content="暂存日报，不会提交给管理员" placement="top">
          <el-button
            type="primary"
            plain
            :disabled="temp.state==2 || temp.state==3"
            @click="handleTempStorage"
          >暂 存</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="提交日报给管理员" placement="top">
          <el-button
            type="primary"
            :disabled="temp.state==2 || temp.state==3"
            @click="handleSubmit"
          >提 交</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="提交日报给二级单位" placement="top">
          <el-button
            type="primary"
            :disabled="temp.state==1|| temp.state==3 || temp.state==4"
            @click="handleAudit"
          >上 报</el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="退回给用户更改" placement="top">
          <el-button
            type="danger"
            :disabled="temp.state==1|| temp.state==4"
            @click="handleReturnBack"
          >退 回</el-button>
        </el-tooltip>
      </div>
      <!-- tab切换区域 -->
      <el-tabs v-model="listQuery.type" @tab-click="handleClick">
        <!-- 购销存日报表 -->
        <el-tab-pane label="购销存日报表" name="1">
          <el-alert type="warning" :closable="false">
            <template>
              <div>{{ temp.state | auditTypeFilter }}</div>
            </template>
          </el-alert>
          <buy-sale-stock :temp="temp" />
        </el-tab-pane>
        <!-- 贸易气量日报表 -->
        <el-tab-pane label="贸易气量日报表" name="2" :lazy="true">
          <el-alert type="warning" :closable="false">
            <template>
              <div>{{ temp.state | auditTypeFilter }}</div>
            </template>
          </el-alert>
          <trade-meter :temp="temp" />
        </el-tab-pane>
        <!-- 黄冈工厂日报表 -->
        <el-tab-pane label="黄冈工厂日报表" name="3" :lazy="true">
          <el-alert type="warning" :closable="false">
            <template>
              <div>{{ temp.state | auditTypeFilter }}</div>
            </template>
          </el-alert>
          <huanggang-factory :temp="temp" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getReport, createReport, updateReport, getReportRecords } from '@/api/product'
import { parseTime, array2Object, isToday } from '@/utils'
import { auditTypeOptions } from '@/utils/options'
import mixin from '../mixin'

export default {
  filters: {
    auditTypeFilter(type) {
      return array2Object(auditTypeOptions)[type]
    }
  },
  mixins: [mixin],
  props: {},
  data() {
    return {
      calendarData: {},
      chartData: [],
      temp: { id: 0 },
      listQuery: {
        date: new Date(),
        type: '1'
      }
    }
  },
  computed: {
    isShow() {
      return isToday(this.listQuery.date)
    }
  },

  created() {
    this.getData()
  },
  mounted() {},
  methods: {
    getData() {
      // 得到当月的填报记录
      this.getReportRecords()
      // 得到日报
      this.getReport()
    },
    // 得到日报
    getReport() {
      getReport({
        date: parseTime(this.listQuery.date, '{y}-{m}-{d}'),
        type: this.listQuery.type
      }).then(response => {
        this.temp = response.data
      })
    },
    // 上传日报的记录
    getReportRecords() {
      getReportRecords({
        year: parseTime(this.listQuery.date, '{y}'),
        month: parseTime(this.listQuery.date, '{m}'),
        type: this.listQuery.type
      }).then(response => {
        this.calendarData = response.data
      })
    },

    // tab切换
    handleClick(tab, event) {
      this.getData()
    },
    // 暂存
    handleTempStorage() {
      createReport(this.temp, { type: this.listQuery.type, opType: 'tempStorage' }).then(response => {
        console.log(response.data)
        this.temp.state = response.data.state
        this.$message.success('日报已暂存')
      })
    },
    // 提交
    handleSubmit() {
      this.$confirm('您确定要提交日报给管理员吗？', '提示', {
        type: 'warning'
      })
        .then(_ => {
          createReport(this.temp, { type: this.listQuery.type, opType: 'submit' }).then(response => {
            this.temp.state = response.data.state
            this.$message.success('日报已提交给管理员')
          })
        })
        .catch(_ => {
          this.$message.info('操作已取消')
        })
    },
    // 上报
    handleAudit() {
      this.$confirm('您确定要提交日报给二级单位吗？', '提示', {
        type: 'warning'
      })
        .then(_ => {
          updateReport({
            opType: 'report',
            type: this.listQuery.type,
            id: this.temp.id
          }).then(response => {
            this.temp.state = response.data.state
            this.$message.success('日报已提交给二级单位')
          })
        })
        .catch(_ => {
          this.$message.info('操作已取消')
        })
    },
    // 退回日报
    handleReturnBack() {
      this.$confirm('您确定要退回更改吗？')
        .then(_ => {
          updateReport({
            opType: 'returnBack',
            type: this.listQuery.type,
            id: this.temp.id
          }).then(response => {
            this.temp.state = response.data.state
            this.$message.success('日报已退回')
          })
        })
        .catch(_ => {
          this.$message.info('操作已取消')
        })
    }
    // // 判断哪些日期上面需要标上红点
    // isError(data) {
    //   return !this.calendarData[data.day] && data.type === 'current-month' && new Date(data.day) < new Date()
    // }
  }
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
  .form-container {
    padding: 10px 20px;
    background-color: #fff;
    flex-grow: 1;
    position: relative;
    .button-container {
      position: absolute;
      right: 20px;
      z-index: 2;
    }
  }
}
</style>
