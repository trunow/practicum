import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

const baseUri = 'http://127.0.0.1:3003';//window?.location?.origin;
const apiUrl =  [baseUri, 'me'].join('/');
const isProd = baseUri === 'https://practicum.trunow.ru';
const token = window.localStorage.getItem('token');

createApp(App)
    .mixin({
        data() {
            return {
                baseUri,
                apiUrl,
                isProd,
                token,
            }
        },
    })
    .mount('#app');
