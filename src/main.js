import {createApp} from 'vue'
import App from './App.vue'

import components from '@/components/UI';

import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

import VueCookies from 'vue3-cookies'

import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

import router from './router'
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8888/api/v1'

library.add(fas)

const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component);
})

app.component('fas', FontAwesomeIcon)

app.use(router)
    .use(VueCookies)
    .mount('#app')

