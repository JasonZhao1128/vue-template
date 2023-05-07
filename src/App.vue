<script setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { RouterView } from 'vue-router'
</script>

<template>
    <ElConfigProvider :locale="zhCn">
        <router-view />
    </ElConfigProvider>
</template>
