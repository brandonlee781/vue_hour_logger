<template>
  <div class="input-row" :id="hour.id">
    <slot class="col-1"></slot>
    <b-form-input type="date" class="col-3" v-model="hour.date" @blur.native="changeDate"></b-form-input>
    <b-form-input type="text" class="col-2" v-model="hour.startTime" @change="changeTime('startTime')" placeholder="Start Time"></b-form-input>
    <b-form-input type="text" class="col-2" v-model="hour.endTime" @change="changeTime('endTime')" placeholder="End Time"></b-form-input>
    <b-form-input type="text" class="col-2" v-model="hour.hours" disabled></b-form-input>
    <b-form-input type="text" class="col-2" v-model="hour.project" placeholder="Project" @change="changeProject"></b-form-input>
  </div>
</template>
<script lang="ts">
import * as moment from 'moment';
import * as uuid from 'uuid/v4';
let timer = 0;
function delay(callback, ms) {
  clearTimeout(timer);
  timer = setTimeout(callback, ms);
}
export default {
  name: 'dateTimeRow',
  props: ['hour'],
  data () {
    return {
      uuid: this.hour.id ? this.hour.id : uuid(),
    }
  },
  methods: {
    changeDate: function() {
      console.log(this.hour.date);
      this.$emit('setDate', this.uuid, this.hour.date);
    },
    changeTime: function(model) {
      this.$emit('setTime', this.uuid, model, this.hour[model]);
    },
    changeProject: function() {
      console.log('changeProject');
      this.$emit('setProject', this.uuid, this.hour.project);
    }
  }
}
</script>
<style scoped>
  .input-row {
    display: flex;
    flex-flow: row nowrap;
  }
  .form-control {
    margin-right: 4px;
  }
</style>
