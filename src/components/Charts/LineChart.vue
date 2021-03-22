<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    chartData: {
      type: Array,
      default: () => []
    },
    color: {
      type: String,
      default: '#4FA1FD'
    },
    chartName: {
      type: String
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(source) {
        this.setOption(source)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el)
      this.setOption(this.chartData)
    },
    setOption() {
      this.chart.setOption({
        grid: {
          left: 45,
          right: 20,
          top: 35
        },
        tooltip: {},
        legend: {
          top: 5,
          name: this.chartName,
          left: 'center',
          show: true,
          icon: 'roundRect',
          itemHeight: 15
        },
        data: this.chartData,

        xAxis: {
          type: 'category',
          splitLine: { show: false },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#797474'
          },
          axisLine: {
            show: true,
            lineStyle: {
              type: 'solid',
              color: 'rgb(192, 196, 204)'
            }
          }
        },
        yAxis: {
          name: '单位：万方',
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: 'rgb(192, 196, 204)'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            color: '#797474'
          }
        },

        series: [
          {
            name: this.chartName,
            smooth: true,
            color: this.color,
            type: 'line',
            symbol: 'circle',
            symbolSize: 8,
            data: this.chartData
          }
        ]
      })
    }
  }
}
</script>
