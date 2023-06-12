import { ref } from 'vue'
import asyncRouteSettings from '@/config/async-route.js'
import { defineStore } from 'pinia'
// import { usePermissionStore } from './permission'
import { useTagsViewStore } from './tags-view'
import { loginApi } from '@/api/login'
import { resetRouter } from '@/router'

export const useUserStore = defineStore('user', () => {
    const roles = ref([])
    const userInfo = ref({})

    // const permissionStore = usePermissionStore()
    const tagsViewStore = useTagsViewStore()
    /** 登录 */
    const login = loginData => {
        return new Promise((resolve, reject) => {
            loginApi({
                username: loginData.username,
                password: loginData.password,
                code: loginData.code
            })
                .then(res => {
                    if (res.code === 0) {
                        userInfo.value = res.data
                        if (res.data.roles && res.data.roles.length > 0) {
                            roles.value = res.data.roles
                        } else {
                            // 塞入一个没有任何作用的默认角色，不然路由守卫逻辑会无限循环
                            roles.value = asyncRouteSettings.defaultRoles
                        }
                        resolve()
                    } else {
                        reject(res)
                    }
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
    /** 设置角色数组 */
    const setRoles = value => {
        roles.value = value
    }
    /** 登出 */
    const logout = () => {
        roles.value = []
        resetRouter()
        _resetTagsView()
    }
    /** 重置 visited views 和 cached views */
    const _resetTagsView = () => {
        tagsViewStore.delAllVisitedViews()
        tagsViewStore.delAllCachedViews()
    }
    return { roles, login, logout, userInfo, setRoles }
})
