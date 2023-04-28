<script setup>
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '@/stores/modules/settings'
import SidebarLogo from './SidebarLogo.vue'
const settingsStore = useSettingsStore()
const { showSidebarLogo } = storeToRefs(settingsStore)
</script>

<template>
    <div v-if="showSidebarLogo">
        <SidebarLogo :collapse="false"></SidebarLogo>
    </div>
</template>
