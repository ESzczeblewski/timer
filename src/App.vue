<template>
  <div id="app">
    <div class="new--timer">
      <button class="new--timer--add" @click="addTimer">+</button>
      <label for="datepicker">Nowy licznik</label>
      <input type="text" name="datepicker" id="date" v-model="dueDate">
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
      timers: []
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
    }
  },

  created() {
    if (localStorage.getItem('timers')) {
      this.getTimersFromLS();
    }
  }
}
</script>

<style lang="scss"></style>
