<template>
  <div :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    chartData: {
      type: Array,
      default: () => []
    },
    color: {
      type: Array,
      default: () => ['#89C0FE', '#D1E2B6', '#FEB54F', '#68CDF2']
    },
    mainColor: {
      type: String,
      default: '#fff'
    },
    unit: {
      type: String,
      default: '万方'
    },
    type: {
      type: String,
      default: 'line'
    },
    rotate: {
      type: Number,
      default: 0
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
        this.setOptions(source)
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
      this.setOptions(this.chartData)
    },
    setOptions(source) {
      const showLegend = !!(source.length && source[0].length > 2)
      const option = {
        textStyle: { color: this.mainColor },
        legend: { show: showLegend, textStyle: { color: this.mainColor }, icon: 'roundRect' },
        tooltip: { trigger: 'axis' },
        color: this.color,
        dataset: { source },
        grid: { left: 10, right: 10, bottom: 20, top: 60, containLabel: true },
        xAxis: {
          type: 'category',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: { color: 'rgb(192, 196, 204)' }
          },
          axisLabel: { rotate: this.rotate }
        },
        yAxis: { name: this.unit, axisTick: { show: false }, splitLine: { show: false }, axisLine: { lineStyle: { color: 'rgb(192, 196, 204)' } } },
        series: []
      }
      if (source.length) {
        for (let i = 0; i < source[0].length - 1; i++) {
          option.series.push({ type: this.type, smooth: true, symbol: 'none' })
        }
      }
      this.chart.setOption(option)
    }
  }
}
</script>
