import { ref } from 'vue'
import { defineStore } from 'pinia'
import { constantRoutes, asyncRoutes } from '@/router/index.js'
import asyncRouteSettings from '@/config/async-route.js'

// const hasPermission = (roles, route) => {
//     return route?.meta?.roles?.some(role => roles.includes(role)) ?? false
// }
const filterAsyncRoutes = (routes, roles) => {
    const result = []
    if (!routes) return null
    for (const route of routes) {
        if (route.meta.roles && route.meta.roles.some(item => roles.includes(item))) {
            if (route?.children && route.children.length > 0) {
                result.push({ ...route, children: filterAsyncRoutes(route.children, roles) })
            } else {
                result.push({ ...route })
            }
        }
    }
    return result
}

export const usePermissionStore = defineStore('permission', () => {
    const routes = ref([])
    const dynamicRoutes = ref([])

    const setRoutes = roles => {
        let accessedRoutes
        if (!asyncRouteSettings.open) {
            accessedRoutes = asyncRoutes
        } else {
            accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        }
        routes.value = constantRoutes.concat(accessedRoutes)
        dynamicRoutes.value = accessedRoutes
    }

    return { routes, dynamicRoutes, setRoutes }
})
