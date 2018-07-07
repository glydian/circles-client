<template>
  <keep-alive>
    <component
      v-bind:is="currentView"
      v-bind:message="message"
      v-bind:gameRunning="gameRunning">
    </component>
  </keep-alive>
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
    connect_error() {
      this.message = 'could not connect to server';
      this.connected = false;
    },
    connect_timeout() {
      this.message = 'connection timed out';
      this.connected = false;
    },
    error(message) {
      this.message = `error: ${message}`;
    },
    disconnect() {
      this.switchView('start', 'oops, something went wrong :(', true);
      this.gameRunning = false;
      this.connected = false;
    },
    outOfBounds() {
      this.message = 'you were out of bounds';
    },
    conSuccess() {
      this.gameRunning = true;
      this.switchView('game', '');
    },
    conError(message) {
      this.message = `error: ${message}`;
    },
  },
  created() {
    this.$root.app = this;
  },
  methods: {
    switchView(newView, message, onlyIfEmpty) {
      if (this.currentView !== newView) {
        this.currentView = newView;
        if (!onlyIfEmpty || this.message === '') {
          this.message = message;
        }
      }
    },
    startGame(nickname) {
      this.$socket.connect();
      this.$socket.emit('playerInfo', nickname);
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
