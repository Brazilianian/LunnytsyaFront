import { createApp } from 'vue'
import App from './App.vue'

import components from '@/components/UI';

// import VueRouter from 'vue-router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import router from './router'

library.add(fas)

const app = createApp(App).use(router);

components.forEach(component => {
    app.component(component.name, component);
})

app.component('fa', FontAwesomeIcon)

app.use(router)

app.mount('#app');
