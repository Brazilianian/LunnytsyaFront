import { createApp } from 'vue'
import App from './App.vue'

import components from '@/components/UI';

// import VueRouter from 'vue-router'

import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import router from './router'

const app = createApp(App).use(router);

components.forEach(component => {
    app.component(component.name, component);
})

app.use(router)

app.mount('#app');
