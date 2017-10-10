<template>
  <v-layout column nowrap class="hours-wrapper">

    <v-layout row nowrap align-end class="list-header">
      <span class="list-title">Filter Hours By Date</span>
    </v-layout>

    <v-layout row nowrap class="filter-inputs">
      <app-date-picker @dateChange="changeFromDate" />
      <app-date-picker @dateChange="changeToDate" />
      <v-btn class="get-button" color="primary" @click="filterEntries()">Filter</v-btn>
    </v-layout>


    <v-layout row wrap>
      <filter-hour-item v-for="(entries, key) in projects" :key="key" :project="key" :entries="entries" />
    </v-layout>
    
    <v-layout row nowrap justify-end align-end class="buttons" v-if="filtered.length > 0">
      <v-btn flat class="clear-button" color="secondary" @click="clearEntries()">Clear Entries</v-btn>
      <v-btn outline color="primary" class="csv-button" @click="downloadCSV()">Download CSV</v-btn>
      <v-btn color="primary" class="pdf-button" @click="downloadPDF()">Create Invoice</v-btn>
    </v-layout>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import * as moment from 'moment';
import { ILog } from '../../interfaces/log';
import * as jsonexport from 'jsonexport/dist';
import * as Cookies from 'js-cookie';
import FilterHourFormItem from './FilterHourFormItem.vue';
import AppDatePicker from '../AppDatePicker.vue';

@Component({
  components: {
    'filter-hour-item': FilterHourFormItem,
    'app-date-picker': AppDatePicker,
  }
})
export default class FilterHourForm extends Vue {
  public fromDate: Date | null = null;
  public toDate: Date | null = null;
  public filtered: ILog[] = [];
  public projects: ILog[] = [];

  public filterEntries() {
    if (this.fromDate) {
      const logs = this.$store.getters['log/getLogs'];
      this.filtered = logs.filter((log) => {
        if ( moment(log.date, 'MM/DD/YYYY').isBetween(this.fromDate, this.toDate || moment()) ) {
          return log;
        }
      });
      this.projects = this.groupBy(this.filtered, 'project');
    }
  }

  public clearEntries() {
    this.fromDate = null;
    this.toDate = null;
    this.projects = [];
    this.filtered = [];
  }

  public downloadCSV() {
    const formattedLogs = this.filtered.map((log, ind) => {
      return {
        date: moment(log.date).format('MM/DD/YYYY'),
        'start time': moment(log.startTime, 'HH:mm:ss').format('HH:mm'),
        'end time': moment(log.endTime, 'HH:mm:ss').format('HH:mm'),
        'project': log.project,
        'total hours': log.duration,
        'notes': log.note
      }
    })


    jsonexport(formattedLogs, (err, csv) => {
      if (err) console.error(err);
      const filename = this.toDate ? moment(this.toDate).format('MMMDD') + '_hours.csv' : moment().format('MMMDD') + '_hours.csv';

      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    })
  }

  public downloadPDF() {
    this.$router.push({ name: 'Invoice', params: { projects: JSON.stringify(this.projects) } })
  }

  public changeFromDate(val: Date) {
    this.fromDate = val;
  }
  public changeToDate(val: Date) {
    this.toDate = val;
  }

  private groupBy(arr, prop) {
    return arr.reduce((log, x) => {
      if (!log[x[prop]]) { log[x[prop]] = [] };
      log[x[prop]].push(x);
      return log;
    }, {});
  }
}
</script>

<style lang="scss" scoped>
  .hours-wrapper {
    margin: 20px 0 20px 0;
    width: 80%;
    padding: 0 16px;
  }
  .filter-inputs {
    max-height: 80px;
  }
  .list-header {
    height: calc(7rem - 28px);
    border-bottom: 1px solid rgba(0,0,0,0.12);
    margin-bottom: 20px;
    & .list-title {
      font-size: 1.4rem;
      font-weight: 600;
      letter-spacing: 0.5px;
      margin: 0 0 1rem 2rem;
    }
  }
  .get-button {
    max-height: 42px;
    margin-bottom: 1.1rem;
    margin-left: 8px;
  }
  .buttons {
    width: 100%;
    max-height: 40px;
    margin: 10px auto 0 auto;
  }
  @media (min-width: 1900px) {
    .hours-wrapper {
      width: 700px;
      position: fixed;
      left: 1230px; 
      overflow: scroll;
    }
  }
</style>