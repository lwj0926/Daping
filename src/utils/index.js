/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

// 日期转字符串格式
export function parseDate(time) {
  return parseTime(time, '{y}-{m}-{d}')
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * 判断日期是不是进入
 * @param {Date} date
 */
export function isToday(date) {
  const now = new Date()
  return parseTime(now, '{y}-{m}-{d}') === parseTime(date, '{y}-{m}-{d}')
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * Array to Object
 * @param { Array } arr
 * @returns { Object }
 */

export function array2Object(arr) {
  return arr.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc

  }, {})
}

/**
 * 得到一个月有几天
 * @param { Number } year 年
 * @param { Number } month 月
 * @returns { Number }
 */

export function getMonthDay(year, month) {
  const days = new Date(year, month + 1, 0).getDate()
  return days
}


// 半年范围
export const daterange6month = () => {
  const end = new Date()
  const start = new Date()
  start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
  return [start, end]
}

// 1个月
export const daterange1month = () => {
  const end = new Date()
  const start = new Date()
  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
  return [start, end]
}
//1周范围
export const daterange1week = () => {
  const end = new Date()
  const start = new Date()
  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
  return [start, end]
}
// 图表的日期不一定是连续的，但是图表上显示数据最好是连续的
export const getChartSour = (arr, dateRange, title) => {
  const [start, end] = dateRange
  const dataObj = {}
  arr.forEach((item) => {
    dataObj[item.dateData] = item
  })

  const source = [title]
  for (let i = start.getTime(); i <= end.getTime();) {
    const date = parseDate(new Date(i))
    const jumin = (dataObj[date] && dataObj[date].jumin) || '-'
    const shangye = (dataObj[date] && dataObj[date].shangye) || '-'
    const gongye = (dataObj[date] && dataObj[date].gongye) || '-'
    const zhuangong = (dataObj[date] && dataObj[date].zhuangong) || '-'
    const temp = [date.split('-').slice(1).join('-'), Math.round(jumin), Math.round(shangye), Math.round(gongye), Math.round(zhuangong)]
    source.push(temp)

    i += 3600 * 1000 * 24
  }

  return source
}
export const getChartSource = (arr, dateRange, title, param) => {
  const [start, end] = dateRange
  const dataObj = {}
  arr.forEach((item) => {
    dataObj[item.date] = item
  })

  const source = [title]

  for (let i = start.getTime(); i <= end.getTime();) {
    const date = parseDate(new Date(i))
    const temp = [date.split('-').slice(1).join('-')]
    if (param.buyData) {
      temp.push((dataObj[date] && dataObj[date].data) || '-')
    }
    if (param.saleData) {
      temp.push((dataObj[date] && dataObj[date].data) || '-')
    }
    source.push(temp)

    i += 3600 * 1000 * 24
  }

  return source
}

export const getChart = (arr, dateRange, title,) => {
  const [start, end] = dateRange
  const dataObj = {}
  arr.forEach((item) => {
    dataObj[item.dateData] = item
  })

  const source = [title]

  for (let i = start.getTime(); i <= end.getTime();) {
    const date = parseDate(new Date(i))
    const gouqi = (dataObj[date] && dataObj[date].gouqi) || '-'
    const shouqi = (dataObj[date] && dataObj[date].shouqi) || '-'

    const temp = [date.split('-').slice(1).join('-'), Math.round(gouqi), Math.round(shouqi)]
    source.push(temp)

    i += 3600 * 1000 * 24
  }

  return source
}