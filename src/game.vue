<template>
  <div>
    <board v-bind:mapState="mapState"></board>

    <div id="leaderboard" v-show="players.length > 0">
      <h3>Players</h3>
      <ol>
        <li v-for="player in players">{{player.nickname}} ({{player.score}})</li>
      </ol>
    </div>
  </div>
</template>

<script>
import board from './board-svg.vue';

export default {
  name: 'game',
  components: {
    board,
  },
  props: ['gameRunning'],
  data() {
    return {
      mapState: {
        playersInfo: [{
          pos: {
            x: 0,
            y: 0,
          },
        }],
        powerups: [],
        tickTime: 0,
      },
      keys: {
        left: false,
        right: false,
        up: false,
        down: false,
      },
    };
  },
  computed: {
    players() {
      return this.mapState.playersInfo;
    },
  },
  sockets: {
    mapUpdate(mapState) {
      this.mapState = mapState;
    },
  },
  mounted() {
    this.registerControls();
  },
  methods: {
    registerControls() {
      window.addEventListener('keydown', (event) => {
        if (this.gameRunning) {
          switch (event.keyCode) {
            case 38: // up
              if (!this.keys.up) {
                this.keys.up = true;
                this.sendKeys();
              }
              break;
            case 40: // down
              if (!this.keys.down) {
                this.keys.down = true;
                this.sendKeys();
              }
              break;
            case 37: // left
              if (!this.keys.left) {
                this.keys.left = true;
                this.sendKeys();
              }
              break;
            case 39: // right
              if (!this.keys.right) {
                this.keys.right = true;
                this.sendKeys();
              }
              break;
            default:
              break;
          }
        }
      });

      window.addEventListener('keyup', (event) => {
        if (this.gameRunning) {
          switch (event.keyCode) {
            case 38: // up
              if (this.keys.up) {
                this.keys.up = false;
                this.sendKeys();
              }
              break;
            case 40: // down
              if (this.keys.down) {
                this.keys.down = false;
                this.sendKeys();
              }
              break;
            case 37: // left
              if (this.keys.left) {
                this.keys.left = false;
                this.sendKeys();
              }
              break;
            case 39: // right
              if (this.keys.right) {
                this.keys.right = false;
                this.sendKeys();
              }
              break;
            default:
              break;
          }
        }
      });
    },
    sendKeys() {
      this.$socket.emit('keyUpdate', this.keys);
    },
  },
};
</script>

<style lang="scss">
@import './assets/globals.scss';

#leaderboard {
  padding: 1em;
  position: fixed;
  bottom: 2em;
  left: 2em;
  background-color: rgba(255,255,255,0.4);
  @include dropShadow;
  border-radius: 5px;

  h3 {
    margin-top: 0;
    min-width: 150px;
  }

  ol {
    margin-bottom: 0;
  }
}
</style>
