<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import { number } from 'echarts/lib/export'

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
      default: '80px'
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
        title: {
          text: this.chartData + '%',
          x: 'center',
          y: 'center',
          textStyle: {
            fontWeight: 'normal',
            color: '#FFFFFF',
            fontSize: 16
          }
        },
        tooltip: {
          show: false,
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          show: false,
          itemGap: 12,
          data: ['01', '02']
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
            radius: [30, 35],
            itemStyle: {
              normal: {
                color: this.color,
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
                // shadowBlur: 40,
                // shadowColor: 'rgba(40, 40, 40, 0.5)',
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
                    color: '#839DB5', //未完成的圆环的颜色
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                  //
                }
              }
            ]
          },
          {
            name: 'Line 2',
            type: 'pie',
            animation: false,
            clockWise: false,
            radius: [25, 27],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            tooltip: {
              show: false
            },
            data: [
              {
                value: 100,
                name: '02',
                //     itemStyle: {
                //         : {
                //             color: '#A5B0B9'
                //         }
                //     }
                // }, {
                //     value: 0,
                //     name: 'invisible',
                itemStyle: {
                  normal: {
                    color: '#A5B0B9', //未完成的圆环的颜色
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  },
                  emphasis: {
                    color: '#A5B0B9' //未完成的圆环的颜色
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
