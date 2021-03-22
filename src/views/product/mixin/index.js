import { getMonthDay } from '@/utils'
import BuySaleStock from '../components/BuySaleStock'
import TradeMeter from '../components/TradeMeter'
import HuanggangFactory from '../components/HuanggangFactory'
import PieChart from '@/components/Charts/PietwoChart'

export default {
  components: { BuySaleStock, TradeMeter, HuanggangFactory, PieChart },
  watch: {
    'listQuery.date'(newVal) {
      this.getData()
    },
    calendarData(newVal) {
      let total = 0
      const finishedNum = Object.keys(newVal).length
      const date = new Date()
      const quertDate = this.listQuery.date

      if (quertDate.getMonth() === date.getMonth()) {
        // 如果是当月，最大的日期为当天
        total = date.getDate()
      } else {
        // 如果不是当月，计算这个月一共多少天
        total = getMonthDay(quertDate.getFullYear(), quertDate.getMonth())
      }
      this.chartData = [
        { value: finishedNum, name: '已提交' },
        { value: total - finishedNum, name: '未提交' }
      ]
    }
  },
  methods: {
    // 判断哪些日期上面需要标上红点
    isError(data) {
      return !this.calendarData[data.day] && data.type === 'current-month' && new Date(data.day) < new Date()
    }
  }

}
