<template>
  <div id="app">
    <select name="modes" class="modes">
      <option value="dark" @click="switchBackground">Standard</option>
      <option value="mountains" @click="switchBackground">Góry</option>
      <option value="spring" @click="switchBackground">Wiosna</option>
    </select>
    <div class="new__timer">
      <button class="new__timer__add" @click="addTimer"><span>+</span></button>
      <label class="new__timer__label" for="datepicker">Nowy licznik</label>
      <input type="text" name="datepicker" class="new__timer__date" v-model="dueDate">
    </div>
    <count-down v-for="timer in timers" :key="timer.id" :days="timer.days" @deleteComponent="deleteTimer(timer)"></count-down>
  </div>
</template>

<script>

import CountDown from './components/CountDown'

export default {
  components: { CountDown },
  name: 'app',

  data () {
    return {
      dueDate: new Date().toISOString().substr(0, 19).replace('T', ' '),
      timers: [],
      backgroundImg: '',
    }
  },

  methods: {
    validateDate() {
      const date = this.dueDate.slice(0, 10);
      const time = this.dueDate.slice(11);
      const userDueDate = new Date(this.dueDate).getTime();
      const currentDate = new Date().getTime();

      const dateRegex = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
      const timeRegex = /^((?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$)/;

      if (!date.match(dateRegex) || !time.match(timeRegex)) {
        alert('Date has to match format "YYYY-MM-DD HH:MM:SS"');
        return;
      }

      if (userDueDate - currentDate < 0) {
        alert('Date has to be in the future')
        return;
      }

      return true;
    },

    addTimer() {
      if (!this.validateDate()) return;
      this.timers.push({days: this.dueDate, id: Math.random() * 1000});

      this.updateLS();
    },

    deleteTimer(timer) {
      const index = this.timers.indexOf(timer);
      this.timers.splice(index, 1);

      this.updateLS();
    },

    updateLS() {
      localStorage.clear();
      localStorage.setItem('timers', JSON.stringify(this.timers))
    },

    getTimersFromLS() {
      const lsTimers = JSON.parse(localStorage.getItem('timers'));
      this.timers.push(...lsTimers);
    },

    switchBackground() {
      const select = document.querySelector('.modes');
      const classes = ['mountains', 'spring'];

      classes.forEach(item => {
        document.body.classList.remove(item);
      })

      if (select.value === 'mountains') {
        document.body.classList.toggle('mountains')
      }

      if (select.value === 'spring') {
        document.body.classList.toggle('spring')
      }
    }
  },

  created() {
    if (localStorage.getItem('timers')) {
      this.getTimersFromLS();
    }
  }
}
</script>

<style lang="scss">

  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'Fredoka One', cursive;
    width: 100vw;
    height: 100vh;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(255, 242, 222);

    &.mountains {
      background-image: url('./assets/mauntains.jpg');
      background-size: cover;
    }

    &.spring {
      background-image: url('./assets/spring.jpg');
      background-size: cover;
    }
  }

  #app {
    background-color: rgba(226, 226, 226, 0.808);
    height: 80vh;
    width: 50vw;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    .modes {
      align-self: flex-start;
      margin: 1em;
      cursor: pointer;
    }

    .new__timer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-width: 28em;
      margin-bottom: 2em;

      &__date {
        color: #333;
        font-size: 1.2rem;
        margin: 0;
        padding: .5em 1em;
        border-radius: 0.2rem;
        background-color: rgb(255, 255, 255);
        border: none;
        width: 50%;
        display: block;
        border-bottom: 0.3rem solid transparent;
      }

      &__label,
      &__add {
        font-size: 1.5rem;
      }

      &__add {
        background-color: white;
        border-style: none;
        border-radius: .2em;
        font-size: 2rem;
        display: block;
        cursor: pointer;

        span {
          display: flex;
          align-items: center;
          line-height: 1.5em;
          text-align: center;
        }
      }
    }
  }


</style>
