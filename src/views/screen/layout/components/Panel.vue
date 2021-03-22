<template>
  <div class="panel">
    <div class="up">
      <div class="left">
        <div class="chart-wrapper">
          <div class="chart-wrapper-title">
            <h4>计划气量</h4>
          </div>
          <div class="box">
            <div class="ring-c">
              <ring-chart :height="'130px'" :color="'#00FDFE'" :chart-data="yearPlans.completePercent" chart-name="年计划完成率" />
              <p>本年计划：<span class="num" v-text="yearPlans.planQuantity" style="background-color: #168c8b; display: -moz-inline-box; display: inline-block; width: 60px; text-align: center" /></p>
              <p>累计完成：<span class="num" v-text="yearPlans.accumulateQuantity" style="background-color: #b45869; display: -moz-inline-box; display: inline-block; width: 60px; text-align: center" /></p>
              <p style="margin-left: 15px">完成率：<span class="num" v-text="yearPlans.completePercent + '%'" style="background-color: #037cbe; display: -moz-inline-box; display: inline-block; width: 60px; padding-left: 5px; text-align: center" /></p>
            </div>
            <div class="ring-c">
              <ring-chart :height="'130px'" :color="'#E46610'" :chart-data="monthPlans.completePercent" chart-name="月计划完成率" />
              <p>本月计划：<span class="num" v-text="monthPlans.planQuantity" style="background-color: #168c8b; display: -moz-inline-box; display: inline-block; width: 60px; text-align: center" /></p>
              <p>累计完成：<span class="num" v-text="monthPlans.accumulateQuantity" style="background-color: #b45869; display: -moz-inline-box; display: inline-block; width: 60px; text-align: center" /></p>
              <p style="margin-left: 15px">完成率：<span class="num" v-text="monthPlans.completePercent + '%'" style="background-color: #037cbe; display: -moz-inline-box; display: inline-block; width: 60px; text-align: center" /></p>
            </div>
          </div>
        </div>
        <div class="chart-wrapper">
          <div class="chart-wrapper-title">
            <h4>总购气量统计</h4>
          </div>
          <zhexian-chart :chart-data="buyData" />
        </div>
      </div>
      <div class="chart-mid">
        <panel-group :cards="cards" />
        <hubeimap-chart :chart-data="mapData" :hover-fn="handleHover" />
        <div class="angel">
          <img class="img1" src="~@/assets/img/screen/angle.png" alt />
          <img class="img2" src="~@/assets/img/screen/angle.png" alt />
          <img class="img3" src="~@/assets/img/screen/angle.png" alt />
          <img class="img4" src="~@/assets/img/screen/angle.png" alt />
        </div>
        <div class="chart-m">
          <div class="chart-wrapper-title"><h4 v-text="tooltipData.company"></h4></div>
          <div class="map-c">
            <div class="map-m">
              <p>购气量</p>
              <p class="num" v-text="tooltipData.gouqiData"></p>
              <circle-chart color="#F56D1B" :chart-data="tooltipData.gouqiDataPercent" />
            </div>
            <div class="map-m">
              <p>销气量</p>
              <p class="num" v-text="tooltipData.xiaoqiData"></p>
              <circle-chart color="#30C5A7" :chart-data="tooltipData.xiaoqiDataPercent" />
            </div>
            <div class="map-m">
              <p>库存量</p>
              <p class="num" v-text="tooltipData.kucunData" />
              <circle-chart color="#38c9fe" :chart-data="tooltipData.kucunDataPercent" />
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="chart-wrapper">
          <div class="chart-wrapper-title">
            <h4>贸易气量</h4>
          </div>
          <bar-chart :color="['#30c5a7', '#fca805']" :chart-data="maoyiData" :show-title="false" />
        </div>
        <div class="chart-wrapper">
          <div class="chart-wrapper-title">
            <h4>黄冈工厂</h4>
          </div>
          <bar-chart :chart-data="huanggangData" :color="['#00D8FF', '#127DBA']" :show-title="false" />
        </div>
      </div>
    </div>
    <div class="down">
      <div class="chart-down">
        <div class="chart-down-c">
          <p style="margin-bottom: 0px; margin-top: 2%; color: #ffffff; margin-left: 1%; font-size: 20px; font-family: '宋体'; font-weight: bold">总购气量统计</p>

          <pie-chart :chart-data="pieData" tcolor="#ffffff" cen-y="50%" top="10%" right="10%" xtop="30%" yright="42%" :title-text="piesum.sumData" />
        </div>
        <div class="chart-down-c">
          <zhexian-chart :chart-data="saleData" :show-title="true" :grid-top="70" :color="['#97A1AD', '#97A1AD', '#E16D6D', '#E16D6D', '#E16D6D', '#985667', '#122a57']" />
        </div>
      </div>
      <div class="chart-down">
        <bar-chart :color="['#29C3BE', '#5D62B5']" :chart-data="planAndsaleData" :show-title="true" :grid-top="70" :legend-top="'12%'" :label-rotate="15" :label-margin="12" />
      </div>
    </div>
  </div>
