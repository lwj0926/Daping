const Mock = require('mockjs')

module.exports = [

  {
    url: '/api/screen/cards',
    type: 'get',
    response: config => {

      return {
        msg: "success",
        status: 0,
        data: [
          {
            name: '总购气量',
            quantity: '@natural(400, 600)',
            dateData: '2020-10-01'
          },
          {
            name: '总销气量',
            quantity: '@natural(300, 500)',
            dateData: '2020-10-01'
          },
          {
            name: '当日库存',
            quantity: '@natural(200, 400)',
            dateData: '2020-10-01'
          }
        ]
      }
    }
  },

  {
    url: '/api/screen/orgs',
    type: 'get',
    response: config => {
      return {
        msg: 'success',
        status: 0,
        data: [
          { id: 1, orgName: '黄石公司', lon: 115.042623, lat: 30.251043, gouqi: '@natural(10, 100)', xiaoqi: '@natural(10, 100)', kucun: '@natural(10, 100)', gouqiPercent: '@natural(10, 100)', xiaoqiPercent: '@natural(10, 100)', kucunPercent: '@natural(10, 100)', },
          { id: 2, orgName: '咸宁昆仑', lon: 114.335183, lat: 29.845753, gouqi: '@natural(10, 100)', xiaoqi: '@natural(10, 100)', kucun: '@natural(10, 100)', gouqiPercent: '@natural(10, 100)', xiaoqiPercent: '@natural(10, 100)', kucunPercent: '@natural(10, 100)', },
          { id: 3, orgName: '荆门公司', lon: 112.208431, lat: 31.046578, gouqi: '@natural(10, 100)', xiaoqi: '@natural(10, 100)', kucun: '@natural(10, 100)', gouqiPercent: '@natural(10, 100)', xiaoqiPercent: '@natural(10, 100)', kucunPercent: '@natural(10, 100)', },
          { id: 4, orgName: '武汉管道', lon: 114.426054, lat: 30.4594, gouqi: '@natural(10, 100)', xiaoqi: '@natural(10, 100)', kucun: '@natural(10, 100)', gouqiPercent: '@natural(10, 100)', xiaoqiPercent: '@natural(10, 100)', kucunPercent: '@natural(10, 100)', },
          { id: 5, orgName: '武汉压缩', lon: 114.129619, lat: 30.302477, gouqi: '@natural(10, 100)', xiaoqi: '@natural(10, 100)', kucun: '@natural(10, 100)', gouqiPercent: '@natural(10, 100)', xiaoqiPercent: '@natural(10, 100)', kucunPercent: '@natural(10, 100)', },
          { id: 6, orgName: '武汉昆仑', lon: 114.223965, lat: 30.522685, gouqi: '@natural(10, 100)', xiaoqi: '@natural(10, 100)', kucun: '@natural(10, 100)', gouqiPercent: '@natural(10, 100)', xiaoqiPercent: '@natural(10, 100)', kucunPercent: '@natural(10, 100)', },
          { id: 7, orgName: '恩施公司', lon: 109.49939, lat: 30.316437, gouqi: '@natural(10, 100)', xiaoqi: '@natural(10, 100)', kucun: '@natural(10, 100)', gouqiPercent: '@natural(10, 100)', xiaoqiPercent: '@natural(10, 100)', kucunPercent: '@natural(10, 100)', },
          { id: 8, orgName: '仙桃公司', lon: 113.45939, lat: 30.372834, gouqi: '@natural(10, 100)', xiaoqi: '@natural(10, 100)', kucun: '@natural(10, 100)', gouqiPercent: '@natural(10, 100)', xiaoqiPercent: '@natural(10, 100)', kucunPercent: '@natural(10, 100)', },
          { id: 9, orgName: '十堰公司', lon: 110.800442, lat: 32.623335, gouqi: '@natural(10, 100)', xiaoqi: '@natural(10, 100)', kucun: '@natural(10, 100)', gouqiPercent: '@natural(10, 100)', xiaoqiPercent: '@natural(10, 100)', kucunPercent: '@natural(10, 100)', },
          { id: 10, orgName: '东湖公司', lon: 114.404432, lat: 30.559905, gouqi: '@natural(10, 100)', xiaoqi: '@natural(10, 100)', kucun: '@natural(10, 100)', gouqiPercent: '@natural(10, 100)', xiaoqiPercent: '@natural(10, 100)', kucunPercent: '@natural(10, 100)', },
          { id: 11, orgName: '孝感公司', lon: 113.588154, lat: 30.935204, gouqi: '@natural(10, 100)', xiaoqi: '@natural(10, 100)', kucun: '@natural(10, 100)', gouqiPercent: '@natural(10, 100)', xiaoqiPercent: '@natural(10, 100)', kucunPercent: '@natural(10, 100)', },
          { id: 12, orgName: '昆利湖北', lon: 114.362986, lat: 30.587171, gouqi: '@natural(10, 100)', xiaoqi: '@natural(10, 100)', kucun: '@natural(10, 100)', gouqiPercent: '@natural(10, 100)', xiaoqiPercent: '@natural(10, 100)', kucunPercent: '@natural(10, 100)', },
          { id: 13, orgName: '咸宁公司', lon: 114.34003, lat: 29.8405, gouqi: '@natural(10, 100)', xiaoqi: '@natural(10, 100)', kucun: '@natural(10, 100)', gouqiPercent: '@natural(10, 100)', xiaoqiPercent: '@natural(10, 100)', kucunPercent: '@natural(10, 100)', },
          { id: 14, orgName: '湖北新捷', lon: 114.21201, lat: 30.642644, gouqi: '@natural(10, 100)', xiaoqi: '@natural(10, 100)', kucun: '@natural(10, 100)', gouqiPercent: '@natural(10, 100)', xiaoqiPercent: '@natural(10, 100)', kucunPercent: '@natural(10, 100)', },
          { id: 15, orgName: '黄冈工厂LNG', lon: 114.858356, lat: 30.503011, gouqi: '@natural(10, 100)', xiaoqi: '@natural(10, 100)', kucun: '@natural(10, 100)', gouqiPercent: '@natural(10, 100)', xiaoqiPercent: '@natural(10, 100)', kucunPercent: '@natural(10, 100)', }
        ]

      }
    }
  },
  {
    url: '/api/screen/plans',
    type: 'get',
    response: config => {
      return {
        msg: "success",
        status: 0,

        data: [
          { index: 0, planType: 1, planQuantity: "@natural(1000000, 1500000)", accumulateQuantity: "@natural(20000, 40000)", completePercent: "@natural(1, 80)", dateData: '2020-10-01' },
          { index: 0, planType: 2, planQuantity: "@natural(100000, 150000)", accumulateQuantity: "@natural(4000, 8000)", completePercent: "@natural(1, 80)", dateData: '2020-10-01' }
        ]
      }
    }
  },
  {
    url: '/api/screen/buy',
    type: 'get',
    response: config => {
      const { startTime, endTime } = config.query
      console.log(startTime, endTime)
      return {
        status: 0,
        msg: '',
        data: [
          {
            date: "2020-02-01",
            buyData: '@natural(10, 100)'
          },
          {
            date: "2020-03-02",
            buyData: 280
          },
          {
            date: "2020-04-01",
            buyData: 400
          },
          {
            date: "2020-05-01",
            buyData: '@natural(10, 100)'
          },
          {
            date: "2020-05-03",
            buyData: '@natural(10, 100)'
          },
          {
            date: "2020-06-01",
            buyData: '@natural(10, 100)'
          },
          {
            date: "2020-07-01",
            buyData: '@natural(10, 100)'
          }, {
            date: "2020-02-01",
            buyData: '@natural(10, 100)'
          },
          {
            date: "2020-03-02",
            buyData: '@natural(10, 100)'
          },
          {
            date: "2020-04-01",
            buyData: '@natural(10, 100)'
          },
          {
            date: "2020-05-01",
            buyData: '@natural(10, 100)'
          },
          {
            date: "2020-05-02",
            buyData: '@natural(10, 100)'
          },
          {
            date: "2020-05-03",
            buyData: '@natural(100,1000)'
          },
          {
            date: "2020-05-04",
            buyData: 700
          },
          {
            date: "2020-05-05",
            buyData: '@natural(100,1000)'
          },
          {
            date: "2020-05-06",
            buyData: '@natural(100,1000)'
          }, {
            date: "2020-05-07",
            buyData: 700
          },
          {
            date: "2020-05-08",
            buyData: '@natural(100,1000)'
          },
          {
            date: "2020-05-09",
            buyData: '@natural(100,1000)'
          },
          {
            date: "2020-05-10",
            buyData: '@natural(100,1000)'
          },
          {
            date: "2020-05-11",
            buyData: '@natural(100,1000)'
          },
          {
            date: "2020-05-12",
            buyData: '@natural(100,1000)'
          },
          {
            date: "2020-05-13",
            buyData: '@natural(100,1000)'
          },
          {
            date: "2020-05-14",
            buyData: '@natural(100,1000)'
          },
          {
            date: "2020-05-15",
            buyData: '@natural(100,1000)'
          },
          {
            date: "2020-05-16",
            buyData: '@natural(100,1000)'
          },
          {
            date: "2020-05-17",
            buyData: '@natural(100,1000)'
          },
          {
            date: "2020-05-18",
            buyData: '@natural(100,1000)'
          },
          {
            date: "2020-08-01",
            buyData: '@natural(10, 100)'
          },
          {
            date: "2020-08-02",
            buyData: '@natural(10, 100)'
          },
          {
            date: "2020-08-03",
            buyData: '@natural(100,1000)'
          },
          {
            date: "2020-08-04",
            buyData: 700
          },
          {
            date: "2020-08-08",
            buyData: '@natural(100,1000)'
          },
          {
            date: "2020-08-06",
            buyData: '@natural(100,1000)'
          }, {
            date: "2020-08-07",
            buyData: 700
          },
          {
            date: "2020-08-08",
            buyData: '@natural(100,1000)'
          },
          {
            date: "2020-08-09",
            buyData: '@natural(100,1000)'
          },
          {
            date: "2020-08-10",
            buyData: '@natural(100,1000)'
          },
          {
            date: "2020-08-11",
            buyData: '@natural(100,1000)'
          },
          {
            date: "2020-08-12",
            buyData: '@natural(100,1000)'
          },
          {
            date: "2020-08-13",
            buyData: '@natural(100,1000)'
          },
          {
            date: "2020-08-14",
            buyData: '@natural(100,1000)'
          },
          {
            date: "2020-08-18",
            buyData: '@natural(100,1000)'
          },
          {
            date: "2020-08-16",
            buyData: '@natural(100,1000)'
          },
          {
            date: "2020-08-17",
            buyData: '@natural(100,1000)'
          },
          {
            date: "2020-08-18",
            buyData: '@natural(100,1000)'
          },
          {
            date: "2020-07-01",
            buyData: '@natural(100,1000)'
          },
          {
            date: "2020-10-01",
            buyData: '@natural(100,1000)'
          },
          {
            date: "2020-10-02",
            buyData: '@natural(100,1000)'
          }, {
            date: "2020-10-03",
            buyData: '@natural(100,1000)'
          }, {
            date: "2020-10-04",
            buyData: '@natural(100,1000)'
          }, {
            date: "2020-10-08",
            buyData: '@natural(100,1000)'
          },
        ]
      }
    }
  },
  {
    url: '/api/screen/sale',
    type: 'get',
    response: config => {
      const { startTime, endTime } = config.query
      console.log(startTime, endTime)
      return {
        status: 0,
        msg: '',
        data: [
          {
            date: "2020-02-01",
            saleData: '@natural(10, 100)'
          },
          {
            date: "2020-03-02",
            saleData: 280
          },
          {
            date: "2020-04-01",
            saleData: 400
          },
          {
            date: "2020-05-01",
            saleData: '@natural(10, 100)'
          },
          {
            date: "2020-05-03",
            saleData: '@natural(10, 100)'
          },
          {
            date: "2020-06-01",
            saleData: '@natural(10, 100)'
          },
          {
            date: "2020-07-01",
            saleData: '@natural(10, 100)'
          }, {
            date: "2020-02-01",
            saleData: '@natural(10, 100)'
          },
          {
            date: "2020-03-02",
            saleData: '@natural(10, 100)'
          },
          {
            date: "2020-04-01",
            saleData: '@natural(10, 100)'
          },
          {
            date: "2020-05-01",
            saleData: '@natural(10, 100)'
          },
          {
            date: "2020-05-02",
            saleData: '@natural(10, 100)'
          },
          {
            date: "2020-05-03",
            saleData: '@natural(100,1000)'
          },
          {
            date: "2020-05-04",
            saleData: 700
          },
          {
            date: "2020-05-05",
            saleData: '@natural(100,1000)'
          },
          {
            date: "2020-05-06",
            saleData: '@natural(100,1000)'
          }, {
            date: "2020-05-07",
            saleData: 700
          },
          {
            date: "2020-05-08",
            saleData: '@natural(100,1000)'
          },
          {
            date: "2020-05-09",
            saleData: '@natural(100,1000)'
          },
          {
            date: "2020-05-10",
            saleData: '@natural(100,1000)'
          },
          {
            date: "2020-05-11",
            saleData: '@natural(100,1000)'
          },
          {
            date: "2020-05-12",
            saleData: '@natural(100,1000)'
          },
          {
            date: "2020-05-131",
            saleData: '@natural(100,1000)'
          },
          {
            date: "2020-05-14",
            saleData: '@natural(100,1000)'
          },
          {
            date: "2020-05-15",
            saleData: '@natural(100,1000)'
          },
          {
            date: "2020-05-16",
            saleData: '@natural(100,1000)'
          },
          {
            date: "2020-05-17",
            saleData: '@natural(100,1000)'
          },
          {
            date: "2020-05-18",
            saleData: '@natural(100,1000)'
          },
          {
            date: "2020-07-01",
            saleData: '@natural(100,1000)'
          },
          {
            date: "2020-10-01",
            saleData: '@natural(100,1000)'
          },
          {
            date: "2020-10-02",
            saleData: '@natural(100,1000)'
          }, {
            date: "2020-10-03",
            saleData: '@natural(100,1000)'
          }, {
            date: "2020-10-04",
            saleData: '@natural(100,1000)'
          }, {
            date: "2020-10-05",
            saleData: '@natural(100,1000)'
          },
        ]
      }
    }
  },
  {
    url: '/api/screen/maoyi',
    type: 'get',
    response: config => {
      const { startTime, endTime } = config.query
      return {
        status: 0,
        msg: '',
        data: [
          {
            dateData: '2020-09-22',
            gouqi: '@natural(10, 100)',
            shouqi: '@natural(10, 100)'
          },
          {
            dateData: '2020-09-23',
            gouqi: '@natural(10, 100)',
            shouqi: '@natural(10, 100)'
          },
          {
            dateData: '2020-09-24',
            gouqi: '@natural(10, 100)',
            shouqi: '@natural(10, 100)'
          }, {
            dateData: '2020-09-25',
            gouqi: '@natural(10, 100)',
            shouqi: '@natural(10, 100)'
          }, {
            dateData: '2020-09-26',
            gouqi: '@natural(10, 100)',
            shouqi: '@natural(10, 100)'
          }, {
            dateData: '2020-09-27',
            gouqi: '@natural(10, 100)',
            shouqi: '@natural(10, 100)'
          }, {
            dateData: '2020-09-28',
            gouqi: '@natural(10, 100)',
            shouqi: '@natural(10, 100)'
          }, {
            dateData: '2020-09-29',
            gouqi: '@natural(10, 100)',
            shouqi: '@natural(10, 100)'
          }, {
            dateData: '2020-09-30',
            gouqi: '@natural(10, 100)',
            shouqi: '@natural(10, 100)'
          }, {
            dateData: '2020-10-2',
            gouqi: '@natural(10, 100)',
            shouqi: '@natural(10, 100)'
          }, {
            dateData: '2020-10-3',
            gouqi: '@natural(10, 100)',
            shouqi: '@natural(10, 100)'
          }, {
            dateData: '2020-10-15',
            gouqi: '@natural(10, 100)',
            shouqi: '@natural(10, 100)'
          }, {
            dateData: '2020-10-20',
            gouqi: '@natural(10, 100)',
            shouqi: '@natural(10, 100)'
          }, {
            dateData: '2020-10-21',
            gouqi: '@natural(10, 100)',
            shouqi: '@natural(10, 100)'
          }, {
            dateData: '2020-10-22',
            gouqi: '@natural(10, 100)',
            shouqi: '@natural(10, 100)'
          },
        ]
      }
    }
  },
  {
    url: '/api/screen/huanggang',
    type: 'get',
    response: config => {
      const { startTime, endTime } = config.query
      return {
        status: 0,
        msg: '',
        data: [
          {
            dateData: '2020-09-22',
            gouqi: '@natural(10, 100)',
            shouqi: '@natural(10, 100)'
          },
          {
            dateData: '2020-09-23',
            gouqi: '@natural(10, 100)',
            shouqi: '@natural(10, 100)'
          },
          {
            dateData: '2020-09-24',
            gouqi: '@natural(10, 100)',
            shouqi: '@natural(10, 100)'
          }, {
            dateData: '2020-09-25',
            gouqi: '@natural(10, 100)',
            shouqi: '@natural(10, 100)'
          }, {
            dateData: '2020-09-26',
            gouqi: '@natural(10, 100)',
            shouqi: '@natural(10, 100)'
          }, {
            dateData: '2020-09-27',
            gouqi: '@natural(10, 100)',
            shouqi: '@natural(10, 100)'
          }, {
            dateData: '2020-09-28',
            gouqi: '@natural(10, 100)',
            shouqi: '@natural(10, 100)'
          }, {
            dateData: '2020-09-29',
            gouqi: '@natural(10, 100)',
            shouqi: '@natural(10, 100)'
          }, {
            dateData: '2020-09-30',
            gouqi: '@natural(10, 100)',
            shouqi: '@natural(10, 100)'
          }, {
            dateData: '2020-10-2',
            gouqi: '@natural(10, 100)',
            shouqi: '@natural(10, 100)'
          }, {
            dateData: '2020-10-3',
            gouqi: '@natural(10, 100)',
            shouqi: '@natural(10, 100)'
          }, {
            dateData: '2020-10-15',
            gouqi: '@natural(10, 100)',
            shouqi: '@natural(10, 100)'
          }, {
            dateData: '2020-10-20',
            gouqi: '@natural(10, 100)',
            shouqi: '@natural(10, 100)'
          }, {
            dateData: '2020-10-21',
            gouqi: '@natural(10, 100)',
            shouqi: '@natural(10, 100)'
          }, {
            dateData: '2020-10-22',
            gouqi: '@natural(10, 100)',
            shouqi: '@natural(10, 100)'
          },
        ]
      }
    }
  },

  {
    url: '/api/screen/planAndsale',
    type: 'get',
    response: config => {
      return {
        msg: "success",
        status: 0,
        data: [
          { id: 1, orgName: '黄石公司', sumSale: '@natural(10, 100)', yearPlan: '@natural(10, 100)', dateData: '2020-10-12' },
          { id: 2, orgName: '咸宁昆仑', sumSale: '@natural(10, 100)', yearPlan: '@natural(10, 100)', dateData: '2020-10-12' },
          { id: 3, orgName: '荆门公司', sumSale: '@natural(10, 100)', yearPlan: '@natural(10, 100)', dateData: '2020-10-12' },
          { id: 4, orgName: '武汉管道', sumSale: '@natural(10, 100)', yearPlan: '@natural(10, 100)', dateData: '2020-10-12' },
          { id: 5, orgName: '武汉压缩', sumSale: '@natural(10, 100)', yearPlan: '@natural(10, 100)', dateData: '2020-10-12' },
          { id: 6, orgName: '武汉昆仑', sumSale: '@natural(10, 100)', yearPlan: '@natural(10, 100)', dateData: '2020-10-12' },
          { id: 7, orgName: '恩施公司', sumSale: '@natural(10, 100)', yearPlan: '@natural(10, 100)', dateData: '2020-10-12' },
          { id: 8, orgName: '仙桃公司', sumSale: '@natural(10, 100)', yearPlan: '@natural(10, 100)', dateData: '2020-10-12' },
          { id: 9, orgName: '十堰公司', sumSale: '@natural(10, 100)', yearPlan: '@natural(10, 100)', dateData: '2020-10-12' },
          { id: 10, orgName: '东湖公司', sumSale: '@natural(10, 100)', yearPlan: '@natural(10, 100)', dateData: '2020-10-12' },
          { id: 11, orgName: '孝感公司', sumSale: '@natural(10, 100)', yearPlan: '@natural(10, 100)', dateData: '2020-10-12' },
          { id: 12, orgName: '昆利湖北', sumSale: '@natural(10, 100)', yearPlan: '@natural(10, 100)', dateData: '2020-10-12' },
          { id: 13, orgName: '咸宁公司', sumSale: '@natural(10, 100)', yearPlan: '@natural(10, 100)', dateData: '2020-10-12' },
          { id: 14, orgName: '湖北新捷', sumSale: '@natural(10, 100)', yearPlan: '@natural(10, 100)', dateData: '2020-10-12' },
          { id: 15, orgName: '黄冈工厂LNG', sumSale: '@natural(10, 100)', yearPlan: '@natural(10, 100)', dateData: '2020-10-12' }

        ]
      }
    }
  },
  {
    url: '/api/screen/classsale',
    type: 'get',
    response: config => {
      return {
        msg: "success",
        status: 0,
        data: [
          [{ value: 335, name: '民用' },
          { value: 310, name: '工业' },
          { value: 234, name: '公服' },
          { value: 135, name: '转供' },
          { value: 1548, name: 'CNG' },
          { value: 234, name: 'LNG' },
          { value: 135, name: '代输' }
          ],
          { dateData: '2020-10-22' },
          { sumData: '782.89' }
        ]
      }
    }
  },
  {
    url: '/api/screen/newC',
    type: 'get',
    response: config => {
      return {
        msg: "success",
        status: 0,
        data: [
          {
            dateData: '2020-09-22',
            jumin: '@natural(10, 50)',
            gongye: '@natural(10, 50)',
            shangye: '@natural(10, 50)',
            zhuangong: '@natural(10, 50)'
          },
          {
            dateData: '2020-09-23',
            jumin: '@natural(10, 50)',
            gongye: '@natural(10, 50)',
            shangye: '@natural(10, 50)',
            zhuangong: '@natural(10, 50)'
          }, {
            dateData: '2020-09-24',
            jumin: '@natural(10, 50)',
            gongye: '@natural(10, 50)',
            shangye: '@natural(10, 50)',
            zhuangong: '@natural(10, 50)'
          }, {
            dateData: '2020-09-25',
            jumin: '@natural(10, 50)',
            gongye: '@natural(10, 50)',
            shangye: '@natural(10, 50)',
            zhuangong: '@natural(10, 50)'
          }, {
            dateData: '2020-09-26',
            jumin: '@natural(10, 50)',
            gongye: '@natural(10, 50)',
            shangye: '@natural(10, 50)',
            zhuangong: '@natural(10, 50)'
          }, {
            dateData: '2020-09-27',
            jumin: '@natural(10, 50)',
            gongye: '@natural(10, 50)',
            shangye: '@natural(10, 50)',
            zhuangong: '@natural(10, 50)'
          }, {
            dateData: '2020-09-28',
            jumin: '@natural(10, 50)',
            gongye: '@natural(10, 50)',
            shangye: '@natural(10, 50)',
            zhuangong: '@natural(10, 50)'
          }, {
            dateData: '2020-09-29',
            jumin: '@natural(10, 50)',
            gongye: '@natural(10, 50)',
            shangye: '@natural(10, 50)',
            zhuangong: '@natural(10, 50)'
          }, {
            dateData: '2020-10-01',
            jumin: '@natural(10, 50)',
            gongye: '@natural(10, 50)',
            shangye: '@natural(10, 50)',
            zhuangong: '@natural(10, 50)'
          }, {
            dateData: '2020-10-02',
            jumin: '@natural(10, 50)',
            gongye: '@natural(10, 50)',
            shangye: '@natural(10, 50)',
            zhuangong: '@natural(10, 50)'
          }, {
            dateData: '2020-10-03',
            jumin: '@natural(10, 50)',
            gongye: '@natural(10, 50)',
            shangye: '@natural(10, 50)',
            zhuangong: '@natural(10, 50)'
          },
          {
            dateData: '2020-10-7',
            jumin: '@natural(10, 50)',
            gongye: '@natural(10, 50)',
            shangye: '@natural(10, 50)',
            zhuangong: '@natural(10, 50)'
          },
          {
            dateData: '2020-10-8',
            jumin: '@natural(10, 50)',
            gongye: '@natural(10, 50)',
            shangye: '@natural(10, 50)',
            zhuangong: '@natural(10, 50)'
          }, {
            dateData: '2020-10-9',
            jumin: '@natural(10, 50)',
            gongye: '@natural(10, 50)',
            shangye: '@natural(10, 50)',
            zhuangong: '@natural(10, 50)'
          }, {
            dateData: '2020-10-11',
            jumin: '@natural(10, 50)',
            gongye: '@natural(10, 50)',
            shangye: '@natural(10, 50)',
            zhuangong: '@natural(10, 50)'
          }, {
            dateData: '2020-10-12',
            jumin: '@natural(10, 50)',
            gongye: '@natural(10, 50)',
            shangye: '@natural(10, 50)',
            zhuangong: '@natural(10, 50)'
          }, {
            dateData: '2020-10-14',
            jumin: '@natural(10, 50)',
            gongye: '@natural(10, 50)',
            shangye: '@natural(10, 50)',
            zhuangong: '@natural(10, 50)'
          }, {
            dateData: '2020-10-15',
            jumin: '@natural(10, 50)',
            gongye: '@natural(10, 50)',
            shangye: '@natural(10, 50)',
            zhuangong: '@natural(10, 50)'
          }, {
            dateData: '2020-10-16',
            jumin: '@natural(10, 50)',
            gongye: '@natural(10, 50)',
            shangye: '@natural(10, 50)',
            zhuangong: '@natural(10, 50)'
          }, {
            dateData: '2020-10-17',
            jumin: '@natural(10, 50)',
            gongye: '@natural(10, 50)',
            shangye: '@natural(10, 50)',
            zhuangong: '@natural(10, 50)'
          }, {
            dateData: '2020-10-18',
            jumin: '@natural(10, 50)',
            gongye: '@natural(10, 50)',
            shangye: '@natural(10, 50)',
            zhuangong: '@natural(10, 50)'
          }, {
            dateData: '2020-10-12',
            jumin: '@natural(10, 50)',
            gongye: '@natural(10, 50)',
            shangye: '@natural(10, 50)',
            zhuangong: '@natural(10, 50)'
          }, {
            dateData: '2020-10-19',
            jumin: '@natural(10, 50)',
            gongye: '@natural(10, 50)',
            shangye: '@natural(10, 50)',
            zhuangong: '@natural(10, 50)'
          }, {
            dateData: '2020-10-20',
            jumin: '@natural(10, 50)',
            gongye: '@natural(10, 50)',
            shangye: '@natural(10, 50)',
            zhuangong: '@natural(10, 50)'
          }, {
            dateData: '2020-10-21',
            jumin: '@natural(10, 50)',
            gongye: '@natural(10, 50)',
            shangye: '@natural(10, 50)',
            zhuangong: '@natural(10, 50)'
          },
        ]
      }
    }
  },
  {
    url: '/api/screen/sum',
    type: 'get',
    response: config => {
      return {
        msg: "success",
        status: 0,
        data:
        {
          juminsum: '@natural(10, 100)',
          shangyesum: '@natural(10, 100)',
          gongyesum: '@natural(10, 100)',
          zhuangongsum: '@natural(10, 100)',
          sum: '@natural(10, 100)',
        }

      }
    }
  },
]