<template>
  <v-layout class="entry-list" column nowrap justify-center>
    <log-entry-item :log="newEntry" :actions="actions" @newEntry="resetNewEntry()"></log-entry-item>
    
    <v-divider light inset></v-divider>

    <img v-if="isLogLoading" src="../../assets/Double Ring.svg" alt="Loading">

    <div v-for="(log, index) in logs" :key="log._id">
      <log-entry-item :log="log" :actions="actions"></log-entry-item>
      <v-divider light inset></v-divider>
    </div>

    <v-btn v-if="!isLogLoading" color="primary" full-width @click="getMoreEntries()">Load More</v-btn>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Provide } from 'vue-property-decorator';
import * as moment from 'moment';
import { ILog } from '../../interfaces/log';

import * as logs from '../../store/log';

import LogEntryItem from './LogEntryItem';

@Component({
  components: {
    'log-entry-item': LogEntryItem,
  }
})
export default class LogEntryList extends Vue {
  newEntry: ILog = { date: moment().format('MM/DD/YYYY'), startTime: '', endTime: '', duration: 0, project: '', note: ''};
  currentSkip: number = 20;

  get logs() {
    return this.$store.getters['log/getLogs'].slice(0, this.currentSkip);
  }

  get logCount() {
    return this.$store.getters['log/getLogCount'];
  }

  get isLogLoading() {
    return this.$store.state.log['isLoading'];
  }

  get actions(): any {
    return {
      addLog: (log: ILog) => this.$store.dispatch('log/ADD_NEW_LOG', log),
      deleteLog: (log: ILog) => this.$store.dispatch('log/DELETE_LOG', log),
      editLog: (log: ILog) => this.$store.dispatch('log/EDIT_LOG', log),
    }
  }

  resetNewEntry() {
    this.newEntry = { date: moment().format('MM/DD/YYYY'), startTime: '', endTime: '', duration: 0, project: '', note: ''};
  }

  getMoreEntries() {
    this.currentSkip += 20;
  }
}

</script>

<style lang="scss" scoped>
.entry-list {
  margin-top: 20px;
}
.add-button,
.remove-button {
  height: 40px;
  width: 40px;
  margin-right: 4px;
}
.add-button {
  height: 40px;
  margin-top: auto;
}
</style>