<template>
  <div :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
require('echarts/map/js/province/hubei') // hubei.js
import resize from './mixins/resize'
import CircleChart from './CircleChart'

export default {
  mixins: [resize],
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '560px'
    },
    chartData: {
      type: Array,
      default: () => []
    },
      
    hoverFn: {
      type: Function,
      default: () => ''
    },
    clickFn: {
      type: Function,
      default: () => ''
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
      this.setOption()
    },
    setOption() {
      console.log('setOption---')
      this.chart.setOption({
      
        geo: {
          left:"8%",
          top:"5%",
          map: '湖北',
          label: { normal: { show: false }, emphasis: { show: false } },
          itemStyle: {
            normal: { areaColor: 'rgba(0,27,93,0.5)', borderColor:"#41ddf4",
              borderWidth:1,},
            emphasis: { areaColor: 'rgba(0,27,93,0.5)', borderColor: '#2ce9f8'}
          }
        },
        series: [
          // {
          //   type: 'map',
          //   map: '湖北',
          //   label: {
          //       show: false
          //   },
          //   roam: false,
          //   itemStyle: {
          //       normal: {
          //           areaColor: 'rgba(0,27,93,0.5)',
          //           borderColor: '#41ddf4',
          //           borderWidth: 1
          //       },
          //       emphasis: {
          //           show: false,
          //           areaColor: null
          //       }
          //   },
          // },

           {// 普通小点
            name: '销售量',
            type: 'effectScatter',
            showEffectOn: 'render',
            coordinateSystem: 'geo',
            zlevel: 1,
            rippleEffect: {
              brushType: 'stroke'
            },
            symbolSize: val => {
              return val[2]
            },
             label: {
              formatter: '{b}',
              position: 'bottom',
              show: true
            },
            // label: {
              
            //     normal: {
            //         show: true,
            //     },
            //     emphasis: {
            //         show: true,
            //         formatter: '{a}',
            //   position: 'bottom',
            //         }
            // },
            itemStyle: {
              
              normal: {
                color: 'rgba(244,233,37,0.9)'
              },
              emphasis: {
                color: 'rgba(246,33,87,1)'
              }
            
            },
            data: this.chartData
          }
        ]
      })

      this.chart.on('mouseover', this.hoverFn)
      this.chart.on('click', this.clickFn)
    }
  }
}
</script>
