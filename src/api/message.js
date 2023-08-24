import request from '@/request'


  export function listMessage() {
    return request({
      url: '/message/listMessage',
      method: 'get'
    })
  }

  export function publishMessage(message){
    return request({
      url:'/message/saveMessage',
      method:'post',
      data:message
    })
  }

