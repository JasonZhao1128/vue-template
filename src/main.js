// core
import { createApp } from 'vue'
import store from '@/stores'
import App from './App.vue'
import router from './router'
import '@/router/permission'
// css
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/styles/index.scss'
import 'virtual:uno.css'
// load
import { loadSvg } from '@/icons'
import { loadPlugins } from '@/plugins'

const app = createApp(App)

// 加载全局 SVG
loadSvg(app)
// 加载插件
loadPlugins(app)

app.use(store)
app.use(router)
router.isReady().then(() => {
    app.mount('#app')
})
console.log('111');
