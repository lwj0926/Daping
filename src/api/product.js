import request from '@/utils/request'
//得到日报
export function getReport(query) {
  return request({
    url: '/api/productReport',
    method: 'get',
    params: query
  })
}
//暂存和提交日报
export function createReport(data, params) {
  return request({
    url: '/api/productReport',
    method: 'post',
    data,
    params
  })
}
//上报和退回日报
export function updateReport(params) {
  return request({
    url: '/api/productReport',
    method: 'put',
    params
  })
}
//根据月份得到日报的上传情况
export function getReportRecords(params) {
  return request({
    url: '/api/productRecords',
    method: 'get',
    params
  })
}
//日报汇总，根据月份得到日报的上传情况
export function getReportRecordsList(params) {
  return request({
    url: '/api/productRecords/list',
    method: 'get',
    params
  })
}
//日报汇总中，某天的填报情况
export function getReportRecordsListDetail(params) {
  return request({
    url: '/api/productRecords/list/detail',
    method: 'get',
    params
  })
}
