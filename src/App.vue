<script setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { useTheme } from '@/hooks/useTheme'
import { RouterView } from 'vue-router'
const { initTheme } = useTheme()

/** 初始化主题 */
initTheme()
</script>

<template>
    <ElConfigProvider :locale="zhCn">
        <router-view />
    </ElConfigProvider>
</template>
