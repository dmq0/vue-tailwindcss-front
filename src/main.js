import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useREM } from './utils/flexible'
import './styles/index.scss'
// 设置 rem
useREM()
createApp(App).use(router).mount('#app')