</template>
<script>
import PanelGroup from './PanelGroup'
import dashboard from '@/components/Charts/mixins/dashboard'
import LineChart from '@/components/Charts/LineChart'
import BarChart from '@/components/Charts/BarChart'
import RingChart from '@/components/Charts/RingChart'
import HubeimapChart from '@/components/Charts/HubeiMapChart'
import CircleChart from '@/components/Charts/CircleChart'
import { getOrgs, getPlanAndSale } from '@/api/dashboard'

export default {
  mixins: [dashboard],
  components: {
    LineChart,
    BarChart,
    RingChart,
    HubeimapChart,
    CircleChart,
    PanelGroup
  },
  data() {
    return {
      tooltipData: {
        company: '黄冈工厂LNG',
        gouqiData: '34',
        xiaoqiData: '56',
        kucunData: '66',
        gouqiDataPercent: '45',
        xiaoqiDataPercent: '77',
        kucunDataPercent: '36'
      },
      gouqiData: {},
      mapData: [],
      organizations: [],
      getPlanAndsaleData: [],
      planAndsaleData: []
    }
  },
  computed: {},
  watch: {
    organizations: {
      handler: function (val) {
        const arr = []

        val.forEach(item => {
          arr.push({
            name: item.orgName,
            value: [item.lon, item.lat, 10],
            gouqi: item.gouqi,
            xiaoqi: item.xiaoqi,
            kucun: item.kucun,
            gouqiPercent: item.gouqiPercent,
            xiaoqiPercent: item.xiaoqiPercent,
            kucunPercent: item.kucunPercent
          })
        })
        this.mapData = arr
        console.log(this.mapData)
      }
    }
  },
  created() {},
  mounted() {
    this.getOrgs()
    this.getPlanAndSale()
  },
  methods: {
    async getOrgs() {
      const res = await getOrgs()

      if (res.status === 0) {
        this.organizations = res.data
      }
    },

    async getPlanAndSale() {
      const res = await getPlanAndSale()

      if (res.status === 0) {
        this.planandsale = res.data
        res.data.forEach(item => {
          this.planAndsaleData.push({
            name: item.orgName,
            年计划量: item.yearPlan,
            累计销气量: item.sumSale
          })
        })
      }
    },

    handleHover(params) {
      if (params.componentType === 'series') {
        this.tooltipData.company = params.name
        this.tooltipData.gouqiData = params.data.gouqi
        this.tooltipData.xiaoqiData = params.data.xiaoqi
        this.tooltipData.kucunData = params.data.kucun
        this.tooltipData.gouqiDataPercent = params.data.gouqiPercent + ''
        this.tooltipData.xiaoqiDataPercent = params.data.xiaoqiPercent + ''
        this.tooltipData.kucunDataPercent = params.data.kucunPercent + ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.panel {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 980px;
  margin-bottom: 15px;
  margin-left: 15px;
  margin-right: 15px;
}

.up {
  display: flex;
  height: 70%;
  margin-bottom: 15px;
  justify-content: space-between;
}
.left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 25%;
}
.right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 25%;
}

.down {
  height: 30%;
  display: flex;
  justify-content: space-between;
}
</style>