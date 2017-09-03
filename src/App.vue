<template>
  <component v-bind:is="currentView"
    v-bind:message="message"
    v-bind:gameRunning="gameRunning"></component>
</template>

<script>
import start from './start.vue';
import game from './game.vue';

export default {
  name: 'app',
  components: {
    start,
    game,
  },
  data() {
    return {
      currentView: 'start',
      message: '',
      gameRunning: false,
      connected: false,
    };
  },
  sockets: {
    connect() {
      this.message = '';
      this.connected = true;
    },
    disconnect() {
      this.switchView('start', 'oops, something went wrong :(');
      this.gameRunning = false;
      this.connected = false;
    },
  },
  created() {
    this.$root.app = this;
  },
  methods: {
    switchView(newView, message) {
      this.currentView = newView;
      this.message = message;
    },
    startGame(nickname) {
      if (this.connected) {
        this.$socket.emit('playerInfo', nickname);
        this.gameRunning = true;
        this.message = '';
        this.switchView('game');
      } else {
        this.message = 'unable to connect to server';
      }
    },
  },
};
</script>

<style lang="scss">
@import './assets/globals.scss';

html, body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background-color: $lightColour;
}
</style>
