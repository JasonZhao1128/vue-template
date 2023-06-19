import { request } from '@/utils/service'

/** 登录 */
export function loginApi(data) {
    return request({
        url: '/users/login',
        method: 'post',
        data
    })
}
