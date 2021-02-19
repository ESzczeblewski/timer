<template>
  <div class="count__down">
    <div class="count__down__num">{{ daysLeft }}
      <p>Dni</p>
    </div>
    <span>:</span>
    <div class="count__down__num">{{ hoursLeft }}
      <p>Godziny</p>
    </div>
    <span>:</span>
    <div class="count__down__num">{{ minutesLeft }}
      <p>Minuty</p>
    </div>
    <span>:</span>
    <div class="count__down__num">{{ secondsLeft }}
      <p>Sekundy</p>
    </div>
    <button class="count__down__delete" @click="deleteComponent">X</button>
    <div class="count__down__end" :class="{'count__down__end--active': hasEnded}">
      <p>Odliczanie zakonczone</p>
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
        countDownDate: 0,
        initialTimeDifference: new Date(this.days).getTime() - new Date().getTime(),
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
        this.countDownDate = this.initialTimeDifference + new Date().getTime();
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
    justify-content: space-around;
    align-items: center;
    width: 90%;
    max-width: 30em;
    height: 8em;
    margin-bottom: 1em;
    background: rgb(96,138,215);
    background: linear-gradient(121deg, rgba(96,138,215,1) 48%, rgba(144,234,252,1) 100%);
    border-radius: 1em;

    &__num {
      color: rgb(255, 255, 255);
      font-size: 3rem;
      display: flex;
      flex-direction: column;
      align-items: center;

      p {
        font-size: 1rem;
        margin: 0;
      }

    }

    span {
      color: rgb(255, 255, 255);
      font-size: 1.5rem;
    }

    &__delete {
      width: 1.5em;
      height: 1.5em;
      border-radius: 50%;
      border-style: none;
      background-color: rgba(255, 255, 255, 0.911);
      font-size: 1.5rem;
      font-weight: bold;
      color: rgb(96,138,215);
      cursor: pointer;
    }

    &__end {
      display: none;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgb(96,138,215);
      border-radius: 1em;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;

      p {
        margin: 0;
        color: rgb(255, 255, 255);
        font-size: 1.5rem;
      }

      button {
        font-weight: bold;
        color: rgb(255, 255, 255);
        background-color: rgb(128, 128, 128);
        border-style: none;
        width: 6em;
        height: 2em;
        cursor: pointer;
      }

      &--active {
        display: flex;
      }
    }
  }
</style>