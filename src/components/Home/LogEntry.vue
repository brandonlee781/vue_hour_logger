<template>
  <div class="input-row" :id="hour._id">
    <b-button v-if="hour._id" class="col-1 remove-button" @click="deleteEntry()">-</b-button>
    <b-button v-if="!hour._id" class="col-1 add-button" @click="addEntry()">+</b-button>
    <b-form-input type="date" class="col-2" v-model="formattedDate" @change="editEntry()"></b-form-input>
    <b-form-input type="text" class="col-1" v-model="hour.startTime" @change="editEntry()" placeholder="Start Time"></b-form-input>
    <b-form-input type="text" class="col-1" v-model="hour.endTime" @change="editEntry()" placeholder="End Time"></b-form-input>
    <b-form-input type="text" class="col-1" v-model="hour.duration" disabled></b-form-input>
    <b-form-input type="text" class="col-2" v-model="hour.project" @change="editEntry()" placeholder="Project" ></b-form-input>
    <b-form-input type="text" class="col-4" v-model="hour.note" @change="editEntry()" placeholder="Note" ></b-form-input>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import Component from 'vue-class-component';
  import { ILog } from '../../interfaces/log';
  import * as moment from 'moment';

  @Component({
    props: {
      hour: Object
    }
  })
  export default class LogEntry extends Vue {
    hour: ILog;

    get formattedDate() {
      return moment(this.hour.date, 'MM/DD/YYYY').format('YYYY-MM-DD');
    }
    set formattedDate(val) {
      this.hour.date = moment(val, 'YYYY-MM-DD').format('MM/DD/YYYY');
    }

    deleteEntry() {
      this.$emit('deleteEntry', this.hour._id);
    }

    addEntry() {
      this.$emit('addEntry', this.hour);
    }

    editEntry() {
      this.$emit('editEntry', this.hour);
    }

  }


</script>
<style scoped>
  .add-button,
  .remove-button {
    height: 40px;
    max-width: 40px;
    margin-right: 4px;
  }
  .input-row {
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: 4px;
  }
  .form-control {
    margin-right: 8px;
  }
</style>