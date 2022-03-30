import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mLibs from './libs'
import { useREM } from './utils/flexible'
import './styles/index.scss'
import 'virtual:svg-icons-register'

// 设置 rem
useREM()
createApp(App).use(router).use(store).use(mLibs).mount('#app')
