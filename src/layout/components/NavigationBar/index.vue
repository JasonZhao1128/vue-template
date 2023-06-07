<script setup>
import { ref, reactive, computed } from 'vue'
import { Breadcrumb, Hamburger } from '@/layout/components/index'
import Notify from '@/components/Notify/index.vue'
import { useAppStore } from '@/stores/modules/app'
import { UserFilled } from '@element-plus/icons-vue'
const appStore = useAppStore()
const showNotify = ref(true)
const userStore = reactive({
    username: 'zhao'
})
const sidebar = computed(() => {
    return appStore.sidebar
})
const toggleSidebar = () => {
    appStore.toggleSidebar(false)
}
const logout = () => {}
</script>
<template>
    <div class="navigation-bar">
        <Hamburger class="hamburger" :is-active="sidebar.opened" @toggle-click="toggleSidebar" />
        <Breadcrumb class="breadcrumb" />
        <div class="right-menu">
            <Notify v-if="showNotify" class="right-menu-item" />
            <el-dropdown class="right-menu-item">
                <div class="right-menu-avatar">
                    <el-avatar :icon="UserFilled" :size="30" />
                    <span>{{ userStore.username }}</span>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <a target="_blank" href="https://juejin.cn/post/7089377403717287972">
                            <el-dropdown-item>中文文档</el-dropdown-item>
                        </a>
                        <a target="_blank" href="https://github.com/un-pany/v3-admin-vite">
                            <el-dropdown-item>GitHub</el-dropdown-item>
                        </a>
                        <a target="_blank" href="https://gitee.com/un-pany/v3-admin-vite">
                            <el-dropdown-item>Gitee</el-dropdown-item>
                        </a>
                        <el-dropdown-item divided @click="logout">
                            <span style="display: block">退出登录</span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.navigation-bar {
    height: var(--v3-navigationbar-height);
    overflow: hidden;
    background: #fff;
    .hamburger {
        display: flex;
        align-items: center;
        height: 100%;
        float: left;
        padding: 0 15px;
        cursor: pointer;
    }
    .breadcrumb {
        float: left;
        // 参考 Bootstrap 的响应式设计 WIDTH = 576
        @media screen and (max-width: 576px) {
            display: none;
        }
    }
    .right-menu {
        float: right;
        margin-right: 10px;
        height: 100%;
        display: flex;
        align-items: center;
        color: #606266;
        .right-menu-item {
            padding: 0 10px;
            cursor: pointer;
            .right-menu-avatar {
                display: flex;
                align-items: center;
                .el-avatar {
                    margin-right: 10px;
                }
                span {
                    font-size: 16px;
                }
            }
        }
    }
}
</style>
