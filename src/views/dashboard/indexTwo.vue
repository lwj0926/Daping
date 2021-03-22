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
            <line-chart height="340px" width="65%" color="#FEB54F" :chart-data="saleData" chart-name="销气量" />
            <div style="width: 35%">
              <p v-text="'日气销量分布' + '(' + pieDate + ')'"></p>
              <pie-chart width="100%" :chart-data="pieData" :title-text="piesum" />
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="chart-wrapper">
          <h4>计划气量</h4>
          <div class="chart-wrapper-plan">
            <div class="plan-box">
              <huan-chart color="#4FA1FD" :chart-data="yearPlans.completePercent" />
              <p>本年计划：<span class="num" v-text="yearPlans.planQuantity" /></p>
              <p>累计完成：<span class="num" v-text="yearPlans.accumulateQuantity" /></p>
              <p style="margin-left: 25px">完成率：<span class="num" v-text="yearPlans.completePercent + '%'" /></p>
            </div>
            <div class="plan-box">
              <huan-chart color="#4FA1FD" :chart-data="monthPlans.completePercent" />
              <p>本月计划：<span class="num" v-text="monthPlans.planQuantity" /></p>
              <p>累计完成：<span class="num" v-text="monthPlans.accumulateQuantity" /></p>
              <p style="margin-left: 40px">完成率：<span class="num" v-text="monthPlans.completePercent + '%'" /></p>
            </div>
          </div>
        </div>
        <div class="chart-wrapper">
          <h4>黄冈工厂LNG</h4>
          <bar-chart
            :color="['#C8DEAA', '#72B4FD']"
            main-color="#333"
            height="260px"
            text-color="#797474"
            :show-line="false"
            :chart-data="huanggangData"
            :show-title="false"
            :show-y="true"
            icon-data="'roundRect'"
            :icon-height="15"
            x-color="#CCCCCC"
            y-color="#CCCCCC"
            :grid-left="20"
            :grid-top="45"
            :grid-right="5"
            :grid-bottom="20"
            legend-top="0%"
          />
        </div>
        <div class="chart-wrapper">
          <h4>贸易气量</h4>
          <bar-chart
            :color="['#C8DEAA', '#72B4FD']"
            height="260px"
            main-color="#333"
            text-color="#797474"
            :show-line="false"
            :chart-data="maoyiData"
            :show-title="false"
            :show-y="true"
            icon-data="'roundRect'"
            :icon-height="15"
            x-color="#CCCCCC"
            y-color="#CCCCCC"
            :grid-left="20"
            :grid-top="45"
            :grid-right="5"
            :grid-bottom="20"
            legend-top="0%"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import dashboard from '@/components/Charts/mixins/dashboard'
import HuanChart from '@/components/Charts/HuanChart'

export default {
  mixins: [dashboard],
  name: 'Dashboard',
  components: {
    PanelGroup,
    HuanChart
  },
  data() {
    return {}
  },
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
  margin-top: 0;
  margin-bottom: 20px;
}
h4 {
  margin-top: 0px;
}
.el-button {
  position: relative;
  color: #797474;
}
@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
