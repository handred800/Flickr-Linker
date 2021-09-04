import { createApp } from 'vue';
import VueViewer from 'v-viewer';

import App from './App.vue';
import '@/assets/scss/main.scss';
import '../public/viewer.css';

const app = createApp(App);

app.use(VueViewer);
app.mount('#app');
