import request from '@/utils/request'


export function getCards() {
  return request({
    url: '/api/screen/cards',
    method: 'get'
  })
}
export function getOrgs() {
  return request({
    url: '/api/screen/orgs',
    method: 'get'
  })
}
export function getPlans() {
  return request({
    url: '/api/screen/plans',
    method: 'get'
  })
}
export function getBuy(query) {
  return request({
    url: '/api/screen/buy',
    method: 'get',
    params: query
  })
}

export function getSale(query) {
  return request({
    url: '/api/screen/sale',
    method: 'get',
    params: query
  })
}
export function getMaoyi(query) {
  return request({
    url: '/api/screen/maoyi',
    method: 'get',
    params: query
  })
}
export function getHuanggang(query) {
  return request({
    url: '/api/screen/huanggang',
    method: 'get',
    params: query
  })
}
export function getPlanAndSale() {
  return request({
    url: '/api/screen/planAndSale',
    method: 'get',

  })
}
export function getClassSale() {
  return request({
    url: '/api/screen/classsale',
    method: 'get',

  })
}
export function getNew(query) {
  return request({
    url: '/api/screen/newC',
    method: 'get',
    params: query
  })
}
export function getSum() {
  return request({
    url: '/api/screen/sum',
    method: 'get',

  })
}