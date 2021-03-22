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
      default: '150px'
    },
    chartData: {
      type: String,
      default: '0'
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
        grid: { left: 0, right: 0, bottom: 0, top: 0 },
        title: {
          text: this.chartData + '%',
          x: 'center',
          y: 'center',
          textStyle: {
            fontWeight: 'normal',
            color: '#4FA1FD',
            fontSize: 16
          }
        },

        tooltip: {
          show: false,
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        toolbox: {
          show: false,
          feature: {
            mark: {
              show: true
            },
            dataView: {
              show: true,
              readOnly: false
            },
            restore: {
              show: true
            },
            saveAsImage: {
              show: true
            }
          }
        },
        series: [
          {
            name: 'Line 1',
            type: 'pie',
            clockWise: false,
            radius: [40, 55],
            itemStyle: {
              normal: {
                color: this.color,
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,

            data: [
              {
                value: this.chartData,
                name: '01'
              },
              {
                value: 100 - this.chartData,
                name: 'invisible',
                itemStyle: {
                  normal: {
                    color: '#CCCCCC', //未完成的圆环的颜色
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              }
            ]
          }
        ]
      })
    }
  }
}
</script>