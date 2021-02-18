import { request } from '../request'
//获取角色列表
export function rolesList() {
  return request({
    method: 'get',
    url: 'roles'
  })
}
//根据id删除指定的权限
export function removeRightsById(rowId, id) {
  return request({
    method: 'delete',
    url: `roles/${rowId}/rights/${id}`
  })
}
