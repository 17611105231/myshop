import { request } from '../request'
//获取用户列表
export function userList(queryInfo) {
  return request({
    method: 'get',
    url: 'users',
    params: {
      query: queryInfo.query,
      pagenum: queryInfo.pagenum,
      pagesize: queryInfo.pagesize
    }
  })
}
//搜索用户
export function queryUser(query) {
  return request({
    method: 'get',
    url: 'users',
    params: {
      query: query,
      pagenum: 1,
      pagesize: 5
    }
  })
}
//添加用户
export function addUser1(data) {
  return request({
    method: 'post',
    url: 'users',
    data: {
      username: data.username,
      password: data.password
    }
  })
}
//修改用户状态
export function changeStatus(id, type) {
  return request({
    method: 'put',
    url: `users/${id}/state/${type}`
  })
}
//根据id查询用户信息
export function queryUserInfo(id) {
  return request({
    method: 'get',
    url: `users/${id}`
  })
}
//编辑用户信息
export function editUser(id, editUserInfo) {
  return request({
    method: 'put',
    url: `users/${id}`,
    data: { email: editUserInfo.email, mobile: editUserInfo.mobile }
  })
}
//删除单个用户
export function deleteUser(id) {
  return request({
    method: 'delete',
    url: `users/${id}`
  })
}
