import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/api/org',
    method: 'get',
    params: query
  })
}

export function createOrg(data) {
  return request({
    url: '/api/org',
    method: 'post',
    data
  })
}

export function updateOrg(data, query) {
  return request({
    url: '/api/org',
    method: 'put',
    data,
    params: query
  })
}

export function deleteOrg(query) {
  return request({
    url: '/api/org',
    method: 'delete',
    params: query
  })
}
