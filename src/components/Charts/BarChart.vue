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
    iconData: {
      type: String,
      default: 'circle'
    },
    height: {
      type: String,
      default: '280px'
    },
    chartData: {
      type: Array,
      default: () => []
    },
    mainColor: {
      type: String,
      default: '#FFFFFF'
    },
    textColor: {
      type: String,
      default: '#FFFFFF'
    },
    color: {
      type: Array
    },
    showTitle: { type: Boolean, default: false },
    gridTop: {
      type: Number,
      default: 40
    },
    gridLeft: {
      type: Number,
      default: 10
    },
    gridRight: {
      type: Number,
      default: 20
    },
    gridBottom: {
      type: Number,
      default: 10
    },
    labelRotate: {
      type: Number,
      default: 0
    },
    showY: {
      type: Boolean,
      default: false
    },
    yColor: {
      type: String,
      default: '#3488CD'
    },
    xColor: {
      type: String,
      default: '#007DC1'
    },
    showLine: {
      type: Boolean,
      default: true
    },
    labelMargin: {
      type: Number,
      default: 8
    },
    legendTop: {
      type: String,
      default: '2%'
    },
    iconHeight: {
      type: Number,
      default: 10
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
      this.chart = echarts.init(this.$el) //'macarons'
      this.setOption(this.chartData)
    },
    setOption(source) {
      this.chart.setOption({
        color: this.color,
        grid: { left: this.gridLeft, right: this.gridRight, bottom: this.gridBottom, top: this.gridTop, containLabel: true },
        title: {
          show: this.showTitle,
          text: '三级单位计划量与销气量对比',
          left: '0%',
          top: '2%',

          textStyle: {
            color: this.textColor,
            fontFamily: '宋体'
          }
        },
        legend: {
          top: this.legendTop,
          textStyle: {
            color: this.mainColor
          },
          icon: this.iconData,
          itemHeight: this.iconHeight,
          itemWidth: this.iconHeight
        },
        tooltip: {},
        textStyle: {
          color: this.textColor,
          fontStyle: 'normal',
          fontFamily: '微软雅黑',
          fontSize: 12
        },
        dataset: { source },

        xAxis: {
          type: 'category',
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: this.xColor,
              width: 2
            }
          },
          axisLabel: {
            rotate: this.labelRotate,
            margin: this.labelMargin,
            textStyle: {
              color: this.textColor
            }
          }
        },
        yAxis: {
          name: '单位：万方',
          axisLine: {
            show: this.showY,
            lineStyle: {
              color: this.yColor,
              width: 1
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: this.showLine,
            lineStyle: {
              color: '#1B5C97'
            }
          }
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: 'bar' }, { type: 'bar' }]
      })
    }
  }
}
</script>