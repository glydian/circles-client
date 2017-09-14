<template>
  <div>
    <svg :width="boardSize + 'px'" :height="boardSize + 'px'" :viewBox="myViewBox">
      <g class="board">
        <circle cx="0" cy="0" class="outerCircle" :r="outerCircleRadius"/>
        <circle cx="0" cy="0" class="innerCircle" :r="innerCircleRadius"/>

        <line v-for="n in 20" x1="-2000" x2="2000" :y1="getLineLocation(n)" :y2="getLineLocation(n)"></line>
        <line v-for="n in 20" :x1="getLineLocation(n)" :x2="getLineLocation(n)" y1="-2000" y2="2000"></line>
      </g>

      <g class="powerups">
        <g v-for="powerup in powerups" class="powerup">
          <circle :cx="powerup.pos.x" :cy="powerup.pos.y" r="20"/>
          <text :x="powerup.pos.x" :y="powerup.pos.y">{{powerup.type}}</text>
        </g>
      </g>

      <g class="players">
        <text v-for="player in players"
          :x="player.pos.x"
          :y="player.pos.y - 30"
          text-anchor="middle">{{player.nickname}}</text>
        <circle v-for="player in players"
        :cx="player.pos.x"
        :cy="player.pos.y"
        r="20"></circle>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'board-svg',
  props: ['mapState'],
  computed: {
    players() {
      return this.mapState.playersInfo;
    },
    powerups() {
      return this.mapState.powerups;
    },
    tickTime() {
      return this.mapState.tickTime;
    },
    innerCircleRadius() {
      return this.getInnerCircleRadius(this.tickTime);
    },
    outerCircleRadius() {
      return this.getOuterCircleRadius(this.tickTime);
    },
    myLocation() {
      for (let i = 0; i < this.players.length; i += 1) {
        if (this.players[i].id === this.$socket.id) {
          return this.players[i].pos;
        }
      }
      return { x: 2000, y: 2000 };
    },
    myViewBox() {
      const { x, y } = this.myLocation;
      const size = 1000;
      return `${x - (size / 2)} ${y - (size / 2)} ${size} ${size}`;
    },
  },
  data() {
    return {
      gridLineSpacing: 200,
      boardSize: 4000,
      gameLengthInTicks: 1500,
    };
  },
  methods: {
    getLineLocation(n) {
      return (n - 10) * this.gridLineSpacing;
    },
    getInnerCircleRadius(currentTick) {
      return (this.gameLengthInTicks - currentTick) * (2 / 3);
    },
    getOuterCircleRadius(currentTick) {
      return this.getInnerCircleRadius(currentTick) + this.getInnerCircleRadius(0);
    },
  },
};
</script>

<style lang="scss">
@import './assets/globals.scss';

svg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.players {
  circle {
    fill: $darkColour;
    stroke: $lightColour;
  }

  text {
    fill: $darkColour;
    stroke: $lightColour;
    font-size: 22px;
    font-weight: bold;
    font-family: sans-serif;
  }
}

.powerup {
  circle {
    fill: $darkColour;
    stroke: $lightColour;
  }

  text {
    text-anchor: middle;
    dominant-baseline: middle;
    fill: $lightColour;
  }
}

.board {
  line {
    stroke: #ccc;
    stroke-width: 2;
  }

  .innerCircle {
    fill: $lightColour;
  }

  .outerCircle {
    fill: $darkColour;
  }
}
</style>
