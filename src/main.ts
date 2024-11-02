import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Popper from 'vue3-popper'

const app = createApp(App)

// eslint-disable-next-line vue/multi-word-component-names
app.component('Popper', Popper)
app.use(createPinia())
app.use(router)

app.mount('#app')
