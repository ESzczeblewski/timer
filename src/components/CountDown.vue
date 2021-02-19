<template>
  <div class="count__down">
    <div class="count__down__days">{{ daysLeft }}</div>
    <div class="count__down__hrs">{{ hoursLeft }}</div>
    <div class="count__down__mins">{{ minutesLeft }}</div>
    <div class="count__down__secs">{{ secondsLeft }}</div>
    <button @click="deleteComponent">X</button>
    <div class="count__down__end" :class="{'count__down__end--active': hasEnded}">
      <p>Odliczanie zakończone</p>
      <button @click="deleteComponent">Usuń</button>
      <button @click="resetTimer">Reset</button>
    </div>
  </div>
</template>

<script>
  export default {

    data() {
      return {
        daysLeft: '00',
        hoursLeft: '00',
        minutesLeft: '00',
        secondsLeft: '00',
        hasEnded: false,
        countDownDate: '',
      }
    },

    props: ['days'],

    methods: {
      startTimer() {
        this.countDownDate = new Date(this.days).getTime();

        const interval = setInterval(() => {

          const now = new Date().getTime();
          const timeDifference = this.countDownDate - now;

          const days = 0 + Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

          this.daysLeft = days.toString().length < 3 ? (0 + days.toString()).slice(-2) : days.toString();

          this.hoursLeft = (0 + hours.toString()).slice(-2);
          this.minutesLeft = (0 + minutes.toString()).slice(-2);
          this.secondsLeft = (0 + seconds.toString()).slice(-2);


          if (timeDifference < 1000) {
            this.hasEnded = true;
            clearInterval(interval);
          }
        }, 1000)

      },

      deleteComponent() {
        this.$emit('deleteComponent', this.deleteComponent)
      },

      resetTimer() {
        this.startTimer();
        this.hasEnded = false;
      }
    },

    created() {
      this.startTimer();
    }

  }
</script>

<style lang="scss">
  .count__down {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 200px;
    height: 80px;

    &__end {
      display: none;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: grey;

      &--active {
        display: block;
      }
    }
  }
</style>