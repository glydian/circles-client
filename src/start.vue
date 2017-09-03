<template>
  <div class="centered-container">
    <div id="start">
      <h1>Circles</h1>
      <p v-if="message !== ''" class="message">{{message}}</p>
      <div>
        <label for="nickname">Nickname</label>
        <input v-focus ref="nickname" @keyup.enter="play" type="text" name="nickname">
      </div>
      <button @click="play">Play</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'start',
  props: ['message'],
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      },
    },
  },
  methods: {
    play() {
      const nickname = this.$refs.nickname.value;
      this.$root.app.startGame(nickname);
    },
  },
};
</script>

<style lang="scss">
@import './assets/globals.scss';

.centered-container {
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

#start {
  color: $lightColour;
  background-color: $darkColour;
  padding: 2em;
  margin: 0 auto 200px auto;
  width: 350px;
  @include rounded;
  @include dropShadow;

  h1 {
    margin: 0 auto 0.2em auto;
    text-align: center;
    font-size: 3em;
  }

  .message {
    text-align: center;
    font-size: 1.3em;
  }

  label {
    margin-left: 0.5em;
  }

  input {
    font-size: 1.3em;
    text-align: center;
    color: inherit;
    background-color: inherit;

    width: 100%;
    padding: 0.5em;
    margin: 5px 0 0.5em 0;
    box-sizing: border-box;

    border: none;
    border-bottom: 1px solid white;

    &:hover, &:focus {
      outline: none;
      background-color: $midDarkColour;
    }
  }

  button {
    width: 100%;
    padding: 0.5em;
    margin-top: 0.5em;
    color: $darkColour;
    background-color: white;
    border: none;
    font-size: 1.5em;
    @include rounded;

    &:hover, &:focus {
      margin-top: -1;
      cursor: pointer;
      transform: translateY(-1px);
      @include dropShadow;
    }
  }
}
</style>
