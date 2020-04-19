import request from '@/utils/request'

export function getCallTasks() {
  return request({
    url: '/callTasks',
    method: 'get'
  })
}

export function addCallTasks(data) {
  return request({
    url: '/callTasks',
    method: 'post',
    data
  })
}

export function delCallTasks(id) {
  return request({
    url: `/callTasks/${id}`,
    method: 'DELETE'
  })
}

export function importPhone(id, data) {
  return request({
    url: `/callTasks/${id}/importPhone`,
    method: 'post',
    data
  })
}// export const addCallTasks = params => request.post('/callTasks/{{id}}', params)
