import PanelGroup from '@/views/screen/layout/components/PanelGroup'
import LineChart from '@/components/Charts/LineChart'
import PieChart from '@/components/Charts/PieChart'
import BarChart from '@/components/Charts/BarChart'
import ZhexianChart from '@/components/Charts/ZhexianChart'
import { daterange6month, daterange1month, daterange1week, parseDate, getChartSource, getChartSour, getChart } from '@/utils'
import { getCards, getPlans, getBuy, getSale, getClassSale, getSum, getMaoyi, getHuanggang, getNew } from '@/api/dashboard'


export default {
  components: {
    PanelGroup,
    LineChart,
    PieChart,
    ZhexianChart,
    BarChart,

  },
  data() {
    return {
      gouqiData: {},
      cards: {
        cardG: [],
        cardX: [],
        cardK: [],
      },

      pieData: [],
      pieDate: '',
      piesum: {},
      organizations: [],
      yearPlans: [],
      monthPlans: [],
      buyData: [],
      saleData: [],
      lngfData: [],
      lngData: [],

      maoyiData: [],
      huanggangData: [],
      daterange6month: daterange6month(),
      daterange1month: daterange1month(),
      daterange1week: daterange1week()
    }
  },
  created() { },
  mounted() {
    this.getCards()

    this.getPlans()
    this.getBuy()
    this.getSale()
    this.getMaoyi()
    this.getHuanggang()

    this.getClassSale(),
      this.getNew(),
      this.getSum()
  },
  methods: {
    async getCards() {
      const res = await getCards()

      if (res.status === 0) {

        this.cards.cardG = res.data[0]
        this.cards.cardX = res.data[1]
        this.cards.cardK = res.data[2]

      }
    },
    async getPlans() {
      const res = await getPlans()
      if (res.status === 0) {
        this.yearPlans = res.data[1]
        this.monthPlans = res.data[0]
      }
    },
    async getBuy() {
      const dateRange = this.daterange6month
      const res = await getBuy({ start: parseDate(dateRange[0]), end: parseDate(dateRange[1]) })
      if (res.status === 0) {
        this.buyData = getChartSource(res.data, dateRange, ['时间', '购气量'], { buyData: true })
      }
    },
    async getSale() {
      const dateRange = this.daterange6month
      const res = await getSale({ start: parseDate(dateRange[0]), end: parseDate(dateRange[1]) })
      if (res.status === 0) {
        this.saleData = getChartSource(res.data, dateRange, ['时间', '售气量'], { saleData: true })
      }
    },
    async getClassSale() {
      const res = await getClassSale()
      if (res.status === 0) {
        // console.log(res)
        this.pieData = res.data.dataItem
        this.pieDate = res.data.dateData
        this.piesum = res.data.sumData
        console.log(this.piesum)
      }
    },
    async getNew() {
      const dateRange = this.daterange1month
      const res = await getNew({ start: parseDate(dateRange[0]), end: parseDate(dateRange[1]) })
      if (res.status === 0) {
        this.lngfData = getChartSour(res.data, dateRange, ['时间', '居民', '工业', '商业', '转供'],)
      }
    },
    async getMaoyi() {
      const dateRange = this.daterange1month
      const res = await getMaoyi({ start: parseDate(dateRange[0]), end: parseDate(dateRange[1]) })
      if (res.status === 0) {
        this.maoyiData = getChart(res.data, dateRange, ['时间', '购气量', '售气量'])
      }
    },
    async getHuanggang() {
      const dateRange = this.daterange1month
      const res = await getHuanggang({ start: parseDate(dateRange[0]), end: parseDate(dateRange[1]) })
      if (res.status === 0) {
        this.huanggangData = getChart(res.data, dateRange, ['时间', '购气量', '售气量'])
      }
    },
    async getSum() {
      const res = await getSum()
      if (res.status === 0) {
        this.lngData = res.data
      }
    },
  }
}