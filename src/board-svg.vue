<template>
  <div>
    <p>{{players}}</p>
    <svg :width="boardSize + 'px'" :height="boardSize + 'px'" :viewBox="myViewBox">
      <g class="board">
        <circle cx="0" cy="0" class="innerCircle" :r="innerCircleRadius(tickTime)"/>
        <circle cx="0" cy="0" class="outerCircle" :r="outerCircleRadius(tickTime)"/>

        <line v-for="n in 20" x1="-2000" x2="2000" :y1="getLineLocation(n)" :y2="getLineLocation(n)"></line>
        <line v-for="n in 20" :x1="getLineLocation(n)" :x2="getLineLocation(n)" y1="-2000" y2="2000"></line>
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
  props: ['players', 'tickTime'],
  /*
    player {
      pos: {x: 300, y: 100},
      nickname: "ant",
      id: sntoehustoa-9012,
      score: 20,
    }
  */
  computed: {
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
    };
  },
  methods: {
    getLineLocation(n) {
      return (n - 10) * this.gridLineSpacing;
    },
    innerCircleRadius(currentTick) {
      return (this.gameLengthInTicks - currentTick) * (2 / 3);
    },
    outerCircleRadius(currentTick) {
      return this.innerCircleRadius(currentTick) + this.innerCircleRadius(0);
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
  }

  text {
    fill: $darkColour;
    font-size: 22px;
    font-weight: bold;
    font-family: sans-serif;
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
