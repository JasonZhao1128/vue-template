<script setup>
import { Breadcrumb, Hamburger } from '@/layout/components/index'
</script>
<template>
    <div class="navigation-bar">
        <Hamburger class="hamburger" @toggle-click="toggleSidebar" />
        <Breadcrumb class="breadcrumb" />
        <div class="right-menu"></div>
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
