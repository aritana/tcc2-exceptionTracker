import { createApp } from 'vue'
import App from './App.vue'
// icon source
import '@fortawesome/fontawesome-free/css/all.css'
import router from './router'

//antes de montar usar o router
createApp(App)
    .use(router)
    .mount('#app')
