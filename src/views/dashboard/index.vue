<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="16">
        <panel-group :cards="cards" />
        <div class="chart-wrapper">
          <h4>总购气量统计(一个月)</h4>
          <line-chart height="340px" :chart-data="buyData" chart-name="购气量" />
        </div>
        <div class="chart-wrapper">
          <h4>总售气量统计</h4>
          <div class="ling-box">
            <line-chart height="340px" width="65%" color="#FEB54F" chart-name="售气量" :chart-data="saleData" />
            <div style="width: 35%">
              <p v-text="'日气销量分布' + '(' + pieDate.dateData + ')'"></p>
              <pie-chart width="100%" :chart-data="pieData" :title-text="piesum.sumData" />
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="chart-wrapper" style="height: 350px">
          <h4>计划气量</h4>
          <div class="chart-wrapper-plan">
            <div class="plan-box">
              <huan-chart color="#4FA1FD" :chart-data="yearPlans.completePercent" />
              <p>本年计划：<span class="num" v-text="yearPlans.planQuantity" /></p>
              <p>累计完成：<span class="num" v-text="yearPlans.accumulateQuantity" /></p>
              <p>完成率：<span class="num" v-text="yearPlans.completePercent + '%'" /></p>
            </div>
            <div class="plan-box">
              <huan-chart color="#4FA1FD" :chart-data="monthPlans.completePercent" />
              <p>本月计划：<span class="num" v-text="monthPlans.planQuantity" /></p>
              <p>累计完成：<span class="num" v-text="monthPlans.accumulateQuantity" /></p>
              <p>完成率：<span class="num" v-text="monthPlans.completePercent + '%'" /></p>
            </div>
          </div>
        </div>
        <div class="chart-wrapper" style="height: 600px">
          <h4>黄冈工厂LNG</h4>
          <basic-chart :chart-data="lngfData" unit="单位：户" main-color="#333" />
          <p style="font-weight: bolder; margin-bottom: 30px">本月计划累计增加</p>
          <table class="table">
            <tr>
              <th>居民</th>
              <th>商业</th>
              <th>工业</th>
              <th>转供</th>
              <th>合计</th>
            </tr>
            <tr>
              <td v-text="lngData.juminsum"></td>
              <td v-text="lngData.shangyesum"></td>
              <td v-text="lngData.gongyesum"></td>
              <td v-text="lngData.zhuangongsum"></td>
              <td v-text="lngData.sum"></td>
            </tr>
          </table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import dashboard from '@/components/Charts/mixins/dashboard'
import BasicChart from '@/components/Charts/BasicChart'
import HuanChart from '@/components/Charts/HuanChart'

export default {
  mixins: [dashboard],
  name: 'Dashboard',
  components: {
    PanelGroup,
    HuanChart,

    BasicChart
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  background-color: rgb(240, 242, 245);

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 20px;
    border: 0px solid #fff;
    box-shadow: 0px 0px 0px;
  }
}
.ling-box {
  display: flex;
}
.chart-wrapper-plan {
  display: flex;
  justify-content: space-between;
}
.plan-box {
  width: 50%;
}
p {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
h4 {
  margin-top: 0px;
}
.el-button {
  position: relative;
  color: #797474;
}
.table {
  border-collapse: collapse;
  width: 100%;
}
th {
  background-color: #e9ecef;
  font-weight: lighter;
  height: 40px;
}
td {
  background-color: #f7f7fa;
  text-align: center;
  height: 40px;
}
table,
th,
td {
  border: 1px solid #ffffff;
}
@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
