<script setup>
import { Sidebar } from './components'
</script>
<template>
    <div class="app-wrapper">
        <Sidebar class="sidebar-container" />
        <div :class="{ hasTagsView: showTagsView }" class="main-container"></div>
    </div>
</template>
<style lang="scss">
@import '@/styles/mixins.scss';
.app-wrapper {
    @include clearfix;
    position: relative;
    width: 100%;
}
.main-container {
    min-height: 100%;
    transition: margin-left 0.28s;
    margin-left: var(--v3-sidebar-width);
    position: relative;
}
.sidebar-container {
    transition: width 0.28s;
    width: var(--v3-sidebar-width) !important;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
}
</style>
