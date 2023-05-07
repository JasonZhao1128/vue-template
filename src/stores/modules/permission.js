import { ref } from 'vue'
// import store from '@/stores'
import { defineStore } from 'pinia'
import { constantRoutes, asyncRoutes } from '@/router/index.js'
import asyncRouteSettings from '@/config/async-route.js'

const hasPermission = (roles, route) => {
    return route?.meta?.roles?.some(role => roles.includes(role)) ?? false
}
const filterAsyncRoutes = (routes, roles) => {
    return routes.filter(route => {
        if (hasPermission(roles, route)) {
            if (route.children) {
                route.children = filterAsyncRoutes(route.children, roles)
            }
            return true
        }
        return false
    })
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
