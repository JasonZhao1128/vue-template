import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/styles/index.scss'
import 'normalize.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
