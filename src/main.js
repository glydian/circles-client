import Vue from 'vue';
import io from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import App from './App.vue';

const server = io('//circles.antoniasiu.co.uk:3000', {
  secure: true,
  reconnection: false,
});

Vue.use(VueSocketIO, server);

// eslint-disable-next-line no-unused-vars
const app = new Vue({
  el: '#app',
  render: h => h(App),
});
