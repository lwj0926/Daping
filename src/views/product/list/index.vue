<template>
  <div class="container">
    <!-- 左边日历 -->
    <div class="calendar-container">
      <el-calendar v-model="listQuery.date">
        <template slot="dateCell" slot-scope="{data}">
          <span
            :class="{ 'is-selected' :data.isSelected, 'is-error': isError(data)}"
          >{{ data.day.split('-').slice(2).join('-') }}</span>
        </template>
      </el-calendar>
      <pie-chart :data="chartData" />
    </div>
    <div class="list-container">
      <h4>购销存日报表({{ buySaleStockListNum }})</h4>
      <ul>
        <template v-for="(item, index) in recordDetail.buySaleStockList">
          <li v-if="item.reportTime" :key="index" class="is-submited" @click="handleClick(item)">
            <p>
              <i class="el-icon-success" />
              <span class="orgName">{{ item.orgName }}</span>
            </p>
            <p class="time">{{ item.reportTime | reportTimeFilter }}</p>
          </li>
          <li v-else :key="index">
            <p>
              <span class="orgName">{{ item.orgName }}</span>
            </p>
          </li>
        </template>
      </ul>
      <h4>贸易气量日报表({{ tradeMeterListNum }})</h4>
      <ul>
        <template v-for="(item, index) in recordDetail.tradeMeterList">
          <li v-if="item.reportTime" :key="index" class="is-submited" @click="handleClick(item)">
            <p>
              <i class="el-icon-success" />
              <span class="orgName">{{ item.orgName }}</span>
            </p>
            <p class="time">{{ item.reportTime | reportTimeFilter }}</p>
          </li>
          <li v-else :key="index">
            <p>
              <span class="orgName">{{ item.orgName }}</span>
            </p>
          </li>
        </template>
      </ul>
      <h4>黄冈工厂日报表({{ huanggangFactoryListNum }})</h4>
      <ul>
        <template v-for="(item, index) in recordDetail.huanggangFactoryList">
          <li v-if="item.reportTime" :key="index" class="is-submited" @click="handleClick(item)">
            <p>
              <i class="el-icon-success" />
              <span class="orgName">{{ item.orgName }}</span>
            </p>
            <p class="time">{{ item.reportTime | reportTimeFilter }}</p>
          </li>
          <li v-else :key="index">
            <p>
              <span class="orgName">{{ item.orgName }}</span>
            </p>
          </li>
        </template>
      </ul>
    </div>

    <el-drawer :title="drawerTitle" :visible.sync="drawer" size="50%">
      <!-- <buy-sale-stock :temp="{}" /> -->
      <component :is="drawerView" :temp="drawerData" :editable="false" />
    </el-drawer>
  </div>
</template>

<script>
import { getReport, getReportRecordsList, getReportRecordsListDetail } from '@/api/product'
import { parseTime, array2Object, isToday, getMonthDay } from '@/utils'
import mixin from '../mixin'

export default {
  filters: {
    reportTimeFilter(value) {
      return value.match(/^\d{4}-\d{2}-\d{2} (\d{2}:\d{2}):\d{2}$/)[1]
    }
  },
  mixins: [mixin],
  props: {},
  data() {
    return {
      calendarData: {},
      chartData: [],
      recordDetail: { buySaleStockList: [], tradeMeterList: [], huanggangFactoryList: [] },
      listQuery: {
        date: new Date()
      },
      drawer: false,
      drawerTitle: '',
      drawerView: 'buy-sale-stock',
      drawerData: {}
    }
  },
  computed: {
    buySaleStockListNum() {
      return this.recordDetail.buySaleStockList.filter(item => item.reportId).length + '/' + this.recordDetail.buySaleStockList.length
    },
    tradeMeterListNum() {
      return this.recordDetail.tradeMeterList.filter(item => item.reportId).length + '/' + this.recordDetail.tradeMeterList.length
    },
    huanggangFactoryListNum() {
      return this.recordDetail.huanggangFactoryList.filter(item => item.reportId).length + '/' + this.recordDetail.huanggangFactoryList.length
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
      // 日报汇总中，某天的填报情况
      this.getRecordDetail()
    },
    // 上传日报的记录
    async getReportRecords() {
      const response = await getReportRecordsList({
        year: parseTime(this.listQuery.date, '{y}'),
        month: parseTime(this.listQuery.date, '{m}')
      })

      this.calendarData = response.data
    },
    // 日报汇总中，某天的填报情况
    async getRecordDetail() {
      const response = await getReportRecordsListDetail({
        year: parseTime(this.listQuery.date, '{y}'),
        month: parseTime(this.listQuery.date, '{m}')
      })
      this.recordDetail = response.data
    },
    // 得到日报

    handleClick(item) {
      getReport({
        date: parseTime(this.listQuery.date, '{y}-{m}-{d}'),
        type: item.reportType,
        orgId: item.orgId
      }).then(response => {
        this.drawerData = response.data
      })

      this.drawerTitle = item.orgName

      if (item.reportType === 1) {
        this.drawerView = 'buy-sale-stock'
      } else if (item.reportType === 2) {
        this.drawerView = 'trade-meter'
      } else if (item.reportType === 3) {
        this.drawerView = 'huanggang-factory'
      }
      this.drawer = true
    }
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
  .list-container {
    padding: 0 20px;
    background-color: #fff;
    flex-grow: 1;
    h4 {
      font-size: 14px;
      padding-left: 4px;
      border-left: 4px solid #4fa1fd;
      width: 100%;
      margin: 20px 0;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0;
      li {
        list-style: none;
        width: 162px;
        height: 80px;
        margin: 0 10px 10px 0;
        text-align: center;
        background-color: #f5f7fa;
        color: #666666;

        &.is-submited {
          cursor: pointer;
          background-color: #e8faf1;
          .orgName {
            line-height: 16px;
          }
          .el-icon-success {
            color: #67c23a;
          }
          .time {
            margin-top: 0;
          }
        }
        .orgName {
          font-weight: 700;
          line-height: 52px;
        }
        .el-icon-success {
          margin-right: 4px;
        }
      }
    }
  }
}
</style>
