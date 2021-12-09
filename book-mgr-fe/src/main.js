import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import SpaceBetween from './components/SpaceBetween/index.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import FlexEnd from '../src/components/FlexEnd/index.vue'

const app = createApp(App)

createApp(App).use(store).use(router).use(Antd).component('space-between',SpaceBetween).component('flex-end',FlexEnd).mount('#app');
