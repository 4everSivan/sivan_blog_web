import request from '@/request'


export function getUser(id) {
  return request({
    url: '/users/selectOne',
    method: 'post',
    data:id
  })
}

export function findUserArticle(pagination) {
  return request({
    url: '/management/listMyArticle',
    method: 'post',
    data:pagination
  })
}

export function updateUserInfo(formData) {
  return request({
    url: '/management/updateUserInfo',
    method: 'post',
    data:formData
  })
}

export function getStatistical(id) {
  return request({
    url: '/management/statistical',
    method: 'post',
    data:id
  })
}

export function searchArticle(title) {
  return request({
    url: '/management/search',
    method: 'post',
    data:title
  })
}
