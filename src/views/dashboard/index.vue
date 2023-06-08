<script setup>
import { ref } from 'vue'
defineOptions({
    name: 'Dashboard'
})
const count = ref(0)
const test = ref([])
const con = ref([
    {
        to: '/about1',
        key: '1'
    },
    {
        to: '/about2',
        key: '2'
    }
])
const btn = () => {
    console.log(test.value)
}
</script>
<template>
    <div>
        <div>
            <button @click="btn">{{ count }}</button>
            <h1 v-for="item in con" ref="test" :key="item.key">{{ item.to }}</h1>
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
