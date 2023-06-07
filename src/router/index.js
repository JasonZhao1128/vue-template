import { createRouter, createWebHistory } from 'vue-router'
const Layout = () => import('@/layout/index.vue')

/** 常驻路由 */
export const constantRoutes = [
    {
        path: '/redirect',
        component: Layout,
        meta: {
            hidden: true
        },
        children: [
            {
                path: '/redirect/:path(.*)',
                component: () => import('@/views/redirect/index.vue')
            }
        ]
    },
    {
        path: '/404',
        alias: '/:pathMatch(.*)*',
        component: () => import('@/views/error-page/404.vue'),
        meta: {
            hidden: true
        }
    },
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        meta: {
            hidden: true
        }
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: '/dashboard',
                component: () => import('@/views/dashboard/index.vue'),
                name: 'Dashboard',
                meta: {
                    title: '首页',
                    svgIcon: 'dashboard',
                    affix: true,
                    keepAlive: true
                }
            }
        ]
    },
    {
        path: '/unocss',
        component: Layout,
        redirect: '/unocss/index',
        children: [
            {
                path: 'index',
                component: () => import('@/views/unocss/index.vue'),
                name: 'UnoCSS',
                meta: {
                    title: 'unocss',
                    elIcon: 'Search'
                }
            }
        ]
    },
    {
        path: '/link',
        meta: {
            title: '外链',
            elIcon: 'link'
        },
        component: Layout,
        redirect: '/link/index1',
        children: [
            {
                path: 'index1',
                component: () => import('@/views/unocss/index.vue'),
                meta: {
                    title: '外链1',
                    svgIcon: 'link'
                }
            },
            {
                path: 'index2',
                component: () => import('@/views/unocss/index.vue'),
                meta: {
                    title: '外链2',
                    svgIcon: 'link'
                }
            }
        ]
    }
]

/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
// const arr = [
//     {
//         name: 'Permission',
//         meta: { title: '权限管理', svgIcon: 'lock', roles: ['admin', 'editor'], alwaysShow: false },
//         children: [
//             { name: 'PagePermission', meta: { title: '页面权限', roles: ['admin'] } },
//             { name: 'PagePermission1', meta: { title: '页面权限1' } }
//         ]
//     },
//     {
//         name: 'Permission1',
//         meta: { title: '权限管理1', svgIcon: 'lock', roles: ['admin'], alwaysShow: false }
//     },
//     { name: 'Permission2', meta: { title: '权限管理2', svgIcon: 'lock', alwaysShow: false } },
//     {
//         name: 'Permission1',
//         meta: { title: '权限管理1', svgIcon: 'lock', roles: ['admin'], alwaysShow: false }
//     }
// ]

// const filteredArr = arr.filter(item => {
//     if (item.meta.roles && item.meta.roles.some(role => role === 'admin')) {
//         return true
//     }
//     if (item.children) {
//         const filteredChildren = item.children.filter(child => {
//             return child.meta.roles && child.meta.roles.some(role => role === 'admin')
//         })
//         return filteredChildren.length > 0
//     }
//     return false
// })
// console.log(filteredArr)
export const asyncRoutes = [
    {
        path: '/permission',
        component: Layout,
        redirect: '/permission/page',
        name: 'Permission',
        meta: {
            title: '权限管理',
            svgIcon: 'lock',
            roles: ['admin', 'editor'], // 可以在根路由中设置角色
            alwaysShow: false // 将始终显示根菜单
        },
        children: [
            {
                path: 'page',
                component: () => import('@/views/permission/page.vue'),
                name: 'PagePermission',
                meta: {
                    svgIcon: 'lock',
                    title: '页面权限',
                    roles: ['admin'] // 或者在子导航中设置角色
                }
            },
            {
                path: 'directive',
                component: () => import('@/views/permission/directive.vue'),
                name: 'DirectivePermission',
                meta: {
                    title: '指令权限' // 如果未设置角色，则表示：该页面不需要权限，但会继承根路由的角色
                }
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*', // Must put the 'ErrorPage' route at the end, 必须将 'ErrorPage' 路由放在最后
        redirect: '/404',
        name: 'ErrorPage',
        meta: {
            hidden: true
        }
    }
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: constantRoutes
})

export default router
