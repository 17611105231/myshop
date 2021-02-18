import { request } from './request'
export function getMenu() {
  return request({
    method: 'get',
    url: 'menus'
  })
}
