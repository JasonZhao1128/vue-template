<script setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { RouterView } from 'vue-router'
import { ElConfigProvider } from 'element-plus'
</script>

<template>
    <ElConfigProvider :locale="zhCn">
        <router-view />
    </ElConfigProvider>
</template>
