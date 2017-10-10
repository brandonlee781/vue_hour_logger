<template>
  <v-layout class="entry-list" column nowrap>
    <v-layout row nowrap align-end class="entry-list-header">
      <span class="entry-list-title">{{ selectedItem.title }}</span>
      <log-entry-new :selectedItem="selectedItem"></log-entry-new>
    </v-layout>

    <img v-if="isLogLoading" src="../../assets/Double Ring.svg" alt="Loading">

    <div v-for="(log, index) in logs" :key="log._id">
      <log-entry-item :log="log" :actions="actions"></log-entry-item>
    </div>

    <v-btn v-if="!isLogLoading" color="primary" full-width @click="getMoreEntries()">Load More</v-btn>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import * as moment from 'moment';
import { ILog } from '../../interfaces/log';

import * as logs from '../../store/log';

import LogEntryListItem from './LogEntryListItem.vue';
import LogEntryListNew from './LogEntryListNew.vue';

@Component({
  components: {
    'log-entry-item': LogEntryListItem,
    'log-entry-new': LogEntryListNew,
  }
})
export default class LogEntryList extends Vue {
  @Prop() selectedItem;
  newEntry: ILog = { date: moment().format('MM/DD/YYYY'), startTime: '', endTime: '', duration: 0, project: '', note: ''};
  currentSkip: number = 20;

  get logs() {
    if (this.selectedItem.id === 'recent' ) {
      return this.$store.getters['log/getLogs'].slice(0, this.currentSkip);
    } else {
      return this.$store.getters['log/getLogsByProject'](this.selectedItem.id);
    }
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
  width: 100%;
}
.entry-list-header {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  height: 9em;
  padding: 0 4em;
  border-bottom: 1px solid rgba(0,0,0,0.12);
  & .entry-list-title {
    font-size: 2.5rem;
    font-weight: 300;
  }
  & .entry-list-new {
    color: #000 !important;
    font-size: 5em;
    font-weight: 100;
  }
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