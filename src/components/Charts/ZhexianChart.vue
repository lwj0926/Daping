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
      default: '260px'
    },
    color: {
      type: Array,
      default: () => ['#97A1AD', '#97A1AD', '#071638', '#07DB8B', '#07DB8B', '#059278', '#023967']
    },
    gridTop: {
      type: Number,
      default: 40
    },
    showTitle: { type: Boolean, default: false },
    chartData: {
      type: Array,
      default: () => []
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
    setOption(source) {
      this.chart.setOption({
        textStyle: {
          color: '#FFFFFF',
          fontStyle: 'normal',
          fontFamily: '微软雅黑',
          fontSize: 10
        },
        grid: { left: 10, right: 30, bottom: 8, top: this.gridTop, containLabel: true },
        title: {
          show: this.showTitle,
          text: '总售气量走势（近半年）',
          left: 'center',
          top: '10%',

          textStyle: {
            color: '#FFFFFF',
            fontFamily: '微软雅黑',
            fontSize: 15
          }
        },
        tooltip: { trigger: 'axis' },
        dataset: { source },
        xAxis: {
          axisTick: {
            show: false
          },
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: this.color[0],
              width: 2
            }
          }
        },
        yAxis: {
          name: '单位：万方',
          axisTick: {
            show: false
          },
          // type: 'value',
          boundaryGap: false,
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: this.color[1],
              width: 2
            }
          }
        },
        series: [
          {
            type: 'line',
            smooth: 0.6,
            symbol: 'circle',
            itemStyle: {
              normal: {
                color: this.color[2],
                borderColor: this.color[3],
                borderWidth: 1
              }
            },

            symbolSize: 4,
            lineStyle: {
              color: this.color[4],
              width: 2
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: this.color[5] //0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: this.color[6] //100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            }

            // data: this.chartData
          }
        ]
      })
    }
  }
}
</script>
