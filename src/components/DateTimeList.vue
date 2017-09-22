<template>
  <div class="wrapper">
    <div class="data-row">
      <date-time-row v-for="(hour, index) in hours" :key="hour.id" v-on:setDate="setDate" v-on:setTime="setTime" v-on:setProject="setProject" v-bind:hour="hour">
        <b-button v-if="index < hours.length - 1" class="remove-button">-</b-button>
        <b-button v-if="index >= hours.length - 1" class="add-button" @click="addRow">+</b-button>
      </date-time-row>
    </div>
    <div class="data-row" v-if="this.hours.length === 0">
      <date-time-row v-bind:hour="{}" v-on:setDate="setDate" v-on:setTime="setTime" v-on:setProject="setProject">
        <b-button class="add-button" @click="addRow">+</b-button>
      </date-time-row>
    </div>
  </div>
</template>

<script lang="ts">
import * as moment from 'moment';
const storage = window.localStorage;

const data = JSON.parse(storage.getItem('hours')) || [];
console.log(data);

function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].id === nameKey) {
            return i;
        } 
    }
    return -1;
}


export default {
  name: 'hello',
  data () {
    return {
      hours: data,
    }
  },
  methods: {
    addRow() {
      let currentData = JSON.parse(storage.getItem('hours'));
      currentData.push({})
      this.hours.push(currentData);
    },
    setDate(id, date) {
      console.log(id, date);
      let hoursIndex = search(id, this.hours);
      if (hoursIndex >= 0) {
        this.hours[hoursIndex].date = date;
      } else {
        this.hours.push({id: id, date: date});
      }
      storage.setItem('hours', JSON.stringify(this.hours));
    },
    setTime(id, model, time) {
      console.log(id, model, time);
      let hoursIndex = search(id, this.hours);
      if (hoursIndex >= 0) {
        this.hours[hoursIndex][model] = moment(time, 'hh:mma').format('HH:mm');
        this.hours[hoursIndex].hours = moment(this.hours[hoursIndex].endTime, 'HH:mm').diff(moment(this.hours[hoursIndex].startTime, 'HH:mm'), 'hours');
      } else {
        this.hours.push({id: id, [model]: moment(time, 'hh:mma').format('HH:mm')});
      }
      storage.setItem('hours', JSON.stringify(this.hours));
    },
    setProject(id, project) {
      console.log(id, project);
      let hoursIndex = search(id, this.hours);
      if (hoursIndex >= 0) {
        this.hours[hoursIndex].project = project;
      } else {
        this.hours.push({id: id, project: project});
      }
      storage.setItem('hours', JSON.stringify(this.hours));
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add-button,
.remove-button {
  height: 40px;
  width: 40px;
  margin-right: 4px;
}
.wrapper {
  display: flex;
  flex-flow: column nowrap;
  width: 80%;
  margin: 0 auto;
}
.add-button {
  height: 40px;
  margin-top: auto;
}
</style>
