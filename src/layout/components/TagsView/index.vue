<script setup>
import { onMounted, watch } from 'vue'
import { useTagsViewStore } from '@/stores/modules/tags-view'
import { useRoute } from 'vue-router'
const route = useRoute()
const tagsViewStore = useTagsViewStore()
const addTags = () => {
    if (route.name) {
        tagsViewStore.addVisitedView(route)
        tagsViewStore.addCachedView(route)
    }
}
const isActive = tag => {
    return tag.path === route.path
}
const isAffix = tag => {
    return tag.meta?.affix
}

watch(
    route,
    () => {
        addTags()
    },
    {
        deep: true
    }
)
onMounted(() => {
    addTags()
})
</script>
<template>
    <div class="tags-view-container">
        <ScrollPane class="tags-view-wrapper" :tagRefs="tagRefs">
            <router-link
                ref="tagRefs"
                v-for="tag in tagsViewStore.visitedViews"
                :key="tag.path"
                :class="isActive(tag) ? 'active' : ''"
                :to="{ path: tag.path, query: tag.query }"
                class="tags-view-item"
                @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"
                @contextmenu.prevent="openMenu(tag, $event)"
            >
                {{ tag.meta?.title }}
                <el-icon
                    v-if="!isAffix(tag)"
                    :size="12"
                    @click.prevent.stop="closeSelectedTag(tag)"
                >
                    <Close />
                </el-icon>
            </router-link>
        </ScrollPane>
    </div>
</template>
<style lang="scss" scoped>
.tags-view-container {
    height: var(--v3-tagsview-height);
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 #00000010, 0 0 3px 0 #00000010;
    .tags-view-wrapper {
        .tags-view-item {
            display: inline-block;
            position: relative;
            cursor: pointer;
            height: 26px;
            line-height: 26px;
            border: 1px solid var(--v3-tagsview-tag-border-color);
            border-radius: var(--v3-tagsview-tag-border-radius);
            color: var(--v3-tagsview-tag-text-color);
            background-color: var(--v3-tagsview-tag-bg-color);
            padding: 0 8px;
            font-size: 12px;
            margin-left: 5px;
            margin-top: 4px;
            &:first-of-type {
                margin-left: 5px;
            }
            &:last-of-type {
                margin-right: 5px;
            }
            &.active {
                background-color: var(--v3-tagsview-tag-active-bg-color);
                color: var(--v3-tagsview-tag-active-text-color);
                border-color: var(--v3-tagsview-tag-active-border-color);
                &::before {
                    content: '';
                    background-color: var(--v3-tagsview-tag-active-before-color);
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    position: relative;
                    margin-right: 2px;
                }
            }
            .el-icon {
                margin: 0 2px;
                vertical-align: middle;
                border-radius: 50%;
                &:hover {
                    background-color: var(--v3-tagsview-tag-icon-hover-bg-color);
                    color: var(--v3-tagsview-tag-icon-hover-color);
                }
            }
        }
    }
    .contextmenu {
        margin: 0;
        background-color: #fff;
        z-index: 3000;
        position: absolute;
        list-style-type: none;
        padding: 5px 0;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 400;
        color: #333;
        box-shadow: 2px 2px 3px 0 #00000030;
        li {
            margin: 0;
            padding: 7px 16px;
            cursor: pointer;
            &:hover {
                background-color: #eee;
            }
        }
    }
}
</style>
