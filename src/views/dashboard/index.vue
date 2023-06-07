<script setup>
import { ref } from 'vue'
defineOptions({
    name: 'Dashboard'
})
const count = ref(0)
</script>
<template>
    <div>
        <div>
            <button @click="count++">{{ count }}</button>
        </div>
    </div>
</template>
<style lang="scss" scoped>
div {
    width: 100%;
    height: 100%;
    background-color: antiquewhite;
}
</style>
