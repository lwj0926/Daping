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
      default: '280px'
    },
    chartData: {
      type: Array,
      default: () => []
    },
    topData: {
      type: String,
      default: '10%'
    },
    rightData: {
      type: String,
      default: '5%'
    },
    cenX: {
      type: String,
      default: '38%'
    },
    cenY: {
      type: String,
      default: '50%'
    },
    tcolor: {
      type: String,
      default: '#333'
    },
    top: {
      type: String,
      default: '10%'
    },
    right: {
      type: String,
      default: '5%'
    },
    xtop: {
      type: String,
      default: '28%'
    },
    yright: {
      type: String,
      default: '40%'
    },
    labelBool: {
      type: Boolean,
      default: true
    },
    titleText: {
      // type: Number,
      default: '285.89'
    },
    subTitle: {
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
        color: ['#F2726F', '#29C3BE', '#5A60B1', '#BC95DF', '#62B58F', '#FFC533', '#67CDF2'],
        title: {
          text: this.titleText,
          subtext: '  万方',
          x: this.xtop,
          y: this.yright,
          subtextStyle: {
            color: this.tcolor,
            fontSize: 20
          },
          textStyle: {
            color: this.tcolor,
            fontSize: 20
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          top: this.top,
          right: this.right,
          textStyle: {
            color: '#9AA6AB',
            fontStyle: 'normal',
            fontSize: 12
          }
        },
        series: [
          {
            name: '类型',
            type: 'pie',
            radius: ['35%', '55%'],
            center: [this.cenX, this.cenY],
            data: this.chartData,
            label: {
              show: true
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    }
  }
}
</script>
