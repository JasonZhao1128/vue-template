import router from '@/router'
import { useUserStore } from '@/stores/modules/user'
import { usePermissionStore } from '@/stores/modules/permission'
import asyncRouteSettings from '@/config/async-route'
import { whiteList } from '@/config/white-list'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

router.beforeEach((to, _from, next) => {
    const userStore = useUserStore()
    const permissionStore = usePermissionStore()
    if (userStore.userInfo.username) {
        if (to.path === '/login') {
            next({ path: '/', replace: true })
        } else {
            // 检查用户是否已获得其权限角色
            if (userStore.roles.length === 0) {
                try {
                    if (asyncRouteSettings.open) {
                        const roles = userStore.roles
                        // 根据角色生成可访问的 Routes（可访问路由 = 常驻路由 + 有访问权限的动态路由）
                        permissionStore.setRoutes(roles)
                    } else {
                        // 没有开启动态路由功能，则启用默认角色
                        userStore.setRoles(asyncRouteSettings.defaultRoles)
                        permissionStore.setRoutes(asyncRouteSettings.defaultRoles)
                    }
                    // 将'有访问权限的动态路由' 添加到 Router 中
                    permissionStore.dynamicRoutes.forEach(route => {
                        router.addRoute(route)
                    })

                    // 确保添加路由已完成
                    // 设置 replace: true, 因此导航将不会留下历史记录
                    next({ ...to, replace: true })
                } catch (err) {
                    // 过程中发生任何错误，都直接重置 Token，并重定向到登录页面
                    userStore.resetToken()
                    ElMessage.error(err.message || '路由守卫过程发生错误')
                    next('/login')
                    NProgress.done()
                }
            } else {
                next()
            }
        }
    } else {
        // 如果没有 Token
        if (whiteList.indexOf(to.path) !== -1) {
            // 如果在免登录的白名单中，则直接进入
            next()
        } else {
            // 其他没有访问权限的页面将被重定向到登录页面
            next('/login')
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})
