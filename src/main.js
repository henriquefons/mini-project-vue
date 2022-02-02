import { createApp } from 'vue'
import store from './store'
import router from './router'
import App from './App.vue'
import Pagination from 'v-pagination-3';


createApp(App).use(router).use(store).component('pagination', Pagination).mount('#app')
