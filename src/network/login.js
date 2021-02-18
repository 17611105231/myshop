import { request } from './request.js'
export function loginn({ username, password }) {
  return request({
    method: 'post',
    url: 'login',
    params: { username, password }
  })
}
