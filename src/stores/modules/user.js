import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useTagsViewStore } from './tags-view'
import { loginApi } from '@/api/login'
import { resetRouter } from '@/router'

export const useUserStore = defineStore('user', () => {
    const roles = ref([])
    const userInfo = ref({})

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
