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
      // type: Number,
      default: 0
    },
    chartName: {
      type: String
    },
    color: {
      type: String
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    chartData() {
      this.setOption()
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
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOption()
    },
    setOption() {
      this.chart.setOption({
        series: [
          {
            name: '计划完成率',
            type: 'gauge',
            color: '#fff',
            detail: {
              formatter: '{value}%',
              fontSize: 18,
              color: 'auto',
              padding: [0, 0, 50, 0]
            },
            splitNumber: 5,
            axisLabel: { show: false },
            pointer: { show: false },
            axisLine: {
              show: true,
              lineStyle: {
                color: [
                  [Math.min(this.chartData / 100, 1), this.color],
                  [1, '#1b5588']
                ],
                width: 15
              }
            },
            splitLine: {
              show: false
              //length: 15, lineStyle: { color: '#1b5588' }
            },
            axisTick: {
              length: 15,
              lineStyle: { width: 0.5, color: '#1b5588' }
            },
            radius: '90%',
            startAngle: 210,
            endAngle: -30,
            data: [{ value: this.chartData, name: '' }]
          }
        ]
      })
    }
  }
}
</script>
