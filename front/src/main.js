import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

const origin = window?.location?.origin;

const baseUri = origin==='https://practicum.trunow.ru'?origin:'http://127.0.0.1:3003';
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
