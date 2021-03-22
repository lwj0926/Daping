<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
require('echarts/map/js/province/hubei')
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
    data: {
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
    data() {
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
        tooltip: {
          trigger: 'item'
        },

        geo: {
          map: 'hubei',
          label: {},
          roam: true,
          itemStyle: {
            borderColor: '#3CF2FE',
            areaColor: '#02266E'
          }
        },
        series: [
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            rippleEffect: {
              brushType: 'stroke'
            },
            symbolSize: function (val, params) {
              return 8
            },
            data: convertData([
              { name: '黄石公司', value: 12 },
              { name: '咸宁昆仑', value: 13 },
              { name: '荆门公司', value: 23 },
              { name: '武汉管道', value: 45 },
              { name: '武汉压缩', value: 33 },
              { name: '恩施公司', value: 22 },
              { name: '仙桃公司', value: 66 },
              { name: '十堰公司', value: 23 },
              { name: '东湖公司', value: 66 },
              { name: '孝感公司', value: 90 },
              { name: '昆利湖北', value: 67 },
              { name: '咸宁公司', value: 89 },
              { name: '湖北新捷', value: 56 },
              { name: '黄冈工厂LNG', value: 79 }
            ]),
            // label: {
            //    //  show:false,
            //		                normal: {
            //		                    show: true
            //		                },
            //		                emphasis: {
            //		                    show: true
            //		                },
            formatter: '{b}'
            //   offset:[15,-15],//文字的相对偏移
            //  },
          }
        ]
      })
    }
  }
}
</script>